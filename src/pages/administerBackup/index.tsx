/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable import/order */
/* eslint-disable react/no-unknown-property */
/* eslint-disable react/self-closing-comp */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import _ from 'lodash'
import Table from '../../components/common/table'
import { SetStateAction, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import Button from '../../components/common/button'
import Tippy from '../../components/common/tippy'
import Lucide from '../../components/common/lucide'
import { Menu, Tab, Dialog, Disclosure } from '../../components/common/headless'
import Pagination from '../../components/common/pagination'
import {
  FormInput,
  FormSelect,
  FormInfo,
  FormCheck,
  FormLabel,
  FormInline,
  InputGroup,
  Litepicker,
} from '../../components/common/form-elements/components'
import {
  SearchSelectElement,
  DateElement,
  SelectElement,
  TextareaElement,
  InputElement,
} from '../../components/common/form-elements'
import SharedDataContainer from '../../containers/sharedData'
import ShortcutKey from '../../components/common/shortcut-key'
import SlideoverPanel from '../../components/slideover-panel'
import { useTranslation } from 'react-i18next'
import PreviewImage from '../../../assets/images/fakers/image2.jpg'
import { Icons, NotificationTypes } from '../../constants'
import Alert from '../../base-components/Alert'
import { AlignmentTypes } from '../../constants/common-enums'
import LoadingIcon from '../../components/common/loading-icon'
import clsx from 'clsx'
import ClassicEditorElement from '../../components/common/form-elements/classic-editor-element'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import Toast from '../../utils/notification'
import { PosApi } from '../../api'

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

  const [statusPreview, setStatusPreview] = useState(false)

  return (
    <div>
      <div className="intro-y mt-4 flex flex-col items-center sm:flex-row">
        <h2 className="ml-2 mr-auto text-lg font-medium">
          {`Administer Backup `}
        </h2>
        <div className="mt-4 flex w-full sm:mt-0 sm:w-auto">
          <Button
            as="a"
            variant="primary"
            className="mr-2 shadow-md sm:w-auto"
          >
            Create New Backup
          </Button>

          <Button
            as="a"
            variant="primary"
           
            className="mr-2 shadow-md sm:w-auto"
          >
            <span className="flex h-5 w-5 items-center justify-center">
              <Lucide icon="Plus" className="h-4 w-4" />
            </span>
          </Button>
        </div>
      </div>

      <div className="intro-y box mb-5 mt-5 px-5 py-5 ">
      <div className="flex flex-col border-b  font-medium text-base  dark:border-darkmode-400">
                  <h2 className="mr-auto text-base font-medium mb-4">
                  {`${t('Details ')}`}
                  </h2>
                  </div>
                  <div className="mt- intro-y flex flex-col items-center sm:flex-row xl:mt-4">
                  There are No backups
      </div></div>
      <div className="flex items-center text-slate-500">
                  <span>
                    <Lucide icon="Lightbulb" className="w-5 h-5 text-warning" />
                  </span>
                  <div className="ml-2">
                    <span className="mr-1">
                    To enable auto backup you must setup a cron job with this command:
                    </span>
                   
                  </div>
                </div>
      <div className='text-center mt-3'>
      <Alert variant="soft-danger" className="flex items-center mb-2">
    <Lucide icon="AlertCircle" className="w-6 h-6 mr-2" />{" "}

   {' * * * * * /usr/sbin/php-fpm7.4 /var/www/storemate_qa1/artisan schedule:run >> /dev/null 2>&1'}

</Alert>
      </div>
     
    </div>
  )
}

export default Main
