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

  const [editorData1, setEditorData1] = useState("WGCKpgQQjDDN2G1AsAz7uoIcKt5pwzqFosio3yqBCAbtWkZP8YASKgl2GkfJnVvx9UWAifVaQvA1Px7p")


  return (
    <div className="mt-4 grid grid-cols-12 gap-3">
      <div className="col-span-12 lg:col-span-3 2xl:col-span-2 ml-2">
        <h2 className="ml-1 mr-auto text-lg font-medium">
        API Settings
          
        </h2>
      </div>
      <div className="col-span-12 ">
      <div className="intro-y box mt-2 ">
         
              <div className="flex  p-5 ">
                <div className="mb-4 mt-4 grid grid-cols-1 gap-7 px-3 md:grid-cols-2">


                <FormInline className="mt-5 first:mt-0">
                          <FormLabel className="font-medium  ">{`${t('apiSettings.fields.transExpress.label')}`}</FormLabel>
                          <div className="flex items-center flex-1 ml-2">
                          <FormInput
                              type="text"
                              className="w-64"
                              value={editorData1}
                              onChange={(e) => setEditorData1(e.target.value)}
                            />
                          </div>
                        </FormInline>

                
                  
                        <FormInline className="first:mt-0">
                          <FormLabel className="font-medium mr-10">{`${t('apiSettings.fields.pickMe.label')}`}</FormLabel>
                          <div className="flex items-center flex-1 ml-12 ">
                          <FormInput
                              type="text"
                              className="min-w-[6rem]"
                            placeholder='API Key'
                            />
                          </div>
                        </FormInline>
                        <FormInline className="first:mt-0">
                          <FormLabel className="font-medium mr-20">{`${t('apiSettings.fields.koombiyo.label')}`}</FormLabel>
                          <div className="flex items-center flex-1 ml-8 ">
                          <FormInput
                             type="password"
                              className="min-w-[6rem]"
                              placeholder='API Key'
                            />
                          </div>
                      
                        </FormInline>
                        <SelectElement
                    label={`${t('apiSettings.fields.defaultSetAccount.label')}`}
                    register={register}
                    name="defaultSetAccount"
                    id="defaultSetAccount"
                  />
                  
                  
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

        </div>
     

    

    
      </div>
    </div>
  )
}

export default Main
