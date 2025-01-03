/* eslint-disable react/jsx-key */
/* eslint-disable no-return-assign */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/no-unescaped-entities */
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

"use client"

import _ from 'lodash'
import Table from '../../../components/common/table'
import React, { SetStateAction, useRef, useState } from 'react'
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
import ClassicEditor from '../../../components/common/form-elements/classic-editor-element'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import Toast from '../../../utils/notification'
import { PosApi } from '../../../api'
import TomSelect from '../../../components/common/tom-select'
import UploadFilesElement from '../../../components/common/form-elements/upload-files-element'
import useDraggableItems from 'react-drag-elements'


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
  const [tooltipContent2] = useState('Registered tax number for your business.')
  const [checked, setChecked] = useState(false)


  const handleChange = () => {
    setChecked(!checked)
  }
  const [select, setSelect] = useState('1')
  const [statusPreview, setStatusPreview] = useState(false)
  const [selectedTab, setSelectedTab] = useState('Instructions')
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false)
  const handleChangeHide = (event: {
    target: { checked: boolean | ((prevState: boolean) => boolean) }
  }) => {
    setIsCheckboxChecked(event.target.checked)
  }
  const [isChecked, setIsChecked] = useState(false)
  const handleCheckChange = () => {
    setIsChecked(!isChecked)
  }
  const [isChecked2, setIsChecked2] = useState(false)
  const handleCheckChange2 = () => {
    setIsChecked2(!isChecked2);
  }

  const [editorData1, setEditorData1] = useState("https://e-commerce.storemate.lk/")
  const [editorData2, setEditorData2] = useState("ck_0bc78b78099031d0d70cb14606221153fe26ebec")
  const [editorData3, setEditorData3] = useState("ck_0bc78b78099031d0d70cb14606221153fe26ebec")
  const [editorData4, setEditorData4] = useState("5jR;=sb<@P T[5~M!wVM^<R=<ZoPa2cVpT8G2kW^S}/Pg-BJs7")

  return (
    <div className="mt-8 grid grid-cols-12 gap-3">
      <div className="col-span-12 lg:col-span-3 2xl:col-span-2">
        <h2 className="ml-1 mr-auto text-lg font-medium">
        API Settings
          
        </h2>
        {/* BEGIN: Menu */}
        <div className="intro-y box mt-7  p-5">
          <div className="">
            <a
              className={`flex items-center rounded-md px-3 py-2  ${
                selectedTab === 'Instructions'
                  ? 'font-medium text-white rounded-md bg-primary'
                  : ''
              }`}
              onClick={() => setSelectedTab('Instructions')}
            >
             Instructions
            </a>
            <a
              className={`mt-2 flex items-center rounded-md px-3 py-2 ${
                selectedTab === 'Api' ? 
                'font-medium text-white rounded-md bg-primary' : ''
              }`}
              onClick={() => setSelectedTab('Api')}
            >
             API Settings
              
            </a>
            <a
              className={`mt-2 flex items-center rounded-md px-3 py-2 ${
                selectedTab === 'Products'
                  ? 'font-medium text-white rounded-md bg-primary'
                  : ''
              }`}
              onClick={() => setSelectedTab('Products')}
            >
             Product Sync Settings
            </a>
            <a
              className={`mt-2 flex items-center rounded-md px-3 py-2 ${
                selectedTab === 'OrderSync' ? 'font-medium text-white rounded-md bg-primary' : ''
              }`}
              onClick={() => setSelectedTab('OrderSync')}
            >
             Order Sync Settings
            </a>

            <a
              className={`mt-2 flex items-center rounded-md px-3 py-2 ${
                selectedTab === 'Webhook' ? 'font-medium text-white rounded-md bg-primary' : ''
              }`}
              onClick={() => setSelectedTab('Webhook')}
            >
              Webhook Settings
            </a>
          </div>
        </div>
        {/* END: Menu */}
      </div>
      <div className="col-span-12 mt-9 lg:col-span-9 2xl:col-span-10">

        {/* BEGIN: Instructions */}
        <div className="intro-y box mt-5">
  {selectedTab === 'Instructions' && (
    <div className="p-5">
      <div className="flex items-center mb-3">
        <div className="w-2 h-2 mr-3 rounded-full bg-primary"></div>
        <span className="truncate">Do not refresh or leave the page while synchronizing</span>
      </div>
      <div className="flex items-center mb-3">
        <div className="w-2 h-2 mr-3 rounded-full bg-primary"></div>
        <span className="truncate">Timezone of POS should be the same as the timezone of the WooCommerce App</span>
      </div>
      <div className="flex items-center mb-3">
        <div className="w-2 h-2 mr-3 rounded-full bg-primary"></div>
        <span className="truncate flex">
          Get WooCommerce API details from
          <div className='ml-2 bg-danger bg-opacity-10 text-danger'>
            {'WooCommerce -> Settings -> Advance -> REST API'}
          </div>
        </span>
        
      </div>
      <div className="flex items-center mb-3">
        <div className="w-2 h-2 mr-3 rounded-full bg-primary"></div>
        <span className="truncate flex">
        Enter description, select User & Provide
          <div className='ml-2 mr-2 bg-danger bg-opacity-10 text-danger'>
            {'Read/Write '}
          </div>
          Permission.<div className="  mr-1 font-medium text-primary dark:text-primary">
                
                <a
                  href="https://github.com/woocommerce/woocommerce/blob/trunk/docs/rest-api/getting-started.md#section-3"
                  className="text-primary dark:text-text-primary"
                >
                  Click Here
                </a>
              </div> for more info
        </span>
        
      </div>
      <div className="flex items-center mb-3">
        <div className="w-2 h-2 mr-3 rounded-full bg-primary"></div>
        <span className="truncate flex">
        Change the permalinks option to
          <div className='ml-2 mr-2 bg-danger bg-opacity-10 text-danger'>
            {'Post Name '}
          </div>
          in WordPress permalink option.
        </span>
        
      </div>

      <div className="flex items-center mb-3">
        <div className="w-2 h-2 mr-3 rounded-full bg-primary"></div>
        <span className="flex truncate ">
        To
        <div className='w-fit ml-2 mr-2 bg-pending bg-opacity-10 text-pending'>
            {'Auto Sync '} 
          </div> categories, products and orders you must setup a cron job with this command:
  
        </span>

      </div>
      <div className='w-fit ml-4 mr-2 bg-danger bg-opacity-10 text-danger'>
            {'* * * * * /usr/sbin/php-fpm7.4 /var/www/storemate_dev1/artisan schedule:run >> /dev/null 2>&1 '} 
          </div>
          <div className='mt-2 ml-4'>
          <div>Set it in cron jobs tab in cpanel or directadmin or similar pane,</div>
          <div>Or edit crontab if using cloud/dedicated hosting.</div>
          <div>Or contact hosting for help with cron job settings.</div>
          </div>
    </div>
  )}
</div>

        <div className="intro-y box mt-5 ">
          {selectedTab === 'Api' && (
            <>
              <div className="flex  p-5 ">
                <div className="mb-4 mt-4 grid grid-cols-1 gap-7 px-3 md:grid-cols-1">


                <FormInline className="mt-5 first:mt-0">
                          <FormLabel className="font-medium  ">{`${t('apiSettings.fields.WoocommerceURL.label')}`}</FormLabel>
                          <div className="flex items-center flex-1 ml-14">
                          <FormInput
                              type="text"
                              className="w-64"
                              value={editorData1}
                              onChange={(e) => setEditorData1(e.target.value)}
                            />
                          </div>
                        </FormInline>

                
                  
                        <FormInline className="first:mt-0">
                          <FormLabel className="font-medium mr-10">{`${t('apiSettings.fields.WoocommerceonsumerKey.label')}`}</FormLabel>
                          <div className="flex items-center flex-1 ml-4 ">
                          <FormInput
                              type="text"
                              className="min-w-[6rem]"
                              value={editorData2}
                              onChange={(e) => setEditorData2(e.target.value)}
                            />
                          </div>
                        </FormInline>
                        <FormInline className="first:mt-0">
                          <FormLabel className="font-medium mr-20">{`${t('apiSettings.fields.WoocommerceonsumerSecret.label')}`}</FormLabel>
                          <div className="flex items-center flex-1  ">
                          <FormInput
                             type="password"
                              className="min-w-[6rem]"
                              value={editorData3}
                              onChange={(e) => setEditorData3(e.target.value)}
                            />
                          </div>
                      
                        </FormInline>

                        <SelectElement
                    label={`${t('apiSettings.fields.businessLocations.label')}`}
                    info={`${t('apiSettings.fields.businessLocations.tooltip')}`}
                    register={register}
                    name="businessLocations"
                    id="businessLocations"
                  />
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-4"
                        type="checkbox"
                        value=""
                        onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-3"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'apiSettings.fields.enableAutoSync.label'
                        )}`}</div>
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                  <div className="flex">
                    <FormCheck className="mt-1">
                      <FormCheck.Input
                        id="vertical-form-4"
                        type="checkbox"
                        value=""
                        onChange={handleChangeHide}
                      />
                      <FormCheck.Label
                        className="mr-2  flex"
                        htmlFor="vertical-form-3"
                      >
                        <div className="mr-2 font-medium">{`${t(
                          'apiSettings.fields.enableCronJob.label'
                        )}`}</div>
                      </FormCheck.Label>
                      <FormInfo
                    tooltip={`${t('apiSettings.fields.enableCronJob.tooltip')}`}
                  />
                    </FormCheck>
                  </div>
                </div>
              </div>
              <div className=" flex justify-end px-5 ">
                <Button
                  type="submit"
                  variant="primary"
                  className="mb-5 mr-1 w-24"
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
              </div>
            </>
          )}
        </div>
        <div className="intro-y box mt-5">
          {selectedTab === 'Products' && (
          <>
          <div className="p-5 px-8 text-left">
            
          <div className="mb-4 mt-4 grid grid-cols-1 gap-7 px-3 md:grid-cols-2">
                  <InputElement
                    label={`${t('apiSettings.fields.defaultTaxClass.label')}`}
                    info={`${t('apiSettings.fields.defaultTaxClass.tooltip')}`}
                    register={register}
                    name="defaultTaxClass"
                    id="defaultTaxClass"
                  />
                  <SelectElement
                  label={`${t('apiSettings.fields.syncProductPrice.label')}`}
                    register={register}
                    name="syncProductPrice"
                    id="syncProductPrice"
                  />
                 <SelectElement
                  label={`${t('apiSettings.fields.defaultSellingPrice.label')}`}
                    register={register}
                    name="defaultSellingPrice"
                    id="defaultSellingPrice"
                  />
                  <SelectElement
                  label={`${t('apiSettings.fields.syncProductDescription.label')}`}
                    register={register}
                    name="syncProductDescription"
                    id="syncProductDescription"
                  />
                  <div className="flex">
                <FormCheck className="mt-1">
                  <FormCheck.Input
                    id="vertical-form-12"
                    type="checkbox"
                    value=""
                    // onChange={handleChangeHide}
                  />
                  <FormCheck.Label
                    className="mr-2  flex"
                    htmlFor="vertical-form-12"
                  >
                    <div className="mr-2 font-medium">{`${t(
                      'apiSettings.fields.saveDraft.label'
                    )}`}</div>
                  </FormCheck.Label>
                  
                </FormCheck>
              </div>
                </div>
          
            <div className="mt-7 border-b" />
          </div>
          <div className="px-8 text-left">
            <div className="flex items-center">
              <div className="text-lg font-medium ">Product Fields to be Synced with Woocommerce While Creating Products</div>
            </div>
            <div className=" mt-7 grid grid-cols-1 gap-7 md:grid-cols-4">
              <div className="flex">
                <FormCheck className="mt-1">
                  <FormCheck.Input
                    id="vertical-form-12"
                    type="checkbox"
                    value=""
                  />
                  <FormCheck.Label
                    className="mr-2  flex"
                    htmlFor="vertical-form-12"
                  >
                    <div className="mr-2 font-medium">Product Name</div>
                  </FormCheck.Label>
                  
                </FormCheck>
              </div>
              <div className="flex">
                <FormCheck className="mt-1">
                  <FormCheck.Input
                    id="vertical-form-12"
                    type="checkbox"
                    value=""
                  />
                  <FormCheck.Label
                    className="mr-2  flex"
                    htmlFor="vertical-form-12"
                  >
                    <div className="mr-2 font-medium">Price</div>
                  </FormCheck.Label>
                  
                </FormCheck>
              </div>
              <div className="flex">
                <FormCheck className="mt-1">
                  <FormCheck.Input
                    id="vertical-form-12"
                    type="checkbox"
                    value=""
                  />
                  <FormCheck.Label
                    className="mr-2  flex"
                    htmlFor="vertical-form-12"
                  >
                    <div className="mr-2 font-medium">Category</div>
                  </FormCheck.Label>
                  
                </FormCheck>
              </div>
              <div className="flex">
                <FormCheck className="mt-1">
                  <FormCheck.Input
                    id="vertical-form-12"
                    type="checkbox"
                    value=""
                  />
                  <FormCheck.Label
                    className="mr-2  flex"
                    htmlFor="vertical-form-12"
                  >
                    <div className="mr-2 font-medium">Quantity</div>
                  </FormCheck.Label>
                  
                </FormCheck>
              </div>
              <div className="flex">
                <FormCheck className="mt-1">
                  <FormCheck.Input
                    id="vertical-form-12"
                    type="checkbox"
                    value=""
                  />
                  <FormCheck.Label
                    className="mr-2  flex"
                    htmlFor="vertical-form-12"
                  >
                    <div className="mr-2 font-medium">Weight</div>
                  </FormCheck.Label>
                  
                </FormCheck>
              </div>
              <div className="flex">
                <FormCheck className="mt-1">
                  <FormCheck.Input
                    id="vertical-form-12"
                    type="checkbox"
                    value=""
                  />
                  <FormCheck.Label
                    className="mr-2  flex"
                    htmlFor="vertical-form-12"
                  >
                    <div className="mr-2 font-medium">Images</div>
                  </FormCheck.Label>
                  
                </FormCheck>
              </div>
              <div className="flex">
                <FormCheck className="mt-1">
                  <FormCheck.Input
                    id="vertical-form-12"
                    type="checkbox"
                    value=""
                  />
                  <FormCheck.Label
                    className="mr-2  flex"
                    htmlFor="vertical-form-12"
                  >
                    <div className="mr-2 font-medium">Description</div>
                  </FormCheck.Label>
                  
                </FormCheck>
              </div>
            </div>
            <div className="mt-7 border-b" />
          </div>
          <div className="px-8 mt-4  text-left">
            <div className="flex items-center">
              <div className="text-lg font-medium ">Product Fields to be Synced with Woocommerce While Updating Products</div>
            </div>
            <div className=" mt-7 grid grid-cols-1 gap-7 md:grid-cols-4">
              <div className="flex">
                <FormCheck className="mt-1">
                  <FormCheck.Input
                    id="vertical-form-12"
                    type="checkbox"
                    value=""
                  />
                  <FormCheck.Label
                    className="mr-2  flex"
                    htmlFor="vertical-form-12"
                  >
                    <div className="mr-2 font-medium">Product Name</div>
                  </FormCheck.Label>
                  
                </FormCheck>
              </div>
              <div className="flex">
                <FormCheck className="mt-1">
                  <FormCheck.Input
                    id="vertical-form-12"
                    type="checkbox"
                    value=""
                  />
                  <FormCheck.Label
                    className="mr-2  flex"
                    htmlFor="vertical-form-12"
                  >
                    <div className="mr-2 font-medium">Price</div>
                  </FormCheck.Label>
                  
                </FormCheck>
              </div>
              <div className="flex">
                <FormCheck className="mt-1">
                  <FormCheck.Input
                    id="vertical-form-12"
                    type="checkbox"
                    value=""
                  />
                  <FormCheck.Label
                    className="mr-2  flex"
                    htmlFor="vertical-form-12"
                  >
                    <div className="mr-2 font-medium">Category</div>
                  </FormCheck.Label>
                  
                </FormCheck>
              </div>
              <div className="flex">
                <FormCheck className="mt-1">
                  <FormCheck.Input
                    id="vertical-form-12"
                    type="checkbox"
                    value=""
                  />
                  <FormCheck.Label
                    className="mr-2  flex"
                    htmlFor="vertical-form-12"
                  >
                    <div className="mr-2 font-medium">Quantity</div>
                  </FormCheck.Label>
                  
                </FormCheck>
              </div>
              <div className="flex">
                <FormCheck className="mt-1">
                  <FormCheck.Input
                    id="vertical-form-12"
                    type="checkbox"
                    value=""
                  />
                  <FormCheck.Label
                    className="mr-2  flex"
                    htmlFor="vertical-form-12"
                  >
                    <div className="mr-2 font-medium">Weight</div>
                  </FormCheck.Label>
                  
                </FormCheck>
              </div>
              <div className="flex">
                <FormCheck className="mt-1">
                  <FormCheck.Input
                    id="vertical-form-12"
                    type="checkbox"
                    value=""
                  />
                  <FormCheck.Label
                    className="mr-2  flex"
                    htmlFor="vertical-form-12"
                  >
                    <div className="mr-2 font-medium">Images</div>
                  </FormCheck.Label>
                  
                </FormCheck>
              </div>
              <div className="flex">
                <FormCheck className="mt-1">
                  <FormCheck.Input
                    id="vertical-form-12"
                    type="checkbox"
                    value=""
                  />
                  <FormCheck.Label
                    className="mr-2  flex"
                    htmlFor="vertical-form-12"
                  >
                    <div className="mr-2 font-medium">Description</div>
                  </FormCheck.Label>
                  
                </FormCheck>
              </div>
            </div>
            
          </div>
          <div className=" flex justify-end px-5 mt-5 ">
            <Button
              type="submit"
              variant="primary"
              className="mb-5 mr-1 w-24"
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
          </div>
        </>
          )}
        </div>
        <div className="intro-y box mt-5 ">
          {selectedTab === 'OrderSync' && (
        
              <><div className="flex  p-5 ">
                  <DateElement
            label={`${t('apiSettings.fields.cutOffDate.label')}`}
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
            name="cutOffDate"
            id="cutOffDate"
          />


          
            </div>
            <div className="intro-y py-5 overflow-x-auto px-5">
    <Table >
        <Table.Thead variant='default'>
            <Table.Tr>
                <Table.Th className="whitespace-nowrap">Woocommerce Order Status</Table.Th>
                <Table.Th className="whitespace-nowrap">
                Equivalent POS Sell Status
                </Table.Th>
                
               
            </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
            <Table.Tr>
                <Table.Td>Pending</Table.Td>
                <Table.Td > <FormSelect>
                        <option value="Please Select">Please Select</option>
                        <option value="Final">Final</option>
                        <option value="Draft">Draft</option>
                        <option value="Quotation">Quotation</option>
                      </FormSelect></Table.Td>
            </Table.Tr> 
            <Table.Tr>
                <Table.Td>Processing</Table.Td>
                <Table.Td > <FormSelect>
                        <option value="Please Select">Please Select</option>
                        <option value="Final">Final</option>
                        <option value="Draft">Draft</option>
                        <option value="Quotation">Quotation</option>
                      </FormSelect></Table.Td>
            </Table.Tr> 
            <Table.Tr>
                <Table.Td>On Hold</Table.Td>
                <Table.Td > <FormSelect>
                        <option value="Please Select">Please Select</option>
                        <option value="Final">Final</option>
                        <option value="Draft">Draft</option>
                        <option value="Quotation">Quotation</option>
                      </FormSelect></Table.Td>
            </Table.Tr> 
            <Table.Tr>
                <Table.Td>Completed</Table.Td>
                <Table.Td > <FormSelect>
                        <option value="Please Select">Please Select</option>
                        <option value="Final">Final</option>
                        <option value="Draft">Draft</option>
                        <option value="Quotation">Quotation</option>
                      </FormSelect></Table.Td>
            </Table.Tr>   
            <Table.Tr>
                <Table.Td>Cancelled</Table.Td>
                <Table.Td > <FormSelect>
                        <option value="Please Select">Please Select</option>
                        <option value="Final">Final</option>
                        <option value="Draft">Draft</option>
                        <option value="Quotation">Quotation</option>
                      </FormSelect></Table.Td>
            </Table.Tr> 
            <Table.Tr>
                <Table.Td>Refunded</Table.Td>
                <Table.Td > <FormSelect>
                        <option value="Please Select">Please Select</option>
                        <option value="Final">Final</option>
                        <option value="Draft">Draft</option>
                        <option value="Quotation">Quotation</option>
                      </FormSelect></Table.Td>
            </Table.Tr> 
            <Table.Tr>
                <Table.Td>Failed</Table.Td>
                <Table.Td > <FormSelect>
                        <option value="Please Select">Please Select</option>
                        <option value="Final">Final</option>
                        <option value="Draft">Draft</option>
                        <option value="Quotation">Quotation</option>
                      </FormSelect></Table.Td>
            </Table.Tr> 
            <Table.Tr>
                <Table.Td>Shipped</Table.Td>
                <Table.Td > <FormSelect>
                        <option value="Please Select">Please Select</option>
                        <option value="Final">Final</option>
                        <option value="Draft">Draft</option>
                        <option value="Quotation">Quotation</option>
                      </FormSelect></Table.Td>
            </Table.Tr> 
        </Table.Tbody>
    </Table>
</div>
<div className='px-5 mb-5'>
<Alert variant="danger" className="mb-2">
    <div className="flex items-center">
        <div className="text-lg font-medium">
        WARNING
        </div>
        <div className="px-1 ml-auto text-xs  text-white">
        <Lucide icon="AlertTriangle" className="w-6 h-6 " />
        </div>
    </div>
    <div className="mt-3">
    If there are any custom statuses other than following Woocommerce statuses,
it will be considered as FINAL in POS sell statuses
    </div>
</Alert>
</div>

            <div className=" flex justify-end px-5 ">
                <Button
                  type="submit"
                  variant="primary"
                  className="mb-5 mr-1 w-24"
                >
                  {`${t('common.button.update')}`}
                  {isLoading ? (
                    <LoadingIcon
                      icon="oval"
                      color="white"
                      className="ml-2 h-4 w-4" />
                  ) : (
                    ''
                  )}
                </Button>
              </div></>
          
          )}
        </div>
        <div className="intro-y box mt-5 ">
          {selectedTab === 'Webhook' && (
            <>
             <div className="flex items-center p-5">
              <div className="text-lg font-medium ">Order Created</div>
            </div>
           <div className="mb-4  grid grid-cols-1 gap-7 px-5 md:grid-cols-2">
          
            <FormInline className=" first:mt-0">
                          <FormLabel className="font-medium  ">{`${t('Webhook Secret')}`}</FormLabel>
                          <div className="flex items-center flex-1">
                          <FormInput
                              type="text"
                              className="w-64"
                              value={editorData4}
                              onChange={(e) => setEditorData4(e.target.value)}
                            />
                          </div>
                        </FormInline>

                        <div className="text-left">
                      <div className="flex items-center">
                        <div className="font-medium">Webhook Delivery URL</div>
                      </div>
                      <div className="mt-3 text-xs leading-relaxed text-slate-500">
                        <a
                          href="https://dev1.v6.storemate.parallaxtec.com/webhook/order-created/233"
                          className="font-medium text-primary"
                          target="blank"
                        >
                          https://dev1.v6.storemate.parallaxtec.com/webhook/order-created/233
                        </a>
                      </div>
                    </div>

                    
         
           
              </div>
              <div className="mt-7 border-b" />
              <div className="flex items-center p-5">
              <div className="text-lg font-medium ">Order Updated</div>
            </div>
           <div className="mb-4  grid grid-cols-1 gap-7 px-5 md:grid-cols-2">
          
            <FormInline className=" first:mt-0">
                          <FormLabel className="font-medium  ">{`${t('Webhook Secret')}`}</FormLabel>
                          <div className="flex items-center flex-1">
                          <FormInput
                              type="text"
                              className="w-64"
     
                             
                            />
                          </div>
                        </FormInline>

                        <div className="text-left">
                      <div className="flex items-center">
                        <div className="font-medium">Webhook Delivery URL</div>
                      </div>
                      <div className="mt-3 text-xs leading-relaxed text-slate-500">
                        <a
                          href="https://dev1.v6.storemate.parallaxtec.com/webhook/order-updated/233"
                          className="font-medium text-primary"
                          target="blank"
                        >
                          https://dev1.v6.storemate.parallaxtec.com/webhook/order-updated/233
                        </a>
                      </div>
                    </div>

                    
           
           
              </div>
              <div className="mt-7 border-b" />
              <div className="flex items-center p-5">
              <div className="text-lg font-medium ">Order Deleted</div>
            </div>
           <div className="mb-4  grid grid-cols-1 gap-7 px-5 md:grid-cols-2">
          
            <FormInline className=" first:mt-0">
                          <FormLabel className="font-medium  ">{`${t('Webhook Secret')}`}</FormLabel>
                          <div className="flex items-center flex-1">
                          <FormInput
                              type="text"
                              className="w-64"
     
                             
                            />
                          </div>
                        </FormInline>

                        <div className="text-left">
                      <div className="flex items-center">
                        <div className="font-medium">Webhook Delivery URL</div>
                      </div>
                      <div className="mt-3 text-xs leading-relaxed text-slate-500">
                        <a
                          href="https://dev1.v6.storemate.parallaxtec.com/webhook/order-deleted/233"
                          className="font-medium text-primary"
                          target="blank"
                        >
                          https://dev1.v6.storemate.parallaxtec.com/webhook/order-deleted/233
                        </a>
                      </div>
                    </div>

                    
           
           
              </div>

              <div className="mt-7 border-b" />
              <div className="flex items-center p-5">
              <div className="text-lg font-medium ">Order Restored</div>
            </div>
           <div className="mb-4  grid grid-cols-1 gap-7 px-5 md:grid-cols-2">
          
            <FormInline className=" first:mt-0">
                          <FormLabel className="font-medium  ">{`${t('Webhook Secret')}`}</FormLabel>
                          <div className="flex items-center flex-1">
                          <FormInput
                              type="text"
                              className="w-64"
     
                             
                            />
                          </div>
                        </FormInline>

                        <div className="text-left">
                      <div className="flex items-center">
                        <div className="font-medium">Webhook Delivery URL</div>
                      </div>
                      <div className="mt-3 text-xs leading-relaxed text-slate-500">
                        <a
                          href="https://dev1.v6.storemate.parallaxtec.com/webhook/order-restored/233"
                          className="font-medium text-primary"
                          target="blank"
                        >
                          https://dev1.v6.storemate.parallaxtec.com/webhook/order-restored/233
                        </a>
                      </div>
                    </div>

                    
           
           
              </div>
              <div className=" flex justify-end px-5 mt-5 ">
                <Button
                  type="submit"
                  variant="primary"
                  className="mb-5 mr-1 w-24"
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
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Main
