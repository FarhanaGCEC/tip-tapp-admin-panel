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
import TomSelect from '../../../components/common/tom-select'
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
  const [select, setSelect] = useState('1')

  return (
    <div className="">
      
      <div className="intro-y mt-4 flex flex-col items-center sm:flex-row">
            <h2 className="mr-auto text-lg font-medium ml-2">
            
              <h2 className="mr-auto text-lg font-medium">
              Manufacturing Report
                
              </h2>
            </h2>
      
          </div>  
        <div className="intro-y box mb-5 mt-5 px-5 py-5 ">
        <div className="flex items-center mb-7 text-left">
  <div className="flex items-center">
   
    <div className="relative  text-slate-500 ">
      <TomSelect
      
        id="update-profile-form-2"
        value={select}
        onChange={setSelect}
        className="w-80 bg-secondary"
      >
        
        <option value="1">All Locations</option>
        <option value="2">Bunny Stores</option>
        <option value="3">Kandy</option>
      </TomSelect>
    </div>
  </div>
  <div className="relative mt-3 sm:ml-auto sm:mt-0">
    <Lucide
      icon="Calendar"
      className="absolute inset-y-0 left-0 z-10 w-4 h-4 my-auto ml-3"
    />
    <FormInput
      type="text"
      className="pl-10 sm:w-56 !box"
      placeholder="Filter by Date"
    />
  </div>
</div>
<div className="grid grid-cols-1 mb-7 sm:grid-cols-2 gap-4">
    <div className="box dark:bg-dark bg-dark text-white">
      <div className="flex flex-col items-center p-5 lg:flex-row">
        <div className="">
          Total Production
        </div>
        <div className="flex flex-col items-center mt-3 text-center lg:ml-2 lg:mr-auto lg:text-left lg:mt-0">
      <div className="text-slate-500 text-xs mt-0.5">
        
      </div>
    </div>
    <div className="flex  text-lg">
      Rs. 100,000,000.00
    </div>
      </div>
    </div>
    <div className="box dark:bg-dark bg-dark text-white">
  <div className="flex  flex-row items-center justify-between p-5 lg:flex-row">
    <div className="">
      Total Production Cost
    </div>
    <div className="flex flex-col items-center mt-3 text-center lg:ml-2 lg:mr-auto lg:text-left lg:mt-0">
      <div className="text-slate-500 text-xs mt-0.5">
        
      </div>
    </div>
    <div className="flex  text-lg">
      Rs. 100,000,000.00
    </div>
  </div>
</div>


 
</div>

<div className="box mb-7 dark:bg-secondary bg-secondary text-black">
      <div className="flex flex-col items-center p-5 lg:flex-row">
        <div className="text-lg">
          Total Sold
        </div>
        <div className="flex flex-col items-center mt-3 text-center lg:ml-2 lg:mr-auto lg:text-left lg:mt-0">
      <div className="text-slate-500 text-xs mt-0.5">
        
      </div>
    </div>
    <div className="flex  text-lg">
      Rs. 100,000,000.00
    </div>
      </div>
    </div>  


   
<div className=" flex justify-end">
<Button type="submit" variant="primary" className="mb-2 mr-1 w-24">
                               {`${t('common.button.print')}`}
                               {isLoading ? (
                                 <LoadingIcon icon="oval" color="white" className="ml-2 h-4 w-4" />
                               ) : (
                                 ''
                               )}
                             </Button> 
</div>
</div>

<div className="intro-y box mb-5 mt-5 px-5 py-5">
  <div className="flex justify-between">
    <Button type="submit" variant="facebook" className="w-full mb-2">
      Stock Report
      {isLoading ? (
        <LoadingIcon icon="oval" color="white" className="ml-2 h-4 w-4" />
      ) : (
        ''
      )}
    </Button>
    <Button type="submit" variant="linkedin" className="ml-2 w-full mb-2">
      Lot report
      {isLoading ? (
        <LoadingIcon icon="oval" color="white" className="ml-2 h-4 w-4" />
      ) : (
        ''
      )}
    </Button>
    <Button type="submit" variant="twitter" className=" ml-2 w-full mb-2">
      Stock Expiry Report
      {isLoading ? (
        <LoadingIcon icon="oval" color="white" className="ml-2 h-4 w-4" />
      ) : (
        ''
      )}
    </Button>
    <Button type="submit" variant="instagram" className="ml-2 w-full mb-2">
      Items Report
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
