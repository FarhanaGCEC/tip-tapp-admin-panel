/* eslint-disable react/no-string-refs */
/* eslint-disable import/extensions */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable import/order */
/* eslint-disable react/no-unknown-property */
/* eslint-disable react/self-closing-comp */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import _ from 'lodash'
import Table from '../../../components/common/table'
import { useRef, useState } from 'react'
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
} from '../../../components/common/form-elements/components'
import {
  SearchSelectElement,
  SelectElement,
  TextareaElement,
} from '../../../components/common/form-elements'
import SharedDataContainer from '../../../containers/sharedData'
import SlideoverRegistry from './slideover-registry'
import ShortcutKey from '../../../components/common/shortcut-key'
import SlideoverPanel from '../../../components/slideover-panel'
import { useTranslation } from 'react-i18next'
import PreviewImage from '../../../assets/images/fakers/image2.jpg'
import { Icons, NotificationTypes } from '../../../constants'
import Alert from "../../../base-components/Alert"
import { AlignmentTypes } from '../../../constants/common-enums'


interface FormContent {
  title: string
  component: JSX.Element
}

interface Props {
  setSliderContent: React.Dispatch<React.SetStateAction<any>>
}

function Main() {
  const { handleSlider } = SharedDataContainer.useContainer()
  // eslint-disable-next-line prettier/prettier
  const handleChange = () => {}

  const [sliderSize, setSliderSize] = useState('xl')

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

  const handleKeyUp = (keyName: string) => {
    if (keyName === 'alt+s') {
      handleClick(SlideoverRegistry.addAsset)
    }
  }
  const { register } = useForm()
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false)
  const deleteButtonRef = useRef(null)
  const { t } = useTranslation('pos')
  const [tooltipContent1] = useState(
    'Enable Woocommerce Sync for Selected Products'
  )
  const [tooltipContent2] = useState(
    'Deactivated Products will Not be Available for Purchase or Sell'
  )
  const [buttonReportHistoryPreview, setReportHistoryPreview] = useState(false)
  const [packagePreview, setPackagePreview] = useState(false)

  return (
    <div className="">
<div className="intro-y mt-4 flex flex-col items-center sm:flex-row">
            <h2 className="mr-auto text-lg font-medium ml-2">
            
              <h2 className="mr-auto text-lg font-medium">
                {`${t('Assets')}`}
               
              </h2>
            </h2>
            
          </div>
      <div className="intro-y box mb-5 mt-5 px-5 py-5 ">
      <Disclosure.Group>
                      <Disclosure>
                      <Disclosure.Button className="px-5 flex items-center">
                      Filters  <Lucide icon="Filter" className="w-4 h-4 ml-2" />
          
            {/* <Button className="px-2" variant="primary"  >
             
                <Lucide icon="Filter" className="w-5 h-5 " />
             
            </Button> */}
</Disclosure.Button>

                        <Disclosure.Panel className="leading-relaxed ">
                        <div className="mb-5 grid grid-cols-1 gap-5 px-5 pt-5 sm:grid-cols-4">
                        
          <SelectElement
           label={`${t('assets.fields.businessName.label')}`}
            register={register}
            name="businessName"
            id="businessName"
            labelAlignment={AlignmentTypes.BLOCK}
            // iconLeft={Icons.GIFT}
          />
          <SelectElement
           label={`${t('assets.fields.assetCategory.label')}`}
            register={register}
            name="assetCategory"
            id="assetCategory"
            labelAlignment={AlignmentTypes.BLOCK}
            // iconLeft={Icons.GIFT}
          />
          <SelectElement
           label={`${t('assets.fields.purchaseType.label')}`}
            register={register}
            name="purchaseType"
            id="purchaseType"
            labelAlignment={AlignmentTypes.BLOCK}
            // iconLeft={Icons.GIFT}
          />
          <FormCheck className='mt-7'>

<FormCheck.Input
  id="vertical-form-3"
  type="checkbox"
  value=""
  onChange={handleChange}
/> 
 <FormCheck.Label className="mr-2 " htmlFor="vertical-form-3">
 <div className=" font-medium">{`${t('assets.fields.isAllocated.label')}`}</div>
</FormCheck.Label>

</FormCheck>   
          
        </div>
                        </Disclosure.Panel>
                      </Disclosure>
                     
                    </Disclosure.Group>
   
      </div>
      <div className="intro-y box col-span-12">
        <div className="items-center justify-center border-slate-200/60 px-5 py-5 dark:border-darkmode-400 sm:py-3">
        <div className="intro-y ">
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
                            <Lucide icon="FileText" className="mr-2 h-4 w-4" />{' '}
                            As CSV
                          </Menu.Item>
                          <Menu.Item>
                            <Lucide icon="FileText" className="mr-2 h-4 w-4" />{' '}
                            As Excel
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
                        placeholder="Search "
                      />
                      <Lucide
                        icon="Search"
                        className="absolute inset-y-0 right-0 my-auto mr-2 h-5 w-8"
                      />
                    </div>
                    <Button
                     variant="primary"
                     onClick={() => handleClick(SlideoverRegistry.addAsset)}
                    >
                      Add
                    </Button>
                  </div>
                  {/* <div className='mb-5'>
                  <VariationTableElement register={register} />
                  </div> */}
  <div className=" mb-5 py-5" style={{ overflowY: 'auto' }}>

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
           Asset Code
            </Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
           Asset Name
            </Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
           Quantity
            </Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
           Warranty
            </Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
          Is Allocated?
            </Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
          Purchase Date
            </Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
          Allocated Quantity
            </Table.Th>
            <Table.Th className="whitespace-nowrap text-right bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
           Unit Price
            </Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
           Series/Model
            </Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
          Image
            </Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
          Business Location
            </Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
          Asset Category
            </Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
          Description
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
        <Table.Tr>
            <Table.Td className="!px-1" >
              <Menu>
                <Menu.Button
                  className="h-8 w-16 "
                  as={Button}
                  size="sm"
                  variant="primary"
                >
                  Action <Lucide icon="ChevronDown" className="w-4 h-4 ml-2" />
                </Menu.Button>
                <Menu.Items className="w-auto h-auto overflow-y-auto"  placement="right-start"
               >
               
                 
                  <Menu.Item  
          onClick={() => handleClick(SlideoverRegistry.editAsset)}
                >
                   <Lucide icon="Edit" className="mr-2 h-4 w-4" />
                    Edit
                  </Menu.Item>
                 
                  <Menu.Item>
                    <Lucide icon="Trash2" className="mr-2 h-4 w-4" />
                   Delete
                  </Menu.Item>
                  <Menu.Item onChange={handleChange}
          >
                    <Lucide icon="Mail" className="mr-2 h-4 w-4" />
                   Send Notification
                  </Menu.Item>
                </Menu.Items>
              </Menu>
            </Table.Td>
            <Table.Td className="!px-2">1234</Table.Td>
            <Table.Td className="!px-2">null</Table.Td>
            <Table.Td className="!px-2">null</Table.Td>
            <Table.Td className="!px-2">null</Table.Td>
            <Table.Td className="!px-2">null</Table.Td>
            <Table.Td className="!px-2">2023.10.09</Table.Td>
            <Table.Td className="!px-2">null</Table.Td>
            <Table.Td className="!px-2 text-right">Rs.200.00</Table.Td>
            <Table.Td className="!px-2">null</Table.Td>
            <Table.Td className="!px-2">null</Table.Td>
            <Table.Td className="!px-2">null</Table.Td>
            <Table.Td className="!px-2">null</Table.Td>
            <Table.Td className="!px-2">null</Table.Td>
          </Table.Tr>
        </Table.Tbody>
      </Table>

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
                    'Admin1'
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


{/* <div className="border-b  border-slate-200/60 dark:border-darkmode-400  " /> */}
<div className="flex-1 overflow-x-auto">
    <Table>
       
        <Table.Tbody>
            <Table.Tr>
                <Table.Td className='font-medium'>Campaign Type</Table.Td>
                <Table.Td >	SMS</Table.Td>
            </Table.Tr>
            <Table.Tr>
                <Table.Td className='font-medium'>Sms Body</Table.Td>
                <Table.Td >description</Table.Td>
            </Table.Tr>
            <Table.Tr>
                <Table.Td className='font-medium'>Transaction Activity</Table.Td>
                <Table.Td >Has no transactions</Table.Td>
            </Table.Tr>
            <Table.Tr>
                <Table.Td className='font-medium'>In days</Table.Td>
                <Table.Td >9 days</Table.Td>
            </Table.Tr>
        </Table.Tbody>
    </Table>
</div>
Miss Nimasha Nayanamini created this campaign on 11/08/2023

</Dialog.Description>


                <div className="flex justify-end px-4 pb-4 text-center  ">
                  
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
        </div>
      </div>
      <ShortcutKey onKeyUp={handleKeyUp} />
      <SlideoverPanel
        close
        size={sliderSize}
        heading={sliderContent.header}
        footer={sliderContent.footer}
      >
        {sliderContent.children}
      </SlideoverPanel>
    </div>
  )
}

export default Main
