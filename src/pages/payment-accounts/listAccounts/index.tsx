/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable import/order */
/* eslint-disable react/no-unknown-property */
/* eslint-disable react/self-closing-comp */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import _ from 'lodash'
import Table from '../../../components/common/table'
import { SetStateAction, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import Button from '../../../components/common/button'
import Tippy from '../../../components/common/tippy'
import Lucide from '../../../components/common/lucide'
import {
  Menu,
  Tab,
  Dialog,
  Disclosure,
} from '../../../components/common/headless'
import Pagination from '../../../components/common/pagination'
import {
  FormInput,
  FormSelect,
  FormInfo,
  FormCheck,
  FormLabel,
  FormInline,
  InputGroup,
  Litepicker,
} from '../../../components/common/form-elements/components'
import {
  SearchSelectElement,
  DateElement,
  SelectElement,
  TextareaElement,
  InputElement,
} from '../../../components/common/form-elements'
import SharedDataContainer from '../../../containers/sharedData'
import ShortcutKey from '../../../components/common/shortcut-key'
import SlideoverPanel from '../../../components/slideover-panel'
import { useTranslation } from 'react-i18next'
import PreviewImage from '../../../assets/images/fakers/image2.jpg'
import { Icons, NotificationTypes } from '../../../constants'
import Alert from '../../../base-components/Alert'
import { AlignmentTypes } from '../../../constants/common-enums'
import LoadingIcon from '../../../components/common/loading-icon'
import clsx from 'clsx'
import ClassicEditorElement from '../../../components/common/form-elements/classic-editor-element'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import Toast from '../../../utils/notification'
import { PosApi } from '../../../api'
import TomSelect from '../../../components/common/tom-select'
import UploadFilesElement from '../../../components/common/form-elements/upload-files-element'

interface FormContent {
  title: string
  component: JSX.Element
}

interface Props {
  setSliderContent: React.Dispatch<React.SetStateAction<any>>
}

function Main() {
  const posApi = PosApi.useAPI()
  const { handleSlider } = SharedDataContainer.useContainer()
  // eslint-disable-next-line prettier/prettier
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [sliderSize, setSliderSize] = useState('xl')
  const { t } = useTranslation('pos')
  const schema = yup
    .object({
      accountNumber: yup
        .string()
        .required(
          `${t('paymentAccount.fields.accountNumber.validationMessage')}`
        ),
        name: yup
        .string()
        .required(
          `${t('paymentAccount.fields.name.validationMessage')}`
        ),
        amount: yup
        .string()
        .required(
          `${t('paymentAccount.fields.amount.validationMessage')}`
        ),
        date: yup
        .string()
        .required(
          `${t('paymentAccount.fields.date.validationMessage')}`
        ),
        paymentAccount: yup
        .string()
        .required(
          `${t('paymentAccount.fields.transferTo.validationMessage')}`
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
  const { setNotification } = SharedDataContainer.useContainer()

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
  const [date, setDate] = useState('')
  const [showMoreInfo, setShowMoreInfo] = useState(false)
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false)
  const deleteButtonRef = useRef(null)
  const [tokenModal, setTokenModal] = useState(false)
  const tokenModalRef = useRef(null)

  const [tooltipContent1] = useState(
    'Status which are not marked as completed will be displayed here.'
  )
  const [tooltipContent2] = useState(
    'Status which are marked as completed will be displayed here.'
  )

  const [discountPreview, setDiscountPreview] = useState(false)
  const [checked, setChecked] = useState(false)
  const [locationPreview, setLocationPreview] = useState(false)

  const handleChange = () => {
    setChecked(!checked)
  }
  const [accountPreview, setAccountPreview] = useState(false) 
  const [accountTypePreview,  setAccountTypePreview] = useState(false) 
  const [editAccountTypePreview,  setEditAccountTypePreview] = useState(false) 
  const [editAccountPreview, setEditAccountPreview] = useState(false) 
  const [depositPreview, setDepositPreview] = useState(false) 
  const [fundPreview, setFundPreview] = useState(false) 

  return (
    <div className="">
      <div className="intro-y mt-4 flex flex-col items-center sm:flex-row">
        <h2 className="ml-2 mr-auto text-lg font-medium">
          <h2 className="mr-auto  flex ">Payment Accounts</h2>
        </h2>
      </div>

      <Alert
        variant="danger"
        dismissible
        className="intro-y box col-span-11 mb-6 mt-5 dark:bg-danger dark:border-darkmode-600"
      >
        {({ dismiss }) => (
          <div className="flex items-center">
            <span>
              <Lucide icon="Info" className="mr-2 h-4 w-4" />
            </span>
            <span>
              Total 147 payments not linked with any account.
              <a
                 href="/payment-accounts/paymentAccountReport"
                className="ml-1 underline"
                target="blank"
              >
                View More
              </a>
            </span>
            <Alert.DismissButton
              className="text-white"
              onClick={dismiss}
              aria-label="Close"
            >
              <Lucide icon="X" className="h-4 w-4" />
            </Alert.DismissButton>
          </div>
        )}
      </Alert>

      <Tab.Group className="">
      <div className="flex justify-center mt-6 intro-y">
          <Tab.List
            variant="pills"
            className="w-auto mx-auto overflow-hidden rounded-full box"
          >
            <Tab>
              <Tab.Button
                className="w-32 py-2 rounded-none lg:w-64 lg:py-3"
                as="button"
              >
               Accounts
              </Tab.Button>
            </Tab>
            <Tab>
              <Tab.Button
                className="w-32 py-2 rounded-none lg:w-64 lg:py-3"
                as="button"
              >
               Account Type
              </Tab.Button>
            </Tab>
            
          </Tab.List>
        </div>

        <Tab.Panels className="pb-5">
          <Tab.Panel className="mt-5">

          <div className="intro-y mt-4 mb-5 flex flex-col items-center sm:flex-row">
           
            
           <h2 className="mr-auto w-56">
           <SelectElement
           
            required
            register={register}
            name="payment_method"
            id="payment_method"
            error={errors.payment_method}
          />
                         
                         </h2>
                         <div className="mt-4 flex w-full sm:mt-0 sm:w-auto">
                     <Button
                        as="a" variant="primary" href=" "
                       className="mr-2 shadow-md sm:w-auto"
                       onClick={(event: React.MouseEvent) => {
                        event.preventDefault()
                        setAccountPreview(true)
                      }}
                     >
                    Add Account
                     </Button>
           
                     <Button
                        as="a" variant="primary" href=" "
                        className="mr-2 shadow-md sm:w-auto"
                        onClick={(event: React.MouseEvent) => {
                          event.preventDefault()
                          setAccountPreview(true)
                        }}
                     >
                      
                       <span className="flex h-5 w-5 items-center justify-center">
                         <Lucide icon="Plus" className="h-4 w-4" />
                       </span>
                     </Button>
                       <Dialog
              size="lg"
              open={accountPreview}
              onClose={() => {
                setAccountPreview(false)
              }}
            >
              <Dialog.Panel className="max-h-screen overflow-y-auto">
                <Dialog.Title>
                  <h2 className="mr-auto text-base font-medium">{`${t(
                    'paymentAccount.fields.addAccounts.title'
                  )}`}</h2>
                </Dialog.Title>
                <a
                  onClick={() => {
                    setAccountPreview(false)
                  }}
                  className="absolute right-0 top-0 mr-3 mt-3"
                  href="#"
                >
                  <Lucide icon="X" className="h-8 w-8 text-slate-400" />
                </a>

                <Dialog.Description className="grid gap-7 md:grid-cols-1">
                  <InputElement
                    label={`${t(
                      'paymentAccount.fields.name.label'
                    )}`}
                    register={register}
                    required
                    error={errors.name}
                    name="name"
                    id="name"
                  />
                  
                  <InputElement
                    label={`${t(
                      'paymentAccount.fields.accountNumber.label'
                    )}`}
                    register={register}
                    name="accountNumber"
                    id="accountNumber"
                    required
                    error={errors.accountNumber}
                  />
         
       
          <SelectElement
                    label={`${t(
                      'paymentAccount.fields.accountType.label'
                    )}`}
                    register={register}
                    name="accountType"
                    id="accountType"
                  />
    <InputElement
                    label={`${t(
                      'paymentAccount.fields.openingBalance.label'
                    )}`}
                    register={register}
                    name="openingBalance"
                    id="openingBalance"
                    type="number"
                  />
       <TextareaElement
                    label={`${t(
                      'paymentAccount.fields.note.label'
                    )}`}
                    register={register}
                    name="note"
                    id="note"
                  />
       
                </Dialog.Description>

                <div className="flex justify-end px-4 pb-4 text-center mt-3 mb-3 ">
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
                      setAccountPreview(false)
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

            <div className="intro-y box mb-5 px-5 py-5">
              <div className="">
                <div className="mt- intro-y flex flex-col items-center sm:flex-row xl:mt-4">
                  <div className="mt-2 items-center sm:mr-4 sm:flex ">
                    Page Size
                    <FormSelect className=" w-15 dark:[0px_0px_0px_2px_#3f4865,_1px_1px_5px_rgba(0,0,0,0.32)]  m-2">
                      <option>10</option>
                      <option>25</option>
                      <option>50</option>
                      <option>100</option>
                    </FormSelect>
                  </div>

                  <div className="mx-auto items-center  md:flex">
                    <Button className="mr-2 flex items-center">
                      <Lucide icon="Eye" className="mr-2 h-4 w-4" /> Column
                      Visibility
                    </Button>

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

                  <div className="relative ml-2 mr-2 flex sm:mt-0 sm:w-72">
                    <FormInput
                      type="text"
                      className="box custom-input"
                      placeholder="Search.."
                    />
                    <Lucide
                      icon="Search"
                      className="absolute inset-y-0 right-0 my-auto mr-2 h-5 w-8"
                    />
                  </div>
                </div>
                <div className="  py-5" style={{ overflowY: 'auto' }}>
                  <Table
                    //   bordered
                    //   striped
                    hover
                    style={{ width: '100%', whiteSpace: 'nowrap' }}
                  >
                    <Table.Thead variant="dark">
                      <Table.Tr>
                        <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                          Action
                        </Table.Th>
                        <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                         Name
                        </Table.Th>
                        <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                         Account Type
                        </Table.Th>
                        <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                        Account Sub Type
                        </Table.Th>
                        <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                        Account No
                        </Table.Th>
                        <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                          Note
                        </Table.Th>
                        <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                         Balance
                        </Table.Th>
                        <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                         Added By
                        </Table.Th>
                        
                      </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                      <Table.Tr>
                        <Table.Td className="!px-1">
                          <Menu>
                            <Menu.Button
                              className="h-8 w-16 "
                              as={Button}
                              size="sm"
                              variant="primary"
                            >
                              Action{' '}
                              <Lucide
                                icon="ChevronDown"
                                className="ml-2 h-4 w-4"
                              />
                            </Menu.Button>
                            <Menu.Items
                              className="w-38 h-48 overflow-y-auto"
                              placement="right-start"
                            >
                             
                              <Menu.Item  onClick={(event: React.MouseEvent) => {
                        event.preventDefault()
                        setEditAccountPreview(true)
                      }}>
                                <Lucide icon="Edit" className="mr-2 h-4 w-4" />
                                Edit
                              </Menu.Item>
                              <Menu.Item   onChange={handleChange}
                  
                  >
                 <Button
                         as="a"
                        href="/payment-accounts/accountBook"
                      >
                      <Lucide
                                  icon="Book"
                                  className="mr-2 h-4 w-4"
                                />
                                Account Book
                      </Button>
                             
                              </Menu.Item>
                              <Menu.Item
                              onClick={(event: React.MouseEvent) => {
                                event.preventDefault()
                                setFundPreview(true)
                              }}>
                                <Lucide
                                  icon="Banknote"
                                  className="mr-2 h-4 w-4"
                                />
                               Fund Transfer
                              </Menu.Item>
                              <Menu.Item
                              onClick={(event: React.MouseEvent) => {
                                event.preventDefault()
                                setDepositPreview(true)
                              }}>
                                <Lucide
                                  icon="FilePlus"
                                  className="mr-2 h-4 w-4"
                                />
                               Deposit
                              </Menu.Item>
                         
                              <Menu.Item  onClick={() => {
                          setDeleteConfirmationModal(true)
                        }}>
                                <Lucide  icon="XCircle" className="mr-2 h-4 w-4" />
                               Close
                              </Menu.Item>
                            </Menu.Items>
                          </Menu>
                        </Table.Td>
                        <Table.Td className="!px-2">Bank Account</Table.Td>
                        <Table.Td className="!px-2">Cash</Table.Td>
                        <Table.Td className="!px-2">23</Table.Td>
                        <Table.Td className="!px-2">7890</Table.Td>
                        <Table.Td className="!px-2">Liza</Table.Td>
                        <Table.Td className="!px-2 text-right">₨ 21,752.30</Table.Td>
                        <Table.Td className="!px-2">Miss Nimasha Nayanamini</Table.Td>
                      </Table.Tr>
                
                    </Table.Tbody>
               
                  </Table>
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

              <Dialog
        open={deleteConfirmationModal}
        onClose={() => {
          setDeleteConfirmationModal(false)
        }}
        initialFocus={deleteButtonRef}
      >
        <Dialog.Panel>
          <div className="p-5 text-center">
            <Lucide
              icon="XCircle"
              className="mx-auto mt-3 h-16 w-16 text-danger"
            />
            <div className="mt-5 text-3xl">Are you sure?</div>
            <div className="mt-2 text-slate-500">
              Do you really want to delete these records? <br />
              This process cannot be undone.
            </div>
          </div>
          <div className="px-5 pb-8 text-center">
            <Button
              variant="outline-secondary"
              type="button"
              onClick={() => {
                setDeleteConfirmationModal(false)
              }}
              className="mr-1 w-24"
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              type="button"
              className="w-24"
              ref={deleteButtonRef}
            >
              Delete
            </Button>
          </div>
        </Dialog.Panel>
      </Dialog>
              {/* {' Deposit '} */}
              <Dialog
              size="lg"
              open={depositPreview}
              onClose={() => {
                setDepositPreview(false)
              }}
            >
              <Dialog.Panel className="max-h-screen overflow-y-auto">
                <Dialog.Title>
                  <h2 className="mr-auto text-base font-medium">{`${t(
                    'paymentAccount.fields.deposit.title'
                  )}`}</h2>
                </Dialog.Title>
                <a
                  onClick={() => {
                    setDepositPreview(false)
                  }}
                  className="absolute right-0 top-0 mr-3 mt-3"
                  href="#"
                >
                  <Lucide icon="X" className="h-8 w-8 text-slate-400" />
                </a>

                <Dialog.Description className="grid gap-7 md:grid-cols-1">
                <div><strong>{`${t(
                    'paymentAccount.fields.selectedAcc.label'
                  )}`}</strong> : {`${t(
                    'paymentAccount.fields.selectedAcc.placeolder'
                  )}`}</div>
                  <InputElement
                    label={`${t(
                      'paymentAccount.fields.amount.label'
                    )}`}
                    register={register}
                    required
                    error={errors.amount}
                    name="amount"
                    id="amount"
                  />
               
          <SelectElement
                    label={`${t(
                      'paymentAccount.fields.depositFrom.label'
                    )}`}
                    register={register}
                    name="depositFrom"
                    id="depositFrom"
                  />
<DateElement
            label={`${t('paymentAccount.fields.date.label')}`}
            required
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
            name="date"
            id="date"
            error={errors.date}
          />
       <TextareaElement
                    label={`${t(
                      'paymentAccount.fields.note.label'
                    )}`}
                    register={register}
                    name="note"
                    id="note"
                  />
       
                </Dialog.Description>

                <div className="flex justify-end px-4 pb-4 text-center mt-3 mb-3 ">
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
                      setDepositPreview(false)
                    }}
                    className="mb-2 mr-1 w-24"
                  >
                    Cancel
                  </Button>
                </div>
              </Dialog.Panel>
            </Dialog>
 {/* {' Edit '} */}
            <Dialog
              size="lg"
              open={editAccountPreview}
              onClose={() => {
                setEditAccountPreview(false)
              }}
            >
              <Dialog.Panel className="max-h-screen overflow-y-auto">
                <Dialog.Title>
                  <h2 className="mr-auto text-base font-medium">{`${t(
                    'paymentAccount.fields.editAccounts.title'
                  )}`}</h2>
                </Dialog.Title>
                <a
                  onClick={() => {
                    setEditAccountPreview(false)
                  }}
                  className="absolute right-0 top-0 mr-3 mt-3"
                  href="#"
                >
                  <Lucide icon="X" className="h-8 w-8 text-slate-400" />
                </a>

                <Dialog.Description className="grid gap-7 md:grid-cols-1">
                  <InputElement
                    label={`${t(
                      'paymentAccount.fields.name.label'
                    )}`}
                    register={register}
                    required
                    error={errors.name}
                    name="name"
                    id="name"
                  />
                  
                  <InputElement
                    label={`${t(
                      'paymentAccount.fields.accountNumber.label'
                    )}`}
                    register={register}
                    name="accountNumber"
                    id="accountNumber"
                    required
                    error={errors.accountNumber}
                  />
         
       
          <SelectElement
                    label={`${t(
                      'paymentAccount.fields.accountType.label'
                    )}`}
                    register={register}
                    name="accountType"
                    id="accountType"
                  />
    <InputElement
                    label={`${t(
                      'paymentAccount.fields.openingBalance.label'
                    )}`}
                    register={register}
                    name="openingBalance"
                    id="openingBalance"
                    type="number"
                  />
       <TextareaElement
                    label={`${t(
                      'paymentAccount.fields.note.label'
                    )}`}
                    register={register}
                    name="note"
                    id="note"
                  />
       
                </Dialog.Description>

                <div className="flex justify-end px-4 pb-4 text-center mt-3 mb-3 ">
                  <Button
                    type="submit"
                    variant="primary"
                    className="mb-2 mr-1 w-24"
                  >
                    {`${t('common.button.update')}`}
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
                      setEditAccountPreview(false)
                    }}
                    className="mb-2 mr-1 w-24"
                  >
                    Cancel
                  </Button>
                </div>
              </Dialog.Panel>
            </Dialog>

            {/* {' Fund '} */}
            <Dialog
              size="lg"
              open={fundPreview}
              onClose={() => {
                setFundPreview(false)
              }}
            >
              <Dialog.Panel className="max-h-screen overflow-y-auto">
                <Dialog.Title>
                  <h2 className="mr-auto text-base font-medium">{`${t(
                    'paymentAccount.fields.fundTransfer.title'
                  )}`}</h2>
                </Dialog.Title>
                <a
                  onClick={() => {
                    setFundPreview(false)
                  }}
                  className="absolute right-0 top-0 mr-3 mt-3"
                  href="#"
                >
                  <Lucide icon="X" className="h-8 w-8 text-slate-400" />
                </a>

                <Dialog.Description className="grid gap-7 md:grid-cols-1">
                <div className="flex">
  <div>
    <strong>{`${t('paymentAccount.fields.selectedAccFund.label')}`}</strong> : {`${t('paymentAccount.fields.selectedAccFund.placeolder')}`}
  </div>

  <div className="ml-auto">
    <strong>{`${t('paymentAccount.fields.accountBalance.label')}`}</strong> : {`${t('paymentAccount.fields.accountBalance.placeolder')}`}
  </div>
</div>

                  <SelectElement
                    label={`${t(
                      'paymentAccount.fields.transferTo.label'
                    )}`}
                    register={register}
                    required
                    error={errors.transferTo}
                    name="transferTo"
                    id="transferTo"
                  />
               
          <InputElement
                    label={`${t(
                      'paymentAccount.fields.amount.label'
                    )}`}
                    register={register}
                    name="amount"
                    id="amount"
                    required
                    error={errors.amount}
                    type="number"
                  />
<DateElement
            label={`${t('paymentAccount.fields.date.label')}`}
            required
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
            name="date"
            id="date"
            error={errors.date}
          />
       <TextareaElement
                    label={`${t(
                      'paymentAccount.fields.note.label'
                    )}`}
                    register={register}
                    name="note"
                    id="note"
                  />
       <UploadFilesElement
              id="attach_document"
              name="attach_document"
              register={register}
              label={`${t('expensesForm.fields.attachDocument.placeolder')}`}
              variant="primary"
              btnLabel={`${t(
                'expensesForm.fields.attachDocument.btnPlaceolder'
              )}`}
              error={errors.attach_document}
              info={`${t('expensesForm.fields.attachDocument.tooltip')}`}
            />
                </Dialog.Description>

                <div className="flex justify-end px-4 pb-4 text-center mt-3 mb-3 ">
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
                      setFundPreview(false)
                    }}
                    className="mb-2 mr-1 w-24"
                  >
                    Cancel
                  </Button>
                </div>
              </Dialog.Panel>
            </Dialog>
            </div>
          </Tab.Panel>
          <Tab.Panel className="mt-5">

<div className="intro-y mt-4 mb-5 flex flex-col items-center sm:flex-row">
 
             
           </div>

  <div className="intro-y box mb-5 px-5 py-5">
    <div className="">
      <div className="mt- intro-y flex flex-col items-center sm:flex-row xl:mt-4">
        <div className="mt-2 items-center sm:mr-4 sm:flex ">
          Page Size
          <FormSelect className=" w-15 dark:[0px_0px_0px_2px_#3f4865,_1px_1px_5px_rgba(0,0,0,0.32)]  m-2">
            <option>10</option>
            <option>25</option>
            <option>50</option>
            <option>100</option>
          </FormSelect>
        </div>

        <div className="mx-auto items-center  md:flex">
          <Button className="mr-2 flex items-center">
            <Lucide icon="Eye" className="mr-2 h-4 w-4" /> Column
            Visibility
          </Button>

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

        <div className="relative ml-2 mr-2 flex sm:mt-0 sm:w-72">
          <FormInput
            type="text"
            className="box custom-input"
            placeholder="Search.."
          />
          <Lucide
            icon="Search"
            className="absolute inset-y-0 right-0 my-auto mr-2 h-5 w-8"
          />
        </div>
        <Button
                      variant="primary"
                      className="shadow-md sm:w-auto"
                      onChange={handleChange}
                      onClick={(event: React.MouseEvent) => {
                        event.preventDefault()
                        setAccountTypePreview(true)
                      }}
                    >
                      Add 
                    </Button>
      </div>
      <div className="  py-5" style={{ overflowY: 'auto' }}>
        <Table
          //   bordered
          //   striped
          hover
          style={{ width: '100%', whiteSpace: 'nowrap' }}
        >
          <Table.Thead variant="dark">
            <Table.Tr>
              <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                Action
              </Table.Th>
              <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
               Name
              </Table.Th>
             
              
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            <Table.Tr>
              <Table.Td className="!px-1">
              <Button variant="primary" className="mb-2 mr-1" size="sm" onClick={(event: React.MouseEvent) => {
              event.preventDefault()
              setEditAccountTypePreview(true)
            }}
          >
   
                    <Lucide icon="Edit" className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="danger"
                    className="mb-2 mr-1"
                    size="sm"
                    onClick={(event: { preventDefault: () => void }) => {
                      event.preventDefault()
                      setDeleteConfirmationModal(true)
                    }}
                  >
                    <Lucide icon="Trash" className="h-4 w-4" />
                  </Button>
              </Table.Td>
              <Table.Td className="!px-2">Bank Account</Table.Td>

            </Table.Tr>
      
          </Table.Tbody>
     
        </Table>
      </div>
      <Dialog
              size="lg"
              open={accountTypePreview}
              onClose={() => {
                setAccountTypePreview(false)
              }}
            >
              <Dialog.Panel className="max-h-screen overflow-y-auto">
                <Dialog.Title>
                  <h2 className="mr-auto text-base font-medium">{`${t(
                    'paymentAccount.fields.addAccountType.title'
                  )}`}</h2>
                </Dialog.Title>
                <a
                  onClick={() => {
                    setAccountTypePreview(false)
                  }}
                  className="absolute right-0 top-0 mr-3 mt-3"
                  href="#"
                >
                  <Lucide icon="X" className="h-8 w-8 text-slate-400" />
                </a>

                <Dialog.Description className="grid gap-7 md:grid-cols-1">
                  <InputElement
                    label={`${t(
                      'paymentAccount.fields.name.label'
                    )}`}
                    register={register}
                    required
                    error={errors.name}
                    name="name"
                    id="name"
                  />
                  
                 
          <SelectElement
                    label={`${t(
                      'paymentAccount.fields.parentAccountType.label'
                    )}`}
                    register={register}
                    name="parentAccountType"
                    id="parentAccountType"
                  />
    
       
                </Dialog.Description>

                <div className="flex justify-end px-4 pb-4 text-center mt-3 mb-3 ">
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
                      setAccountTypePreview(false)
                    }}
                    className="mb-2 mr-1 w-24"
                  >
                    Cancel
                  </Button>
                </div>
              </Dialog.Panel>
            </Dialog>

            <Dialog
              size="lg"
              open={editAccountTypePreview}
              onClose={() => {
                setEditAccountTypePreview(false)
              }}
            >
              <Dialog.Panel className="max-h-screen overflow-y-auto">
                <Dialog.Title>
                  <h2 className="mr-auto text-base font-medium">{`${t(
                    'paymentAccount.fields.editAccountType.title'
                  )}`}</h2>
                </Dialog.Title>
                <a
                  onClick={() => {
                    setEditAccountTypePreview(false)
                  }}
                  className="absolute right-0 top-0 mr-3 mt-3"
                  href="#"
                >
                  <Lucide icon="X" className="h-8 w-8 text-slate-400" />
                </a>

                <Dialog.Description className="grid gap-7 md:grid-cols-1">
                  <InputElement
                    label={`${t(
                      'paymentAccount.fields.name.label'
                    )}`}
                    register={register}
                    required
                    error={errors.name}
                    name="name"
                    id="name"
                  />
                  
                 
          <SelectElement
                    label={`${t(
                      'paymentAccount.fields.parentAccountType.label'
                    )}`}
                    register={register}
                    name="parentAccountType"
                    id="parentAccountType"
                  />
    
       
                </Dialog.Description>

                <div className="flex justify-end px-4 pb-4 text-center mt-3 mb-3 ">
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
                      setEditAccountTypePreview(false)
                    }}
                    className="mb-2 mr-1 w-24"
                  >
                    Cancel
                  </Button>
                </div>
              </Dialog.Panel>
            </Dialog>

            <Dialog
        open={deleteConfirmationModal}
        onClose={() => {
          setDeleteConfirmationModal(false);
        }}
        initialFocus={deleteButtonRef}
      >
        <Dialog.Panel>
          <div className="p-5 text-center">
            <Lucide
              icon="XCircle"
              className="w-16 h-16 mx-auto mt-3 text-danger"
            />
            <div className="mt-5 text-3xl">Are you sure?</div>
            <div className="mt-2 text-slate-500">
              Do you really want to delete these records? <br />
              This process cannot be undone.
            </div>
          </div>
          <div className="px-5 pb-8 text-center">
            <Button
              variant="outline-secondary"
              type="button"
              onClick={() => {
                setDeleteConfirmationModal(false);
              }}
              className="w-24 mr-1"
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              type="button"
              className="w-24"
              ref={deleteButtonRef}
            >
              Delete
            </Button>
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

    <Dialog
open={deleteConfirmationModal}
onClose={() => {
setDeleteConfirmationModal(false)
}}
initialFocus={deleteButtonRef}
>
<Dialog.Panel>
<div className="p-5 text-center">
  <Lucide
    icon="XCircle"
    className="mx-auto mt-3 h-16 w-16 text-danger"
  />
  <div className="mt-5 text-3xl">Are you sure?</div>
  <div className="mt-2 text-slate-500">
    Do you really want to delete these records? <br />
    This process cannot be undone.
  </div>
</div>
<div className="px-5 pb-8 text-center">
  <Button
    variant="outline-secondary"
    type="button"
    onClick={() => {
      setDeleteConfirmationModal(false)
    }}
    className="mr-1 w-24"
  >
    Cancel
  </Button>
  <Button
    variant="danger"
    type="button"
    className="w-24"
    ref={deleteButtonRef}
  >
    Delete
  </Button>
</div>
</Dialog.Panel>
</Dialog>
    {/* {' Deposit '} */}
    <Dialog
    size="lg"
    open={depositPreview}
    onClose={() => {
      setDepositPreview(false)
    }}
  >
    <Dialog.Panel className="max-h-screen overflow-y-auto">
      <Dialog.Title>
        <h2 className="mr-auto text-base font-medium">{`${t(
          'paymentAccount.fields.deposit.title'
        )}`}</h2>
      </Dialog.Title>
      <a
        onClick={() => {
          setDepositPreview(false)
        }}
        className="absolute right-0 top-0 mr-3 mt-3"
        href="#"
      >
        <Lucide icon="X" className="h-8 w-8 text-slate-400" />
      </a>

      <Dialog.Description className="grid gap-7 md:grid-cols-1">
      <div><strong>{`${t(
          'paymentAccount.fields.selectedAcc.label'
        )}`}</strong> : {`${t(
          'paymentAccount.fields.selectedAcc.placeolder'
        )}`}</div>
        <InputElement
          label={`${t(
            'paymentAccount.fields.amount.label'
          )}`}
          register={register}
          required
          error={errors.amount}
          name="amount"
          id="amount"
        />
     
<SelectElement
          label={`${t(
            'paymentAccount.fields.depositFrom.label'
          )}`}
          register={register}
          name="depositFrom"
          id="depositFrom"
        />
<DateElement
  label={`${t('paymentAccount.fields.date.label')}`}
  required
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
  name="date"
  id="date"
  error={errors.date}
/>
<TextareaElement
          label={`${t(
            'paymentAccount.fields.note.label'
          )}`}
          register={register}
          name="note"
          id="note"
        />

      </Dialog.Description>

      <div className="flex justify-end px-4 pb-4 text-center mt-3 mb-3 ">
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
            setDepositPreview(false)
          }}
          className="mb-2 mr-1 w-24"
        >
          Cancel
        </Button>
      </div>
    </Dialog.Panel>
  </Dialog>
{/* {' Edit '} */}
  <Dialog
    size="lg"
    open={editAccountPreview}
    onClose={() => {
      setEditAccountPreview(false)
    }}
  >
    <Dialog.Panel className="max-h-screen overflow-y-auto">
      <Dialog.Title>
        <h2 className="mr-auto text-base font-medium">{`${t(
          'paymentAccount.fields.editAccounts.title'
        )}`}</h2>
      </Dialog.Title>
      <a
        onClick={() => {
          setEditAccountPreview(false)
        }}
        className="absolute right-0 top-0 mr-3 mt-3"
        href="#"
      >
        <Lucide icon="X" className="h-8 w-8 text-slate-400" />
      </a>

      <Dialog.Description className="grid gap-7 md:grid-cols-1">
        <InputElement
          label={`${t(
            'paymentAccount.fields.name.label'
          )}`}
          register={register}
          required
          error={errors.name}
          name="name"
          id="name"
        />
        
        <InputElement
          label={`${t(
            'paymentAccount.fields.accountNumber.label'
          )}`}
          register={register}
          name="accountNumber"
          id="accountNumber"
          required
          error={errors.accountNumber}
        />


<SelectElement
          label={`${t(
            'paymentAccount.fields.accountType.label'
          )}`}
          register={register}
          name="accountType"
          id="accountType"
        />
<InputElement
          label={`${t(
            'paymentAccount.fields.openingBalance.label'
          )}`}
          register={register}
          name="openingBalance"
          id="openingBalance"
          type="number"
        />
<TextareaElement
          label={`${t(
            'paymentAccount.fields.note.label'
          )}`}
          register={register}
          name="note"
          id="note"
        />

      </Dialog.Description>

      <div className="flex justify-end px-4 pb-4 text-center mt-3 mb-3 ">
        <Button
          type="submit"
          variant="primary"
          className="mb-2 mr-1 w-24"
        >
          {`${t('common.button.update')}`}
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
            setEditAccountPreview(false)
          }}
          className="mb-2 mr-1 w-24"
        >
          Cancel
        </Button>
      </div>
    </Dialog.Panel>
  </Dialog>

  {/* {' Fund '} */}
  <Dialog
    size="lg"
    open={fundPreview}
    onClose={() => {
      setFundPreview(false)
    }}
  >
    <Dialog.Panel className="max-h-screen overflow-y-auto">
      <Dialog.Title>
        <h2 className="mr-auto text-base font-medium">{`${t(
          'paymentAccount.fields.fundTransfer.title'
        )}`}</h2>
      </Dialog.Title>
      <a
        onClick={() => {
          setFundPreview(false)
        }}
        className="absolute right-0 top-0 mr-3 mt-3"
        href="#"
      >
        <Lucide icon="X" className="h-8 w-8 text-slate-400" />
      </a>

      <Dialog.Description className="grid gap-7 md:grid-cols-1">
      <div className="flex">
<div>
<strong>{`${t('paymentAccount.fields.selectedAccFund.label')}`}</strong> : {`${t('paymentAccount.fields.selectedAccFund.placeolder')}`}
</div>

<div className="ml-auto">
<strong>{`${t('paymentAccount.fields.accountBalance.label')}`}</strong> : {`${t('paymentAccount.fields.accountBalance.placeolder')}`}
</div>
</div>

        <SelectElement
          label={`${t(
            'paymentAccount.fields.transferTo.label'
          )}`}
          register={register}
          required
          error={errors.transferTo}
          name="transferTo"
          id="transferTo"
        />
     
<InputElement
          label={`${t(
            'paymentAccount.fields.amount.label'
          )}`}
          register={register}
          name="amount"
          id="amount"
          required
          error={errors.amount}
          type="number"
        />
<DateElement
  label={`${t('paymentAccount.fields.date.label')}`}
  required
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
  name="date"
  id="date"
  error={errors.date}
/>
<TextareaElement
          label={`${t(
            'paymentAccount.fields.note.label'
          )}`}
          register={register}
          name="note"
          id="note"
        />
<UploadFilesElement
    id="attach_document"
    name="attach_document"
    register={register}
    label={`${t('expensesForm.fields.attachDocument.placeolder')}`}
    variant="primary"
    btnLabel={`${t(
      'expensesForm.fields.attachDocument.btnPlaceolder'
    )}`}
    error={errors.attach_document}
    info={`${t('expensesForm.fields.attachDocument.tooltip')}`}
  />
      </Dialog.Description>

      <div className="flex justify-end px-4 pb-4 text-center mt-3 mb-3 ">
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
            setFundPreview(false)
          }}
          className="mb-2 mr-1 w-24"
        >
          Cancel
        </Button>
      </div>
    </Dialog.Panel>
  </Dialog>
  </div>
</Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}

export default Main
