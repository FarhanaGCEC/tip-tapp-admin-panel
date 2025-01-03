/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/heading-has-content */
/* eslint-disable import/no-useless-path-segments */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable import/order */
/* eslint-disable react/self-closing-comp */
/* eslint-disable import/no-duplicates */
/* eslint-disable prettier/prettier */
import { SetStateAction, useState } from 'react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { PosApi } from '../../../api'
import Button from '../../common/button'
import {
  FormSelect,
  FormInput,
  FormCheck,
  FormInfo,
} from '../../../components/common/form-elements/components'
import {
  InputElement, SelectElement, DateElement, TextareaElement,
} from '../../../components/common/form-elements'
import Toast from '../../../utils/notification'
import SharedDataContainer from '../../../containers/sharedData'
import { Icons, NotificationTypes } from '../../../constants'
import LoadingIcon from '../../common/loading-icon'
import { Tab, Menu } from '../../common/headless'
import Lucide from '../../common/lucide'
import PreviewImage from '../../../assets/images/fakers/image-4.jpg'
import TomSelect from '../../../components/common/tom-select'
import VariationTableLedger from './variationTableLedger-Elements'
import VariationTableElementStockReport from './variationTableStockReport-Elements'
import VariationTableElementDocs from './variationTableDocs-Elements'
import VariationTableElementPay from './variationTablePay-Elements'
import VariationTableElementContact from './variationTableContact-Elements'
import VariationTablePurchase from './variationTablePurchase-Elements'
import Pagination from '../../common/pagination'
import { Dialog } from '../../../components/common/headless'
import UploadFilesElement from '../../common/form-elements/upload-files-element'
import ClassicEditorElement from '../../common/form-elements/classic-editor-element'
import Table from '../../../components/common/table'
import { Litepicker } from '../../../components/common/form-elements/components'

function ViewSuppliers() {
  const posApi = PosApi.useAPI()
  const { setNotification, handleSlider } = SharedDataContainer.useContainer()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { t } = useTranslation('pos')

  const schema = yup
  .object({
    firstName: yup
      .string()
      .required(
        `${t(
          'contactManagement.fields.suppliers.fields.viewSuppliers.fields.addLogin.fields.firstName.validationMessage'
        )}`
      ),
    email: yup
      .string()
      .required(
        `${t(
          'contactManagement.fields.suppliers.fields.viewSuppliers.fields.addLogin.fields.email.validationMessage'
        )}`
      ),
    username: yup
      .string()
      .required(
        `${t(
          'contactManagement.fields.suppliers.fields.viewSuppliers.fields.addLogin.fields.username.validationMessage'
        )}`
      ),
      password: yup
      .string()
      .required(
        `${t(
          'contactManagement.fields.suppliers.fields.viewSuppliers.fields.addLogin.fields.password.validationMessage'
        )}`
      ),
      confirmPassword: yup
      .string()
      .required(
        `${t(
          'contactManagement.fields.suppliers.fields.viewSuppliers.fields.addLogin.fields.confirmPassword.validationMessage'
        )}`
      ),
      amount: yup
      .string()
      .required(
        `${t(
          'contactManagement.fields.suppliers.fields.viewSuppliers.fields.addPay.fields.amount.validationMessage'
        )}`
      ),
    date_of_birth: yup
      .string()
      .required(
        `${t(
          'contactManagement.fields.suppliers.fields.viewSuppliers.fields.addPay.fields.paidOn.validationMessage'
        )}`
      ),
    paymentMethod: yup
      .string()
      .required(
        `${t(
          'contactManagement.fields.suppliers.fields.viewSuppliers.fields.addPay.fields.paymentMethod.validationMessage'
        )}`
      ),
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
      sucessHandlerCreateCustomer(customer, message)
    } else {
      errorHandler(null)
    }
  }

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    createCustomer(data)
  }
  const [select, setSelect] = useState('1')
  const [buttonModalPreview, setButtonModalPreview] = useState(false)
  const [buttonContactModalPreview, setContactButtonModalPreview] = useState(false)
  const [buttonDueModalPreview, setDueButtonModalPreview] = useState(false)

  const [checked, setChecked] = useState(false)

  const handleChange = () => {
    setChecked(!checked)
  }
  const [editorDataDescription] = useState(
  )
  const [selectedOption, setSelectedOption] = useState('')
  const handleSelectChange = (event: {
    target: { value: SetStateAction<string> }
  }) => {
    setSelectedOption(event.target.value)
  }
  const [daterange, setDaterange] = useState('')
  const [date, setDate] = useState('')
  const options = [
    { id: 0, name: 'Cash' },
    { id: 1, name: 'Card' },
    { id: 2, name: 'Cheque' },
    { id: 3, name: 'Bank Transfer' },
    { id: 4, name: 'Other Payments' },
    { id: 5, name: 'Customer Payment' },
  ]

  return (
    <form className="validate-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="intro-y box mb-5 px-5 ">
        <div className=" flex w-full justify-end py-3 sm:mt-0 sm:w-auto ">
          <TomSelect
            id="update-profile-form-3"
            value={select}
            onChange={setSelect}
            className="w-80"
          >
            <option value="1">Kasun Bandara</option>
            <option value="2">Gayan Perera</option>
            <option value="3">Jayan Bandara</option>
            <option value="4">N.r.j Kasun</option>
          </TomSelect>
        </div>{' '}
      </div>

      <Tab.Group className=" intro-y box overflow-hidden">
        <div className="intro-y box mb-5 px-5 ">
          <div className="flex justify-end ">
            <div className="mr-2 py-3 "></div>
          </div>

          <div className="-mx-5 flex flex-col border-b border-slate-200/60 pb-5 dark:border-darkmode-400 lg:flex-row">
            <div className="flex flex-1 items-center justify-center px-5 lg:justify-start">
              <div className="image-fit relative h-20 w-20 flex-none sm:h-24 sm:w-24 lg:h-32 lg:w-32">
                <img
                  alt="Midone Tailwind HTML Admin Template"
                  className="rounded-full"
                  src={PreviewImage}
                />
              </div>
              <div className="ml-5">
                <div className="w-24 truncate text-lg font-medium sm:w-40 sm:whitespace-normal">
                  Kasun Wakwella
                </div>
                <div className="text-slate-500">Supplier</div>
                <div className="py-2">
                  {' '}
                  <Button variant="primary" className="" size="sm" onClick={(event: React.MouseEvent) => {
                      event.preventDefault()
                      setDueButtonModalPreview(true)
                    }}>
                    <Lucide icon="DollarSign" className="mr-1 h-3 w-3" /> Pay
                    Due Amount
                  </Button>
                  <Dialog
                  size="xl"
                  open={buttonDueModalPreview}
                  onClose={() => {
                    setDueButtonModalPreview(false)
                  }}
                >
                  <Dialog.Panel className="max-h-screen overflow-y-auto">
                    <Dialog.Title>
                      <h2 className="mr-auto text-base font-medium">{`${t(
                        'contactManagement.fields.suppliers.fields.viewSuppliers.fields.addPay.title'
                      )}`}</h2>
                    </Dialog.Title>
                    <a
                      onClick={(event: React.MouseEvent) => {
                        event.preventDefault()
                        setDueButtonModalPreview(false)
                      }}
                      className="absolute right-0 top-0 mr-3 mt-3"
                      href="#"
                    >
                      <Lucide icon="X" className="h-8 w-8 text-slate-400" />
                    </a>

                    <Dialog.Description className="grid gap-7 md:grid-cols-2">
                    <SelectElement
            label={`${t(
              'contactManagement.fields.suppliers.fields.viewSuppliers.fields.addPay.fields.amount.label'
            )}`}
            register={register}
            name="amount"
            id="amount"
            required
            error={errors.amount}
          />
          <DateElement
            label={`${t(
              'contactManagement.fields.suppliers.fields.viewSuppliers.fields.addPay.fields.paidOn.label'
            )}`}
            value={date}
            onChange={setDate}
            options={{
              autoApply: false,
              showWeekNumbers: true,
              dropdowns: {
                minYear: 1990,
                maxYear: null,
                months: true,
                years: true,
              },
            }}
            name="date_of_birth"
            id="date_of_birth"
            error={errors.date_of_birth}
            required
          />
          <SelectElement
            label={`${t(
              'contactManagement.fields.suppliers.fields.viewSuppliers.fields.addPay.fields.paymentMethod.label'
            )}`}
            register={register}
            options={options}
            name="paymentMethod"
            id="paymentMethod"
            required
            error={errors.paymentMethod}
          />
          <UploadFilesElement
            id="attach_document"
            name="attach_document"
            register={register}
            label={`${t(
              'contactManagement.fields.suppliers.fields.viewSuppliers.fields.addPay.fields.attachDocument.label'
            )}`}
            variant="primary"
            btnLabel={`${t(
              'contactManagement.fields.suppliers.fields.viewSuppliers.fields.addPay.fields.attachDocument.placeolder'
            )}`}
            error={errors.attach_document}
            info={`${t(
              'contactManagement.fields.suppliers.fields.viewSuppliers.fields.addPay.fields.attachDocument.tooltip'
            )}`}
          />
          {selectedOption === 'Card' && (
            <>
              <InputElement
                label={`${t(
                  'contactManagement.fields.suppliers.fields.viewSuppliers.fields.addPay.fields.cardNumber.label'
                )}`}
                register={register}
                name="cardNumber"
                placeholder={`${t(
                  'contactManagement.fields.suppliers.fields.viewSuppliers.fields.addPay.fields.cardNumber.placeolder'
                )}`}
                id="cardNumber"
              />
              <InputElement
                label={`${t(
                  'contactManagement.fields.suppliers.fields.viewSuppliers.fields.addPay.fields.cardHolderName.label'
                )}`}
                register={register}
                name="cardHolderName"
                placeholder={`${t(
                  'contactManagement.fields.suppliers.fields.viewSuppliers.fields.addPay.fields.cardHolderName.placeolder'
                )}`}
                id="cardHolderName"
              />
              <InputElement
                label={`${t(
                  'contactManagement.fields.suppliers.fields.viewSuppliers.fields.addPay.fields.cardTransactionNo.label'
                )}`}
                register={register}
                name="cardTransactionNo"
                placeholder={`${t(
                  'contactManagement.fields.suppliers.fields.viewSuppliers.fields.addPay.fields.cardTransactionNo.placeolder'
                )}`}
                id="cardTransactionNo"
              />
              <InputElement
                label={`${t(
                  'contactManagement.fields.suppliers.fields.viewSuppliers.fields.addPay.fields.cardType.label'
                )}`}
                register={register}
                name="cardType"
                placeholder={`${t(
                  'contactManagement.fields.suppliers.fields.viewSuppliers.fields.addPay.fields.cardType.placeolder'
                )}`}
                id="cardType"
              />
              <InputElement
                label={`${t(
                  'contactManagement.fields.suppliers.fields.viewSuppliers.fields.addPay.fields.month.label'
                )}`}
                register={register}
                name="month"
                placeholder={`${t(
                  'contactManagement.fields.suppliers.fields.viewSuppliers.fields.addPay.fields.month.placeolder'
                )}`}
                id="month"
              />
              <InputElement
                label={`${t(
                  'contactManagement.fields.suppliers.fields.viewSuppliers.fields.addPay.fields.year.label'
                )}`}
                register={register}
                name="year"
                placeholder={`${t(
                  'contactManagement.fields.suppliers.fields.viewSuppliers.fields.addPay.fields.year.placeolder'
                )}`}
                id="year"
              />
              <InputElement
                label={`${t(
                  'contactManagement.fields.suppliers.fields.viewSuppliers.fields.addPay.fields.securityCode.label'
                )}`}
                register={register}
                name="securityCode"
                placeholder={`${t(
                  'contactManagement.fields.suppliers.fields.viewSuppliers.fields.addPay.fields.securityCode.placeolder'
                )}`}
                id="securityCode"
              />
            </>
          )}
          {selectedOption === 'Bank Transfer' && (
            <InputElement
              label={`${t(
                'contactManagement.fields.suppliers.fields.viewSuppliers.fields.addPay.fields.bankTransfer.label'
              )}`}
              register={register}
              name="bankTransfer"
              placeholder={`${t(
                'contactManagement.fields.suppliers.fields.viewSuppliers.fields.addPay.fields.bankTransfer.placeolder'
              )}`}
              id="bankTransfer"
            />
          )}
           {selectedOption === 'Other Payments' && (
            <InputElement
              label={`${t(
                'contactManagement.fields.suppliers.fields.viewSuppliers.fields.addPay.fields.transactionNo.label'
              )}`}
              register={register}
              name="transactionNo"
              placeholder={`${t(
                'contactManagement.fields.suppliers.fields.viewSuppliers.fields.addPay.fields.transactionNo.placeolder'
              )}`}
              id="transactionNo"
            />
          )}
          {selectedOption === 'Cheque' && (
            <InputElement
              label={`${t(
                'contactManagement.fields.suppliers.fields.viewSuppliers.fields.addPay.fields.chequeNo.label'
              )}`}
              register={register}
              name="chequeNo"
              placeholder={`${t(
                'contactManagement.fields.suppliers.fields.viewSuppliers.fields.addPay.fields.chequeNo.placeolder'
              )}`}
              id="chequeNo"
            />
          )}
          <TextareaElement
            label={`${t(
              'contactManagement.fields.suppliers.fields.viewSuppliers.fields.addPay.fields.paymentNotes.label'
            )}`}
            register={register}
            name="paymentNotes"
            id="paymentNotes"
            placeholder={`${t(
              'contactManagement.fields.suppliers.fields.viewSuppliers.fields.addPay.fields.paymentNotes.placeolder'
            )}`}
          />

                    </Dialog.Description>

                    <div className="flex justify-end px-3 pb-4 text-center">
                      <Button
                        type="submit"
                        variant="primary"
                        className="mb-2 mr-1 w-24"
                        
                      >
                        {`${t('common.button.save')}`}
                        {isLoading ? (
                          <LoadingIcon
                            icon="oval"
                            color="white"
                            className="ml-2 h-4 w-4"
                          />
                        ) : (
                          ''
                        )}
                      </Button>
                 <Button type="button" variant="outline-secondary" onClick={()=> {
                setDueButtonModalPreview(false);
                }}
                className="mb-2 mr-1 w-24"
                >
                Cancel
            </Button>
                    </div>
                  </Dialog.Panel>
                </Dialog>
                </div>
              </div>
            </div>
            <div className="mt-6 flex-1 border-l border-r border-t border-slate-200/60 px-5 pt-5 dark:border-darkmode-400 lg:mt-0 lg:border-t-0 lg:pt-0">
              <div className="flex text-center lg:mt-6 lg:text-left ">
                <div className="flex flex-wrap items-start">
                  <div className="mr-1 flex items-center truncate font-medium sm:w-auto">
                    Business Name {' : '}
                  </div>
                  <div className=" sm:whitespace-normal">Lizas Closet</div>
                </div>
              </div>
              <div className="flex text-center lg:mt-3 lg:text-left">
                <div className="flex flex-wrap items-start">
                  <div className="mr-1 flex items-center truncate font-medium">
                    Mobile {' : '}
                  </div>
                  <div
                    className="sm:whitespace-normal"
                    style={{ maxWidth: '200px', wordWrap: 'break-word' }}
                  >
                    0713 456 7889
                  </div>
                </div>
              </div>
              <div className="flex text-center lg:mt-3 lg:text-left">
                <div className="flex flex-wrap items-start ">
                  <div className="mr-1 flex items-center truncate font-medium">
                    Tax Number {' : '}
                  </div>
                  <div
                    className="sm:whitespace-normal"
                    style={{ maxWidth: '300px', wordWrap: 'break-word' }}
                  >
                    132442
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 flex-1 border-l border-r border-t border-slate-200/60 px-5 pt-5 dark:border-darkmode-400 lg:mt-0 lg:border-t-0 lg:pt-0">
              <div className="text-center font-medium lg:mt-6 lg:text-left">
                Address {' : '}
              </div>
              <div
                className="mt-3 items-center truncate sm:whitespace-normal"
                style={{ maxWidth: '300px', wordWrap: 'break-word' }}
              >
                No 6. Boralasgamuwa, Nittambuwa, Bambalapitiya, Pannipitya,
                Homagama we
              </div>
            </div>
          </div>
          <Tab.List
            variant="link-tabs"
            className="flex-col justify-center text-center sm:flex-row lg:justify-start"
          >
            <Tab fullWidth={false}>
              <Tab.Button className="mr-2 flex cursor-pointer items-center py-4">
                Ledger
              </Tab.Button>
            </Tab>
            <Tab fullWidth={false}>
              <Tab.Button className="mr-2 flex cursor-pointer items-center py-4">
                Purchases
              </Tab.Button>
            </Tab>
            <Tab fullWidth={false}>
              <Tab.Button className="mr-2 flex cursor-pointer items-center py-4">
                Stock Reports
              </Tab.Button>
            </Tab>
            <Tab fullWidth={false}>
              <Tab.Button className="mr-2 flex cursor-pointer items-center py-4">
                Documents & Notes
              </Tab.Button>
            </Tab>
            <Tab fullWidth={false}>
              <Tab.Button className="mr-2 flex cursor-pointer items-center py-4">
                Payments
              </Tab.Button>
            </Tab>
            <Tab fullWidth={false}>
              <Tab.Button className="mr-2 flex cursor-pointer items-center py-4">
                {/* <Lucide icon="FileText" className="mr-2 h-4 w-4" /> */}
                Contact Person
              </Tab.Button>
            </Tab>
          </Tab.List>
        </div>
        <Tab.Panels className="mt-5">
          <Tab.Panel>
            <div className="intro-y mb-5 border-b border-slate-200 px-3  dark:border-darkmode-400">
              <div className=" intro-y flex flex-col items-center sm:flex-row">
                <div className="mr-auto  sm:px-2 ">
                <div className="flex items-center text-left mb-5">
                    <span>
                      {`${t(
                        'contactManagement.fields.suppliers.fields.viewSuppliers.fields.dateRange.label'
                      )}`}{' '}
                      :
                    </span>
                    <div  className="relative mt-3 text-slate-500 sm:ml-auto sm:mt-0 ">
                      <Lucide
                        icon="Calendar"
                        className="absolute inset-y-0 left-0 z-10 my-auto ml-4 h-4 w-4"
                      />
                      <Litepicker
                        value={daterange}
                        onChange={setDaterange}
                        options={{
                          autoApply: false,
                          singleMode: false,
                          numberOfColumns: 2,
                          numberOfMonths: 2,
                          showWeekNumbers: true,
                          dropdowns: {
                            minYear: 1990,
                            maxYear: null,
                            months: true,
                            years: true,
                          },
                        }}
                        className="box ml-2 pl-10 sm:w-60 "
                      />
                    </div>
                  </div>
                </div>
                <div className="flex w-full sm:mt-0 sm:w-auto sm:px-4">
                  <div className=" font-medium"></div>
                  <Button variant="facebook" className="mb-2 ml-3 mr-2">
                    {' '}
                    {/* Add ml-3 class for left margin */}
                    <Lucide icon="FileText" className="h-5 w-5" />
                  </Button>
                  <Button variant="linkedin" className="mb-2 mr-1">
                    <Lucide icon="Mail" className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex flex-col border-b pt-10 text-center px-5 sm:pt-10 sm:text-left lg:flex-row lg:pb-6">
              <div>
                <div className="text-lg font-medium text-primary">To :</div>
                <div className="mt-1">Mrs. Kasuni Bandara</div>
                <div className="mt-1">Mobile : 071567 8907</div>
              </div>
              <div className="mt-20 lg:ml-auto lg:mt-0 lg:text-right">
                <div className="text-base font-medium text-slate-500">
                  Bunny store
                </div>
                <div className="mt-1">No 19</div>
                <div className="mt-1"style={{
                      maxWidth: '220px',
                      wordWrap: 'break-word',
                    }}>Nugegoda, Sri Lanka</div>
              </div>
            </div>
            <div className="flex flex-col border-b px-5 pb-10 pt-10 text-center  sm:pb-10 sm:text-left lg:flex-row">
              <div>
                <div className="text-xl font-medium text-primary">
                  Account Summary
                </div>
                <div className="mt-1">Jan 02, 2023 to Jul 02, 2023</div>
              </div>
              <div className="mt-20 lg:ml-auto lg:mt-0 lg:text-right">
                <Table>
                  <Table.Tbody>
                    <Table.Tr>
                      <Table.Td className="border-b dark:border-darkmode-400">
                        <div className=" whitespace-nowrap">
                          Opening Balance
                        </div>
                      </Table.Td>
                      <Table.Td className="w-48 border-b text-right dark:border-darkmode-400"style={{
                      maxWidth: '220px',
                      wordWrap: 'break-word',
                    }}>
                        Rs. 100,000.00
                      </Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                      <Table.Td className="border-b dark:border-darkmode-400">
                        <div className=" whitespace-nowrap">Total Purchase</div>
                      </Table.Td>
                      <Table.Td className="w-32 border-b text-right dark:border-darkmode-400"style={{
                      maxWidth: '220px',
                      wordWrap: 'break-word',
                    }}>
                        Rs. 100,000,000.00
                      </Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                      <Table.Td className="border-b dark:border-darkmode-400">
                        <div className=" whitespace-nowrap">Total Paid</div>
                      </Table.Td>
                      <Table.Td className="w-32 border-b text-right dark:border-darkmode-400"style={{
                      maxWidth: '220px',
                      wordWrap: 'break-word',
                    }}>
                        Rs. 100,000.00
                      </Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                      <Table.Td className="border-b dark:border-darkmode-400">
                        <div className=" whitespace-nowrap">
                          Advance Balance
                        </div>
                      </Table.Td>
                      <Table.Td className="ml-1 w-48 border-b text-right dark:border-darkmode-400"style={{
                      maxWidth: '220px',
                      wordWrap: 'break-word',
                    }}>
                        Rs. 100,000.00
                      </Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                      <Table.Td className="border-b dark:border-darkmode-400">
                        <div className=" whitespace-nowrap">
                          Exchange Balance
                        </div>
                      </Table.Td>
                      <Table.Td className="w-48 border-b text-right dark:border-darkmode-400"style={{
                      maxWidth: '220px',
                      wordWrap: 'break-word',
                    }}>
                        Rs. 100,000.00
                      </Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                      <Table.Td className="border-b dark:border-darkmode-400">
                        <div className="whitespace-nowrap font-medium">
                          Balance Due
                        </div>
                      </Table.Td>
                      <Table.Td className="w-48 border-b text-right dark:border-darkmode-400"style={{
                      maxWidth: '220px',
                      wordWrap: 'break-word',
                    }}>
                        Rs. 9,100,000.00
                      </Table.Td>
                    </Table.Tr>
                  </Table.Tbody>
                </Table>
              </div>
            </div>
            <div className=" py-5 lg:ml-auto lg:mt-0 lg:text-center">
              <div className="text-lg font-medium ">
                Showing All Invoices and Payments Between
              </div>
              <div className="mt-1">Jan 02, 2023 to Jul 02, 2023</div>
            </div>

            <div className=" sm:px-5 sm:py-6">
            <VariationTableLedger register={register} />
            </div>
          </Tab.Panel>
          {/* Purchases */}
          <Tab.Panel>
            <div className="intro-y  mb-5 mt-5 px-5  ">
              <div className="intro-y mt-4 flex flex-col  items-center sm:flex-row">
              <div className="flex items-center text-left">
                    <span>
                      {`${t(
                        'contactManagement.fields.suppliers.fields.viewSuppliers.fields.dateRange.label'
                      )}`}{' '}
                      :
                    </span>
                    <div  className="relative mt-3 text-slate-500 sm:ml-auto sm:mt-0 ">
                      <Lucide
                        icon="Calendar"
                        className="absolute inset-y-0 left-0 z-10 my-auto ml-4 h-4 w-4"
                      />
                      <Litepicker
                        value={daterange}
                        onChange={setDaterange}
                        options={{
                          autoApply: false,
                          singleMode: false,
                          numberOfColumns: 2,
                          numberOfMonths: 2,
                          showWeekNumbers: true,
                          dropdowns: {
                            minYear: 1990,
                            maxYear: null,
                            months: true,
                            years: true,
                          },
                        }}
                        className="box ml-2 pl-10 sm:w-60 "
                      />
                    </div>
                  </div>
              </div>
              <div className=' mb-5 mt-5 border-slate-200 border-b dark:border-darkmode-400'/>
              <div className="mt- intro-y flex flex-col items-center sm:flex-row xl:mt-4">
                <div className="items-center sm:mr-4 sm:flex ">
                  Page Size
                  <FormSelect className=" w-15 dark:[0px_0px_0px_2px_#3f4865,_1px_1px_5px_rgba(0,0,0,0.32)]  m-2">
                    <option>10</option>
                    <option>25</option>
                    <option>50</option>
                    <option>100</option>
                  </FormSelect>
                </div>

                <div className="mx-auto items-center  md:flex">
                  <Menu>
                    <Menu.Button
                      as={Button}
                      variant="facebook"
                      className="flex items-center "
                    >
                      Export As{' '}
                      <Lucide icon="ChevronDown" className="ml-2 h-4 w-4" />
                    </Menu.Button>
                    <Menu.Items className="w-40">
                      <Menu.Item>
                        <Lucide icon="FileText" className="mr-2 h-4 w-4" /> As
                        Excel
                      </Menu.Item>
                      <Menu.Item>
                        <Lucide icon="FileText" className="mr-2 h-4 w-4" />{' '}
                        Print
                      </Menu.Item>
                      <Menu.Item>
                        <Lucide icon="FileText" className="mr-2 h-4 w-4" />{' '}
                        Export to PDF
                      </Menu.Item>
                    </Menu.Items>
                  </Menu>
                </div>

                <div className="relative ml-2 mr-2 flex sm:mt-0 sm:w-auto">
                  <FormInput
                    type="text"
                    className="box custom-input"
                    placeholder="Search here"
                  />
                  <Lucide
                    icon="Search"
                    className="absolute inset-y-0 right-0 my-auto mr-2 h-5 w-8"
                  />
                </div>
              </div>
              {/* <VariationTableElement register={register} /> */}
              <div className=" py-3" style={{ overflowY: 'auto' }}>
                <VariationTablePurchase register={register} />
              </div>

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
          </Tab.Panel>
          {/* StockReport */}
          <Tab.Panel>
            <div className="intro-y  mb-5 mt-5 px-5  ">
              <div className="intro-y mt-4 flex flex-col items-center sm:flex-row">
                <div className="flex items-center text-left">
                  <span>
                    {`${t(
                      'contactManagement.fields.suppliers.fields.viewSuppliers.fields.businessLocation.label'
                    )}`}{' '}
                    :
                  </span>
                  <div className="relative ml-3 text-slate-500 sm:ml-3  ">
                    <TomSelect
                      id="update-profile-form-2"
                      value={select}
                      onChange={setSelect}
                      className="w-60 bg-secondary"
                    >
                      <option value="1">All Locations</option>
                      <option value="2">Bunny Stores</option>
                      <option value="3">Kandy</option>
                    </TomSelect>
                  </div>{' '}
                </div>
              </div>
              <div className=' mb-5 mt-5 border-slate-200 border-b dark:border-darkmode-400'/>
              <div className=" intro-y flex flex-col items-center sm:flex-row xl:mt-4">
                <div className=" items-center sm:mr-4 sm:flex ">
                  Page Size
                  <FormSelect className=" w-15 dark:[0px_0px_0px_2px_#3f4865,_1px_1px_5px_rgba(0,0,0,0.32)]  m-2">
                    <option>10</option>
                    <option>25</option>
                    <option>50</option>
                    <option>100</option>
                  </FormSelect>
                </div>

                <div className="mx-auto items-center  md:flex">
                  <Menu>
                    <Menu.Button
                      as={Button}
                      variant="facebook"
                      className="flex items-center "
                    >
                      Export As{' '}
                      <Lucide icon="ChevronDown" className="ml-2 h-4 w-4" />
                    </Menu.Button>
                    <Menu.Items className="w-40">
                      <Menu.Item>
                        <Lucide icon="FileText" className="mr-2 h-4 w-4" /> As
                        Excel
                      </Menu.Item>
                      <Menu.Item>
                        <Lucide icon="FileText" className="mr-2 h-4 w-4" />{' '}
                        Print
                      </Menu.Item>
                      <Menu.Item>
                        <Lucide icon="FileText" className="mr-2 h-4 w-4" />{' '}
                        Export to PDF
                      </Menu.Item>
                    </Menu.Items>
                  </Menu>
                </div>

                <div className="relative ml-2 mr-2 flex sm:mt-0 sm:w-auto">
                  <FormInput
                    type="text"
                    className="box custom-input"
                    placeholder="Search here"
                  />
                  <Lucide
                    icon="Search"
                    className="absolute inset-y-0 right-0 my-auto mr-2 h-5 w-8"
                  />
                </div>
              </div>
              {/* <VariationTableElement register={register} /> */}
              <div className="  py-3" style={{ overflowY: 'auto' }}>
                <VariationTableElementStockReport register={register} />
              </div>

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
          </Tab.Panel>
          {/* Docs */}
          <Tab.Panel>
            <div className="intro-y  mb-5 mt-5 px-5  ">
              
              <div className="mt- intro-y flex flex-col items-center sm:flex-row ">
                <div className="items-center sm:mr-4 sm:flex ">
                  Page Size
                  <FormSelect className=" w-15 dark:[0px_0px_0px_2px_#3f4865,_1px_1px_5px_rgba(0,0,0,0.32)]  m-2">
                    <option>10</option>
                    <option>25</option>
                    <option>50</option>
                    <option>100</option>
                  </FormSelect>
                </div>

                <div className="mx-auto items-center md:flex">
                  <Button
                    className="mr-2 flex items-center"
                  >
                    <Lucide icon="Eye" className="mr-2 h-4 w-4" /> Column
                    Visibility
                  </Button>

                  <Menu>
                    <Menu.Button
                      as={Button}

                      className="flex items-center"

                    >
                      Export As{' '}
                      <Lucide icon="ChevronDown" className="ml-2 h-4 w-4" />
                    </Menu.Button>
                    <Menu.Items className="w-40">
                      <Menu.Item>
                        <Lucide icon="FileText" className="mr-2 h-4 w-4" /> As
                        CSV
                      </Menu.Item>
                      <Menu.Item>
                        <Lucide icon="FileText" className="mr-2 h-4 w-4" /> As
                        Excel
                      </Menu.Item>
                      <Menu.Item>
                        <Lucide icon="FileText" className="mr-2 h-4 w-4" />{' '}
                        Print
                      </Menu.Item>
                      <Menu.Item>
                        <Lucide icon="FileText" className="mr-2 h-4 w-4" />{' '}
                        Export to PDF
                      </Menu.Item>
                    </Menu.Items>
                  </Menu>
                  
                </div>

                <div className="relative ml-2 mr-2 flex sm:mt-0 sm:w-auto">
                  <FormInput
                    type="text"
                    className="box custom-input"
                    placeholder="Search here"
                  />
                  <Lucide
                    icon="Search"
                    className="absolute inset-y-0 right-0 my-auto mr-2 h-5 w-8"
                  />
                  
                </div>
                <Button
                    variant="primary"
                    className="mr-2 shadow-md sm:w-auto"
                    onClick={(event: React.MouseEvent) => {
                      event.preventDefault()
                      setButtonModalPreview(true)
                    }}
                  >
                    Add Note
                  </Button>
              </div>
              {/* <VariationTableElement register={register} /> */}
              <div className=" py-3" style={{ overflowY: 'auto' }}>
                <VariationTableElementDocs register={register} />
              </div>
              <Dialog
                    size="xl"
                    open={buttonModalPreview}
                    onClose={() => {
                      setButtonModalPreview(false)
                    }}
                  >
                    <Dialog.Panel className="max-h-screen overflow-y-auto">
                    <Dialog.Title>
                  <h2 className="mr-auto text-base font-medium">{`${t(
                    'Add Note'
                  )}`}</h2>
                </Dialog.Title>
                      <a
                        onClick={(event: React.MouseEvent) => {
                          event.preventDefault()
                          setButtonModalPreview(false)
                        }}
                        className="absolute right-0 top-0 mr-3 mt-3"
                        href="#"
                      >
                        <Lucide icon="X" className="h-8 w-8 text-slate-400" />
                      </a>
                      <div className="px-3 text-center font-medium mb-5">
                       
                        <div className="overflow-x-auto p-3">
                          <div className="grid grid-cols-1 gap-7 md:grid-cols-1">
                            <InputElement
                              label={`${t(
                                'contactManagement.fields.suppliers.fields.viewSuppliers.fields.viewNotes.fields.heading.label'
                              )}`}
                              register={register}
                              name="heading"
                              id="heading"
                              error={errors.heading}
                              type="text"
                              required
                            />
                            <div className="pt-2">
                              <ClassicEditorElement
                                id="description"
                                name="description"
                                label={`${t(
                                  'contactManagement.fields.suppliers.fields.viewSuppliers.fields.viewNotes.fields.description.label'
                                )}`}
                                register={register}
                                value={editorDataDescription}
                              />
                            </div>
                            <UploadFilesElement
                              id="attach_document"
                              name="attach_document"
                              register={register}
                              label={`${t(
                                'contactManagement.fields.suppliers.fields.viewSuppliers.fields.viewNotes.fields.documents.label'
                              )}`}
                              variant="primary"
                              btnLabel={`${t(
                                'contactManagement.fields.suppliers.fields.viewSuppliers.fields.viewNotes.fields.documents.btnPlaceolder'
                              )}`}
                            />

                            <FormCheck className="">
                              <div className="mr-2 font-medium">{`${t(
                                'contactManagement.fields.suppliers.fields.viewSuppliers.fields.viewNotes.fields.activeStatus.label'
                              )}`}</div>

                              <FormCheck.Input
                                id="vertical-form-3"
                                type="checkbox"
                                value=""
                                onChange={handleChange}
                              />
                              <FormCheck.Label
                                className="mr-2"
                                htmlFor="vertical-form-3"
                              >
                                <div className="mx-1 -ml-1 flex">
                                  <FormInfo
                                    tooltip={`${t(
                                      'contactManagement.fields.suppliers.fields.viewSuppliers.fields.viewNotes.fields.activeStatus.tooltip'
                                    )}`}
                                  />
                                </div>
                              </FormCheck.Label>
                            </FormCheck>
                          </div>
                        </div>
                        <div className="flex justify-end px-3 pb-4 text-center">
                          <Button
                            type="submit"
                            variant="primary"
                            className="mb-2 mr-1 w-24"
                          >
                            {`${t('common.button.save')}`}
                            {isLoading ? (
                              <LoadingIcon
                                icon="oval"
                                color="white"
                                className="ml-2 h-4 w-4"
                              />
                            ) : (
                              ''
                            )}
                          </Button>
                          <Button
                    type="button"
                    variant="outline-secondary"
                    onClick={() => {
                      setButtonModalPreview(false)
                    }}
                    className="mb-2 mr-1 w-24"
                  >
                    Cancel
                  </Button>
                        </div>
                      </div>
                    </Dialog.Panel>
                  </Dialog>
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
          </Tab.Panel>
          {/* Pay */}
          <Tab.Panel>
            <div className="intro-y  mb-5 mt-5 px-5  ">
              <div className="flex-col items-start pt-2 first:mt-0 first:pt-0 xl:flex-row">
                <div className="mt-4 flex w-full justify-end sm:mt-0 sm:w-auto"></div>
                <VariationTableElementPay register={register} />
                <div className="intro-y col-span-10 mt-5 flex flex-wrap items-center sm:flex-row sm:flex-nowrap ">
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
                  </div>{' '}
                </div>{' '}
              </div>
            </div>
          </Tab.Panel>

          {/* Contact */}

          <Tab.Panel>
            <div className="intro-y  mb-5 mt-5 px-5  ">
              <div className="mt- intro-y flex flex-col items-center sm:flex-row xl:mt-4">
                <div className=" items-center sm:mr-4 sm:flex ">
                  Page Size
                  <FormSelect className=" w-15 dark:[0px_0px_0px_2px_#3f4865,_1px_1px_5px_rgba(0,0,0,0.32)]  m-2">
                    <option>10</option>
                    <option>25</option>
                    <option>50</option>
                    <option>100</option>
                  </FormSelect>
                </div>

                <div className="mx-auto items-center md:flex">
                  <Button
                  
                    className="mr-2 flex items-center"

                  >
                    <Lucide icon="Eye" className="mr-2 h-4 w-4" /> Column
                    Visibility
                  </Button>

                  <Menu>
                    <Menu.Button
                      as={Button}
                      variant="facebook"
                      className="flex items-center"
                      size="sm"
                    >
                      Export As{' '}
                      <Lucide icon="ChevronDown" className="ml-2 h-4 w-4" />
                    </Menu.Button>
                    <Menu.Items className="w-40">
                      <Menu.Item>
                        <Lucide icon="FileText" className="mr-2 h-4 w-4" /> As
                        CSV
                      </Menu.Item>
                      <Menu.Item>
                        <Lucide icon="FileText" className="mr-2 h-4 w-4" /> As
                        Excel
                      </Menu.Item>
                      <Menu.Item>
                        <Lucide icon="FileText" className="mr-2 h-4 w-4" />{' '}
                        Print
                      </Menu.Item>
                      <Menu.Item>
                        <Lucide icon="FileText" className="mr-2 h-4 w-4" />{' '}
                        Export to PDF
                      </Menu.Item>
                    </Menu.Items>
                  </Menu>
                </div>

                <div className="relative ml-2 mr-2 flex sm:mt-0 sm:w-auto">
                  <FormInput
                    type="text"
                    className="box custom-input"
                    placeholder="Search here"
                  />
                  <Lucide
                    icon="Search"
                    className="absolute inset-y-0 right-0 my-auto mr-2 h-5 w-8"
                  />
                </div>
                <Button
                  variant="primary"
                  className=" shadow-md sm:w-auto"
                  onClick={(event: React.MouseEvent) => {
                    event.preventDefault()
                    setContactButtonModalPreview(true)
                  }}
                >
                  Add Login
                </Button>
                <Dialog
                  size="xl"
                  open={buttonContactModalPreview}
                  onClose={() => {
                    setContactButtonModalPreview(false)
                  }}
                >
                  <Dialog.Panel className="max-h-screen overflow-y-auto">
                    <Dialog.Title>
                      <h2 className="mr-auto text-base font-medium">{`${t(
                        'contactManagement.fields.suppliers.fields.viewSuppliers.fields.addLogin.title'
                      )}`}</h2>
                    </Dialog.Title>
                    <a
                      onClick={(event: React.MouseEvent) => {
                        event.preventDefault()
                        setContactButtonModalPreview(false)
                      }}
                      className="absolute right-0 top-0 mr-3 mt-3"
                      href="#"
                    >
                      <Lucide icon="X" className="h-8 w-8 text-slate-400" />
                    </a>

                    <Dialog.Description className="grid gap-7 md:grid-cols-2">
                      <InputElement
                        label={`${t(
                          'contactManagement.fields.suppliers.fields.viewSuppliers.fields.addLogin.fields.prefix.label'
                        )}`}
                        register={register}
                        name="prefix"
                        id="prefix"
                      />
                      <InputElement
                        label={`${t(
                          'contactManagement.fields.suppliers.fields.viewSuppliers.fields.addLogin.fields.firstName.label'
                        )}`}
                        register={register}
                        name="firstName"
                        id="firstName"
                        required
                        error={errors.firstName}
                      />
                      <InputElement
                        label={`${t(
                          'contactManagement.fields.suppliers.fields.viewSuppliers.fields.addLogin.fields.lastName.label'
                        )}`}
                        register={register}
                        name="lastName"
                        id="lastName"
                      />
                      <InputElement
                        label={`${t(
                          'contactManagement.fields.suppliers.fields.viewSuppliers.fields.addLogin.fields.email.label'
                        )}`}
                        register={register}
                        name="email"
                        id="email"
                        required
                        error={errors.email}
                      />
                      <InputElement
                        label={`${t(
                          'contactManagement.fields.suppliers.fields.viewSuppliers.fields.addLogin.fields.contactNo.label'
                        )}`}
                        register={register}
                        name="contactNo"
                        id="contactNo"
                      />
                      <InputElement
                        label={`${t(
                          'contactManagement.fields.suppliers.fields.viewSuppliers.fields.addLogin.fields.alternateContactNumber.label'
                        )}`}
                        register={register}
                        name="alternateContactNumber"
                        id="alternateContactNumber"
                      />
                      <InputElement
                        label={`${t(
                          'contactManagement.fields.suppliers.fields.viewSuppliers.fields.addLogin.fields.langContactNumber.label'
                        )}`}
                        register={register}
                        name="langContactNumber"
                        id="langContactNumber"
                      />
                      <InputElement
                        label={`${t(
                          'contactManagement.fields.suppliers.fields.viewSuppliers.fields.addLogin.fields.langDepartment.label'
                        )}`}
                        register={register}
                        name="langDepartment"
                        id="langDepartment"
                      />
                      <InputElement
                        label={`${t(
                          'contactManagement.fields.suppliers.fields.viewSuppliers.fields.addLogin.fields.langDesignation.label'
                        )}`}
                        register={register}
                        name="langDesignation"
                        id="langDesignation"
                      />
                      <InputElement
                        label={`${t(
                          'contactManagement.fields.suppliers.fields.viewSuppliers.fields.addLogin.fields.username.label'
                        )}`}
                        register={register}
                        name="username"
                        id="username"
                        required
                        error={errors.username}
                      />
                      <InputElement
                        label={`${t(
                          'contactManagement.fields.suppliers.fields.viewSuppliers.fields.addLogin.fields.password.label'
                        )}`}
                        register={register}
                        name="password"
                        id="password"
                        required
                        error={errors.password}
                      />
                      <InputElement
                        label={`${t(
                          'contactManagement.fields.suppliers.fields.viewSuppliers.fields.addLogin.fields.confirmPassword.label'
                        )}`}
                        register={register}
                        name="confirmPassword"
                        id="confirmPassword"
                        required
                        error={errors.confirmPassword}
                      />
                                    <FormCheck className="">
                              <div className="mr-2 font-medium">{`${t(
                                'contactManagement.fields.suppliers.fields.viewSuppliers.fields.addLogin.fields.isActive.label'
                              )}`}</div>

                              <FormCheck.Input
                                id="vertical-form-3"
                                type="checkbox"
                                value=""
                                onChange={handleChange}
                              />
                              <FormCheck.Label
                                className="mr-2"
                                htmlFor="vertical-form-3"
                              >
                                <div className="mx-1 -ml-1 flex">
                                  <FormInfo
                                    tooltip={`${t(
                                      'contactManagement.fields.suppliers.fields.viewSuppliers.fields.addLogin.fields.isActive.tooltip'
                                    )}`}
                                  />
                                </div>
                              </FormCheck.Label>
                            </FormCheck>
                    </Dialog.Description>

                    <div className="flex justify-end px-3 pb-4 text-center">
                      <Button
                        type="submit"
                        variant="primary"
                        className="mb-2 mr-1 w-24"
                        
                      >
                        {`${t('common.button.save')}`}
                        {isLoading ? (
                          <LoadingIcon
                            icon="oval"
                            color="white"
                            className="ml-2 h-4 w-4"
                          />
                        ) : (
                          ''
                        )}
                      </Button>
                 <Button type="button" variant="outline-secondary" onClick={()=> {
                setContactButtonModalPreview(false);
                }}
                className="mb-2 mr-1 w-24"
                >
                Cancel
            </Button>
                    </div>
                  </Dialog.Panel>
                </Dialog>
              </div>
              <div className="  py-3">
                <VariationTableElementContact register={register} />
              </div>

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
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </form>
  )
}

export default ViewSuppliers
