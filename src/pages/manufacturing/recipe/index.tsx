/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/button-has-type */
/* eslint-disable react/no-array-index-key */
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
  SearchSelectElement,
} from '../../../components/common/form-elements'
import SharedDataContainer from '../../../containers/sharedData'
import ShortcutKey from '../../../components/common/shortcut-key'
import SlideoverPanel from '../../../components/slideover-panel'
import { useTranslation } from 'react-i18next'
import PreviewImage from '../../../assets/images/fakers/image2.jpg'
import UploadFilesElement from '../../../components/common/form-elements/upload-files-element'
import LoadingIcon from '../../../components/common/loading-icon'
import {
  FormInput,
  FormInfo,
  FormSelect,
  FormLabel,
  FormInline,
  InputGroup,
  FormCheck,
} from '../../../components/common/form-elements/components'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import Toast from '../../../utils/notification'
import { Icons, NotificationTypes } from '../../../constants'
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
  const { setNotification } = SharedDataContainer.useContainer()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { handleSlider } = SharedDataContainer.useContainer()
  // eslint-disable-next-line prettier/prettier
  const { t } = useTranslation('pos')

  const schema = yup
    .object({
     variationName: yup
        .string()
        .required(
          `${t('productManagement.fields.variationName.validationMessage')}`
        ),
        variationValues: yup
        .string()
        .required(
          `${t('productManagement.fields.variationValues.validationMessage')}`
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

  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false)
  const deleteButtonRef = useRef(null)
  const [productPreview, setproductPreview] = useState(false) 
  const [productPricePreview, setproductPricePreview] = useState(false) 

  type VariationValue = {
    name: string;
    value: string;
  };
  
  const [variationValues, setVariationValues] = useState<Array<VariationValue>>([]);

  const handleChange = () => {}
  const handleAddVariation = () => {
    const newVariationValues = [...variationValues];
    newVariationValues.push({ name: '', value: '' } as VariationValue); // Replace VariationValue with the actual type
    setVariationValues(newVariationValues);
  };
  
  
  const handleRemoveVariation = (index: number) => {
    const newVariationValues = [...variationValues]
    newVariationValues.splice(index, 1);
    setVariationValues(newVariationValues)
  }
  const [checked, setChecked] = useState(false);


  const [tooltipContent1] = useState(
    'Price is Updated Based on Ingredient Purchase Cost'
  )
  const [tooltipContent2] = useState(
    'Product Purchase Price will be Updated According to Recipe Unit Price'
  )

  return (
    <div className="">
      <div className="intro-y mt-4 flex flex-col items-center sm:flex-row">
        <h2 className="ml-2 mr-auto text-lg font-medium">
          Recipe{' '}
          <Button
            variant="twitter"
            className="intro-y mx-1 h-7 w-7 rounded-full"
          >
            ?
          </Button>
        </h2>
        <div className="mt-4 flex w-full sm:mt-0 sm:w-auto">
          <Button
            variant="primary"
            className="mr-2 shadow-md sm:w-auto"
            onClick={(event: React.MouseEvent) => {
              event.preventDefault()
              setproductPreview(true)
            }}
          >
            Add Recipe
          </Button>

          <Button
            variant="primary"
            className=" mr-2 px-2 "
            onClick={(event: React.MouseEvent) => {
              event.preventDefault()
              setproductPreview(true)
            }}
          >
            <Dialog
              size="lg"
              open={productPreview}
              onClose={() => {
                setproductPreview(false)
              }}
            >
              <Dialog.Panel className="max-h-screen overflow-y-auto">
                <Dialog.Title>
                  <h2 className="mr-auto text-base font-medium">{`${t(
                    'manufacturing.fields.chooseProduct.title'
                  )}`}</h2>
                </Dialog.Title>
                <a
                  onClick={() => {
                    setproductPreview(false)
                  }}
                  className="absolute right-0 top-0 mr-3 mt-3"
                  href="#"
                >
                  <Lucide icon="X" className="h-8 w-8 text-slate-400" />
                </a>

                <Dialog.Description className="grid gap-7 md:grid-cols-1">
                <SearchSelectElement
           label={`${t('manufacturing.fields.chooseProduct.fields.chooseProduct.label')}`}
            register={register}
            name="type"
            id="type"
            onChange={handleChange}
          />
              
                  
                  <SelectElement
                    label={`${t(
                      'manufacturing.fields.chooseProduct.fields.copyRecipe.label'
                    )}`}
                    register={register}
                    name="copyRecipe"
                    id="copyRecipe"
                  />
                </Dialog.Description>
                <div className="flex justify-end px-4 pb-4 text-center mt-3 mb-3 ">
               
                  <Button
                      
                    type="submit"
                    variant="primary"
                    className="mb-2 mr-1 w-24"
                  >
                    {`${t('common.button.continue')}`}
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
                  <Button
                    type="button"
                    variant="outline-secondary"
                    onClick={() => {
                        setproductPreview(false)
                    }}
                    className="mb-2 mr-1 w-24"
                  >
                    Cancel
                  </Button>
                </div>
                
              </Dialog.Panel>
            </Dialog>
            <span className="flex h-5 w-5 items-center justify-center">
              <Lucide icon="Plus" className="h-4 w-4" />
            </span>
          </Button>
        </div>
      </div>

      <div className="intro-y box mb-5 mt-5 px-5 py-5 ">
        <div className="mt- intro-y flex flex-col items-center sm:flex-row xl:mt-4">
          <div className="mt-2 items-center sm:mr-4 sm:flex ">
            Page Size
            <FormSelect className=" w-15 dark:[0px_0px_0px_2px_#3f4865,_1px_1px_5px_rgba(0,0,0,0.32)]  m-2">
              <option>10</option>
              <option>25</option>
              <option>50</option>
              <option>100</option>
            </FormSelect>
          </div>

          <div className="mx-auto items-center  md:flex">
            <Button className="mr-2 flex items-center">
              <Lucide icon="Eye" className="mr-2 h-4 w-4" /> Column Visibility
            </Button>

            <Menu>
              <Menu.Button
                as={Button}
                variant="facebook"
                className="flex items-center "
              >
                Export As <Lucide icon="ChevronDown" className="ml-2 h-4 w-4" />
              </Menu.Button>
              <Menu.Items className="w-40">
                <Menu.Item>
                  <Lucide icon="FileText" className="mr-2 h-4 w-4" /> As CSV
                </Menu.Item>
                <Menu.Item>
                  <Lucide icon="FileText" className="mr-2 h-4 w-4" /> As Excel
                </Menu.Item>
                <Menu.Item>
                  <Lucide icon="FileText" className="mr-2 h-4 w-4" /> Print
                </Menu.Item>
                <Menu.Item>
                  <Lucide icon="FileText" className="mr-2 h-4 w-4" /> Export to
                  PDF
                </Menu.Item>
              </Menu.Items>
            </Menu>
          </div>

          <div className="relative ml-2 mr-2 flex sm:mt-0 sm:w-72">
            <FormInput
              type="text"
              className="box custom-input"
              placeholder="Search Recipe"
            />
            <Lucide
              icon="Search"
              className="absolute inset-y-0 right-0 my-auto mr-2 h-5 w-8"
            />
          </div>
        </div>
        <div className=" mb-3 py-5" style={{ overflowY: 'auto' }}>
          <Table bordered striped hover>
            <Table.Thead variant="dark">
              <Table.Tr>
                <Table.Th className="whitespace-nowrap">Recipe</Table.Th>
                <Table.Th className="whitespace-nowrap">Category</Table.Th>
                <Table.Th className="whitespace-nowrap !px-8">Sub Category</Table.Th>
                <Table.Th className="whitespace-nowrap !px-8">Quantity</Table.Th>
                <Table.Th className="whitespace-nowrap !px-8 flex">Price <Tippy content={tooltipContent1} className="ml-2">
                  {' '}
                  <a>
                    {' '}
                    <Lucide icon="Info" className=" h-4 w-4" />{' '}
                  </a>{' '}
                </Tippy></Table.Th>
                <Table.Th className="whitespace-nowrap !px-8">Unit Price</Table.Th>
                <Table.Th className="whitespace-nowrap !px-8">Action</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              <Table.Tr>
                <Table.Td>Memory Capacity</Table.Td>
                <Table.Td>Phone</Table.Td>
                <Table.Td>I-Phone</Table.Td>
                <Table.Td>100</Table.Td>
                <Table.Td ><div className="text-right">20,000,000.00</div></Table.Td>
                <Table.Td><div className="text-right">1,000,000.00</div></Table.Td>
                <Table.Td className="!px-2 text-center">
                  <Button variant="primary" className="mb-2 mr-1" size="sm" >
                    <Lucide icon="Edit" className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="danger"
                    className="mb-2 mr-1"
                    size="sm"
                    // onClick={(event: { preventDefault: () => void }) => {
                    //   event.preventDefault()
                    //   setDeleteConfirmationModal(true)
                    // }}
                  >
                    <Lucide icon="Trash" className="h-4 w-4" />
                  </Button>
                </Table.Td>
              </Table.Tr>
            </Table.Tbody>
          </Table>
        </div>
        <div className="intro-y col-span-10 flex flex-wrap items-center sm:flex-row sm:flex-nowrap">
          <div className="mr-auto  font-medium">
            Showing 1 to 10 of 150 entries
          </div>
          <div className="font-medium">
            <Pagination className="w-full sm:mr-auto sm:w-auto">
              <Pagination.Link>
                <Lucide icon="ChevronsLeft" className="h-4 w-4" />
              </Pagination.Link>
              <Pagination.Link>
                <Lucide icon="ChevronLeft" className="h-4 w-4" />
              </Pagination.Link>

              <Pagination.Link>1</Pagination.Link>
              <Pagination.Link active>2</Pagination.Link>
              <Pagination.Link>3</Pagination.Link>

              <Pagination.Link>
                <Lucide icon="ChevronRight" className="h-4 w-4" />
              </Pagination.Link>
              <Pagination.Link>
                <Lucide icon="ChevronsRight" className="h-4 w-4" />
              </Pagination.Link>
            </Pagination>
          </div>
        </div>
        <Button  onClick={(event: React.MouseEvent) => {
              event.preventDefault()
              setproductPricePreview(true)
            }}
                  size="sm"
                  className="bg-danger text-white shadow-md sm:w-auto"
                
                >
                  Update Product Price{' '}
                  <Tippy content={tooltipContent2}>
                    {' '}
                    <a>
                      {' '}
                      <Lucide icon="Info" className="ml-1 h-4 w-4" />
                    </a>{' '}
                  </Tippy>
                </Button>
                <Dialog open={productPricePreview} onClose={()=> {
    setproductPricePreview(false);
    }}
    >
    <Dialog.Panel className="p-10 text-center">
        No Row Selected
    </Dialog.Panel>
</Dialog>
      </div>
    </div>
  )
}

export default Main
