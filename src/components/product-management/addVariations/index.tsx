/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable prettier/prettier */
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { PosApi } from '../../../api'
import Button from '../../common/button'
import { FormInput, InputGroup } from '../../common/form-elements/components'
import SharedDataContainer from '../../../containers/sharedData'
import { Icons, NotificationTypes } from '../../../constants'
import Toast from '../../../utils/notification'
import Table from '../../common/table'

function addVariations() {
  const posApi = PosApi.useAPI()
  const { setNotification, handleSlider } = SharedDataContainer.useContainer()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { t } = useTranslation('pos')


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sucessHandlerCreateProduct = (product: any, message: string) => {
    setNotification({
      title: '',
      message,
      icon: Icons.CHECKCIRCLE,
      type: NotificationTypes.SUCCESS,
    })
    Toast()
    setIsLoading(false)
    handleSlider()
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const errorHandler = (error: any) => {
    Toast()
    setNotification({
      title: '',
      message: error || 'Something went wrong.',
      icon: Icons.XCIRCLE,
      type: NotificationTypes.ERROR,
    })
    setIsLoading(false)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const createCustomer = async (customer: any) => {
    setIsLoading(true)
    /* TODO: Remove after after set customer type */
    // eslint-disable-next-line no-param-reassign
    customer.type = 'both'
    const res = await posApi.createCustomer(customer)
    if (res) {
      const { data } = res
      // eslint-disable-next-line @typescript-eslint/no-shadow, @typescript-eslint/no-explicit-any
      const { message, data: customer } = data
      sucessHandlerCreateProduct(customer, message)
    } else {
      errorHandler(null)
    }
  }

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    createCustomer(data)
  }

  return (
    <form className="validate-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="intro-y box p-5">
      <div className=" mr-3 mt-2 mb-5 truncate font-medium sm:whitespace-normal ">
          {' Product: Kaha 50g (4792173680658)'}
        </div>
        <div>
        <Table>
        <Table.Thead variant="default" className=" bg-primary text-white">
            <Table.Tr>
                <Table.Th className="whitespace-nowrap">
                Default Selling Price (Inc. tax)
                </Table.Th>
                <Table.Th className="whitespace-nowrap">
                Whole Sale
                </Table.Th>
                <Table.Th className="whitespace-nowrap">
                Discounted Sale
                </Table.Th>

            </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
            <Table.Tr>
                <Table.Td>Rs 270.00</Table.Td>
                <Table.Td><InputGroup className="flex-1">
                <FormInput type="text" placeholder="0.00" />
              </InputGroup></Table.Td>
                <Table.Td><InputGroup className="flex-1">
                <FormInput type="text" placeholder="0.00" />
              </InputGroup></Table.Td>
                </Table.Tr>
        </Table.Tbody>
    </Table>
        </div>

        <div className="mt-6 flex justify-end">
          
          <Button
            variant="soft-pending"
            className="mb-2 mr-1 w-48"
          >
            {`${t('common.button.savenAddOpeningStock')}`}
          </Button>
          <Button
            variant="soft-primary"
            className="mb-2 mr-1 w-48"
          >
            {`${t('common.button.savenAddAnother')}`}
          </Button>
          <Button
            variant="secondary"
            className="mb-2 mr-1 w-24"
            onClick={handleSlider}
          >
            {`${t('common.button.cancel')}`}
          </Button>
        </div>
      </div>
    </form>
  )
}

export default addVariations
