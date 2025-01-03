/* eslint-disable @typescript-eslint/no-use-before-define */
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
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
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
  InputElement,
  TextareaElement, 
} from '../../../components/common/form-elements'
import SharedDataContainer from '../../../containers/sharedData'
import ShortcutKey from '../../../components/common/shortcut-key'
import SlideoverPanel from '../../../components/slideover-panel'
import { useTranslation } from 'react-i18next'
import PreviewImage from '../../../assets/images/fakers/image2.jpg'
import { Icons, NotificationTypes } from '../../../constants'
import Alert from "../../../base-components/Alert"
import { AlignmentTypes } from '../../../constants/common-enums'
import LoadingIcon from '../../../components/common/loading-icon'
import * as yup from 'yup'
import Toast from '../../../utils/notification'
import { PosApi } from '../../../api'
import proposal from '../../../assets/images/proposal.svg'
import SlideoverRegistry from './slideover-registry'

interface FormContent {
  title: string
  component: JSX.Element
}

interface Props {
  setSliderContent: React.Dispatch<React.SetStateAction<any>>
}

function Main() {

  const { t } = useTranslation('pos')
  const posApi = PosApi.useAPI()
  const { setNotification, handleSlider } = SharedDataContainer.useContainer()
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

  const schema = yup
  .object({
    source: yup
      .string()
      .required(
        `${t(
          'lead.fields.source.validationMessage'
        )}`
      ),
   
     
  })
  .required()

  const {
    register,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  })

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

  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false)
  const deleteButtonRef = useRef(null)
  const [tooltipContent1] = useState(
    'Enable Woocommerce Sync for Selected Products'
  )
  const [tooltipContent2] = useState(
    'Deactivated Products will Not be Available for Purchase or Sell'
  )

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const handleKeyUp = (keyName: string) => {
    if (keyName === 'alt+s') {
      handleClick(SlideoverRegistry.addProposalTemplate)
    }
  }

  return (
    <div className="">
<div className="intro-y mt-4 flex flex-col items-center sm:flex-row">
<div className="flex flex-grow items-center">
    <h2 className="ml-2 text-lg font-medium">
    Proposal Template
    </h2>
    
  </div>
  <div className="mt-4 flex w-full sm:mt-0 sm:w-auto">
          <Button
            variant="primary"
            className="mr-2 shadow-md sm:w-auto"
            onClick={() => handleClick(SlideoverRegistry.addProposalTemplate)}
          >
          Add Template
          </Button>

          <Button
           variant="primary" 
             className="mr-2 shadow-md sm:w-auto"
             onClick={() => handleClick(SlideoverRegistry.addProposalTemplate)}
          >
            <span className="flex h-5 w-5 items-center justify-center">
              <Lucide icon="Plus" className="h-4 w-4" />
            </span>
          </Button>
        </div>
            
          </div>

          <div className="intro-y box mb-5 mt-5 px-5 py-5 ">
          <div className="col-span-12  lg:col-span-6 grid md:grid-cols-2">
              <div className="relative p-6 overflow-hidden box bg-primary dark:bg-primary intro-y">
                <div className="leading-[2.15rem] w-full sm:w-72 text-white text-xl -mt-1">
                Proposal Name
                </div>
                <div className="w-full mt-3 leading-relaxed sm:w-72 text-white/70 dark:text-slate">
                Use Following Actions Buttons
                </div>
                <Button size='sm' variant="twitter" className="w-20 mt-6 text-white  dark:text-white sm:mt-10"
                 onClick={() => handleClick(SlideoverRegistry.editProposalTemplate)}>
                 Edit
                </Button>
                <Button size='sm' variant="linkedin" className="ml-2 w-20 mt-6  text-white dark:text-white sm:mt-10"
                 onClick={() => handleClick(SlideoverRegistry.viewProposalTemplate)}>
                 View
                </Button>
                <Button size='sm' className="ml-2 w-20 mt-6 bg-white  dark:text-black sm:mt-10"
                 onClick={() => handleClick(SlideoverRegistry.sendProposalTemplate)}>
                Send
                </Button>
                <img
                  className="absolute top-0 right-0 hidden w-2/5 mr-2 -mt-3 sm:block"
                  alt="Midone Tailwind HTML Admin Template"
                  src={proposal}
                />
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
