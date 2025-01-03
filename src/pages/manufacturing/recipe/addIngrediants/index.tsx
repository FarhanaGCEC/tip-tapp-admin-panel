/* eslint-disable @typescript-eslint/no-redeclare */
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
import { Box } from 'lucide'

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
  const [tooltipContent2] = useState(
    "Add a production step with step name, description & different ingredient for it."
  )
  const [tooltipContent3] = useState(
    "If fixed it will be directly added to total ingredient cost, if percentage percentage of total ingredient cost will be added and if per unit total unit will be multiplied to production cost"
  )
  const [boxes, setBoxes] = useState<any[]>([])

  const addBox = () => {
    // Add a new box of type Box to the state
    setBoxes([...boxes, {}]);
  }

  const removeBox = (index: number) => {
    const newBoxes = boxes.filter((_, i) => i !== index);
    setBoxes(newBoxes);
  }
  const [editorData] = useState(
    `<p>${t('productForm.fields.productDescription.placeolder')}.</p>`
  )

  return (
    <div className="">
      
      <div className="intro-y mt-4 flex flex-col items-center sm:flex-row">
            <h2 className="mr-auto text-lg font-medium ml-2">
            
              <h2 className="mr-auto text-lg font-medium">
              Add Ingredients
                
              </h2>
            </h2>
      
          </div>  
        <div className="intro-y box mb-5 mt-5 px-5 py-6 ">   
        <div className="flex flex-col border-b mb-3 border-slate-200/60 dark:border-darkmode-400">
        <h2 className="mr-auto text-base flex mb-4">
                  Product : <div className="ml-2 font-medium"> Bluetooth headset</div>
                  </h2>
      </div>
       
        <div>     
        <div className="grid grid-cols-1 gap-7 flex mt-5 md:grid-cols-1 ">
       
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0 sm:space-x-2">
  <div className="flex items-center space-x-2">
    <div className="font-medium">Select Ingredient</div>
    <div className="flex items-center">
  <div className="relative flex-grow w-72">
    <FormInput
      type="text"
      className="box custom-input  pr-10" 
      placeholder="Search Ingredient"
    />
    <Lucide
      icon="Search"
      className="h-5 w-8 absolute top-1/2 transform -translate-y-1/2 right-2 text-gray-500"
    />
  </div>
</div>

  </div>
  <Button
        variant="primary"
        className="sm:w-auto"
        onClick={addBox}
      >
                 {`${t('common.button.addProductionStep')}`}
                  <Tippy content={tooltipContent2}>
                    {' '}
                    <a>
                      {' '}
                      <Lucide icon="Info" className="ml-1 h-4 w-4" />
                    </a>{' '}
                  </Tippy>
                </Button>
</div>

                        <div className="overflow-y-auto overflow-x-scroll ">
                          <Table bordered>
                            <Table.Thead variant="dark">
                              <Table.Tr>
                                <Table.Th className="whitespace-nowrap !px-2 dark:bg-darkmode-800">
                                Ingredient
                                </Table.Th>
                                <Table.Th className="whitespace-nowrap  !px-2  dark:bg-darkmode-800">
                                Wastage Percent
                                </Table.Th>
                                <Table.Th className="whitespace-nowrap !px-2  dark:bg-darkmode-800">
                                Final Quantity
                                </Table.Th>
                                <Table.Th className="whitespace-nowrap  !px-2 dark:bg-darkmode-800">
                                Price
                                </Table.Th>
                                <Table.Th className="whitespace-nowrap  !px-2 text-center dark:bg-darkmode-800">
                                  <a>
                                    {' '}
                                    <Lucide
                                      icon="Trash2"
                                      className="ml-2 h-4 w-4"
                                    />{' '}
                                  </a>
                                </Table.Th>
                               
                               
                              </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>
                              <Table.Tr>
                              <Table.Td className="!px-4">  Teats 0-3 months (89568) </Table.Td>
                                <Table.Td className="!px-4">
                                <InputGroup className="flex-1">
                                <FormInput type="text" placeholder="0" />
                                <InputGroup.Text>%</InputGroup.Text>
                              </InputGroup>
                                </Table.Td>
                                <Table.Td className="!px-4 flex">
                                  {' '}
                                  <InputGroup className="flex-1">
                                    <FormInput type="text" placeholder="0"  />
                                  </InputGroup>
                                  <InputGroup className="flex-1  ml-2">
                                    <FormSelect />
                                  </InputGroup>
                                </Table.Td>
                                <Table.Td className="!px-4"> ₨ 2,500.00s </Table.Td>
                                <Table.Td className="!pl-4 text-slate-500">
                                  <a
                                    href=""
                                    onChange={handleChange}
                                    onClick={(event: {
                                      preventDefault: () => void
                                    }) => {
                                      event.preventDefault()
                                      setDeleteConfirmationModal(true)
                                    }}
                                  >
                                    <Lucide icon="Trash2" className="h-4 w-4" />
                                  </a>
                                </Table.Td>
         
                              </Table.Tr>
           
                            </Table.Tbody>
                          </Table>

                          <Dialog
                            open={deleteConfirmationModal}
                            onClose={() => {
                              setDeleteConfirmationModal(false)
                            }}
                            initialFocus={deleteButtonRef}
                          >
                            <Dialog.Panel>
                              <div className="p-5 text-center">
                                <Lucide
                                  icon="XCircle"
                                  className="mx-auto mt-3 h-16 w-16 text-danger"
                                />
                                <div className="mt-5 text-3xl">
                                  Are you sure?
                                </div>
                                <div className="mt-2 text-slate-500">
                                  Do you really want to delete these records?{' '}
                                  <br />
                                  This process cannot be undone.
                                </div>
                              </div>
                              <div className="px-5 pb-8 text-center">
                                <Button
                                  variant="outline-secondary"
                                  type="button"
                                  onClick={() => {
                                    setDeleteConfirmationModal(false)
                                  }}
                                  className="mr-1 w-24"
                                >
                                  Cancel
                                </Button>
                                <Button
                                  variant="danger"
                                  type="button"
                                  className="w-24"
                                  ref={deleteButtonRef}
                                >
                                  Delete
                                </Button>
                              </div>
                            </Dialog.Panel>
                          </Dialog>
                        </div>
 </div> 
          </div> 

        </div>
        {boxes.map((_, index) => (
        <div className="intro-y box mb-5 mt-5 px-5 py-6 " key={index}>   
       <div className="flex flex-col mb-3 ">
       <a
              className="absolute right-0 top-0 mr-3 mt-3"
              href="#"
              onClick={() => removeBox(index)}
            >
              <Lucide icon="X" className="h-8 w-8 text-slate-400" />
            </a>
      </div>
      <div className="mb-3 mt-10 grid grid-cols-1 gap-7  md:grid-cols-2 ">
      <InputElement
            label={`${t(
              'manufacturing.fields.addIngrediants.fields.stepName.label'
            )}`}
            register={register}
            name="iDProofName"
            id="iDProofName"
          />
          <InputElement
            label={`${t(
              'manufacturing.fields.addIngrediants.fields.selectIngredient.label'
            )}`}
            register={register}
            name="iDProofNo"
            id="iDProofNo"
          />
          
          <TextareaElement
            label={`${t(
              'manufacturing.fields.addIngrediants.fields.description.label'
            )}`}
            register={register}
            name="special_remark"
            id="special_remark"
          />
          </div>
      <div className="mt-5 overflow-y-auto overflow-x-scroll ">
                          <Table bordered>
                            <Table.Thead variant="dark">
                              <Table.Tr>
                                <Table.Th className="whitespace-nowrap !px-2 dark:bg-darkmode-800">
                                Ingredient
                                </Table.Th>
                                <Table.Th className="whitespace-nowrap  !px-2  dark:bg-darkmode-800">
                                Wastage Percent
                                </Table.Th>
                                <Table.Th className="whitespace-nowrap !px-2  dark:bg-darkmode-800">
                                Final Quantity
                                </Table.Th>
                                <Table.Th className="whitespace-nowrap  !px-2 dark:bg-darkmode-800">
                                Price
                                </Table.Th>
                                <Table.Th className="whitespace-nowrap  !px-2 text-center dark:bg-darkmode-800">
                                  <a>
                                    {' '}
                                    <Lucide
                                      icon="Trash2"
                                      className="ml-2 h-4 w-4"
                                    />{' '}
                                  </a>
                                </Table.Th>
                               
                               
                              </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>
                              <Table.Tr>
                              <Table.Td className="!px-4">  Teats 0-3 months (89568) </Table.Td>
                                <Table.Td className="!px-4">
                                <InputGroup className="flex-1">
                                <FormInput type="text" placeholder="0" />
                                <InputGroup.Text>%</InputGroup.Text>
                              </InputGroup>
                                </Table.Td>
                                <Table.Td className="!px-4 flex">
                                  {' '}
                                  <InputGroup className="flex-1">
                                    <FormInput type="text" placeholder="0"  />
                                  </InputGroup>
                                  <InputGroup className="flex-1  ml-2">
                                    <FormSelect />
                                  </InputGroup>
                                </Table.Td>
                                <Table.Td className="!px-4"> ₨ 2,500.00s </Table.Td>
                                <Table.Td className="!pl-4 text-slate-500">
                                  <a
                                    href=""
                                    onChange={handleChange}
                                    onClick={(event: {
                                      preventDefault: () => void
                                    }) => {
                                      event.preventDefault()
                                      setDeleteConfirmationModal(true)
                                    }}
                                  >
                                    <Lucide icon="Trash2" className="h-4 w-4" />
                                  </a>
                                </Table.Td>
         
                              </Table.Tr>
           
                            </Table.Tbody>
                          </Table>
                        </div>

</div>
  ))}
        <div className="intro-y box mb-5 mt-5 px-5 py-6 " >   
      
      <div className="mb-3 mt-3 grid grid-cols-1 gap-7 border-b md:grid-cols-2 ">
      <FormInline className="text-left">
                          <FormLabel className="font-medium">{`${t(
              'manufacturing.fields.addIngrediants.fields.wastage.label'
            )}`}</FormLabel>
                          <Tippy content={tooltipContent1}>
                    {' '}
                    <a>
                      {' '}
                      <Lucide icon="Info" className=" h-4 w-4" />
                    </a>{' '}
                  </Tippy>
                          <div className="flex items-center flex-1 ml-14">
                            <InputGroup className="flex-1">
                              <FormInput type="text" placeholder="" />
                              <InputGroup.Text>%</InputGroup.Text>
                            </InputGroup>
                          </div>
                        </FormInline>
          <div className="flex">
          <div className="font-medium mt-2.5 text-slate"> {`${t(
              'manufacturing.fields.addIngrediants.fields.totalQuantity.label'
            )}`}</div>
          <InputGroup className="flex-1 ml-4">
                                    <FormInput type="number" placeholder="0"  />
                                  </InputGroup>
                                  <InputGroup className="flex-1  ml-2">
                                    <FormSelect />
                                  </InputGroup>
          
          </div>
          <div className="flex mb-5">
          <div className="font-medium mt-2.5 text-slate flex"> {`${t(
              'manufacturing.fields.addIngrediants.fields.productionCost.label'
            )}`} <Tippy content={tooltipContent3} className="ml-3">
            {' '}
            <a>
              {' '}
              <Lucide icon="Info" className=" h-4 w-4" />
            </a>{' '}
          </Tippy></div>
            
          <InputGroup className="flex-1 ml-4">
                                    <FormInput type="number" placeholder="0"  />
                                  </InputGroup>
                                  <InputGroup className="flex-1  ml-2">
                                    <FormSelect />
                                  </InputGroup>
                                  
          
          </div>
          <FormInline className="text-left mb-5">
                          <FormLabel className="font-medium">{`${t(
              'manufacturing.fields.addIngrediants.fields.total.label'
            )}`}</FormLabel>
                          
                          <div className="flex items-center flex-1 ml-24">
                            <InputGroup className="flex-1">
                              <FormInput type="text" placeholder="" />
                              <InputGroup.Text>Rs</InputGroup.Text>
                            </InputGroup>
                          </div>
                        </FormInline>
          </div>
          <div className="intro-y col-span-10 border-b flex flex-wrap items-center sm:flex-row sm:flex-nowrap">
          <div className="mr-auto mt-3 font-medium mb-5">
          Total Production Cost: Rs 0.00
          </div>
          <div className="justify-end mt-3 font-medium mb-5">
          Ingredients Cost: Rs 1,000,000,000.00
          </div>
          </div>
          <div className="col-span-2 mt-7 ">
            <ClassicEditorElement
              label={`${t('manufacturing.fields.addIngrediants.fields.recipeInstructions.label')}`}
              register={register}
              value={editorData}
            />
          </div>
          <div className=" flex justify-end mt-7">
                            
                             <Button
                               variant="secondary"
                               className="mb-2 mr-1 w-24"
                              
                             >
                               {`${t('common.button.cancel')}`}
                             </Button>
                            
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
