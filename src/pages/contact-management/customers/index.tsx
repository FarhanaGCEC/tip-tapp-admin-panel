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
import Lucide from '../../../components/common/lucide'
import { Menu, Dialog } from '../../../components/common/headless'
import Pagination from '../../../components/common/pagination'
import {
  FormInput,
  FormSelect,
} from '../../../components/common/form-elements/components'
import SharedDataContainer from '../../../containers/sharedData'
import SlideoverRegistry from './slideover-registry'
import ShortcutKey from '../../../components/common/shortcut-key'
import SlideoverPanel from '../../../components/slideover-panel'
import { useTranslation } from 'react-i18next'
import PreviewImage from '../../../assets/images/fakers/image2.jpg'

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
      handleClick(SlideoverRegistry.addCustomers)
    }
  }
  const { register } = useForm()
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false)
  const deleteButtonRef = useRef(null)
  const { t } = useTranslation('pos')

  return (
    <div className="">
      <div className="intro-y mt-4 flex flex-col items-center sm:flex-row">
            <h2 className="mr-auto text-lg font-medium ml-2">
              {' '}
              <h2 className="mr-auto text-lg font-medium">
                {`${t('contactManagement.fields.customers.title')}`}
                <Button
                  variant="twitter"
                  className="intro-y mx-1 h-7 w-7 rounded-full"
                >
                ? 
                </Button>
              </h2>{' '}
            </h2>
            <div className="mt-4 flex w-full sm:mt-0 sm:w-auto">
              <Button
                variant="primary"
                className="mr-2 shadow-md sm:w-auto"
                onChange={handleChange}
                onClick={() => handleClick(SlideoverRegistry.addCustomers)}
              >
                Add New Contact
              </Button>

              <Button
                variant="primary"
                className=" mr-2 px-2 "
                onChange={handleChange}
                onClick={() => handleClick(SlideoverRegistry.addCustomers)}
              >
                <span className="flex h-5 w-5 items-center justify-center">
                  <Lucide icon="Plus" className="h-4 w-4" />
                </span>
              </Button>
            </div>
          </div>  
        <div className="intro-y box mb-5 mt-5 px-5 py-5 ">    
          <div className="mt- intro-y flex flex-col items-center sm:flex-row ">
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
                <Lucide icon="Eye" className="mr-2 h-4 w-4" /> Column Visibility
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
                    <Lucide icon="FileText" className="mr-2 h-4 w-4" /> As CSV
                  </Menu.Item>
                  <Menu.Item>
                    <Lucide icon="FileText" className="mr-2 h-4 w-4" /> As Excel
                  </Menu.Item>
                  <Menu.Item>
                    <Lucide icon="FileText" className="mr-2 h-4 w-4" /> Print
                  </Menu.Item>
                  <Menu.Item>
                    <Lucide icon="FileText" className="mr-2 h-4 w-4" /> Export
                    to PDF
                  </Menu.Item>
                </Menu.Items>
              </Menu>
            </div>

            <div className="relative ml-2 mr-2 flex sm:mt-0 sm:w-auto">
              <FormInput
                type="text"
                className="box custom-input  w-64"
                placeholder="Search here"
              />
              <Lucide
                icon="Search"
                className="absolute inset-y-0 right-0 my-auto mr-2 h-5 w-8"
              />
            </div>
          </div>
          {/* <VariationTableElement register={register} /> */}
          <div className=" mb-3 py-5" style={{ overflowY: 'auto' }}>
            
            <Table
            //   bordered
            //   striped
              hover
              style={{ width: '100%', whiteSpace: 'nowrap' }}
            >
              <Table.Thead variant="dark">
                <Table.Tr>
                  <Table.Th className="whitespace-nowrap bg-slate-50 text-slate-500 dark:bg-darkmode-800"></Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                    Action
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                    Contact ID
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                    Business Name
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                    Name
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                    Email
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                    Tax Number
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                    Credit Limit
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                    Pay Term
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                    Opening Balance
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                    Advance Balance
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                    Added On
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                    Star Points
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                    Customer Group
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                    Address
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                    Mobile
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                    Total Sale Due
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                    Total Sale Return Due
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                    Customer Field 1
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                    Customer Field 2
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                    Customer Field 3
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                    Customer Field 4
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                    Customer Field 5
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                    Customer Field 6
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                    Customer Field 7
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                    Customer Field 8
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                    Customer Field 9
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                    Customer Field 10
                  </Table.Th>

                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                <Table.Tr>
                  <Table.Td>
                    <div className="image-fit mr-3 h-10 w-10">
                      <img
                        alt="Midone Tailwind HTML Admin Template"
                        className="rounded-full"
                        src={PreviewImage}
                      />
                    </div>
                  </Table.Td>
                  <Table.Td className="!px-1">
                    <Menu>
                      <Menu.Button
                        className="h-8 w-16 "
                        as={Button}
                        size="sm"
                        variant="primary"
                      >
                        Action <Lucide icon="ChevronDown" className="w-4 h-4 ml-2" />
                      </Menu.Button>
                      <Menu.Items className="w-48 h-48 overflow-y-auto"  placement="right-start" >
                      <Menu.Item onChange={handleChange}
                onClick={() => handleClick(SlideoverRegistry.addPayCustomer)}>
                          <Lucide icon="Repeat" className="mr-2 h-4 w-4" />
                          Pay
                        </Menu.Item>
                        <Menu.Item onChange={handleChange}
                onClick={() => handleClick(SlideoverRegistry.addPayCustomer)}>
                      <Lucide icon="CornerUpLeft" className="mr-2 h-4 w-4" /> 
                          Pay Sell Return Due
                        </Menu.Item>
                        <Menu.Item onChange={handleChange}
                onClick={() => handleClick(SlideoverRegistry.viewCustomer)}>
                          <Lucide icon="Eye" className="mr-2 h-4 w-4" /> 
                          View
                        </Menu.Item >
                        <Menu.Item  onChange={handleChange}
                onClick={() => handleClick(SlideoverRegistry.editCustomer)}
                      >
                         <Lucide icon="Edit" className="mr-2 h-4 w-4" />
                          Edit
                        </Menu.Item>
                        <Menu.Item>
                          <Lucide icon="Power" className="mr-2 h-4 w-4" />
                         Deactivate
                        </Menu.Item>
                        <Menu.Devider />
                        
                        <Menu.Item onChange={handleChange}
                onClick={() => handleClick(SlideoverRegistry.viewCustomer)}>
                          <Lucide icon="FileText" className="mr-2 h-4 w-4" />
                         Ledger
                        </Menu.Item>
                        <Menu.Item onChange={handleChange}
                onClick={() => handleClick(SlideoverRegistry.viewCustomer)}>
                          <Lucide icon="ArrowUpCircle" className="mr-2 h-4 w-4" />
                         Sales
                        </Menu.Item>
                        <Menu.Item onChange={handleChange}
                onClick={() => handleClick(SlideoverRegistry.viewCustomer)}>
                          <Lucide icon="Link" className="mr-2 h-4 w-4" />
                         Documents
                        </Menu.Item>
                      </Menu.Items>
                    </Menu>
                  </Table.Td>
                  <Table.Td className="!px-2">C890867</Table.Td>
                  <Table.Td className="!px-2">Lizas Closet</Table.Td>
                  <Table.Td className="!px-2">Liza</Table.Td>
                  <Table.Td className="!px-2">nanda@gmail.com</Table.Td>
                  <Table.Td className="!px-2">34234</Table.Td>
                  <Table.Td className="!px-2">Rs.4545454.00</Table.Td>
                  <Table.Td className="!px-2">Jan-June</Table.Td>
                  <Table.Td className="!px-2">Rs.4545454.00</Table.Td>
                  <Table.Td className="!px-2">Rs.4545454.00</Table.Td>
                  <Table.Td className="!px-2">2023/09/23</Table.Td>
                  <Table.Td className="!px-2">
                  Rs.4545454.00
                  </Table.Td>
                  <Table.Td className="!px-2">Null</Table.Td>
                  <Table.Td className="!px-2">No 17, Kandy</Table.Td>
                  <Table.Td className="!px-2">071 6578906</Table.Td>
                  <Table.Td className="!px-2">Rs.4545454.00</Table.Td>
                  <Table.Td className="!px-2">Rs.4545454.00</Table.Td>
                  <Table.Td className="!px-2">1</Table.Td>
                  <Table.Td className="!px-2">2</Table.Td>
                  <Table.Td className="!px-2">3</Table.Td>
                  <Table.Td className="!px-2">4</Table.Td>
                  <Table.Td className="!px-2">5</Table.Td>
                  <Table.Td className="!px-2">2</Table.Td>
                  <Table.Td className="!px-2">3</Table.Td>
                  <Table.Td className="!px-2">4</Table.Td>
                  <Table.Td className="!px-2">5</Table.Td>
                  <Table.Td className="!px-2">5</Table.Td>
                </Table.Tr>
              </Table.Tbody>
              <Table.Thead variant="dark">
                <Table.Tr>
                  <Table.Th className="whitespace-nowrap bg-slate-50 text-slate-500 dark:bg-darkmode-800"></Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                    
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                   
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                    
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                   
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                    
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                  Total:
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                  RS.100,000.00
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                  RS.100,000.00
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                  
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                   
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                   
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                   
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                   
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                   
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                   
                   </Table.Th>
                   <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                   
                   </Table.Th>
                   <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                   
                   </Table.Th>
                   <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                   
                   </Table.Th>
                   <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                   
                   </Table.Th>
                   <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                   
                   </Table.Th>
                   <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                   
                   </Table.Th>
                   <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                   
                   </Table.Th>
                   <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                   
                   </Table.Th>
                   <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                   
                   </Table.Th>
                   <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                   
                   </Table.Th>
                   <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                   
                   </Table.Th>
                   <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                   
                   </Table.Th>
                </Table.Tr>
              </Table.Thead>
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
