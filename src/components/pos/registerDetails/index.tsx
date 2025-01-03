/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
/* eslint-disable no-param-reassign */
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
// import { TabulatorFull as Tabulator } from 'tabulator-tables'
import { PosApi } from '../../../api'
import Button from '../../common/button'
import SharedDataContainer from '../../../containers/sharedData'
import { Icons, NotificationTypes } from '../../../constants'
import Toast from '../../../utils/notification'
import VariationTableElement from './variationTable-elements'
import VariationTableElementHistory from './variationTable-ElementsHistory'
import LoadingIcon from '../../common/loading-icon'
import Pagination from '../../common/pagination'
import Lucide from '../../common/lucide'
import { FormSelect } from '../../common/form-elements/components'

function RegisterDetails() {
  const posApi = PosApi.useAPI()
  const { setNotification, handleSlider } = SharedDataContainer.useContainer()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { t } = useTranslation('pos')
  const [showMoreInfo, setShowMoreInfo] = useState(false)
  const handleChange = () => {
    setShowMoreInfo(!showMoreInfo)
  }

  const schema = yup
    .object({
      shipping_details: yup.string().required(),
    })
    .required()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sucessHandlerCreateCustomer = (customer: any, message: string) => {
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
  const createCustomer = async (customer: any) => {
    setIsLoading(true)
    customer.type = 'both'
  }
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    createCustomer(data)
  }

  return (
    <form className="validate-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="intro-y box mb-5 bg-primary px-5 py-3 text-white">
        <div className="mt- intro-y flex flex-col items-center sm:flex-row">
          <div className="mr-auto  font-medium">
            <div className=" font-medium">
              {`${t('registerForm.fields.username.label')}`} :
              {' Storeamte demo '}
            </div>
          </div>
          <div className="flex w-full sm:mt-0 sm:w-auto">
            <div className=" font-medium">
              {`${t('registerForm.fields.email.label')}`} :
              {' support@storemate.lk '}
            </div>
          </div>
        </div>
      </div>

      <div className="intro-y box mb-5 px-5 py-5">
        <VariationTableElement register={register} />
      </div>
      <div className="mt-9 flex justify-end">
          <Button type="submit" variant="primary" className="mb-2 mr-1 w-24">
            {`${t('common.button.print')}`}
            {isLoading ? (
              <LoadingIcon icon="oval" color="white" className="ml-2 h-4 w-4" />
            ) : (
              ''
            )}
          </Button>
          <Button type="submit" variant="primary" className="mb-2 mr-1 w-24">
            {`${t('common.button.slimPrint')}`}
            {isLoading ? (
              <LoadingIcon icon="oval" color="white" className="ml-2 h-4 w-4" />
            ) : (
              ''
            )}
          </Button>

          <Button
            variant="secondary"
            className="mb-2 mr-1 w-24"
            onClick={handleSlider}
          >
            {`${t('common.button.cancel')}`}
          </Button>
        </div>
      <div className="item-center flex justify-center py-3">
        <Button
          variant="secondary"
          className="mx-auto mb-5 w-fit px-10"
          onClick={handleChange}
        >
          <div className="mx-auto flex">
            More
            <Lucide
              className="mx-auto ml-1 mt-0.5 h-4 w-4"
              icon={showMoreInfo ? Icons.UPARROW : Icons.DOWNARROW}
            />
          </div>
        </Button>
      </div>
      {showMoreInfo && (
       <div className="intro-y box mb-5 mt-5 px-5 py-5 ">
           <div className="flex flex-col border-b mb-5 font-medium text-base  dark:border-darkmode-400">
                  <h2 className="mr-auto text-base font-medium mb-4">
                  {`${t('registerForm.fields.transactionHistory.label')}`}
                  </h2>
                  </div>
          <div className="mt- intro-y flex flex-col items-center sm:flex-row">
            <div className="mt-2 items-center sm:mr-4 sm:flex xl:mt-0">
              Page Size
              <FormSelect className="w-15 mt-3 ml-2 sm:mt-0">
                <option>10</option>
                <option>25</option>
                <option>50</option>
              </FormSelect>
            </div>

            <div className="mt-2 items-center sm:mr-4 sm:flex xl:mt-0">       
            </div>
            <div className="mt-2 xl:mt-0">  
            </div>
            <div className="mr-auto  font-medium" />
            <div className="flex w-full sm:mt-0 sm:w-auto">
              <Button
                id="tabulator-print"
                variant="outline-secondary"
                className="mr-2 w-1/2 sm:w-auto"
              >
                <Lucide icon="Printer" className="mr-2 h-4 w-4" /> Print
              </Button>
              <Button
                id="tabulator-print"
                variant="outline-secondary"
                className="mr-2 w-1/2 sm:w-auto"
              >
                <Lucide icon="FileText" className="mr-2 h-4 w-4" />
                Excel
              </Button>
            </div>
          </div>

          <VariationTableElementHistory register={register} />

          <div className="intro-y col-span-10 flex flex-wrap items-center sm:flex-row sm:flex-nowrap">
            <div className="mr-auto  font-medium">
              Showing 1 to 10 of 150 entries
            </div>
            <div className="font-medium">
              <Pagination className="w-full sm:mr-auto sm:w-auto">
                <Pagination.Link>
                  <Lucide icon="ChevronsLeft" className="h-4 w-4" />
                </Pagination.Link>
                <Pagination.Link>
                  <Lucide icon="ChevronLeft" className="h-4 w-4" />
                </Pagination.Link>

                <Pagination.Link>1</Pagination.Link>
                <Pagination.Link active>2</Pagination.Link>
                <Pagination.Link>3</Pagination.Link>

                <Pagination.Link>
                  <Lucide icon="ChevronRight" className="h-4 w-4" />
                </Pagination.Link>
                <Pagination.Link>
                  <Lucide icon="ChevronsRight" className="h-4 w-4" />
                </Pagination.Link>
              </Pagination>
            </div>
          </div>
        </div>
      )}
    </form>
  )
}

export default RegisterDetails
