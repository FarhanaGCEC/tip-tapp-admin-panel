/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/self-closing-comp */
/* eslint-disable import/no-duplicates */
/* eslint-disable prettier/prettier */
import { useRef, useState } from 'react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { PosApi } from '../../../api'
import Button from '../../common/button'
import Toast from '../../../utils/notification'
import SharedDataContainer from '../../../containers/sharedData'
import { Icons, NotificationTypes } from '../../../constants'
import LoadingIcon from '../../common/loading-icon'
import Lucide from '../../common/lucide'
import productPlaceholder from '../../../assets/images/fakers/image-placeholder-1.png'
import { FormLabel } from '../../common/form-elements/components'
import UploadFilesElement from '../../common/form-elements/upload-files-element'
import Table from '../../common/table'
import { Menu, Tab, Dialog, Disclosure } from '../../common/headless'

function ViewJobSheet() {
  const posApi = PosApi.useAPI()
  const { setNotification, handleSlider } = SharedDataContainer.useContainer()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { t } = useTranslation('pos')

  const schema = yup
    .object({
        businessLocation: yup
        .string()
        .required(`${t('repair.fields.jobsheet.fields.addJobSheet.fields.businessLocation.validationMessage')}`),
        customer: yup
        .string()
        .required(`${t('repair.fields.jobsheet.fields.addJobSheet.fields.customer.validationMessage')}`),
        serviceType: yup
        .string()
        .required(`${t('repair.fields.jobsheet.fields.addJobSheet.fields.serviceType.validationMessage')}`),
        serialNo: yup
        .string()
        .required(`${t('repair.fields.jobsheet.fields.addJobSheet.fields.serialNo.validationMessage')}`),
        status: yup
        .string()
        .required(`${t('repair.fields.jobsheet.fields.addJobSheet.fields.status.validationMessage')}`),
        addDevice: yup
        .string()
        .required(`${t('repair.fields.jobsheet.fields.addJobSheet.fields.addDevice.validationMessage')}`),
        addDeviceModel: yup
        .string()
        .required(`${t('repair.fields.jobsheet.fields.addJobSheet.fields.addDeviceModel.validationMessage')}`),
        role: yup
  .string()
  .required(`${t('userManagement.fields.rolesnPermission.fields.role.validationMessage')}`),
  otherwise: yup.string().notRequired(),

        prefix: yup.string().when('_', {
        is: () => 'tooltip',
        then: yup
          .string()
          .required(`${t('customerForm.fields.prefix.tooltip')}`),
          otherwise: yup.string().notRequired(),
      }),
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

  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false)
  const deleteButtonRef = useRef(null)

  const [showMoreInfo, setShowMoreInfo] = useState(false)
  const handleMoreInfoClick = () => {
    setShowMoreInfo(!showMoreInfo);
  }

  const [checked, setChecked] = useState(false)

  const handleChange = () => {
    setChecked(!checked)
  }
  const [checkedPickUp, setCheckedPickUp] = useState(false);
  const [checkedOnSite, setCheckedOnSite] = useState(false);
  const [categoryPreview, setCategoryPreview] = useState(false) 
  const [type] = useState([
    { id: 0, name: ' Supplier' },
    { id: 2, name: 'Customer' },
    { id: 3, name: 'Other' },
  ])
  const [group] = useState([
    { id: 0, name: ' Please Select' },
    { id: 2, name: 'Months' },
    { id: 3, name: 'Dates' },
  ])
  const handlePickUpChange = () => {
    setCheckedPickUp(!checkedPickUp);
    if (!checkedPickUp) {
      // If Pick Up is checked, uncheck On Site
      setCheckedOnSite(false);
    }
  };

  const handleOnSiteChange = () => {
    setCheckedOnSite(!checkedOnSite);
    if (!checkedOnSite) {
      // If On Site is checked, uncheck Pick Up
      setCheckedPickUp(false);
    }
  }
  const [showMoreInfo2, setShowMoreInfo2] = useState(false)
  const handleMoreInfoClick2 = () => {
    setShowMoreInfo2(!showMoreInfo2)
  }
  const [select, setSelect] = useState('1')

  return (
    <form className="validate-form" onSubmit={handleSubmit(onSubmit)}>
           <div className="intro-y box mb-5 px-5 py-5">
           <div className="flex flex-col border-b mb-4 font-medium text-base border-slate-200/60 dark:border-darkmode-400">
                  <h2 className="mr-auto text-base font-medium mb-4">
                  {`${t('repair.fields.jobsheet.fields.editJobSheetTopic.title')}`}
                  </h2>
      </div>
      <div className="intro-y  mb-5 ">
      <div className="intro-y mb-5 border-b border-slate-200 py-2 dark:border-darkmode-400">
              <div className="mt- intro-y flex flex-col items-center sm:flex-row">
                
                <div className="flex w-full sm:mt-0 sm:w-auto ">
                  <div className=" font-medium"></div>
                  <Button
            variant="twitter"
            className="mb-2 mr-1 w-fit"
          >
             {isLoading ? (
              <LoadingIcon icon="oval" color="white" className="ml-2 h-4 w-4" />
            ) : (
              ''
            )}
             <Lucide icon="Edit" className="mr-2 h-4 w-4" />
           Edit
          </Button>
          <Menu>
                        <Menu.Button
                          as={Button}
                          variant="facebook"
                          className="flex items-center "
                        >
                          Print As{' '}
                          <Lucide icon="ChevronDown" className="ml-2 h-4 w-4" />
                        </Menu.Button>
                        <Menu.Items className="w-40">
                          <Menu.Item>
                            <Lucide icon="Printer" className="mr-2 h-4 w-4" />{' '}
                            Print Format 1
                          </Menu.Item>
                          <Menu.Item>
                            <Lucide icon="FileLineChart" className="mr-2 h-4 w-4" />{' '}
                            Print Format 2
                          </Menu.Item>
                          <Menu.Item>
                            <Lucide icon="FileText" className="mr-2 h-4 w-4" />{' '}
                            Print Format 3
                          </Menu.Item>
                        </Menu.Items>
                      </Menu>
                </div>
              </div>
            </div>

            <div className="flex flex-col border-b  text-center sm:pt-3 sm:text-left lg:flex-row lg:pb-6">
              <div>
                <div className="text-lg font-medium text-primary">Business Address :</div>
                <div className="mt-1"style={{
                      maxWidth: '220px',
                      wordWrap: 'break-word',
                    }}>Nugegoda, Sri Lanka</div>
              </div>
              <div className="mt-20 lg:ml-auto lg:mt-0 lg:text-right">
                <div className="text-base font-medium text-slate-500">
                RAINBO KIDS
                </div>
                <div className="mt-1">No 19</div>
                <div className="mt-1"style={{
                      maxWidth: '220px',
                      wordWrap: 'break-word',
                    }}>Nugegoda, Sri Lanka</div>
              </div>
            </div>
            <div className=" py-5 lg:ml-auto lg:mt-0 lg:text-center">
              <div className="text-lg font-medium ">
              Job Sheet Details
              </div>
              <div className=" mt-3 " style={{ overflowY: 'auto' }}>
            
            <Table
              bordered
              hover
              
            >

        <Table.Tbody>
            <Table.Tr>
                <Table.Td>Date: 02/24/2022 02:08 PM</Table.Td>
                <Table.Td>Service type: Carry in</Table.Td>
                <Table.Td>Expected Delivery Date:</Table.Td>
            </Table.Tr>
            <Table.Tr>
                <Table.Td></Table.Td>
                <Table.Td>Job Sheet Number : 2022/0004</Table.Td>
                <Table.Td></Table.Td>
            </Table.Tr>
           
        </Table.Tbody>
        
    </Table>
    <Table
              bordered
              hover
              
            >

        <Table.Tbody>
           
            
            <Table.Tr>
                <Table.Td><div  className=" font-medium ">Customer:</div>
                <div style={{
                      maxWidth: '220px',
                      wordWrap: 'break-word',
                    }}>Walking Customer
nugegoda, Galle, Choose City,
80000
Mobile: 0112928937</div></Table.Td>
                <Table.Td style={{maxWidth: '220px',wordWrap: 'break-word',}}><div > Product Name : </div>
                <div> Brand : Apple</div>
                <div> Device : </div>
                <div> Device Model : </div>
                <div> Serial Number : 123454</div>
                <div> Password : 123454</div>
                <div> Security Pattern code : 123454</div></Table.Td>

                
                

            </Table.Tr>
            <Table.Tr>
                <Table.Td>Invoice No.</Table.Td>
                <Table.Td>123</Table.Td>
            </Table.Tr>
            <Table.Tr>
                <Table.Td>Estimated Cost</Table.Td>
                <Table.Td>	₨ 14,000.00</Table.Td>
            </Table.Tr>
            <Table.Tr>
                <Table.Td>Status</Table.Td>
                <Table.Td>Completes</Table.Td>
            </Table.Tr>
            <Table.Tr>
                <Table.Td>Location</Table.Td>
                <Table.Td>	Bunny outlet</Table.Td>
            </Table.Tr>
            <Table.Tr>
                <Table.Td>Pre Repair Checklist</Table.Td>
                <Table.Td></Table.Td>
            </Table.Tr>
            <Table.Tr>
                <Table.Td>Product Configuration</Table.Td>
                <Table.Td></Table.Td>
            </Table.Tr>
            <Table.Tr>
                <Table.Td>Condition Of The Product</Table.Td>
                <Table.Td>normal</Table.Td>
            </Table.Tr>
            <Table.Tr>
                <Table.Td>Parts used</Table.Td>
                <Table.Td></Table.Td>
            </Table.Tr>
            <Table.Tr>
                <Table.Td>Problem Reported By The Customer</Table.Td>
                <Table.Td></Table.Td>
            </Table.Tr>
        </Table.Tbody>
        
    </Table>
    <Table className="mt-4"
              bordered
              hover
              
            >

        <Table.Tbody>
           
            <Table.Tr>

          <div  className=" font-medium ">Terms & Conditions</div> 
              <div className=" mt-2">1. Title to any product supplied under this invoice shall pass to Customer only on full payment of this invoice.</div>
            <div>2. In case of Invoice type as CREDIT, payment shall be accepted only by account payee cheque,Favoring company
name mentioned on top & handed over to our authorized representative only</div>
            <div>3. Delayed payment shall result in a charge of interest at 18% per annum</div>
            <div>4. In case of Invoice type as CREDIT & if cheque is dishonored by bank, debit note for actual bank charges shall be
sent to the customer</div>
            <div>5. Warranty for the product shall be as mentioned in this invoice and as detailed in the Apple warranty document
provided with the product</div>
 <div>6. Product supplied under this invoice shall be accepted for return only under a return authorization issued by Mac
Center Pvt Ltd</div>
 <div>7. Jurisdiction for settlement of any dispute shall be the appropriate Court at Colombo</div>
 <div>8. Cheque in favor of - Mac Center (Pvt) Ltd</div>
 <div>9. Warranty- One year standard warranty for brand new units only</div>
            </Table.Tr>
           
        </Table.Tbody>
        
    </Table>
    <Table className="mt-4"
              bordered
              hover
              
            >

        <Table.Tbody>
            <Table.Tr>
                <Table.Td>Customer signature : </Table.Td>
                <Table.Td>Authorized signature : </Table.Td>
            </Table.Tr>

           
        </Table.Tbody>
        
    </Table>
</div>
            </div>

            </div>

      </div>
      <div className="intro-y box mb-5 px-5 py-5">
      <div className="flex flex-col border-b mb-4 font-medium text-base border-slate-200/60 dark:border-darkmode-400">
                  <h2 className="mr-auto text-base font-medium mb-4">
                  {`${t('repair.fields.jobsheet.fields.activities.title')}`}
                  </h2>
      </div>
      <div className=" mb-3 py-5 " style={{ overflowY: 'auto' }}>
            
            <Table
              bordered
              striped
              hover
              
            >
        <Table.Thead variant="dark">
            <Table.Tr>
                <Table.Th className="whitespace-nowrap">
                Date
                </Table.Th>
                <Table.Th className="whitespace-nowrap">
                Action
                </Table.Th>
                <Table.Th className="whitespace-nowrap">
                By
                </Table.Th>
                <Table.Th className="whitespace-nowrap">
                Note
                </Table.Th>
            </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
            <Table.Tr>
                <Table.Td> 2023.09.12</Table.Td>
                <Table.Td> </Table.Td>
                <Table.Td> </Table.Td>
                <Table.Td> </Table.Td>
            </Table.Tr>
           
            
            
        </Table.Tbody>
    </Table>
</div>
      </div>

       
    </form>
  )
}

export default ViewJobSheet
