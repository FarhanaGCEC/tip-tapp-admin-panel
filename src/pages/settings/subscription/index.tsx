/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/button-has-type */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable import/order */
/* eslint-disable react/no-unknown-property */
/* eslint-disable react/self-closing-comp */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import _ from 'lodash'
import { PosApi } from '../../../api'
import Table from '../../../components/common/table'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import Button from '../../../components/common/button'
import Lucide from '../../../components/common/lucide'
import { Menu, Dialog } from '../../../components/common/headless'
import Pagination from '../../../components/common/pagination'
import {
  DateElement,
  InputElement,
  SelectElement,
  SearchSelectElement,
} from '../../../components/common/form-elements'
import SharedDataContainer from '../../../containers/sharedData'
import ShortcutKey from '../../../components/common/shortcut-key'
import SlideoverPanel from '../../../components/slideover-panel'
import { useTranslation } from 'react-i18next'
import PreviewImage from '../../../assets/images/fakers/image2.jpg'
import UploadFilesElement from '../../../components/common/form-elements/upload-files-element'
import LoadingIcon from '../../../components/common/loading-icon'
import {
  FormInput,
  FormInfo,
  FormSelect,
  FormLabel,
  FormInline,
  InputGroup,
  FormCheck,
} from '../../../components/common/form-elements/components'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import Toast from '../../../utils/notification'
import { Icons, NotificationTypes } from '../../../constants'
import Tippy from '../../../components/common/tippy'

interface FormContent {
  title: string
  component: JSX.Element
}

interface Props {
  setSliderContent: React.Dispatch<React.SetStateAction<any>>
}

function Main() {
  const posApi = PosApi.useAPI()
  const { setNotification } = SharedDataContainer.useContainer()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { handleSlider } = SharedDataContainer.useContainer()
  // eslint-disable-next-line prettier/prettier
  const { t } = useTranslation('pos')

  const schema = yup
    .object({
     variationName: yup
        .string()
        .required(
          `${t('productManagement.fields.variationName.validationMessage')}`
        ),
        variationValues: yup
        .string()
        .required(
          `${t('productManagement.fields.variationValues.validationMessage')}`
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

  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false)
  const deleteButtonRef = useRef(null)
  const [productPreview, setproductPreview] = useState(false) 
  const [packagePreview, setPackagePreview] = useState(false) 

  type VariationValue = {
    name: string;
    value: string;
  };
  
  const [variationValues, setVariationValues] = useState<Array<VariationValue>>([]);

  const handleChange = () => {}
  const handleAddVariation = () => {
    const newVariationValues = [...variationValues];
    newVariationValues.push({ name: '', value: '' } as VariationValue); // Replace VariationValue with the actual type
    setVariationValues(newVariationValues);
  };
  
  
  const handleRemoveVariation = (index: number) => {
    const newVariationValues = [...variationValues]
    newVariationValues.splice(index, 1);
    setVariationValues(newVariationValues)
  }
  const [checked, setChecked] = useState(false);


  const [tooltipContent1] = useState(
    'Price is Updated Based on Ingredient Purchase Cost'
  )
  const [tooltipContent2] = useState(
    'Product Purchase Price will be Updated According to Recipe Unit Price'
  )

  return (
    <div>
      <div className="intro-y  mt-3 border-b  border-slate-200/60 dark:border-darkmode-400  mb-5 py-5 ">
      <div className="flex flex-col  mb-4 font-medium text-base ">
                  <h2 className="mr-auto text-xl text-base font-medium mb-4">
                  Active Subscription
                  <Button
            variant="twitter"
            className="intro-y mx-1 h-7 w-7 rounded-full"
          >
            ?
          </Button></h2>
                  </div>
                  <div className='grid grid-cols-2 lg:grid-cols-3 gap-1'>
                  <div className="flex-1 py-12 intro-y box ">
                <Lucide
                  icon="Hexagon"
                  className="block w-12 h-12 mx-auto text-primary"
                />
                <div className="mt-6 text-2xl font-medium text-center">
                Staff
                </div>

                <div className="mt-5 text-center ml-8 dark:">
                <div className="mx-1  ml-6 flex "><Lucide
                  icon="CheckCircle"
                  className="w-4 h-4 mr-2 text-primary"
                /> Unlimited Business Locations </div> 
               <div className="mx-1 mt-2 ml-6 flex "><Lucide
                  icon="CheckCircle"
                  className="w-4 h-4 mr-2  text-primary"
                /> Unlimited Users </div> 
                <div className="mx-1 mt-2 ml-6 flex "><Lucide
                  icon="CheckCircle"
                  className="w-4 h-4 mr-2  text-primary"
                /> Unlimited Products </div>
               <div className="mx-1 mt-2 ml-6 flex "><Lucide
                  icon="CheckCircle"
                  className="w-4 h-4 mr-2  text-primary"
                /> Unlimited Invoices </div> 
                <div className="mx-1 mt-2 ml-6 flex "><Lucide
                  icon="CheckCircle"
                  className="w-4 h-4 mr-2  text-primary"
                /> 30 Trial Days </div> 
                </div>
                {/* <div className="px-10 mx-auto mt-2 text-center text-slate-500">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </div> */}
                <div className="flex justify-center">
                  <div className="relative mx-auto mt-8 text-3xl font-semibold">
                  ₨ 6,000.00
                  </div>
                </div>
                <div className="flex justify-center text-slate-500">
                  <div className="relative mx-auto mt-2 ">
                  12 Months
                  </div>
                </div>
                {/* <Button
                  variant="primary"
                  rounded
                  type="button"
                  className="block px-4 py-3 mx-auto mt-8"
                >
                 SUBSCRIBE NOW
                </Button> */}
                <div className="mt-5 text-center  dark:">
                <div className=""> Start Date : 11/25/2023 </div> 
                <div className="mt-1"> End Date : 11/25/2024 </div> 
                </div>
                
              </div>
              <div className="flex-1 py-12 intro-y box lg:ml-5 ">
                <Lucide
                  icon="Star"
                  className="block w-12 h-12 mx-auto text-primary"
                />
                <div className="mt-6 text-2xl font-medium text-center">
                Golden
                </div>

                <div className="mt-5 text-center ml-8 dark:">
                <div className="mx-1  ml-6 flex "><Lucide
                  icon="CheckCircle"
                  className="w-4 h-4 mr-2 text-primary"
                /> Unlimited Business Locations </div> 
               <div className="mx-1 mt-2 ml-6 flex "><Lucide
                  icon="CheckCircle"
                  className="w-4 h-4 mr-2  text-primary"
                /> Unlimited Users </div> 
                <div className="mx-1 mt-2 ml-6 flex "><Lucide
                  icon="CheckCircle"
                  className="w-4 h-4 mr-2  text-primary"
                /> Unlimited Products </div>
               <div className="mx-1 mt-2 ml-6 flex "><Lucide
                  icon="CheckCircle"
                  className="w-4 h-4 mr-2  text-primary"
                /> Unlimited Invoices </div> 
                <div className="mx-1 mt-2 ml-6 flex "><Lucide
                  icon="CheckCircle"
                  className="w-4 h-4 mr-2  text-primary"
                /> 30 Trial Days </div> 
                </div>
                {/* <div className="px-10 mx-auto mt-2 text-center text-slate-500">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </div> */}
                <div className="flex justify-center">
                  <div className="relative mx-auto mt-8 text-3xl font-semibold">
                  ₨ 10,000.00
                  </div>
                </div>
                <div className="flex justify-center text-slate-500">
                  <div className="relative mx-auto mt-2 ">
                  12 Months
                  </div>
                </div>
                <Button
                  variant="primary"
                  rounded
                  type="button"
                  className="block px-4 py-3 mx-auto mt-8"
                >
                 SUBSCRIBE NOW
                </Button>
              </div>
              
                  </div></div>
      <div className="intro-y box mb-5  px-5 py-5  ">
      <div className="flex flex-col border-b mb-4 font-medium text-base border-slate-200/60 dark:border-darkmode-400">
                  <h2 className="mr-auto text-base font-medium mb-4">
                  All Subscription
                  </h2>
                  </div>
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
            <Button className="mr-2 flex items-center">
              <Lucide icon="Eye" className="mr-2 h-4 w-4" /> Column Visibility
            </Button>

            <Menu>
              <Menu.Button
                as={Button}
                variant="facebook"
                className="flex items-center "
              >
                Export As <Lucide icon="ChevronDown" className="ml-2 h-4 w-4" />
              </Menu.Button>
              <Menu.Items className="w-40">
                <Menu.Item>
                  <Lucide icon="FileText" className="mr-2 h-4 w-4" /> As CSV
                </Menu.Item>
                <Menu.Item>
                  <Lucide icon="FileText" className="mr-2 h-4 w-4" /> As Excel
                </Menu.Item>
                <Menu.Item>
                  <Lucide icon="FileText" className="mr-2 h-4 w-4" /> Print
                </Menu.Item>
                <Menu.Item>
                  <Lucide icon="FileText" className="mr-2 h-4 w-4" /> Export to
                  PDF
                </Menu.Item>
              </Menu.Items>
            </Menu>
          </div>

          <div className="relative ml-2 mr-2 flex sm:mt-0 sm:w-72">
            <FormInput
              type="text"
              className="box custom-input"
              placeholder="Search "
            />
            <Lucide
              icon="Search"
              className="absolute inset-y-0 right-0 my-auto mr-2 h-5 w-8"
            />
          </div>
        </div>
        <div className=" mb-3 py-5 " style={{ overflowY: 'auto' }} > 
          <Table bordered striped hover>
            <Table.Thead variant="dark">
              <Table.Tr>
                <Table.Th className="whitespace-nowrap">Package Name</Table.Th>
                <Table.Th className="whitespace-nowrap">Start Date</Table.Th>
                <Table.Th className="whitespace-nowrap">Trial End Date</Table.Th>
                <Table.Th className="whitespace-nowrap">End Date</Table.Th>
                <Table.Th className="whitespace-nowrap text-right">Price</Table.Th>
                <Table.Th className="whitespace-nowrap">Paid Via</Table.Th>
                <Table.Th className="whitespace-nowrap">Trasnaction ID</Table.Th>
                <Table.Th className="whitespace-nowrap">Status</Table.Th>
                <Table.Th className="whitespace-nowrap">Created At</Table.Th>
                <Table.Th className="whitespace-nowrap">Created By</Table.Th>
                <Table.Th className="whitespace-nowrap text-center">Action</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              <Table.Tr>
                <Table.Td>Staff 2</Table.Td>
                <Table.Td>03/04/2021</Table.Td>
                <Table.Td>03/04/2021</Table.Td>
                <Table.Td>03/04/2021</Table.Td>
                <Table.Td ><div className="text-right">20,000,000.00</div></Table.Td>
                <Table.Td>payhere</Table.Td>
                <Table.Td>123</Table.Td>
                <Table.Td>Approved</Table.Td>
                <Table.Td>03/04/2021</Table.Td>
                <Table.Td>Mr sudan lanka</Table.Td>
                <Table.Td className="!px-2 text-center">
                  <Button variant="primary" className="mb-2 mr-1" size="sm"  onClick={(event: React.MouseEvent) => {
      event.preventDefault()
      setPackagePreview(true)
    }}>
                    <Lucide icon="Eye" className="h-4 w-4" />
                  </Button>
                  
                </Table.Td>
              </Table.Tr>
            </Table.Tbody>
          </Table>
        </div>
        <div className="intro-y col-span-10 flex flex-wrap items-center sm:flex-row sm:flex-nowrap ">
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
        <Dialog
              size="lg"
              open={packagePreview}
              onClose={() => {
                setPackagePreview(false)
              }}
            >
              <Dialog.Panel className="max-h-screen overflow-y-auto">
                <Dialog.Title>
                  <h2 className="mr-auto text-base font-medium">{`${t(
                    'settings.fields.addNewInvoice.title'
                  )}`}</h2>
                </Dialog.Title>
                <a
                  onClick={() => {
                    setPackagePreview(false)
                  }}
                  className="absolute right-0 top-0 mr-3 mt-3"
                  href="#"
                >
                  <Lucide icon="X" className="h-8 w-8 text-slate-400" />
                </a>

                <Dialog.Description className="grid gap-7 md:grid-cols-1">
  <div className="grid grid-cols-8 gap-5">
    <div className=" p-5 cursor-pointer sm:col-span-4 2xl:col-span- box bg-secondary ">
    <div className="dark:text-white-500"><strong>Business Name :</strong> StoreMate v3.0</div>
    <div className="dark:text-white-500 mt-2"><strong>Email :</strong> support@storemate.lk</div>
    <div className="dark:text-white-500 mt-2"><strong>Landmark :</strong> Landmark</div>
    <div className="dark:text-white-500 mt-2"><strong>City :</strong>Battaramulla  <strong>Zip Code :</strong> 20000</div>
    <div className="dark:text-white-500 mt-2"><strong>State :</strong> Sri Lanka</div>
    </div>
    <div className="p-5 cursor-pointer sm:col-span-4 2xl:col-span- box bg-secondary">
      <div className="dark:text-white-500"><strong>Business Name :</strong> StoreMate v3.0</div>
    </div>
  </div>
  <div className="intro-y overflow-x-auto ">
    <Table>
        <Table.Thead variant="dark">
            <Table.Tr>
                <Table.Th className="whitespace-nowrap">
                Package
                </Table.Th>
                <Table.Th className="whitespace-nowrap text-right">
                   Quantity
                </Table.Th>
                <Table.Th className="whitespace-nowrap text-right">
                   Price
                </Table.Th>
               
            </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
            <Table.Tr>
                <Table.Td>Staff 2</Table.Td>
                <Table.Td className="text-right">1</Table.Td>
                <Table.Td className="text-right">₨ 0.00</Table.Td>
            </Table.Tr>
            <Table.Tr>
                <Table.Td>Staff 2</Table.Td>
                <Table.Td className="text-right">1</Table.Td>
                <Table.Td className="text-right">₨ 0.00</Table.Td>
            </Table.Tr>
        </Table.Tbody>
    </Table>
</div>
{/* <div className="border-b  border-slate-200/60 dark:border-darkmode-400  " /> */}
<div className="flex-1 overflow-x-auto">
    <Table>
       
        <Table.Tbody>
            <Table.Tr>
                <Table.Td className='font-medium'>Created At</Table.Td>
                <Table.Td >	01/05/2022</Table.Td>
            </Table.Tr>
            <Table.Tr>
                <Table.Td className='font-medium'>Created By</Table.Td>
                <Table.Td >Namal Attanayake</Table.Td>
            </Table.Tr>
            <Table.Tr>
                <Table.Td className='font-medium'>Payment Transaction ID</Table.Td>
                <Table.Td >	01/05/2022</Table.Td>
            </Table.Tr>
            <Table.Tr>
                <Table.Td className='font-medium'>Paid Via</Table.Td>
                <Table.Td >Online</Table.Td>
            </Table.Tr>
        </Table.Tbody>
    </Table>
</div>
<div className=" flex-1 overflow-x-auto">
    
</div>

</Dialog.Description>


                <div className="flex justify-end px-4 pb-4 text-center  mb-5 ">
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
                      setPackagePreview(false)
                    }}
                    className="mb-2 mr-1 w-24"
                  >
                    Cancel
                  </Button>
                </div>
              </Dialog.Panel>
            </Dialog>
      </div>
<div className="border-b  border-slate-200/60 dark:border-darkmode-400  " />
      <div className="intro-y  mt-2  py-5  ">
      <div className="flex flex-col mb-4 font-medium text-base ">
                  <h2 className="mr-auto text-xl text-base font-medium mb-4">
                  Packages
                  </h2>
                  </div>
                  <div className='grid grid-cols-2 mb-5 lg:grid-cols-3 gap-1'>
              <div className="flex-1 py-12 intro-y box mb-5 ">
                <Lucide
                  icon="Rss"
                  className="block w-12 h-12 mx-auto text-primary"
                />
                <div className="mt-6 text-2xl font-medium text-center">
                FREE
                </div>

                <div className="mt-5 text-center ml-8 dark:">
                <div className="mx-1  ml-6 flex "><Lucide
                  icon="CheckCircle"
                  className="w-4 h-4 mr-2 text-primary"
                /> Unlimited Business Locations </div> 
               <div className="mx-1 mt-2 ml-6 flex "><Lucide
                  icon="CheckCircle"
                  className="w-4 h-4 mr-2  text-primary"
                /> Unlimited Users </div> 
                <div className="mx-1 mt-2 ml-6 flex "><Lucide
                  icon="CheckCircle"
                  className="w-4 h-4 mr-2  text-primary"
                /> Unlimited Products </div>
               <div className="mx-1 mt-2 ml-6 flex "><Lucide
                  icon="CheckCircle"
                  className="w-4 h-4 mr-2  text-primary"
                /> Unlimited Invoices </div> 
                
                <div className="mx-1 mt-2 ml-6 flex "><Lucide
                  icon="CheckCircle"
                  className="w-4 h-4 mr-2  text-primary"
                /> Repair Module </div>
                <div className="mx-1 mt-2 ml-6 flex "><Lucide
                  icon="CheckCircle"
                  className="w-4 h-4 mr-2  text-primary"
                /> WooCommerce Module </div>
                 <div className="mx-1 mt-2 ml-6 flex "><Lucide
                  icon="CheckCircle"
                  className="w-4 h-4 mr-2  text-primary"
                /> 7 Trial Days </div>
                </div>
                {/* <div className="px-10 mx-auto mt-2 text-center text-slate-500">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </div> */}
                <div className="flex justify-center">
                  <div className="relative mx-auto mt-8 text-3xl font-semibold">
                 Free for 7 days
                  </div>
                </div>
                {/* <div className="flex justify-center text-slate-500">
                  <div className="relative mx-auto mt-2 ">
                  12 Months
                  </div>
                </div> */}
                <Button
                  variant="primary"
                  rounded
                  type="button"
                  className="block px-4 py-3 mx-auto mt-8"
                >
                 SUBSCRIBE NOW
                </Button>
              </div>
              <div className="flex-1 py-12 intro-y box mb-5 lg:ml-5 ">
                <Lucide
                  icon="Star"
                  className="block w-12 h-12 mx-auto text-primary"
                />
                <div className="mt-6 text-2xl font-medium text-center">
                Golden
                </div>

                <div className="mt-5 text-center ml-8 dark:">
                <div className="mx-1  ml-6 flex "><Lucide
                  icon="CheckCircle"
                  className="w-4 h-4 mr-2 text-primary"
                /> Unlimited Business Locations </div> 
               <div className="mx-1 mt-2 ml-6 flex "><Lucide
                  icon="CheckCircle"
                  className="w-4 h-4 mr-2  text-primary"
                /> Unlimited Users </div> 
                <div className="mx-1 mt-2 ml-6 flex "><Lucide
                  icon="CheckCircle"
                  className="w-4 h-4 mr-2  text-primary"
                /> Unlimited Products </div>
               <div className="mx-1 mt-2 ml-6 flex "><Lucide
                  icon="CheckCircle"
                  className="w-4 h-4 mr-2  text-primary"
                /> Unlimited Invoices </div> 
                <div className="mx-1 mt-2 ml-6 flex "><Lucide
                  icon="CheckCircle"
                  className="w-4 h-4 mr-2  text-primary"
                /> 30 Trial Days </div> 
                </div>
                {/* <div className="px-10 mx-auto mt-2 text-center text-slate-500">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </div> */}
                <div className="flex justify-center">
                  <div className="relative mx-auto mt-8 text-3xl font-semibold">
                  ₨ 10,000.00
                  </div>
                </div>
                <div className="flex justify-center text-slate-500">
                  <div className="relative mx-auto mt-2 ">
                  6 Months
                  </div>
                </div>
                <Button
                  variant="primary"
                  rounded
                  type="button"
                  className="block px-4 py-3 mx-auto mt-8"
                >
                 SUBSCRIBE NOW
                </Button>
              </div>
              <div className="flex-1 py-12 intro-y box mb-5 lg:ml-5 ">
                <Lucide
                  icon="Shield"
                  className="block w-12 h-12 mx-auto text-primary"
                />
                <div className="mt-6 text-2xl font-medium text-center">
                Professional
                </div>

                <div className="mt-5 text-center ml-8 dark:">
                <div className="mx-1  ml-6 flex "><Lucide
                  icon="CheckCircle"
                  className="w-4 h-4 mr-2 text-primary"
                /> Unlimited Business Locations </div> 
               <div className="mx-1 mt-2 ml-6 flex "><Lucide
                  icon="CheckCircle"
                  className="w-4 h-4 mr-2  text-primary"
                /> Unlimited Users </div> 
                <div className="mx-1 mt-2 ml-6 flex "><Lucide
                  icon="CheckCircle"
                  className="w-4 h-4 mr-2  text-primary"
                /> Unlimited Products </div>
               <div className="mx-1 mt-2 ml-6 flex "><Lucide
                  icon="CheckCircle"
                  className="w-4 h-4 mr-2  text-primary"
                /> Unlimited Invoices </div> 
                <div className="mx-1 mt-2 ml-6 flex "><Lucide
                  icon="CheckCircle"
                  className="w-4 h-4 mr-2  text-primary"
                /> 15 Trial Days </div> 
                </div>
                {/* <div className="px-10 mx-auto mt-2 text-center text-slate-500">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </div> */}
                <div className="flex justify-center">
                  <div className="relative mx-auto mt-8 text-3xl font-semibold">
                  ₨ 10,000.00
                  </div>
                </div>
                <div className="flex justify-center text-slate-500">
                  <div className="relative mx-auto mt-2 ">
                  30 Days
                  </div>
                </div>
                <Button
                  variant="primary"
                  rounded
                  type="button"
                  className="block px-4 py-3 mx-auto mt-8"
                >
                 PAY & SUBSCRIBE
                </Button>
              </div>
              <div className="flex-1 py-12 intro-y box mb-5 ">
                <Lucide
                  icon="Star"
                  className="block w-12 h-12 mx-auto text-primary"
                />
                <div className="mt-6 text-2xl font-medium text-center">
                Golden
                </div>

                <div className="mt-5 text-center ml-8 dark:">
                <div className="mx-1  ml-6 flex "><Lucide
                  icon="CheckCircle"
                  className="w-4 h-4 mr-2 text-primary"
                /> Unlimited Business Locations </div> 
               <div className="mx-1 mt-2 ml-6 flex "><Lucide
                  icon="CheckCircle"
                  className="w-4 h-4 mr-2  text-primary"
                /> Unlimited Users </div> 
                <div className="mx-1 mt-2 ml-6 flex "><Lucide
                  icon="CheckCircle"
                  className="w-4 h-4 mr-2  text-primary"
                /> Unlimited Products </div>
               <div className="mx-1 mt-2 ml-6 flex "><Lucide
                  icon="CheckCircle"
                  className="w-4 h-4 mr-2  text-primary"
                /> Unlimited Invoices </div> 
                <div className="mx-1 mt-2 ml-6 flex "><Lucide
                  icon="CheckCircle"
                  className="w-4 h-4 mr-2  text-primary"
                /> 30 Trial Days </div> 
                </div>
                {/* <div className="px-10 mx-auto mt-2 text-center text-slate-500">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </div> */}
                <div className="flex justify-center">
                  <div className="relative mx-auto mt-8 text-3xl font-semibold">
                  ₨ 10,000.00
                  </div>
                </div>
                <div className="flex justify-center text-slate-500">
                  <div className="relative mx-auto mt-2 ">
                  12 Months
                  </div>
                </div>
                <Button
                  variant="primary"
                  rounded
                  type="button"
                  className="block px-4 py-3 mx-auto mt-8"
                >
                 SUBSCRIBE NOW
                </Button>
              </div>
              <div className="flex-1 py-12 intro-y box mb-5 lg:ml-5 ">
                <Lucide
                  icon="Star"
                  className="block w-12 h-12 mx-auto text-primary"
                />
                <div className="mt-6 text-2xl font-medium text-center">
                Golden
                </div>

                <div className="mt-5 text-center ml-8 dark:">
                <div className="mx-1  ml-6 flex "><Lucide
                  icon="CheckCircle"
                  className="w-4 h-4 mr-2 text-primary"
                /> Unlimited Business Locations </div> 
               <div className="mx-1 mt-2 ml-6 flex "><Lucide
                  icon="CheckCircle"
                  className="w-4 h-4 mr-2  text-primary"
                /> Unlimited Users </div> 
                <div className="mx-1 mt-2 ml-6 flex "><Lucide
                  icon="CheckCircle"
                  className="w-4 h-4 mr-2  text-primary"
                /> Unlimited Products </div>
               <div className="mx-1 mt-2 ml-6 flex "><Lucide
                  icon="CheckCircle"
                  className="w-4 h-4 mr-2  text-primary"
                /> Unlimited Invoices </div> 
                <div className="mx-1 mt-2 ml-6 flex "><Lucide
                  icon="CheckCircle"
                  className="w-4 h-4 mr-2  text-primary"
                /> 30 Trial Days </div> 
                </div>
                {/* <div className="px-10 mx-auto mt-2 text-center text-slate-500">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </div> */}
                <div className="flex justify-center">
                  <div className="relative mx-auto mt-8 text-3xl font-semibold">
                  ₨ 10,000.00
                  </div>
                </div>
                <div className="flex justify-center text-slate-500">
                  <div className="relative mx-auto mt-2 ">
                  12 Months
                  </div>
                </div>
                <Button
                  variant="primary"
                  rounded
                  type="button"
                  className="block px-4 py-3 mx-auto mt-8"
                >
                 SUBSCRIBE NOW
                </Button>
              </div>
              <div className="flex-1 py-12 intro-y box mb-5 lg:ml-5 ">
                <Lucide
                  icon="Star"
                  className="block w-12 h-12 mx-auto text-primary"
                />
                <div className="mt-6 text-2xl font-medium text-center">
                Golden
                </div>

                <div className="mt-5 text-center ml-8 dark:">
                <div className="mx-1  ml-6 flex "><Lucide
                  icon="CheckCircle"
                  className="w-4 h-4 mr-2 text-primary"
                /> Unlimited Business Locations </div> 
               <div className="mx-1 mt-2 ml-6 flex "><Lucide
                  icon="CheckCircle"
                  className="w-4 h-4 mr-2  text-primary"
                /> Unlimited Users </div> 
                <div className="mx-1 mt-2 ml-6 flex "><Lucide
                  icon="CheckCircle"
                  className="w-4 h-4 mr-2  text-primary"
                /> Unlimited Products </div>
               <div className="mx-1 mt-2 ml-6 flex "><Lucide
                  icon="CheckCircle"
                  className="w-4 h-4 mr-2  text-primary"
                /> Unlimited Invoices </div> 
                <div className="mx-1 mt-2 ml-6 flex "><Lucide
                  icon="CheckCircle"
                  className="w-4 h-4 mr-2  text-primary"
                /> 30 Trial Days </div> 
                </div>
                {/* <div className="px-10 mx-auto mt-2 text-center text-slate-500">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </div> */}
                <div className="flex justify-center">
                  <div className="relative mx-auto mt-8 text-3xl font-semibold">
                  ₨ 10,000.00
                  </div>
                </div>
                <div className="flex justify-center text-slate-500">
                  <div className="relative mx-auto mt-2 ">
                  12 Months
                  </div>
                </div>
                <Button
                  variant="primary"
                  rounded
                  type="button"
                  className="block px-4 py-3 mx-auto mt-8"
                >
                 SUBSCRIBE NOW
                </Button>
              </div>
                  </div></div>
    </div>
  )
}

export default Main
