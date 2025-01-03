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
                {`${t('productManagement.fields.importProducts.title')}`}
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
                <Table.Td>Product Name (Required)</Table.Td>
                <Table.Td>Name of the Product</Table.Td>
            </Table.Tr>
            <Table.Tr>
                <Table.Td>2</Table.Td>
                <Table.Td>Brand (Optional)</Table.Td>
                <Table.Td><div>Name of the Brand</div>
                <div>(If not found new brand with the given name will be created)</div> </Table.Td>
            </Table.Tr>
            <Table.Tr>
                <Table.Td>3</Table.Td>
                <Table.Td>Unit (Required)</Table.Td>
                <Table.Td>Name of the Unit</Table.Td>
            </Table.Tr>
            <Table.Tr>
                <Table.Td>4</Table.Td>
                <Table.Td>	Category (Optional)</Table.Td>
                <Table.Td><div>Name of the Category</div>
                <div>(If not found new category with the given name will be created)</div> </Table.Td>
            </Table.Tr>
            <Table.Tr>
                <Table.Td>5</Table.Td>
                <Table.Td>Sub category (Optional)</Table.Td>
                <Table.Td ><div>Name of the Sub-Category</div>
                <div>(If not found new sub-category with the given name under the
parent Category will be created)</div> </Table.Td>
            </Table.Tr>
            <Table.Tr>
                <Table.Td>6</Table.Td>
                <Table.Td>SKU (Optional)</Table.Td>
                <Table.Td>Product SKU. If blank an SKU will be automatically generated</Table.Td>
            </Table.Tr>
            <Table.Tr>
                <Table.Td>7</Table.Td>
                <Table.Td>Barcode Type (Optional, Default: C128)</Table.Td>
                <Table.Td ><div>Barcode Type for the Product.</div>
                <div>Currently supported: C128, C39, EAN-13, EAN-8, UPC-A, UPC-E, ITF-14</div> </Table.Td>
            </Table.Tr>
            <Table.Tr>
                <Table.Td>8</Table.Td>
                <Table.Td>Manage Stock? (Required)</Table.Td>
                <Table.Td ><div>Enable or Disable Stock Managemant</div>
                <div>1 = Yes</div> 
                <div>0 = No</div>
                </Table.Td>
            </Table.Tr>
            <Table.Tr>
                <Table.Td>9</Table.Td>
                <Table.Td>	Alert quantity (Optional)</Table.Td>
                <Table.Td>Alert Quantity</Table.Td>
            </Table.Tr>
            <Table.Tr>
                <Table.Td>10</Table.Td>
                <Table.Td>Expires in (Optional)</Table.Td>
                <Table.Td>	Product Expiry Period (Only in Numbers)</Table.Td>
            </Table.Tr>
            <Table.Tr>
                <Table.Td>11</Table.Td>
                <Table.Td>	Expiry Period Unit (Optional)</Table.Td>
                <Table.Td><div>	Unit for the Expiry Period</div>
                <div>Available Options : Days, Months</div> </Table.Td>
            </Table.Tr>
            <Table.Tr>
                <Table.Td>12</Table.Td>
                <Table.Td>	Applicable Tax (Optional)</Table.Td>
                <Table.Td><div>Name of the Tax Rate</div>
                <div>If purchase Price (Excluding Tax) is not same as
Purchase Price (Including Tax)
then you must supply the tax rate name.</div> </Table.Td>
            </Table.Tr>
            <Table.Tr>
                <Table.Td>13</Table.Td>
                <Table.Td>Selling Price Tax Type (Required)</Table.Td>
                <Table.Td><div>Selling Price Tax Type</div>
                <div>Available Options: Inclusive, Exclusive</div> </Table.Td>
            </Table.Tr>
            <Table.Tr>
                <Table.Td>14</Table.Td>
                <Table.Td>Product Type (Required)</Table.Td>
                <Table.Td><div>Product Type</div>
                <div>Available Options : Single, Variable</div></Table.Td>
            </Table.Tr>
            <Table.Tr>
                <Table.Td>15</Table.Td>
                <Table.Td><div>Variation Name</div>
                <div>(Required if product type is variable)</div> </Table.Td>
                <Table.Td>Name of the variation (Ex: Size, Color etc )</Table.Td>
            </Table.Tr>
            <Table.Tr>
                <Table.Td>16</Table.Td>
                <Table.Td><div>Variation Values</div>
                <div>(Required if product type is variable)</div> </Table.Td>
                <Table.Td><div>Values for the Variation Separated with '|'</div>
                <div>(Ex: Red|Blue|Green)</div></Table.Td>
            </Table.Tr>
            <Table.Tr>
                <Table.Td>17</Table.Td>
                <Table.Td><div>Purchase Price (Including Tax)</div>
                <div>(Required if Purchase Price Excluding Tax is not given)</div> </Table.Td>
                <Table.Td><div>Purchase Price (Including Tax) (Only in Numbers)</div>
                <div>For variable products '|' separated values with the same order as Variation Values
</div> <div>(Ex: 84|85|88)</div></Table.Td>
            </Table.Tr>
            <Table.Tr>
                <Table.Td>18</Table.Td>
                <Table.Td><div>Purchase Price (Excluding Tax)</div>
                <div>(Required if Purchase Price Including Tax is not given)</div> </Table.Td>
                <Table.Td><div>Purchase Price (Excluding Tax) (Only in Numbers)</div>
                <div>For variable products '|' separated values with the same order as Variation Values
</div> <div>(Ex: 84|85|88)</div></Table.Td>
            </Table.Tr>
            <Table.Tr>
                <Table.Td>19</Table.Td>
                <Table.Td>Profit Margin % (Optional)</Table.Td>
                <Table.Td><div>Profit Margin (Only in Numbers)</div>
                <div>If blank default profit margin for the business will be used</div></Table.Td>
            </Table.Tr>
            <Table.Tr>
                <Table.Td>20</Table.Td>
                <Table.Td>Selling Price (Optional)</Table.Td>
                <Table.Td><div>Selling Price (Only in Numbers)</div>
                <div>If blank selling price will be calculated with the given Purchase Price and Applicable Tax</div></Table.Td>
            </Table.Tr>
            <Table.Tr>
                <Table.Td>21</Table.Td>
                <Table.Td>	Opening Stock (Optional)</Table.Td>
                <Table.Td><div>Opening Stock (Only in numbers)</div>
                <div>For variable products separate stock quantities with </div>
                <div>(Ex: 100|150|200)</div></Table.Td>
            </Table.Tr>
            <Table.Tr>
                <Table.Td>22</Table.Td>
                <Table.Td><div>	Opening stock location (Optional)</div>
                <div>If blank first business location will be used</div></Table.Td>
                <Table.Td>Name of the Business Location</Table.Td>
            </Table.Tr>
            <Table.Tr>
                <Table.Td>23</Table.Td>
                <Table.Td>Expiry Date (Optional)</Table.Td>
                <Table.Td><div>Stock Expiry Date</div>
                <div>Format: mm-dd-yyyy; Ex: 11-25-2018</div></Table.Td>
            </Table.Tr>
            <Table.Tr>
                <Table.Td>24</Table.Td>
                <Table.Td>Enable Product Description (Optional, Default: 0)</Table.Td>
                <Table.Td><div>1 = Yes</div>
                <div>0 = No</div></Table.Td>
            </Table.Tr>
            <Table.Tr>
                <Table.Td>25</Table.Td>
                <Table.Td>Weight (Optional)</Table.Td>
                <Table.Td>Optional</Table.Td>
            </Table.Tr>
            <Table.Tr>
                <Table.Td>26</Table.Td>
                <Table.Td>Rack (Optional)</Table.Td>
                <Table.Td><div>	Rack details seperated by '|' for different business locations serially.</div>
                <div>(Ex: R1|R5|R12)</div></Table.Td>
            </Table.Tr>
            <Table.Tr>
                <Table.Td>27</Table.Td>
                <Table.Td>Row (Optional)</Table.Td>
                <Table.Td><div>Row details seperated by '|' for different business locations serially.</div>
                <div>(Ex: ROW1|ROW2|ROW3)</div></Table.Td>
            </Table.Tr>
            <Table.Tr>
                <Table.Td>28</Table.Td>
                <Table.Td>	Position (Optional)</Table.Td>
                <Table.Td><div>Position details seperated by '|' for different business locations serially.</div>
                <div>(Ex: POS1|POS2|POS3)</div></Table.Td>
            </Table.Tr>
            <Table.Tr>
                <Table.Td>29</Table.Td>
                <Table.Td>Image (Optional)</Table.Td>
                <Table.Td><div>	Image name with extension.</div>
                <div>(Image name must be uploaded to the server public/uploads_new/img )</div></Table.Td>
            </Table.Tr>
            <Table.Tr>
                <Table.Td>30</Table.Td>
                <Table.Td>	Product Description (Optional)</Table.Td>
                <Table.Td></Table.Td>
            </Table.Tr>
            <Table.Tr>
                <Table.Td>31</Table.Td>
                <Table.Td>Custom Field1 (Optional)</Table.Td>
                <Table.Td></Table.Td>
            </Table.Tr>
            <Table.Tr>
                <Table.Td>32</Table.Td>
                <Table.Td>Custom Field2 (Optional)</Table.Td>
                <Table.Td></Table.Td>
            </Table.Tr>
            <Table.Tr>
                <Table.Td>33</Table.Td>
                <Table.Td>Custom Field3 (Optional)</Table.Td>
                <Table.Td></Table.Td>
            </Table.Tr>
            <Table.Tr>
                <Table.Td>34</Table.Td>
                <Table.Td>Custom Field4 (Optional)</Table.Td>
                <Table.Td></Table.Td>
            </Table.Tr>
            <Table.Tr>
                <Table.Td>35</Table.Td>
                <Table.Td>Not for Selling (Optional)</Table.Td>
                <Table.Td><div>1 = Yes</div>
                <div>0 = No</div></Table.Td>
            </Table.Tr>
            <Table.Tr>
                <Table.Td>36</Table.Td>
                <Table.Td>	Product Locations (Optional)</Table.Td>
                <Table.Td>Comma separated string of business location names where product will be available</Table.Td>
            </Table.Tr>
            <Table.Tr>
                <Table.Td>37</Table.Td>
                <Table.Td>	Lot Number (Optional)</Table.Td>
                <Table.Td>	You should enable lot number feature first</Table.Td>
            </Table.Tr>
        </Table.Tbody>
    </Table>
</div>
</div>

    </div>
  )
}

export default Main
