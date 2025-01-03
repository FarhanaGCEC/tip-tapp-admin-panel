/* eslint-disable react/no-unescaped-entities */
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
} from '../../../components/common/form-elements'
import SharedDataContainer from '../../../containers/sharedData'
import ShortcutKey from '../../../components/common/shortcut-key'
import SlideoverPanel from '../../../components/slideover-panel'
import { useTranslation } from 'react-i18next'
import PreviewImage from '../../../assets/images/fakers/image2.jpg'
import UploadFilesElement from '../../../components/common/form-elements/upload-files-element'
import LoadingIcon from '../../../components/common/loading-icon'
import Alert from "../../../base-components/Alert"

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

  return (
    <div className="">
      <div className="intro-y mt-4 flex flex-col items-center sm:flex-row">
            <h2 className="mr-auto text-lg font-medium ml-2">
              {' '}
              <h2 className="mr-auto text-lg font-medium">
                {`${t('productManagement.fields.importOpeningStock.title')}`}
                <Button
                  variant="twitter"
                  className="intro-y mx-1 h-7 w-7 rounded-full"
                >
                ? 
                </Button>
              </h2>{' '}
            </h2>
      
          </div>  
        <div className="intro-y box mb-5 mt-6 px-5 py-6 ">   
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">     
        <UploadFilesElement
              id="filetoImport"
              name="filetoImport"
              register={register}
              label={`${t('productManagement.fields.filetoImport.label')}`}
              variant="primary"
              btnLabel={`${t(
                'productManagement.fields.filetoImport.btnPlaceolder'
              )}`}
            />

          </div> 
          
          <div className="mt-5 flex justify-end">
         
          <Button
              variant="success"
              className="mb-2 mr-1 text-white"
              onClick={handleSlider}
            >
              {`${t('common.button.downloadTemplate')}`}
            </Button>
            <Button type="submit" variant="primary" className="mb-2 mr-1 w-24">
              {`${t('common.button.submit')}`}
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
        <div className="intro-y box mb-5 px-5 py-5">
       <div className="flex flex-col border-b mb-5 font-medium text-base  dark:border-darkmode-400">
                  <h2 className="mr-auto text-base font-medium mb-4">
                  {`${t('productManagement.fields.instruction.title')}`}
                  </h2>
                  </div>
  <div className="grid grid-cols-1 gap-7 md:grid-cols-2">  
  <Alert variant="soft-danger" className="flex items-center mr-2 "> 
      <Lucide icon="AlertCircle" className="w-6 h-6 mr-2" />
      Follow the Instructions Carefully Before Importing the File
    </Alert>
    <Alert variant="soft-primary" className="flex items-center"> 
      <Lucide icon="AlertTriangle" className="w-6 h-6 mr-2" />
      The Columns of the File Should be in the Following Order
    </Alert>
  </div>
  
  <div className=" mb-3 py-5 " style={{ overflowY: 'auto' }}>
            
            <Table
              bordered
              striped
              hover
              
            >
        <Table.Thead variant="dark">
            <Table.Tr>
                <Table.Th className="whitespace-nowrap">
                Column No
                </Table.Th>
                <Table.Th className="whitespace-nowrap">
                Column Name
                </Table.Th>
                <Table.Th className="whitespace-nowrap">
                Instruction
                </Table.Th>
            </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
            <Table.Tr>
                <Table.Td>1</Table.Td>
                <Table.Td>SKU(Required)</Table.Td>
                <Table.Td>Name of the Product</Table.Td>
            </Table.Tr>
            <Table.Tr>
                <Table.Td>2</Table.Td>
                <Table.Td>Location (Optional) <div>If blank first business location will be used</div></Table.Td>
                <Table.Td>Name of the Business Location</Table.Td>
            </Table.Tr>
            <Table.Tr>
                <Table.Td>3</Table.Td>
                <Table.Td>Quantity (Required)</Table.Td>
                <Table.Td></Table.Td>
            </Table.Tr>
            <Table.Tr>
                <Table.Td>4</Table.Td>
                <Table.Td>Unit Cost (Before Tax) (Required)</Table.Td>
                <Table.Td></Table.Td>
            </Table.Tr>
            <Table.Tr>
                <Table.Td>5</Table.Td>
                <Table.Td>Lot Number (Optional)</Table.Td>
                <Table.Td ></Table.Td>
            </Table.Tr>
            <Table.Tr>
                <Table.Td>6</Table.Td>
                <Table.Td>Expiry Date (Optional)</Table.Td>
                <Table.Td><div>	Stock Expiry Date in Business Date Format</div>
                <div>mm/dd/yyyy</div> </Table.Td>
            </Table.Tr>
            
            
        </Table.Tbody>
    </Table>
</div>
</div>

    </div>
  )
}

export default Main
