/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable import/order */
/* eslint-disable react/no-unknown-property */
/* eslint-disable react/self-closing-comp */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import _ from 'lodash'
import { PosApi } from '../../../../api'
import Table from '../../../../components/common/table'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import Button from '../../../../components/common/button'
import Lucide from '../../../../components/common/lucide'
import { Menu, Dialog } from '../../../../components/common/headless'
import Pagination from '../../../../components/common/pagination'
import {
  DateElement,
  InputElement,
  SelectElement,
  TextareaElement,
} from '../../../../components/common/form-elements'
import SharedDataContainer from '../../../../containers/sharedData'
import ShortcutKey from '../../../../components/common/shortcut-key'
import SlideoverPanel from '../../../../components/slideover-panel'
import { useTranslation } from 'react-i18next'
import PreviewImage from '../../../assets/images/fakers/image2.jpg'
import UploadFilesElement from '../../../../components/common/form-elements/upload-files-element'
import LoadingIcon from '../../../../components/common/loading-icon'
import Alert from "../../../../base-components/Alert"
import {
  FormInput,
  FormInline,
  InputGroup,
  FormSelect,
  FormLabel,
  FormInfo,
} from '../../../../components/common/form-elements/components'
import Tippy from '../../../../components/common/tippy'
import ClassicEditorElement from '../../../../components/common/form-elements/classic-editor-element'

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
  const [tooltipContent1] = useState(
    "Percentage of total Ouput Quantity Wasted During Production"
  )
  const [date, setDate] = useState('')

  const [rows, setRows] = useState(1); // Initial number of rows

  const addRow = () => {
    setRows(rows + 1);
  }

  return (
    <div className="">
      
 
        <div className="intro-y box mb-5 mt-5 px-5 py-6 ">   
        <div className="flex flex-col border-b mb-3 border-slate-200/60 dark:border-darkmode-400">
        <h2 className="mr-auto text-base font-medium flex mb-4">
                  Production
                  </h2> </div>
<div className="grid grid-cols-1 gap-7 flex mt-5 md:grid-cols-2 ">
<InputElement
            label={`${t('manufacturing.fields.production.fields.referenceNo.label')}`}
            register={register}
            name="date"
            id="date"
            info={`${t('manufacturing.fields.production.fields.referenceNo.tooltip')}`}
            
          />
<DateElement
            label={`${t('manufacturing.fields.production.fields.date.label')}`}
            value={date}
            required
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
            name="date"
            id="date"
          />
          <SelectElement
            label={`${t('manufacturing.fields.production.fields.businessLocation.label')}`}
            register={register}
            name="firstName"
            id="firstName"
            info={`${t('manufacturing.fields.production.fields.businessLocation.tooltip')}`}
            required
          />
          <SelectElement
            label={`${t('manufacturing.fields.production.fields.status.label')}`}
            register={register}
            name="firstName"
            id="firstName"
            required
          />
 </div> 

        </div>
        
        <div className="intro-y box mb-5 mt-5 px-5 py-6 ">   
        <div className="flex flex-col border-b mb-3 border-slate-200/60 dark:border-darkmode-400">
        <h2 className="mr-auto text-base font-medium flex mb-4">
                  Production Details
                  </h2> </div>
                  <Table>
        <Table.Thead variant="dark" >
            <Table.Tr>
            <Table.Th className="whitespace-nowrap text-center !px-32">Main Product</Table.Th>
                <Table.Th className="whitespace-nowrap !px-4 text-center">
                Total Output Quantity 
                </Table.Th>
                <Table.Th className="whitespace-nowrap !px-6 text-center">
                Waste Quantity 
                </Table.Th>
                <Table.Th className="whitespace-nowrap text-center !px-28">
               Final Quantity 
                </Table.Th>
            </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
            <Table.Tr>
                <Table.Td><InputGroup className="flex-1">
                                    <FormSelect />
                                  </InputGroup></Table.Td>
                <Table.Td><InputGroup className="flex-1 ">
                                    <FormInput type="number" placeholder="0"  />
                                  </InputGroup></Table.Td>
                <Table.Td><InputGroup className="flex-1 ">
                                    <FormInput type="number" placeholder="0"  />
                                  </InputGroup></Table.Td>

                <Table.Td className="flex">    <InputGroup className="flex-1">
                                    <FormInput type="number" placeholder="0"  />
                                  </InputGroup>
                                  <InputGroup className="flex-1  ml-2">
                                    <FormSelect />
                                  </InputGroup></Table.Td>
            </Table.Tr>
            
        </Table.Tbody>
    </Table>
    <Table className="mt-7">
        <Table.Thead variant="light">
            <Table.Tr>
                <Table.Th className="whitespace-nowrap text-center !px-32">By Product</Table.Th>
                <Table.Th className="whitespace-nowrap !px-4 text-center">
                Total Output Quantity 
                </Table.Th>
                <Table.Th className="whitespace-nowrap !px-6 text-center">
                Waste Quantity 
                </Table.Th>
                <Table.Th className="whitespace-nowrap text-center !px-28">
               Final Quantity 
                </Table.Th>
            </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
            <Table.Tr>
                <Table.Td ><InputGroup className="flex-1 ">
                                    <FormSelect />
                                  </InputGroup></Table.Td>
                <Table.Td><InputGroup className="flex-1 ">
                                    <FormInput type="number" placeholder="0"  />
                                  </InputGroup></Table.Td>
                <Table.Td><InputGroup className="flex-1 ">
                                    <FormInput type="number" placeholder="0"  />
                                  </InputGroup></Table.Td>

                <Table.Td className="flex">    <InputGroup className="flex-1">
                                    <FormInput type="number" placeholder="0"  />
                                  </InputGroup>
                                  <InputGroup className="flex-1  ml-2">
                                    <FormSelect />
                                  </InputGroup></Table.Td>
            </Table.Tr>
            <Table.Tr>
                <Table.Td ><InputGroup className="flex-1 ">
                                    <FormSelect />
                                  </InputGroup></Table.Td>
                <Table.Td><InputGroup className="flex-1 ">
                                    <FormInput type="number" placeholder="0"  />
                                  </InputGroup></Table.Td>
                <Table.Td><InputGroup className="flex-1 ">
                                    <FormInput type="number" placeholder="0"  />
                                  </InputGroup></Table.Td>

                <Table.Td className="flex">    <InputGroup className="flex-1">
                                    <FormInput type="number" placeholder="0"  />
                                  </InputGroup>
                                  <InputGroup className="flex-1  ml-2">
                                    <FormSelect />
                                  </InputGroup></Table.Td>
            </Table.Tr>
            <Table.Tr>
                <Table.Td ><InputGroup className="flex-1 ">
                                    <FormSelect />
                                  </InputGroup></Table.Td>
                <Table.Td><InputGroup className="flex-1 ">
                                    <FormInput type="number" placeholder="0"  />
                                  </InputGroup></Table.Td>
                <Table.Td><InputGroup className="flex-1 ">
                                    <FormInput type="number" placeholder="0"  />
                                  </InputGroup></Table.Td>

                <Table.Td className="flex">    <InputGroup className="flex-1">
                                    <FormInput type="number" placeholder="0"  />
                                  </InputGroup>
                                  <InputGroup className="flex-1  ml-2">
                                    <FormSelect />
                                  </InputGroup></Table.Td>
            </Table.Tr>
        </Table.Tbody>
    </Table>
                  
        </div>

        <div className="intro-y box mb-5 mt-5 px-5 py-6 ">   
        <div className="flex flex-col border-b mb-3 border-slate-200/60 dark:border-darkmode-400">
        <h2 className="mr-auto text-base font-medium flex mb-4">
        Ingrediants
                  </h2> </div>
                  <Table className="mt-5">
        <Table.Thead variant="light">
            <Table.Tr>
                <Table.Th className="whitespace-nowrap text-center !px-20">Ingredient</Table.Th>
                <Table.Th className="whitespace-nowrap !px-28 text-center">
                Input Quantity 
                </Table.Th>
                <Table.Th className="whitespace-nowrap !px-6 text-center">
                Waste Percentage 
                </Table.Th>
                <Table.Th className="whitespace-nowrap text-center ">
               Final Quantity 
                </Table.Th>
                <Table.Th className="whitespace-nowrap text-center ">
              Total Price
                </Table.Th>
            </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
            <Table.Tr>
                <Table.Td >Lanka Super Diesel(1869)</Table.Td>
                                  <Table.Td className="flex">    <InputGroup className="flex-1">
                                    <FormInput type="number" placeholder="0"  />
                                  </InputGroup>
                                  <InputGroup className="flex-1  ml-2">
                                    <FormSelect />
                                  </InputGroup></Table.Td>
                <Table.Td> <InputGroup className="flex-1">
                              <FormInput type="text" placeholder="" />
                              <InputGroup.Text>%</InputGroup.Text>
                            </InputGroup></Table.Td>

                                  <Table.Td className="text-center">1.00L</Table.Td>
                                  <Table.Td className="text-right">100,000.00</Table.Td>
            </Table.Tr>
            <Table.Tr>
                <Table.Td >Lanka Super Diesel(1869)</Table.Td>
                                  <Table.Td className="flex">    <InputGroup className="flex-1">
                                    <FormInput type="number" placeholder="0"  />
                                  </InputGroup>
                                  <InputGroup className="flex-1  ml-2">
                                    <FormSelect />
                                  </InputGroup></Table.Td>
                <Table.Td> <InputGroup className="flex-1">
                              <FormInput type="text" placeholder="" />
                              <InputGroup.Text>%</InputGroup.Text>
                            </InputGroup></Table.Td>

                                  <Table.Td className="text-center">1.00L</Table.Td>
                                  <Table.Td className="text-right">50.00</Table.Td>
            </Table.Tr>
        </Table.Tbody>
        <Table.Thead variant="light">
            <Table.Tr>
                <Table.Th className="whitespace-nowrap text-center !px-20"></Table.Th>
                <Table.Th className="whitespace-nowrap !px-28 text-center">
               
                </Table.Th>
                <Table.Th className="whitespace-nowrap !px-6 text-center">
                
                </Table.Th>
                <Table.Th className="whitespace-nowrap text-center ">
               Ingredients Cost :
                </Table.Th>
                <Table.Th className="whitespace-nowrap text-right ">
               100,050.00
                </Table.Th>
            </Table.Tr>
        </Table.Thead>
    </Table>
                  </div>
                  <div className="intro-y box mb-5 mt-5 px-5 py-6 ">   
        <div className="flex flex-col border-b mb-3 border-slate-200/60 dark:border-darkmode-400">
        <h2 className="mr-auto text-base font-medium flex mb-4">
        Overhead Cost
                  </h2> </div>
                  <Table className="mt-5">
        <Table.Thead variant="light">
            <Table.Tr>
                <Table.Th className="whitespace-nowrap text-center !px-20"> Expences Category</Table.Th>
                <Table.Th className="whitespace-nowrap text-center !px-6">
               Absorption Value
                </Table.Th>
                <Table.Th className="whitespace-nowrap !px-6 text-center ">
               Cost Variation Value
                </Table.Th>
                <Table.Th className="whitespace-nowrap  text-right ">
              Final Cost
                </Table.Th>
                <Table.Th className="whitespace-nowrap  text-right ">
                </Table.Th>
            </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
        {[...Array(rows)].map((_, index) => (
            <Table.Tr key={index}>
               
                                  <Table.Td className="flex">    
                                  <InputGroup className="flex-1">
                                    <FormSelect/>
                                  </InputGroup>
                                 </Table.Td>
                <Table.Td> <InputGroup className="flex-1">
                                    <FormInput type="number" placeholder="0"  />
                                  </InputGroup></Table.Td>

                                  <Table.Td className="text-center"><InputGroup className="flex-1">
                                    <FormInput type="number" placeholder="0"  />
                                  </InputGroup></Table.Td>
                                  <Table.Td className="text-right ">100,000.00</Table.Td>
                                  <Table.Td className="">    
                                  <a onClick={addRow}>
                                  <Lucide icon="PlusCircle" className="w-4 h-4" />
                                </a>
                                 </Table.Td>
            </Table.Tr>
))}
        </Table.Tbody>
        <Table.Thead variant="light">
            <Table.Tr>
             
                <Table.Th className="whitespace-nowrap text-center">
               
                </Table.Th>
                <Table.Th className="whitespace-nowrap !px-6 text-center">
                
                </Table.Th>
                <Table.Th className="whitespace-nowrap text-right ">
               Overhead Cost :
                </Table.Th>
                <Table.Th className="whitespace-nowrap text-right">
               100,050.00
                </Table.Th>
                <Table.Th className="whitespace-nowrap text-center">
               
                </Table.Th>
            </Table.Tr>
        </Table.Thead>
    </Table>
                  </div>
        <div className="intro-y box mb-5 mt-5 px-5 py-6 " >   
      
        <div className="mb-3 mt-3 grid grid-cols-1 gap-7 md:grid-cols-2">
  <FormInline className="text-left mb-5">
    <FormLabel className="font-medium">Lot Number</FormLabel>
    <div className="flex items-center flex-1">
      <InputGroup className="flex-1">
        <FormInput type="text" placeholder="" />
      </InputGroup>
    </div>
  </FormInline>
  <div className="intro-y col-span-1 flex flex-wrap !px-2 items-center justify-end sm:flex-row sm:flex-nowrap">
    <div className="flex flex-col mt-3 font-medium mb-5 text-right">
      <div> Final Quantity : 1,000</div>
      <div className="mt-7">Total Cost : Rs 100.00</div>
      <div className="mt-7">Unit Cost : Rs 2,000,000.00</div>
    </div>
  </div>
</div>


         
          
          </div>
          <div className=" flex justify-end mt-7">
                            
                             <Button
                               variant="secondary"
                               className="mb-2 mr-1 w-24"
                              
                             >
                               {`${t('common.button.cancel')}`}
                             </Button>
                            
                             <Button type="submit" variant="primary" className="mb-2 mr-1 w-24">
                               {`${t('common.button.submit')}`}
                               {isLoading ? (
                                 <LoadingIcon icon="oval" color="white" className="ml-2 h-4 w-4" />
                               ) : (
                                 ''
                               )}
                             </Button>
                           </div>
</div>   
  )
}

export default Main
