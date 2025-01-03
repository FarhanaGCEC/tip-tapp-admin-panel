/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
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
import VerticalBarChart1 from '../../../components/VerticalBarChart1'

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
  const [select, setSelect] = useState('1')
  const [date, setDate] = useState('')
  const [purchaseDetailsPreview, setPurchaseDetailsPreview] = useState(false)
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false)
  const deleteButtonRef = useRef(null)

  const [tooltipContent2] = useState(
    'Top selling products of your shop. Apply filters to know trending products for specific Category, Brand, Business Location etc.'
  )

  const [checked, setChecked] = useState(false)
  const [paidViewPreview, setPaidViewPreview] = useState(false)

  const [productPricePreview, setproductPricePreview] = useState(false)
  const [daterange, setDaterange] = useState('')
  const tabListStyle = {
    display: 'flex',
    flexWrap: 'wrap',
  }

  const tabButtonStyle = {
    display: 'inline-block',
    width: '120px', // Adjust the width as needed
  }
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
  const [showMoreInfo, setShowMoreInfo] = useState(false)
  const handleMoreInfoClick = () => {
    setShowMoreInfo(!showMoreInfo)
  }
  const [showTableHead, setShowTableHead] = useState(false)

  const handleChange = () => {
    // Toggle the state to show/hide the <Table.Thead>
    setShowTableHead(!showTableHead)
  }

  return (
    <div>
      <div className="intro-y mt-4 flex flex-col items-center sm:flex-row">
        <h2 className="ml-2 mr-auto text-lg font-medium">Trending Products</h2>
      </div>

      <Tab.Group className="">
        <div className="intro-y mt-6 flex justify-center">
          <Tab.List
            variant="pills"
            className="box mx-auto w-auto overflow-hidden rounded-full"
          >
            <Tab>
              <Tab.Button
                className="w-54 rounded-none py-2 lg:w-64 lg:py-3"
                as="button"
              >
                Chart
              </Tab.Button>
            </Tab>
            <Tab>
              <Tab.Button
                className="w-54 rounded-none py-2 lg:w-64 lg:py-3"
                as="button"
              >
                Table
              </Tab.Button>
            </Tab>
          </Tab.List>
        </div>

        <Tab.Panels className="pb-5">
          <Tab.Panel className="mt-5">
            <div className="intro-y box mb-5 mt-5 px-5 py-5 ">
              <Disclosure.Group>
                <Disclosure>
                  <Disclosure.Button className="flex items-center px-5">
                    Filters <Lucide icon="Filter" className="ml-2 h-4 w-4" />
                    {/* <Button className="px-2" variant="primary"  >
             
                <Lucide icon="Filter" className="w-5 h-5 " />
             
            </Button> */}
                  </Disclosure.Button>

                  <Disclosure.Panel className="leading-relaxed ">
                    <div className="mb-5 grid grid-cols-1 gap-5 px-5 pt-5 sm:grid-cols-4">
                      <SearchSelectElement
                        label={`${t(
                          'purchases.fields.businessLocation.label'
                        )}`}
                        register={register}
                        name="businessLocation"
                        id="businessLocation"
                        onChange={handleChange}
                        labelAlignment={AlignmentTypes.BLOCK}
                        // iconLeft={Icons.GIFT}
                      />
                      <SearchSelectElement
                        label={`${t('reports.fields.categories.label')}`}
                        register={register}
                        name="categories"
                        id="categories"
                        onChange={handleChange}
                        labelAlignment={AlignmentTypes.BLOCK}
                        // iconLeft={Icons.GIFT}
                      />
                      <SearchSelectElement
                        label={`${t('reports.fields.subCategory.label')}`}
                        register={register}
                        name="subCategory"
                        id="subCategory"
                        onChange={handleChange}
                        labelAlignment={AlignmentTypes.BLOCK}
                        // iconLeft={Icons.GIFT}
                      />
                      <SearchSelectElement
                        label={`${t('reports.fields.brand.label')}`}
                        register={register}
                        name="brand"
                        id="brand"
                        onChange={handleChange}
                        labelAlignment={AlignmentTypes.BLOCK}
                        // iconLeft={Icons.GIFT}
                      />
                      <SearchSelectElement
                        label={`${t('reports.fields.unit.label')}`}
                        register={register}
                        name="unit"
                        id="unit"
                        onChange={handleChange}
                        labelAlignment={AlignmentTypes.BLOCK}
                        // iconLeft={Icons.GIFT}
                      />
                      <div>
                        <div className="font-medium">
                          {`${t('purchases.fields.dateRange.label')}`}{' '}
                        </div>
                        {/* <Lucide
                        icon="Calendar"
                        className="absolute inset-y-0 left-0 z-10 my-auto ml-4 h-4 w-4"
                      /> */}
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
                          className="box sm:w-54  mt-2.5"
                        />
                      </div>
                      <SearchSelectElement
                        label={`${t('reports.fields.NoProducts.label')}`}
                        register={register}
                        name="NoProducts"
                        id="NoProducts"
                        info={`${t('reports.fields.NoProducts.tooltip')}`}
                        onChange={handleChange}
                        labelAlignment={AlignmentTypes.BLOCK}
                        // iconLeft={Icons.GIFT}
                      />
                      <SearchSelectElement
                        label={`${t('reports.fields.productType.label')}`}
                        register={register}
                        name="productType"
                        id="productType"
                        onChange={handleChange}
                        labelAlignment={AlignmentTypes.BLOCK}
                        // iconLeft={Icons.GIFT}
                      />
                    </div>
                    <div className=" mt-5 flex justify-end">
                      <Button
                        type="submit"
                        variant="primary"
                        className="mb-2 mr-1 w-24"
                      >
                        {`${t('common.button.apply')}`}
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
                  </Disclosure.Panel>
                </Disclosure>
              </Disclosure.Group>
            </div>

            <div className="intro-y box col-span-12 mb-5  mt-5">
              <div className="flex items-center border-b border-slate-200/60 p-5 dark:border-darkmode-400">
                <h2 className="mr-auto flex text-base font-medium">
                  Top Trending Products
                  <Tippy content={tooltipContent2}>
                    {' '}
                    <a>
                      {' '}
                      <Lucide icon="Info" className=" mx-2 mt-0.5 h-5 w-5 " />
                    </a>{' '}
                  </Tippy>
                </h2>
                <Menu className="ml-auto">
                  <Menu.Button className="block h-5 w-5">
                    <Lucide
                      icon="MoreHorizontal"
                      className="h-5 w-5 text-slate-500"
                    />
                  </Menu.Button>
                  <Menu.Items className="w-48">
                    <Menu.Item>
                      {/* <Lucide icon="Plus" className="w-4 h-4 mr-2" /> */}
                      View in Full Screen
                    </Menu.Item>
                    <Menu.Item>Print Chart</Menu.Item>
                    <Menu.Devider></Menu.Devider>
                    <Menu.Item>Download PNG Image</Menu.Item>
                    <Menu.Item>Download JPEG Image</Menu.Item>
                    <Menu.Item>Download PDF</Menu.Item>
                    <Menu.Item>Download SVG Vector Image</Menu.Item>
                  </Menu.Items>
                </Menu>
              </div>

              <div className="p-5">
                <VerticalBarChart1 height={350} />
              </div>
            </div>
            <div className=" mt-5 flex justify-end">
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
          </Tab.Panel>
          <Tab.Panel className="mt-5">
            <div className="intro-y box mb-5 mt-5 px-5 py-5 ">
              <Disclosure.Group>
                <Disclosure>
                  <Disclosure.Button className="flex items-center px-5">
                    Filters <Lucide icon="Filter" className="ml-2 h-4 w-4" />
                    {/* <Button className="px-2" variant="primary"  >
             
                <Lucide icon="Filter" className="w-5 h-5 " />
             
            </Button> */}
                  </Disclosure.Button>

                  <Disclosure.Panel className="leading-relaxed ">
                    <div className="mb-5 grid grid-cols-1 gap-5 px-5 pt-5 sm:grid-cols-4">
                      <div className="sm:w-76 flex flex-col sm:mt-0">
                        <span className="mb-2 font-medium">{`${t(
                          'productManagement.fields.filters.fields.searchProduct.label'
                        )}`}</span>

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
                        label={`${t('reports.fields.customer.label')}`}
                        register={register}
                        name="customer"
                        id="customer"
                        onChange={handleChange}
                        labelAlignment={AlignmentTypes.BLOCK}
                        // iconLeft={Icons.GIFT}
                      />
                      <SearchSelectElement
                        label={`${t(
                          'purchases.fields.businessLocation.label'
                        )}`}
                        register={register}
                        name="businessLocation"
                        id="businessLocation"
                        onChange={handleChange}
                        labelAlignment={AlignmentTypes.BLOCK}
                        // iconLeft={Icons.GIFT}
                      />
                      <div>
                        <div className="font-medium">
                          {`${t('purchases.fields.dateRange.label')}`}{' '}
                        </div>
                        {/* <Lucide
                        icon="Calendar"
                        className="absolute inset-y-0 left-0 z-10 my-auto ml-4 h-4 w-4"
                      /> */}
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
                          className="box sm:w-54  mt-2.5"
                        />
                      </div>
                      <SearchSelectElement
                        label={`${t('reports.fields.categories.label')}`}
                        register={register}
                        name="categories"
                        id="categories"
                        onChange={handleChange}
                        labelAlignment={AlignmentTypes.BLOCK}
                        // iconLeft={Icons.GIFT}
                      />
                      <SearchSelectElement
                        label={`${t('reports.fields.subCategory.label')}`}
                        register={register}
                        name="subCategory"
                        id="subCategory"
                        onChange={handleChange}
                        labelAlignment={AlignmentTypes.BLOCK}
                        // iconLeft={Icons.GIFT}
                      />
                      <SearchSelectElement
                        label={`${t('reports.fields.brand.label')}`}
                        register={register}
                        name="brand"
                        id="brand"
                        onChange={handleChange}
                        labelAlignment={AlignmentTypes.BLOCK}
                        // iconLeft={Icons.GIFT}
                      />
                      <SearchSelectElement
                        label={`${t('reports.fields.unit.label')}`}
                        register={register}
                        name="unit"
                        id="unit"
                        onChange={handleChange}
                        labelAlignment={AlignmentTypes.BLOCK}
                        // iconLeft={Icons.GIFT}
                      />

                      <SearchSelectElement
                        label={`${t('reports.fields.productType.label')}`}
                        register={register}
                        name="productType"
                        id="productType"
                        onChange={handleChange}
                        labelAlignment={AlignmentTypes.BLOCK}
                        // iconLeft={Icons.GIFT}
                      />
                    </div>
                  </Disclosure.Panel>
                </Disclosure>
              </Disclosure.Group>
            </div>
            <div className="intro-y box mb-5 mt-5 px-5 py-5 ">
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
                    placeholder="Search Status"
                  />
                  <Lucide
                    icon="Search"
                    className="absolute inset-y-0 right-0 my-auto mr-2 h-5 w-8"
                  />
                </div>
              </div>
              <div className=" mb-3 py-5" style={{ overflowY: 'auto' }}>
                <Table bordered hover>
                  <Table.Thead variant="dark">
                    <Table.Tr>
                      <Table.Th className="whitespace-nowrap">Product</Table.Th>
                      <Table.Th className="whitespace-nowrap">SKU</Table.Th>
                      <Table.Th className="whitespace-nowrap ">
                        Total Unit Sold
                      </Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    <Table.Tr>
                      <Table.Td>Bluetooth headset</Table.Td>
                      <Table.Td> 76981</Table.Td>
                      <Table.Td>81.00 Pc(s)</Table.Td>
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
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}

export default Main
