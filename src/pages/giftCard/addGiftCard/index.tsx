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
import PreviewImage from '../../../../assets/images/fakers/image2.jpg'
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
      businessLocation: yup
        .string()
        .required(
          `${t('giftCard.fields.businessLocation.validationMessage')}`
        ),
        name: yup
        .string()
        .required(
          `${t('giftCard.fields.name.validationMessage')}`
        ),
        value: yup
        .string()
        .required(
          `${t('giftCard.fields.value.validationMessage')}`
        ),
        noCards: yup
        .string()
        .required(
          `${t('giftCard.fields.noCards.validationMessage')}`
        ),
        voucherSerialBegin: yup
        .string()
        .required(
          `${t('giftCard.fields.voucherSerialBegin.validationMessage')}`
        ),
        expires: yup
        .string()
        .required(
          `${t('giftCard.fields.expires.validationMessage')}`
        ),
        unit: yup
        .string()
        .required(
          `${t('giftCard.fields.unit.validationMessage')}`
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
  const [editorDataExpensesNote, setEditorDataExpensesNote] = useState(
    `<p>${t(
      'Dear {contact_name}, Thank you for shopping with us. {business_name}'
    )}.</p>`
  )
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false)
  const handleChangeHide = (event: {
    target: { checked: boolean | ((prevState: boolean) => boolean) }
  }) => {
    setIsCheckboxChecked(event.target.checked)
  }

  return (
    <div>
      <div className="intro-y mt-4 flex flex-col items-center sm:flex-row">
        <h2 className="ml-2 mr-auto text-lg font-medium">
          {`Create Gift Card `}
          <Button
            variant="twitter"
            className="intro-y mx-1 h-7 w-7 rounded-full"
          >
            ?
          </Button>
        </h2>
      </div>

      <div className="intro-y box mb-5 mt-5 px-5 py-5 ">
        <div className="flex flex-col border-b  text-base font-medium  dark:border-darkmode-400">
          <h2 className="mb-4 mr-auto text-base font-medium">
            {`${t('Add Gift Card ')}`}
          </h2>
        </div>
        <div className="grid gap-7 mt-7 mb-5 md:grid-cols-2">
        <SelectElement
                   label={`${t(
                    'giftCard.fields.businessLocation.label'
                  )}`}
                  register={register}
                  name="businessLocation"
                  id="businessLocation"
                  required
                  error={errors.businessLocation}
                />
                 <InputElement
                   label={`${t(
                    'giftCard.fields.name.label'
                  )}`}
                  register={register}
                  name="name"
                  id="name"
                  required
                  error={errors.name}
                />
                <InputElement
                   label={`${t(
                    'giftCard.fields.value.label'
                  )}`}
                  register={register}
                  name="value"
                  id="value"
                  required
                  error={errors.value}
                />
                <InputElement
                   label={`${t(
                    'giftCard.fields.noCards.label'
                  )}`}
                  register={register}
                  name="noCards"
                  id="noCards"
                  required
                  error={errors.noCards}
                />
                <InputElement
                   label={`${t(
                    'giftCard.fields.voucherSerialBegin.label'
                  )}`}
                  register={register}
                  name="voucherSerialBegin"
                  id="voucherSerialBegin"
                  required
                  error={errors.voucherSerialBegin}
                />
                <DateElement
            label={`${t('giftCard.fields.expires.label')}`}
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
            name="expires"
            id="expires"
            required
            error={errors.expires}
          />
             <SearchSelectElement
             label={`${t('giftCard.fields.unit.label')}`}
                  register={register}
                  name="unit"
                  id="unit"
                  onChange={handleChange}
                  required
                  error={errors.unit}
                />
        </div>
        <div className=" flex justify-end mt-5">
<Button type="submit" variant="primary" className="mb-2 mr-1 w-24">
  {`${t('common.button.save')}`}
  {isLoading ? (
    <LoadingIcon icon="oval" color="white" className="ml-2 h-4 w-4" />
  ) : (
    ''
  )}
</Button>
</div>
      </div>

    
    </div>
  )
}

export default Main
