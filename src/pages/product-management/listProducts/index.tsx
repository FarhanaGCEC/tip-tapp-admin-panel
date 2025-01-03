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
      handleClick(SlideoverRegistry.addProducts)
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
                {`${t('productManagement.fields.listProduct.title')}`}
                <Button
                  variant="twitter"
                  className="intro-y mx-1 h-7 w-7 rounded-full"
                >
                ? 
                </Button>
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
                        <div className="flex flex-col sm:mt-0 sm:w-76">
  <span className="mb-2 font-medium">{`${t('productManagement.fields.filters.fields.searchProduct.label')}`}</span>

  <div className="relative">
    <FormInput
      type="text"
      className="box custom-input"
      placeholder="Enter Product Name SKU"
    />

    <Lucide
      icon="Search"
      className="absolute inset-y-0 right-0 my-auto mr-2 h-5 w-8"
    />
  </div>
</div>


          <SearchSelectElement
           label={`${t('productManagement.fields.filters.fields.type.label')}`}
            register={register}
            name="type"
            id="type"
            onChange={handleChange}
            labelAlignment={AlignmentTypes.BLOCK}
            // iconLeft={Icons.GIFT}
          />
          <SearchSelectElement
           label={`${t('productManagement.fields.filters.fields.category.label')}`}
            register={register}
            name="category"
            id="category"
            onChange={handleChange}
            labelAlignment={AlignmentTypes.BLOCK}
            // iconLeft={Icons.GIFT}
          />
          <SearchSelectElement
          label={`${t('productManagement.fields.filters.fields.unit.label')}`}
          labelAlignment={AlignmentTypes.BLOCK}
            register={register}
            name="unit"
            id="unitr"
            onChange={handleChange}
       
          />
          <SearchSelectElement
          label={`${t('productManagement.fields.filters.fields.tax.label')}`}
          labelAlignment={AlignmentTypes.BLOCK}
            register={register}
            name="tax"
            id="tax"
            onChange={handleChange}
        
          />
          <SearchSelectElement
          label={`${t('productManagement.fields.filters.fields.brand.label')}`}
          labelAlignment={AlignmentTypes.BLOCK}
            register={register}
            name="brand"
            id="brand"
            onChange={handleChange}
     
          />
          <SearchSelectElement
           label={`${t('productManagement.fields.filters.fields.businessLocation.label')}`}
           labelAlignment={AlignmentTypes.BLOCK}
            register={register}
            name="businessLocation"
            id="businessLocation"
            onChange={handleChange}
     
          />
          <SearchSelectElement
           label={`${t('productManagement.fields.filters.fields.activeStatus.label')}`}
           labelAlignment={AlignmentTypes.BLOCK}
            register={register}
            name="activeStatus"
            id="activeStatus"
            onChange={handleChange}

          />
          <SearchSelectElement
           label={`${t('productManagement.fields.filters.fields.productsServices.label')}`}
           labelAlignment={AlignmentTypes.BLOCK}
            register={register}
            name="productsServices"
            id="productsServices"
            onChange={handleChange}

          />
          <SearchSelectElement
           label={`${t('productManagement.fields.filters.fields.deviceModel.label')}`}
           labelAlignment={AlignmentTypes.BLOCK}
            register={register}
            name="deviceModel"
            id="deviceModel"
            onChange={handleChange}

          />
         <FormCheck className="mt-7">

            <FormCheck.Input
              id="vertical-form-3"
              type="checkbox"
              value=""
              onChange={handleChange}
            /> 
             <FormCheck.Label className="mr-2" htmlFor="vertical-form-3">
             <div className="mr-2 font-medium">{`${t('productManagement.fields.filters.fields.notSelling.label')}`}</div>
            </FormCheck.Label>
          </FormCheck>
          <FormCheck className="mt-7">

            <FormCheck.Input
              id="vertical-form-3"
              type="checkbox"
              value=""
              onChange={handleChange}
            /> 
             <FormCheck.Label className="mr-2" htmlFor="vertical-form-3">
             <div className="mr-2 font-medium">{`${t('productManagement.fields.filters.fields.woocommerce.label')}`}</div>
            </FormCheck.Label>
          </FormCheck>
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
                  All Products
                </Tab.Button>
              </Tab>
              <Tab>
                <Tab.Button as="button" className="w-full px-2 py-1.5">
                  All Stocks
                </Tab.Button>
              </Tab>
            </Tab.List>
            <Tab.Panels className="px-5 pb-5">
              <Tab.Panel className="mt-5">
                <div className="intro-y mb-5">
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
                        placeholder="Search by Products"
                      />
                      <Lucide
                        icon="Search"
                        className="absolute inset-y-0 right-0 my-auto mr-2 h-5 w-8"
                      />
                    </div>
                    <Button
                      as="a" variant="primary" href="/product-management/addProducts"
                    >
                      Add
                    </Button>
                  </div>
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
                  <Table.Th className="whitespace-nowrap bg-slate-50 text-slate-500 dark:bg-darkmode-800">Image</Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                   Action
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                    Product
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                    Business Location
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                    Unit Purchase Price
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                   Selling Price
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                    Current Stock
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                    Product Type
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                   Category
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                    Brand
                  </Table.Th>
                  
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                    Tax
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                    SKU
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                   Custom Field
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                    Weight
                  </Table.Th>
                 
                  

                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
              <Table.Tr>
              <Table.Td className="!px-2"></Table.Td>
                  <Table.Td>
                    <div className="image-fit mr-3 h-10 w-10">
                      <img
                        alt="Midone Tailwind HTML Admin Template"
                        className="rounded-full"
                        src={PreviewImage}
                      />
                    </div>
                  </Table.Td>
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
                      <Menu.Items className="w-52 h-48 overflow-y-auto"  placement="right-start" >
                      <Menu.Item onChange={handleChange} 
               >
                          <Lucide icon="Repeat" className="mr-2 h-4 w-4" />
                          Labels
                        </Menu.Item>
                        
                        <Menu.Item onChange={handleChange}
                >
                          <Lucide icon="Eye" className="mr-2 h-4 w-4" /> 
                          View
                        </Menu.Item >
                        <Menu.Item  onClick={() => handleClick(SlideoverRegistry.editProducts)}
                
                      >
                         <Lucide icon="Edit" className="mr-2 h-4 w-4" />
                          Edit
                        </Menu.Item>
                        <Menu.Item  onChange={handleChange}
                        onClick={(event: { preventDefault: () => void }) => {
                          event.preventDefault();
                          setDeleteConfirmationModal(true);
                        }}
                      >
                          <Lucide icon="Trash" className="mr-2 h-4 w-4" />
                          Delete
                        </Menu.Item>
                        <Dialog
              open={deleteConfirmationModal}
              onClose={() => {
                setDeleteConfirmationModal(false)
              }}
              initialFocus={deleteButtonRef}
            >
              <Dialog.Panel >
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
                        <Menu.Devider />
                        
                        <Menu.Item onChange={handleChange}
                >
                          {/* <Lucide icon="FileText" className="mr-2 h-4 w-4" /> */}
                        Add or Edit Opening Stock
                        </Menu.Item>
                        <Menu.Item  onClick={() => handleClick(SlideoverRegistry.productStockHistory)}
                >
                          {/* <Lucide icon="ArrowUpCircle" className="mr-2 h-4 w-4" /> */}
                      Product Stock History
                        </Menu.Item>
                        <Menu.Item onClick={() => handleClick(SlideoverRegistry.addorEditGroupPrice)}
                >
                          {/* <Lucide icon="Link" className="mr-2 h-4 w-4" /> */}
                        Add or Edit Group Prices
                        </Menu.Item>
                        <Menu.Item onChange={handleChange}
                >
                          {/* <Lucide icon="Link" className="mr-2 h-4 w-4" /> */}
                        Duplicate Prodcut
                        </Menu.Item>
                      </Menu.Items>
                    </Menu>
                  </Table.Td>
                  <Table.Td className="!px-2">Frock</Table.Td>
                  <Table.Td className="!px-2">Lizas Closet</Table.Td>
                  <Table.Td className="!px-2">Rs.4545,454.00</Table.Td>
                  <Table.Td className="!px-2">Rs.4545,454.00</Table.Td>
                  <Table.Td className="!px-2">200Pc(s)</Table.Td>
                  <Table.Td className="!px-2">Cloth</Table.Td>
                  <Table.Td className="!px-2">Frock</Table.Td>
                  <Table.Td className="!px-2">Liza</Table.Td>
                  <Table.Td className="!px-2">Rs.454.00</Table.Td>
                  <Table.Td className="!px-2">
                  Rs.4545454.00
                  </Table.Td>
                  <Table.Td className="!px-2">Null</Table.Td>
                  <Table.Td className="!px-2">10g</Table.Td>
                  
               
                </Table.Tr>
                <Table.Tr>
              <Table.Td className="!px-2"></Table.Td>
                  <Table.Td>
                    <div className="image-fit mr-3 h-10 w-10">
                      <img
                        alt="Midone Tailwind HTML Admin Template"
                        className="rounded-full"
                        src={PreviewImage}
                      />
                    </div>
                  </Table.Td>
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
                      <Menu.Items className="w-52 h-48 overflow-y-auto"  placement="right-start" >
                      <Menu.Item onChange={handleChange}
               >
                          <Lucide icon="Repeat" className="mr-2 h-4 w-4" />
                          Labels
                        </Menu.Item>
                        
                        <Menu.Item onChange={handleChange}
                >
                          <Lucide icon="Eye" className="mr-2 h-4 w-4" /> 
                          View
                        </Menu.Item >
                        <Menu.Item  onChange={handleChange}
                
                      >
                         <Lucide icon="Edit" className="mr-2 h-4 w-4" />
                          Edit
                        </Menu.Item>
                        <Menu.Item>
                          <Lucide icon="Power" className="mr-2 h-4 w-4" />
                         Delete
                        </Menu.Item>
                        <Menu.Devider />
                        
                        <Menu.Item onChange={handleChange}
                >
                          {/* <Lucide icon="FileText" className="mr-2 h-4 w-4" /> */}
                        Add or Edit Opening Stock
                        </Menu.Item>
                        <Menu.Item onChange={handleChange}
                >
                          {/* <Lucide icon="ArrowUpCircle" className="mr-2 h-4 w-4" /> */}
                      Product Stock History
                        </Menu.Item>
                        <Menu.Item onChange={handleChange}
                >
                          {/* <Lucide icon="Link" className="mr-2 h-4 w-4" /> */}
                        Add or Edit Group Prces
                        </Menu.Item>
                        <Menu.Item onChange={handleChange}
                >
                          {/* <Lucide icon="Link" className="mr-2 h-4 w-4" /> */}
                        Duplicate Prodcut
                        </Menu.Item>
                      </Menu.Items>
                    </Menu>
                  </Table.Td>
                  <Table.Td className="!px-2">Frock</Table.Td>
                  <Table.Td className="!px-2">Lizas Closet</Table.Td>
                  <Table.Td className="!px-2">Rs.4545,454.00</Table.Td>
                  <Table.Td className="!px-2">Rs.4545,454.00</Table.Td>
                  <Table.Td className="!px-2">200Pc(s)</Table.Td>
                  <Table.Td className="!px-2">Cloth</Table.Td>
                  <Table.Td className="!px-2">Frock</Table.Td>
                  <Table.Td className="!px-2">Liza</Table.Td>
                  <Table.Td className="!px-2">Rs.454.00</Table.Td>
                  <Table.Td className="!px-2">
                  Rs.4545454.00
                  </Table.Td>
                  <Table.Td className="!px-2">Null</Table.Td>
                  <Table.Td className="!px-2">10g</Table.Td>
                  
               
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

                <Button
                  size="sm"
                  className="bg-danger text-white shadow-md sm:w-auto"
                  onChange={handleChange}
                >
                  Delete Selected
                </Button>
                <Button
                  size="sm"
                  className="bg-primary text-white shadow-md sm:w-auto"
                  onChange={handleChange}
                >
                  Bulk Edit
                </Button>
                <Button
                  size="sm"
                  className="bg-success text-white shadow-md sm:w-auto"
                  onChange={handleChange}
                  // onClick={() => handleClick(SlideoverRegistry.addProducts)}
                >
                  Add to Location
                </Button>
                <Button
                  size="sm"
                  className="bg-dark text-white shadow-md sm:w-auto"
                  onChange={handleChange}
                >
                  Remove from Location
                </Button>
                <Button
                  size="sm"
                  className="bg-danger text-white shadow-md sm:w-auto"
                  onChange={handleChange}
                >
                  Deactivate Selected{' '}
                  <Tippy content={tooltipContent2}>
                    {' '}
                    <a>
                      {' '}
                      <Lucide icon="Info" className="ml-1 h-4 w-4" />
                    </a>{' '}
                  </Tippy>
                </Button>

                <Button
                  size="sm"
                  className="bg-pending text-white shadow-md sm:w-auto"
                  onChange={handleChange}
                >
                  Disable Woocommerce Sync
                </Button>
                <Button
                  size="sm"
                  className="bg-primary text-white shadow-md sm:w-auto"
                  onChange={handleChange}
                >
                  Enable Woocommerce Sync
                  <Tippy content={tooltipContent1}>
                    {' '}
                    <a>
                      {' '}
                      <Lucide icon="Info" className="ml-1 h-4 w-4" />
                    </a>{' '}
                  </Tippy>
                </Button>
              </Tab.Panel>
              <Tab.Panel className="mt-5">
                <div className="intro-y mb-5">
                  <Alert variant="soft-danger" className="mb-2 text-center font-medium">
    This Report Generated at : 2023.08.30 16:16:09
</Alert>
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
                        placeholder="Search by Products"
                      />
                      <Lucide
                        icon="Search"
                        className="absolute inset-y-0 right-0 my-auto mr-2 h-5 w-8"
                      />
                    </div>
                    <Button
                      variant="primary"
                      className="shadow-md sm:w-auto"
                      onClick={(event: React.MouseEvent) => {
                        event.preventDefault()
                        setReportHistoryPreview(true)
                      }}
                    >
                      Report History
                    </Button>
                    <Dialog
                      size="lg"
                      open={buttonReportHistoryPreview}
                      onClose={() => {
                        setReportHistoryPreview(false)
                      }}
                    >
                      <Dialog.Panel className="max-h-screen overflow-y-auto">
                        <Dialog.Title>
                          <h2 className="mr-auto text-base font-medium">{`${t(
                            'productManagement.fields.selectReport.title'
                          )}`}</h2>
                        </Dialog.Title>
                        <a
                          onClick={(event: React.MouseEvent) => {
                            event.preventDefault()
                            setReportHistoryPreview(false)
                          }}
                          className="absolute right-0 top-0 mr-3 mt-3"
                          href="#"
                        >
                          <Lucide icon="X" className="h-8 w-8 text-slate-400" />
                        </a>

                        <Dialog.Description>
                          <div>
                            <Table>
                              <Table.Thead
                                variant="light"
                              >
                                <Table.Tr>
                                  <Table.Th className="whitespace-nowrap">
                                    Report ID
                                  </Table.Th>
                                  <Table.Th className="whitespace-nowrap">
                                    Generated At
                                  </Table.Th>
                                  <Table.Th className="whitespace-nowrap">
                                    Applied Filter
                                  </Table.Th>
                                  <Table.Th className="whitespace-nowrap text-center">
                                    Action
                                  </Table.Th>
                                </Table.Tr>
                              </Table.Thead>
                              <Table.Tbody>
                              <Table.Tr>
                                  <Table.Td>00767</Table.Td>
                                  <Table.Td> 2023-07-25 16:22:41</Table.Td>
                                  <Table.Td> No Filter Applied</Table.Td>
                                  <Table.Td className="flex justify-end">
                                    <Button
                                      size="sm"
                                      variant="primary"
                                      className="shadow-md sm:w-auto"
                                    >
                                      View History
                                    </Button>
                                  </Table.Td>
                                </Table.Tr>
                                <Table.Tr>
                                  <Table.Td>00767</Table.Td>
                                  <Table.Td> 2023-07-25 16:22:41</Table.Td>
                                  <Table.Td> No Filter Applied</Table.Td>
                                  <Table.Td className="flex justify-end">
                                    <Button
                                      size="sm"
                                      variant="primary"
                                      className="shadow-md sm:w-auto"
                                    >
                                      View History
                                    </Button>
                                  </Table.Td>
                                </Table.Tr>
                              </Table.Tbody>
                            </Table>
                          </div>
                        </Dialog.Description>

                        <div className=" flex justify-end px-3 pb-4 mr-4 text-center">
                          {/* <Button
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
                      </Button> */}
                          <Button
                            type="button"
                            variant="outline-secondary"
                            onClick={() => {
                              setReportHistoryPreview(false)
                            }}
                            className="mb-2 mr-1 w-24"
                          >
                            Cancel
                          </Button>
                        </div>
                      </Dialog.Panel>
                    </Dialog>
                  </div>
                  <div className=" mb-5 py-5" style={{ overflowY: 'auto' }}>
                    <VariationTableElementStockReport register={register} />
                  </div>

                  {/* <div className="intro-y col-span-10 flex flex-wrap items-center sm:flex-row sm:flex-nowrap">
            <div className="mr-auto  font-medium">
              Showing 1 to 10 of 150 entries
            </div>
           
          </div> */}
                </div>
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
