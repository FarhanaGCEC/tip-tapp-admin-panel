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
} from '../../../components/common/form-elements'
import SharedDataContainer from '../../../containers/sharedData'
import SlideoverRegistry from './slideover-registry'
import ShortcutKey from '../../../components/common/shortcut-key'
import SlideoverPanel from '../../../components/slideover-panel'
import { useTranslation } from 'react-i18next'
import PreviewImage from '../../../assets/images/fakers/image2.jpg'
import { Icons, NotificationTypes } from '../../../constants'
import VariationTableElement from './variationTable-element'
import VariationTableElementStockReport from './variationTableStockReport-Elements'
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
      handleClick(SlideoverRegistry.addCustomer)
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

  return (
    <div className="">
<div className="intro-y mt-4 flex flex-col items-center sm:flex-row">
            <h2 className="mr-auto text-lg font-medium ml-2">
            
              <h2 className="mr-auto text-lg font-medium">
                {`${t('Leads')}`}
               
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
                        <div className="mb-5 grid grid-cols-1 gap-5 px-5 pt-5 sm:grid-cols-3">
                        
          <SearchSelectElement
           label={`${t('lead.fields.source.label')}`}
            register={register}
            name="source"
            id="source"
            onChange={handleChange}
            labelAlignment={AlignmentTypes.BLOCK}
            // iconLeft={Icons.GIFT}
          />
          <SearchSelectElement
           label={`${t('lead.fields.lifeStage.label')}`}
            register={register}
            name="lifeStage"
            id="lifeStage"
            onChange={handleChange}
            labelAlignment={AlignmentTypes.BLOCK}
            // iconLeft={Icons.GIFT}
          />
          <SearchSelectElement
          label={`${t('lead.fields.assignedTo.label')}`}
          labelAlignment={AlignmentTypes.BLOCK}
            register={register}
            name="assignedTo"
            id="assignedTo"
            onChange={handleChange}
       
          />
          
        </div>
                        </Disclosure.Panel>
                      </Disclosure>
                     
                    </Disclosure.Group>
   
      </div>
      <div className="intro-y box col-span-12">
        <div className="items-center justify-center border-slate-200/60 px-5 py-5 dark:border-darkmode-400 sm:py-3">
          <Tab.Group className="">
            <Tab.List
              variant="pills"
              className="mx-auto w-60 rounded-md border-slate-300 p-1 dark:border-darkmode-300"
            >
              <Tab>
                <Tab.Button as="button" className="w-full px-2 py-1.5">
                  List View
                </Tab.Button>
              </Tab>
              <Tab>
                <Tab.Button as="button" className="w-full px-2 py-1.5">
                  Kanban Card
                </Tab.Button>
              </Tab>
            </Tab.List>
            <Tab.Panels className="px-5 pb-5">
              <Tab.Panel className="mt-5">
                <div className="intro-y ">
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
                     onClick={() => handleClick(SlideoverRegistry.addCustomer)}
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
             Contact ID
            </Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
             Name
            </Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
            Mobile
            </Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
             Email
            </Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
            Source
            </Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
             Last Follow Up
            </Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
           Upcoming Follow Up
            </Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
             Life Stage
            </Table.Th>
            
            <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
            Assigned To
            </Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
            Address
            </Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
            Tax Number
            </Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
              Added On
            </Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
              Custom Field 
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
                <Menu.Items className="w-52 h-auto overflow-y-auto"  placement="right-start"
               >
                
                  <Button onChange={handleChange}  as="a" href="../viewLead" 
          >
                    <Lucide icon="Eye" className="mr-2 h-4 w-4" /> 
                    Views
                  </Button >
                  <Menu.Item  onChange={handleChange}
                  onClick={() => handleClick(SlideoverRegistry.editCustomer)}
          
                >
                   <Lucide icon="Edit" className="mr-2 h-4 w-4" />
                    Edit
                  </Menu.Item>
                  <Menu.Item onChange={handleChange}
          >
                    <Lucide icon="RotateCw" className="mr-2 h-4 w-4" />
                    Convert to Customer
                  </Menu.Item>
                  <Menu.Item>
                    <Lucide icon="Trash2" className="mr-2 h-4 w-4" />
                   Delete
                  </Menu.Item>

                </Menu.Items>
              </Menu>
            </Table.Td>
            <Table.Td className="!px-2">1234</Table.Td>
            <Table.Td className="!px-2">Lizas Closet</Table.Td>
            <Table.Td className="!px-2">08154567890</Table.Td>
            <Table.Td className="!px-2">ertr@gmail.com</Table.Td>
            <Table.Td className="!px-2">123</Table.Td>
            <Table.Td className="!px-2">123</Table.Td>
            <Table.Td className="!px-2"><Button variant='primary' size='sm' className="mr-2 flex items-center"
             onClick={() => handleClick(SlideoverRegistry.addFollowUp)}>
                 Add Follow Up
                </Button></Table.Td>
            <Table.Td className="!px-2">Liza</Table.Td>
            <Table.Td className="!px-2">123</Table.Td>
            <Table.Td className="!px-2">
            123
            </Table.Td>
            <Table.Td className="!px-2">Null</Table.Td>
            <Table.Td className="!px-2">2023.10.09</Table.Td>
            <Table.Td className="!px-2">2023.10.09</Table.Td>
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

              
                
              </Tab.Panel>
              <Tab.Panel className="mt-5">

              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
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
