/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { PosApi } from '../../../api'
import Table from '../../common/table'
import Toast from '../../../utils/notification'
import SharedDataContainer from '../../../containers/sharedData'
import { Icons, NotificationTypes } from '../../../constants'
import TomSelect from '../../common/tom-select'

function EditProducts() {
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
  const [select, setSelect] = useState('1')

  return (
    <form className="validate-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="intro-y box mb-5 px-5">
        <div className="flex w-full justify-between py-3 sm:w-auto">
          <div className="flex">
            <div className=" mr-3 mt-2 truncate font-medium sm:whitespace-normal">
              {`${t('productManagement.fields.productName.label')}`} :
              {' Apple Bunny '}
            </div>
          </div>
          <div className="flex">
            <div className="mr-3 mt-2 truncate font-medium sm:whitespace-normal">
              Business Location
            </div>
            <TomSelect
              id="update-profile-form-4"
              value={select}
              onChange={setSelect}
              className="w-80"
            >
              <option value="1">Kandy</option>
              <option value="2">Galle</option>
              <option value="3">Jaffna</option>
              <option value="4">Nugegoda</option>
            </TomSelect>
          </div>
        </div>
      </div>

      <div className="intro-y box mb-8 px-5 py-5">
        <div className=" mr-3 mt-2 truncate font-medium sm:whitespace-normal ">
          {' Quantities In'}
        </div>
        <div className=" mb-3  py-5" style={{ overflowY: 'auto' }}>
          <Table
            bordered
            //   striped
            hover
            style={{ width: '100%', whiteSpace: 'nowrap' }}
          >
            <Table.Thead variant="dark" className="bg-primary text-white">
              <Table.Tr>
                <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-center text-slate-500 dark:bg-darkmode-800">
                  Total Purchase
                </Table.Th>
                <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-center text-slate-500 dark:bg-darkmode-800">
                  Opening Stock
                </Table.Th>
                <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-center text-slate-500 dark:bg-darkmode-800">
                  Total Sell Return
                </Table.Th>
                <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-center text-slate-500 dark:bg-darkmode-800">
                  Stock Transfers (In)
                </Table.Th>
                <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-center text-slate-500 dark:bg-darkmode-800">
                  Manufacturing(In)
                </Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              <Table.Tr>
                <Table.Td className="!px-2">
                  <div className="text-right">20,000,000.00</div>
                </Table.Td>
                <Table.Td className="!px-2">
                  <div className="text-right">20,000,000.00</div>
                </Table.Td>
                <Table.Td className="!px-2">
                  <div className="text-right">20,000,000.00</div>
                </Table.Td>
                <Table.Td className="!px-2">
                  <div className="text-right">20,000,000.00</div>
                </Table.Td>
                <Table.Td className="!px-2">
                  <div className="text-right">20,000,000.00</div>
                </Table.Td>
              </Table.Tr>
            </Table.Tbody>
          </Table>
        </div>

        <div className=" mr-3 mt-2 truncate font-medium sm:whitespace-normal ">
          {' Quantities Out'}
        </div>
        <div className=" mb-3  py-5" style={{ overflowY: 'auto' }}>
          <Table
            bordered
            //   striped
            hover
            style={{ width: '100%', whiteSpace: 'nowrap' }}
          >
            <Table.Thead variant="dark" className="bg-primary text-white">
              <Table.Tr>
                <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-center text-slate-500 dark:bg-darkmode-800">
                  Total Sold
                </Table.Th>
                <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-center text-slate-500 dark:bg-darkmode-800">
                  Total Stock Adjustment
                </Table.Th>
                <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-center text-slate-500 dark:bg-darkmode-800">
                  Total Purchase Return
                </Table.Th>
                <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-center text-slate-500 dark:bg-darkmode-800">
                  Stock Transfers (Out)
                </Table.Th>
                <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-center text-slate-500 dark:bg-darkmode-800">
                  Manufacturing(Out)
                </Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              <Table.Tr>
                <Table.Td className="!px-2">
                  <div className="text-right">20,000,000.00</div>
                </Table.Td>
                <Table.Td className="!px-2">
                  <div className="text-right">20,000,000.00</div>
                </Table.Td>
                <Table.Td className="!px-2">
                  <div className="text-right">20,000,000.00</div>
                </Table.Td>
                <Table.Td className="!px-2">
                  <div className="text-right">20,000,000.00</div>
                </Table.Td>
                <Table.Td className="!px-2">
                  <div className="text-right">20,000,000.00</div>
                </Table.Td>
              </Table.Tr>
            </Table.Tbody>
          </Table>
        </div>

        <div className=" mr-3 mt-2 truncate font-medium sm:whitespace-normal ">
          {' Totals'}
        </div>
        <div className=" mb-3 border-b py-5" style={{ overflowY: 'auto' }}>
          <Table
            bordered
            //   striped
            hover
            style={{ width: '100%', whiteSpace: 'nowrap' }}
          >
            <Table.Thead variant="dark" className="bg-primary text-white">
              <Table.Tr>
                <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-center text-slate-500 dark:bg-darkmode-800">
                  Current stock
                </Table.Th>
                <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-center text-slate-500 dark:bg-darkmode-800">
                  Stock Transfers In Transit (In)
                </Table.Th>
                <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-center text-slate-500 dark:bg-darkmode-800">
                  Stock Transfers In Transist (Out)
                </Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              <Table.Tr>
                <Table.Td className="!px-2">
                  <div className="text-right">20,000,000.00</div>
                </Table.Td>
                <Table.Td className="!px-2">
                  <div className="text-right">20,000,000.00</div>
                </Table.Td>
                <Table.Td className="!px-2">
                  <div className="text-right">20,000,000.00</div>
                </Table.Td>
              </Table.Tr>
            </Table.Tbody>
          </Table>
        </div>


        <div className="overflow-y-auto overflow-x-scroll mt-5">
          <Table bordered>
          <Table.Thead variant="dark">
              <Table.Tr>
                <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-center text-slate-500 dark:bg-darkmode-800">
                 Type
                </Table.Th>
                <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-center text-slate-500 dark:bg-darkmode-800">
                Quantity Change
                </Table.Th>
                <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-center text-slate-500 dark:bg-darkmode-800">
                New Quantity
                </Table.Th>
                <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-center text-slate-500 dark:bg-darkmode-800">
                Date
                </Table.Th>
                <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-center text-slate-500 dark:bg-darkmode-800">
                Reference No
                </Table.Th>
                <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-center text-slate-500 dark:bg-darkmode-800">
                Price
                </Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              <Table.Tr>
                <Table.Td className="!px-2">
                  <div className="text-right">Product</div>
                </Table.Td>
                <Table.Td className="!px-2">
                  <div className="text-right">20,000,000.00</div>
                </Table.Td>
                <Table.Td className="!px-2">
                  <div className="text-right">20,000Pc(s)</div>
                </Table.Td>
                <Table.Td className="!px-2">
                  <div className="text-right">20,000,000.00</div>
                </Table.Td>
                <Table.Td className="!px-2">
                  <div className="text-right">20,000,000.00</div>
                </Table.Td>
                <Table.Td className="!px-2">
                  <div className="text-right">20,000,000.00</div>
                </Table.Td>
              </Table.Tr>
            </Table.Tbody>
          </Table>
        </div>
      </div>
    </form>
  )
}

export default EditProducts
