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
import {SetStateAction, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import Button from '../../../components/common/button'
import Tippy from '../../../components/common/tippy'
import Lucide from '../../../components/common/lucide'
import { Menu, Tab, Dialog, Disclosure } from '../../../components/common/headless'
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
import Alert from "../../../base-components/Alert"
import { AlignmentTypes } from '../../../constants/common-enums'
import LoadingIcon from '../../../components/common/loading-icon'
import clsx from 'clsx'
import ClassicEditorElement from '../../../components/common/form-elements/classic-editor-element'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import Toast from '../../../utils/notification'
import { PosApi } from '../../../api'


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
    status: yup
      .string()
      .required(
        `${t('repair.fields.jobsheet.fields.status.validationMessage')}`
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
 
  const [sliderContent, setSliderContent] = useState({
    header: '',
    children: <div />,
    footer: <div />,
  })
  const handleClick = ({ title, component }: FormContent) => {
    handleSlider()
    setSliderContent({
      header: title,
      children: component,
      footer: <div />,
    })
    setSliderSize('xl')
  }

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

  const [tooltipContent2] = useState(
    'Stock transfer will not be editable if status is completed'
  )
  const [checked, setChecked] = useState(false)
  const [purchaseDetailsPreview, setPurchaseDetailsPreview] = useState(false)


  const handleChange = () => {
    setChecked(!checked)
  }

  const [statusPreview, setStatusPreview] = useState(false) 



  return (
    <div className="">
<div className="intro-y mt-4 flex flex-col items-center sm:flex-row">
           
            
<h2 className="mr-auto text-lg font-medium ml-2">
Expense Voucher
              
              </h2>
              <div className="mt-4 flex w-full sm:mt-0 sm:w-auto">
          

         
        </div>
            
          </div>
          <div className="intro-y box mb-5 mt-5 px-5 py-5 ">
            
          <div className=" text-center">
          <div className="text-lg font-medium text-primary">
          Expense Voucher
                          </div>
                    <div >
                      <div className="flex flex-col border-b  pt-5 text-center  sm:text-left lg:flex-row lg:pb-6">
                        <div>
                          <div className=" font-medium text-primary">
                          Business :
                          </div>
                          <div className="font-medium">RAINBO KIDS</div>
                          <div
                            className="sm:whitespace-normal"
                            style={{
                              maxWidth: '200px',
                              wordWrap: 'break-word',
                            }}
                          >
                            Galle,Southern Province,Sri Lanka,
                          </div>
                          <div className="mt-1">
                                  Mobile : <strong>091-876432</strong>
                                  </div>
                        </div>
                        <div className="mt-20 lg:ml-auto lg:mt-0 lg:text-right">
                        <div >
                          Date : <strong>09/20/2023</strong>
                                  </div>
                                  <div className="mt-1">
                                  Purchase Status : <strong>Received</strong>
                                  </div>
                                  
                        </div>
                      </div>

                    </div>

  

                    <div className=" sm:py-6 border-b mb-5">
                      <div className="overflow-x-auto">
                        <Table bordered>
                          <Table.Thead
                            variant="default"
                            className="bg-primary text-white"
                          >
                            <Table.Tr>
                             
                              <Table.Th className="whitespace-nowrap border-b-2  dark:border-darkmode-400">
                                Reference No
                              </Table.Th>
                             
                              <Table.Th className="whitespace-nowrap border-b-2  dark:border-darkmode-400">
                              Contacts
                              </Table.Th>
                              <Table.Th className="whitespace-nowrap border-b-2  dark:border-darkmode-400">
                              Expense Note
                              </Table.Th>
                              <Table.Th className="whitespace-nowrap border-b-2  dark:border-darkmode-400">
                                Amount
                              </Table.Th>
                              <Table.Th className="whitespace-nowrap border-b-2  dark:border-darkmode-400">
                              Payment Due
                              </Table.Th>
                             
                            </Table.Tr>
                          </Table.Thead>
                          <Table.Tbody>
                            <Table.Tr>
                              <Table.Td className="border-b dark:border-darkmode-400">
                              SP2023/1574
                              </Table.Td>
                              <Table.Td className=" border-b dark:border-darkmode-400">
                             0875678901
                              </Table.Td>
                              <Table.Td className=" border-b  dark:border-darkmode-400">
                               test
                              </Table.Td>
                              <Table.Td className=" border-b text-right dark:border-darkmode-400">
                                Rs.50.00
                              </Table.Td>
                              <Table.Td className="border-b text-right  font-medium dark:border-darkmode-400">
                              Rs.50.00
                              </Table.Td>
                              
                            </Table.Tr>
                          </Table.Tbody>
                        </Table>
                      </div>
                    </div>
                    <div className="">
                      <div className="flex flex-col text-center  sm:text-left lg:flex-row lg:pb-6">
                        <div>
                         
                        <div className=" ">
                        Added By : <strong>Nimasha Nayanamini</strong>
                                  </div>
                                  <div className="mb-2"></div>
                          <div >
                          Date : <strong>09/20/2023</strong>
                                  </div>
                        </div>
                        <div className="mt-20 lg:ml-auto lg:mt-0 lg:text-right">
                        <div className=" ">
                       <strong> Approved By : </strong>{'............................................ '}
                                  </div>
                                  <div className="mb-2"></div>
                          <div >
                          <strong> Date : </strong>{'............................................ '}
                                  </div>
                        </div>
                      </div>

                    </div>
                      <div className="flex justify-end  text-center">
                      <Button
                          type="button"
                          variant="outline-secondary"
                          as="a"
                          href="/expenses/listExpenses"
                          className="mb-2 mr-1 w-24"
                        >
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          variant="primary"
                          className="mb-2 mr-1 w-24"
                        >
                          {`${t('common.button.print')}`}
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
                       
                      </div>
                  
                  </div>
      </div>
    </div>
  )
}

export default Main
