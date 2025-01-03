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
                {`${t('contactManagement.fields.importContacts.title')}`}
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
              id="attach_document"
              name="attach_document"
              register={register}
              label={`${t('contactManagement.fields.importContacts.fields.filetoImport.label')}`}
              variant="primary"
              btnLabel={`${t(
                'contactManagement.fields.importContacts.fields.filetoImport.btnPlaceolder'
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
  <div className=" mb-3 py-5" style={{ overflowY: 'auto' }}>
            
            <Table
              bordered
              striped
              hover
              style={{ width: '100%', whiteSpace: 'nowrap' }}
            >
        <Table.Thead variant="dark">
            <Table.Tr>
                <Table.Th className="whitespace-nowrap">
                Column Number
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
                <Table.Td>Contact type (Required)</Table.Td>
                <Table.Td><div>Available Options:</div> 
                <div>1 = Customer</div>
                <div>2 = Supplier</div>
                <div>3 = Both</div>
 </Table.Td>
            </Table.Tr>
            <Table.Tr>
                <Table.Td>2</Table.Td>
                <Table.Td>Prefix (Optional)</Table.Td>
                <Table.Td></Table.Td>
            </Table.Tr>
            <Table.Tr>
                <Table.Td>3</Table.Td>
                <Table.Td>First Name (Required)</Table.Td>
                <Table.Td></Table.Td>
            </Table.Tr>
            <Table.Tr>
                <Table.Td>4</Table.Td>
                <Table.Td>Middlename (Optional)</Table.Td>
                <Table.Td></Table.Td>
            </Table.Tr>
            <Table.Tr>
                <Table.Td>5</Table.Td>
                <Table.Td>Last Name (Optional)</Table.Td>
                <Table.Td></Table.Td>
            </Table.Tr>
            <Table.Tr>
                <Table.Td>6</Table.Td>
                <Table.Td>Business Name
(Required if contact type is supplier or both)</Table.Td>
                <Table.Td></Table.Td>
            </Table.Tr>
            <Table.Tr>
                <Table.Td>7</Table.Td>
                <Table.Td>Contact ID (Optional)</Table.Td>
                <Table.Td>Leave blank to auto generate Contact ID</Table.Td>
            </Table.Tr>
            <Table.Tr>
                <Table.Td>8</Table.Td>
                <Table.Td>Tax number (Optional)</Table.Td>
                <Table.Td></Table.Td>
            </Table.Tr>
            <Table.Tr>
                <Table.Td>9</Table.Td>
                <Table.Td>Opening Balance (Optional)</Table.Td>
                <Table.Td></Table.Td>
            </Table.Tr>
            <Table.Tr>
                <Table.Td>10</Table.Td>
                <Table.Td>Pay term
(Required if contact type is supplier or both)</Table.Td>
                <Table.Td></Table.Td>
            </Table.Tr>
            <Table.Tr>
                <Table.Td>11</Table.Td>
                <Table.Td>Pay term period
(Required if contact type is supplier or both)</Table.Td>
                <Table.Td>Available Options: Days and Months</Table.Td>
            </Table.Tr>
            <Table.Tr>
                <Table.Td>12</Table.Td>
                <Table.Td>Credit Limit (Optional)</Table.Td>
                <Table.Td></Table.Td>
            </Table.Tr>
            <Table.Tr>
                <Table.Td>13</Table.Td>
                <Table.Td>Email (Optional)</Table.Td>
                <Table.Td></Table.Td>
            </Table.Tr>
            <Table.Tr>
                <Table.Td>14</Table.Td>
                <Table.Td>Mobile (Required)</Table.Td>
                <Table.Td></Table.Td>
            </Table.Tr>
            <Table.Tr>
                <Table.Td>15</Table.Td>
                <Table.Td>Alternate contact number (Optional)</Table.Td>
                <Table.Td></Table.Td>
            </Table.Tr>
            <Table.Tr>
                <Table.Td>16</Table.Td>
                <Table.Td>Landline (Optional)</Table.Td>
                <Table.Td></Table.Td>
            </Table.Tr>
            <Table.Tr>
                <Table.Td>17</Table.Td>
                <Table.Td>City (Optional)</Table.Td>
                <Table.Td></Table.Td>
            </Table.Tr>
            <Table.Tr>
                <Table.Td>18</Table.Td>
                <Table.Td>State (Optional)</Table.Td>
                <Table.Td></Table.Td>
            </Table.Tr>
            <Table.Tr>
                <Table.Td>19</Table.Td>
                <Table.Td>Country (Optional)</Table.Td>
                <Table.Td></Table.Td>
            </Table.Tr>
            <Table.Tr>
                <Table.Td>20</Table.Td>
                <Table.Td>Address line 1 (Optional)</Table.Td>
                <Table.Td></Table.Td>
            </Table.Tr>
            <Table.Tr>
                <Table.Td>21</Table.Td>
                <Table.Td>Address line 2 (Optional)</Table.Td>
                <Table.Td></Table.Td>
            </Table.Tr>
            <Table.Tr>
                <Table.Td>22</Table.Td>
                <Table.Td>Zip Code (Optional)</Table.Td>
                <Table.Td></Table.Td>
            </Table.Tr>
            <Table.Tr>
                <Table.Td>23</Table.Td>
                <Table.Td>Date of birth (Optional)</Table.Td>
                <Table.Td>Format Y-M-D (2023-08-21)</Table.Td>
            </Table.Tr>
            <Table.Tr>
                <Table.Td>24</Table.Td>
                <Table.Td>Custom Field 1 (Optional)</Table.Td>
                <Table.Td></Table.Td>
            </Table.Tr>
            <Table.Tr>
                <Table.Td>25</Table.Td>
                <Table.Td>Custom Field 2 (Optional)</Table.Td>
                <Table.Td></Table.Td>
            </Table.Tr>
        </Table.Tbody>
    </Table>
</div>
</div>

    </div>
  )
}

export default Main
