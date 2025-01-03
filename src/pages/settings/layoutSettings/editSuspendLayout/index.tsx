/* eslint-disable react/button-has-type */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable import/order */
/* eslint-disable react/no-unknown-property */
/* eslint-disable react/self-closing-comp */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import _ from 'lodash'
import Table from '../../../../components/common/table'
import { SetStateAction, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import Button from '../../../../components/common/button'
import Tippy from '../../../../components/common/tippy'
import Lucide from '../../../../components/common/lucide'
import { Menu, Tab, Dialog, Disclosure } from '../../../../components/common/headless'
import Pagination from '../../../../components/common/pagination'
import {
  FormInput,
  FormSelect,
  FormInfo,
  FormCheck,
  FormLabel,
  FormInline,
  InputGroup,
  Litepicker,
} from '../../../../components/common/form-elements/components'
import {
  SearchSelectElement,
  DateElement,
  SelectElement,
  TextareaElement,
  InputElement,
} from '../../../../components/common/form-elements'
import SharedDataContainer from '../../../../containers/sharedData'
import { useTranslation } from 'react-i18next'
import { Icons, NotificationTypes } from '../../../../constants'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import Toast from '../../../../utils/notification'
import { PosApi } from '../../../../api'

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
        layoutName: yup
        .string()
        .required(
          `${t('settings.fields.layoutName.validationMessage')}`
        ),
        design: yup
        .string()
        .required(
          `${t('settings.fields.design.validationMessage')}`
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

  const [chatBox, setChatBox] = useState(false);
  const showChatBox = () => {
    setChatBox(!chatBox);
  }

  const [showMainHeader, setShowMainHeader] = useState(true);
  const [showLocation, setShowLocation] = useState(true);
  const [showSubHeader, setSubHeader] = useState(true);

  const toggleMainHeader = () => {
    setShowMainHeader(!showMainHeader);
  };

  const toggleLocation = () => {
    setShowLocation(!showLocation);
  }

  const toggleSubHeader = () => {
    setSubHeader(!showSubHeader);
  }

  const [zoom, setZoom] = useState(1);

  const handleZoomIn = () => {
    const maxZoom = 2; // Maximum zoom level
    if (zoom < maxZoom) {
      setZoom(zoom + 0.1);
    }
  };

  const handleZoomOut = () => {
    const minZoom = 1; // Minimum zoom level
    if (zoom > minZoom) {
      setZoom(zoom - 0.1);
    }
  };


  return (
    <div>
   <div className="intro-y mt-4 flex flex-col sm:flex-row items-center">
  <div className="flex flex-grow items-center">
    <h2 className="ml-2 text-lg font-medium">
    Edit Suspend Layout
    </h2>
    
  </div>

</div>


      <div className="intro-y box mb-5 mt-5 px-5 py-5 ">
      <div className="mb-4 mt-5 grid grid-cols-1 gap-7 px-3 md:grid-cols-3">
                  <InputElement
                    label={`${t(
                     'settings.fields.layoutName.label'
                    )}`}
                    register={register}
                    name="layoutName"
                    id="layoutName"
                    required
                    error={errors.layoutName}
                  />
                  <SelectElement
                    label={`${t(
                     'settings.fields.design.label'
                    )}`}
                    register={register}
                    name="design"
                    id="design"
                    required
                    error={errors.design}
                  />
                  <FormCheck>

<FormCheck.Input
  id="vertical-form-3"
  type="checkbox"
  value=""
  onChange={handleChange}
/> 
 <FormCheck.Label className="mr-2" htmlFor="vertical-form-3">
 <div className="mr-2 font-medium">{`${t('settings.fields.setAsDefault.label')}`}</div>
</FormCheck.Label>
</FormCheck>
      </div>
      </div>
      <div className="grid grid-cols-12 gap-5 mt-7 intro-y">
      <Tab.Group className="col-span-12 lg:col-span-4 2xl:col-span-3">
          <div className="pr-1 intro-y">
            <div className="p-2 box">
              <Tab.List variant="pills">
                <Tab>
                  <Tab.Button className="w-full py-2" as="button">
                   Labels
                  </Tab.Button>
                </Tab>
                
                <Tab>
                  <Tab.Button className="w-full py-2" as="button">
                    Actions
                  </Tab.Button>
                </Tab>
              </Tab.List>
            </div>
          </div>
          <Tab.Panels>
            <Tab.Panel>
              <div className="pr-1 ">
                <div className="px-5 pt-5 pb-5 mt-5  box lg:pb-0">
                  <div className="relative text-slate-500">
                    <FormInput
                      type="text"
                      className="px-4 py-3 pr-10 border-transparent bg-slate-100"
                      placeholder="Search "
                    />
                    <Lucide
                      icon="Search"
                      className="inset-y-0 right-0 hidden w-4 h-4 my-auto mr-3 sm:absolute"
                    />
                  </div>
                  
                  <div className="overflow-x-auto  scrollbar-hidden">
      <div className=" items-center  mt-5 border-b border-slate-200/60 dark:border-darkmode-400">
        <div>
        <div className="text-lg font-medium mb-3 flex items-center justify-between">
  <span>Main Header</span>
  <button onClick={toggleMainHeader}>
    {showMainHeader ? <Lucide icon="ChevronUp" className="w-4 h-4 my-auto ml-3" /> : <Lucide icon="ChevronDown" className="w-4 h-4 my-auto ml-3" />}
  </button>
</div>

        </div>
        {showMainHeader && (
           <div className="flex mb-3 grid grid-cols-1 gap-3 md:grid-cols-2">
            <Button variant="facebook" size='sm' className="mb-1 mr-1">
             Invoice Logo
            </Button>
            <Button variant="outline-primary" size='sm' className="inline-block mb-1 mr-1">
              Date and Time
            </Button>
            <Button variant="outline-primary" size='sm' className="inline-block mb-1 mr-1">
             Invoice Logo
            </Button>
            <Button variant="outline-primary" size='sm' className="inline-block mb-1 mr-1">
              Date and Time
            </Button>

          </div>
        )}
      </div>

      <div className=" items-center mt-3 border-b border-slate-200/60 dark:border-darkmode-400">
        <div>
        <div className="text-lg font-medium mb-3 flex items-center justify-between">
            Location
            <button onClick={toggleLocation}>
              {showLocation ? <Lucide icon="ChevronUp" className="w-4 h-4 my-auto ml-3" /> : <Lucide icon="ChevronDown" className="w-4 h-4 my-auto ml-3" />}
            </button>
          </div>
        </div>
      

      {showLocation && (
                 <div className="flex mb-3 grid grid-cols-1 gap-3 md:grid-cols-2">
                 <Button variant="facebook" size='sm' className="mb-1 mr-1">
              Landmark
                 </Button>
                 <Button variant="facebook" size='sm' className="mb-1 mr-1">
                  City
                 </Button>
                 <Button variant="facebook" size='sm' className="mb-1 mr-1">
                 State
                 </Button>
                 <Button variant="outline-primary" size='sm' className="inline-block mb-1 mr-1">
                  Country
                 </Button>
                 <Button variant="outline-primary" size='sm' className="inline-block mb-1 mr-1">
                 Zip Code
                 </Button>
                 <Button variant="outline-primary" size='sm' className="inline-block mb-1 mr-1">
                  Custom Filed 1
                 </Button>
                 <Button variant="outline-primary" size='sm' className="inline-block mb-1 mr-1">
                 Mobile Number
                 </Button>
     
               </div>
      )}
    </div>

    <div className=" items-center mt-3 border-b border-slate-200/60 dark:border-darkmode-400">
        <div>
        <div className="text-lg font-medium mb-3 flex items-center justify-between">
        Sub Header
            <button onClick={toggleSubHeader}>
              {showSubHeader ? <Lucide icon="ChevronUp" className="w-4 h-4 my-auto ml-3" /> : <Lucide icon="ChevronDown" className="w-4 h-4 my-auto ml-3" />}
            </button>
          </div>
        </div>
      

      {showSubHeader && (
                 <div className="flex mb-3 grid grid-cols-1 gap-3 md:grid-cols-2">
                 <Button variant="facebook" size='sm' className="mb-1 mr-1">
                 Invoice heading
                 </Button>
                 <Button variant="facebook" size='sm' className="mb-1 mr-1">
                 Date Label
                 </Button>
                 <Button variant="facebook" size='sm' className="mb-1 mr-1">
                 Due date
                 </Button>
                
     
               </div>
      )}
    </div>
    </div>


                </div>
              </div>
             
            </Tab.Panel>
            </Tab.Panels>
         </Tab.Group>
<div className="col-span-12 intro-y lg:col-span-8 2xl:col-span-9">
      <div className="h-[782px] box bg-secondary">
        {!chatBox && (
          <>
            <div className="flex items-center h-full">
              <div className="mx-auto text-center">
                <div
                  style={{
                    backgroundColor: "white",
                    boxShadow: "0 0 rgba(0, 0, 0, 0.2)",
                    position: "relative",
                    transform: `scale(${zoom})`,
                    width: "420px",
                    height: "594px",
                  }}
                >
                  {/* Your content for the A4 sheet goes here */}
                </div>
              </div>
            </div>
            <div className="mt-3 justify-end text-right">
           
              <Button  onClick={handleZoomIn}  variant="primary"  className="w-12 h-12 mx-2 rounded-full intro-y">
              <Lucide icon="ZoomIn" className="block w-5 h-5 " />
             </Button>
             <Button  onClick={handleZoomOut}  variant="primary"  className="w-12 h-12 mx-2 rounded-full intro-y">
              <Lucide icon="ZoomOut" className="block w-5 h-5 " />
             </Button>
              
            </div>
          </>
        )}
      </div>
    </div>
    

    
      </div>
      
    </div>
  )
}

export default Main
