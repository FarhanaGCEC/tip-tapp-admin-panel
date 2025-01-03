/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable import/order */
/* eslint-disable react/no-unknown-property */
/* eslint-disable react/self-closing-comp */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import _ from 'lodash'
import { PosApi } from '../../../api'
import Table from '../../../components/common/table'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import Button from '../../../components/common/button'
import Lucide from '../../../components/common/lucide'
import { Menu, Dialog } from '../../../components/common/headless'
import Pagination from '../../../components/common/pagination'
import {
  DateElement,
  InputElement,
  SelectElement,
  SearchSelectElement,
} from '../../../components/common/form-elements'
import SharedDataContainer from '../../../containers/sharedData'
import ShortcutKey from '../../../components/common/shortcut-key'
import SlideoverPanel from '../../../components/slideover-panel'
import { useTranslation } from 'react-i18next'
import PreviewImage from '../../../assets/images/fakers/image2.jpg'
import UploadFilesElement from '../../../components/common/form-elements/upload-files-element'
import LoadingIcon from '../../../components/common/loading-icon'
import Alert from "../../../base-components/Alert"
import {
  FormInput,
  FormCheck,
  InputGroup,
  FormSelect,
  FormLabel,
  FormInfo,
} from '../../../components/common/form-elements/components'
import Tippy from '../../../components/common/tippy'

interface FormContent {
  title: string
  component: JSX.Element
}

interface Props {
  setSliderContent: React.Dispatch<React.SetStateAction<any>>
}

function Main() {
  const posApi = PosApi.useAPI()
  const { setNotification} = SharedDataContainer.useContainer()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { handleSlider } = SharedDataContainer.useContainer()
  // eslint-disable-next-line prettier/prettier
  const handleChange = () => {}

  const { register } = useForm()
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false)
  const deleteButtonRef = useRef(null)
  const { t } = useTranslation('pos')
  const [tooltipContent2] = useState(
    'data-content="Add products ->Choose informations to show in Labels -> Select Barcode Setting -> Preview Labels -> Print"'
  )

  return (
    <div className="">
      
      <div className="intro-y mt-4 flex flex-col items-center sm:flex-row">
            <h2 className="mr-auto text-lg font-medium ml-2">
            
              <h2 className="mr-auto text-lg font-medium">
                Settings
                
              </h2>
            </h2>
      
          </div>  
        <div className="intro-y box mb-5 mt-5 px-5 py-5 ">   
        <div className=" grid grid-cols-1 gap-5 px-5 py-7 sm:grid-cols-2">
            
            <InputElement
           label={`${t('manufacturing.fields.settings.fields.productionReferenceNo.label')}`}
            register={register}
            name="productionReferenceNo"
            id="productionReferenceNo"
           

          />
         <FormCheck className="">
         <FormCheck.Input
         className="mr-2 "
              id="vertical-form-3"
              type="checkbox"
              value=""
              onChange={handleChange}
            /> 
            
             <FormCheck.Label className="mr-2" htmlFor="vertical-form-3">
             <div className="mr-2 font-medium">{`${t('manufacturing.fields.settings.fields.disableEditing.label')}`}</div>
            </FormCheck.Label>
            
          </FormCheck>
          </div>  <div className=" grid grid-cols-1 gap-5 px-3 py-5 sm:grid-cols-2">
          <FormCheck >
          <FormCheck.Input
          className="mr-2 "
              id="vertical-form-2"
              type="checkbox"
              value=""
              onChange={handleChange}
            /> 
           
             <FormCheck.Label className="" htmlFor="vertical-form-2">
             <div className=" font-medium">{`${t('manufacturing.fields.settings.fields.updateProduct.label')}`}</div>
            </FormCheck.Label>
           
          </FormCheck>
          <FormCheck className="">
          <FormCheck.Input
             className="mr-2 "
              id="vertical-form-1"
              type="checkbox"
              value=""
              onChange={handleChange}
            /> 
            
             <FormCheck.Label className="mr-2" htmlFor="vertical-form-1">
             <div className="mr-2 font-medium">{`${t('manufacturing.fields.settings.fields.enableShow.label')}`}</div>
            </FormCheck.Label>
            
            <FormInfo
            
                tooltip={`${t(
                  'manufacturing.fields.settings.fields.enableShow.tooltip'
                )}`}
              />
          </FormCheck>
</div>
<div className=" flex justify-end">
<Button type="submit" variant="primary" className="mb-2 mr-1 w-24">
                               {`${t('common.button.update')}`}
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
