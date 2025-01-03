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
  const [variationPreview, setVariationPreview] = useState(false) 
  const [editvariationPreview, setEditVariationPreview] = useState(false)

  type VariationValue = {
    name: string;
    value: string;
  };
  
  const [variationValues, setVariationValues] = useState<Array<VariationValue>>([]);


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

  const handleChange = (event: { target: { checked: boolean | ((prevState: boolean) => boolean) } }) => {
    setChecked(event.target.checked);
  }
  
  return (
    <div className="">
      <div className="intro-y mt-4 flex flex-col items-center sm:flex-row">
        <h2 className="ml-2 mr-auto text-lg font-medium">
          Variations{' '}
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
              setVariationPreview(true)
            }}
          >
            Add Variation
          </Button>

          <Button
            variant="primary"
            className=" mr-2 px-2 "
            onClick={(event: React.MouseEvent) => {
              event.preventDefault()
              setVariationPreview(true)
            }}
          >
            <Dialog
              size="lg"
              open={variationPreview}
              onClose={() => {
                setVariationPreview(false)
              }}
            >
              <Dialog.Panel className="max-h-screen overflow-y-auto">
                <Dialog.Title>
                  <h2 className="mr-auto text-base font-medium">{`${t(
                    'productManagement.fields.addVariations.title'
                  )}`}</h2>
                </Dialog.Title>
                <a
                  onClick={() => {
                    setVariationPreview(false)
                  }}
                  className="absolute right-0 top-0 mr-3 mt-3"
                  href="#"
                >
                  <Lucide icon="X" className="h-8 w-8 text-slate-400" />
                </a>

                <Dialog.Description className="grid gap-7 md:grid-cols-1">
                  {/* <InputElement
                    label={`${t(
                      'productManagement.fields.variationName.label'
                    )}`}
                    register={register}
                    required
                    error={errors.variationName}
                    name="variationName"
                    id="variationName"
                  />
                  <InputElement
                    label={`${t(
                      'productManagement.fields.variationValues.label'
                    )}`}
                    register={register}
                    required
                    error={errors.variationValues}
                    name="variationValues"
                    id="variationValues"
                  />
           
<div className="grid md:grid-cols-1">
 {variationValues.map((value, index) => (
        <div key={index}>
          <InputElement
            label={`${t('productManagement.fields.variationValues.label')}`}
            register={register}
            name={`variationValue-${index}`}
            id={`variationValue-${index}`}
          />
           <div className="text-right py-5">
           <a onClick={() => handleRemoveVariation(index)} >
                                <Lucide icon="Trash2" className="w-4 h-4" />
                              </a>
  
        </div>
        </div>
      ))}
      <div className="text-right">
        <Button
          variant="outline-primary"
          className=" xl:pl-24 xl:pr-24 text-center border-dashed mb-3"
          onClick={handleAddVariation}
        >
          <Lucide icon="Plus" className="w-4 h-4 mr-2" /> Add New Variation
        </Button>
      </div>
    </div> */}
    <FormInline>
                          <FormLabel className="font-medium">
                          {`${t('productManagement.fields.variationName.label')}`}
                          </FormLabel>
                          <div className="flex-1">
                            <div className="items-right xl:flex ml-28 mr-8">
                              <InputGroup className="flex-1">
                                <FormInput type="text" placeholder="" />                               
                              </InputGroup>
                            </div>        
                          </div> 
                        </FormInline>
                        {!checked && (
        <>
                        <FormInline>
                          <FormLabel className="font-medium">
                          {`${t('productManagement.fields.variationValues.label')}`}
                          </FormLabel>
                          <div className="flex-1">
                            <div className="items-center xl:flex ml-20">
                              <InputGroup className="flex-1">
                                <FormInput type="text" placeholder="" />
                              </InputGroup>
                              <div className="flex mt-3 text-danger xl:mt-0 mr-8">  
                              </div>
                            </div>   
                          </div>  
                        </FormInline>
                        <div className="grid md:grid-cols-1 gap-7">
 {variationValues.map((value, index) => (
        <div key={index}>
 <FormInline>
                          <FormLabel className="font-medium ">
                          {`${t('productManagement.fields.variationValues.label')}`}
                          </FormLabel>
                          <div className="flex-1">
                            <div className="items-center xl:flex ml-20">
                              <InputGroup className="flex-1">
                                <FormInput type="text" placeholder="" /> 
                              </InputGroup>
                              <div className="flex mt-3 text-danger xl:mt-0">
                                <a onClick={() => handleRemoveVariation(index)} className=" xl:ml-4">
                                  <Lucide icon="Trash2" className="w-4 h-4" />
                                </a>
                              </div>
                            </div> 
                          </div>    
                        </FormInline>
        </div> 
      ))}
      <div className="text-right ">
        <Button
          variant="outline-primary"
          className=" xl:pl-20 xl:pr-20 mr-8 text-center border-dashed mb-3"
          onClick={handleAddVariation}
        >
          <Lucide icon="Plus" className="w-4 h-4 mr-2" /> Add New Variation
        </Button>
      </div>
      

    </div>
    </>
      )}
      
<FormCheck className="mb-2">
<div className="mr-2 font-medium">Multi Variation Option</div>
            <FormCheck.Input
              id="vertical-form-3"
              type="checkbox"
              value=""
              onChange={handleChange}
            /> 
             <FormCheck.Label className="mr-2" htmlFor="vertical-form-3">
              
            </FormCheck.Label>
          </FormCheck>
          {checked && (
          <div className=" grid grid-cols-1 gap-7 md:grid-cols-1">
            <SelectElement
              label={`${t('productManagement.fields.multiVariationOption.label')}`}
              register={register}
              name="multiVariationOption"
              id="multiVariationOption"
            />
            </div>
             )}
            



                </Dialog.Description>

                <div className="flex justify-end px-12 pb-4 text-center mb-10">
                  <Button
                    type="submit"
                    variant="primary"
                    className="mb-2 mr-1 w-24"
                  >
                    {`${t('common.button.save')}`}
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
                      setVariationPreview(false)
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
              placeholder="Search Variations"
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
                <Table.Th className="whitespace-nowrap">Variations</Table.Th>
                <Table.Th className="whitespace-nowrap">Values</Table.Th>
                <Table.Th className="whitespace-nowrap !px-8">Action</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              <Table.Tr>
                <Table.Td>Memory Capacity</Table.Td>
                <Table.Td>8 GB, 16 GB, 32 GB, 64 GB</Table.Td>
                <Table.Td className="!px-2 text-center">
                  <Button variant="primary" className="mb-2 mr-1" size="sm" onClick={(event: React.MouseEvent) => {
              event.preventDefault()
              setEditVariationPreview(true)
            }}
          >
            <Dialog
              size="lg"
              open={editvariationPreview}
              onClose={() => {
                setEditVariationPreview(false)
              }}
            >
              <Dialog.Panel className="max-h-screen overflow-y-auto">
                <Dialog.Title>
                  <h2 className="mr-auto text-base font-medium">{`${t(
                    'productManagement.fields.editVariations.title'
                  )}`}</h2>
                </Dialog.Title>
                <a
                  onClick={() => {
                    setEditVariationPreview(false)
                  }}
                  className="absolute right-0 top-0 mr-3 mt-3"
                  href="#"
                >
                  <Lucide icon="X" className="h-8 w-8 text-slate-400" />
                </a>

                <Dialog.Description className="grid gap-7 md:grid-cols-1">
    <FormInline>
                          <FormLabel className="font-medium">
                          {`${t('productManagement.fields.variationName.label')}`}
                          </FormLabel>
                          <div className="flex-1">
                            <div className="items-right xl:flex ml-28 mr-8">
                              <InputGroup className="flex-1">
                                <FormInput type="text" placeholder="" />                               
                              </InputGroup>
                            </div>        
                          </div> 
                        </FormInline>
                        {!checked && (
        <>
                        <FormInline>
                          <FormLabel className="font-medium">
                          {`${t('productManagement.fields.variationValues.label')}`}
                          </FormLabel>
                          <div className="flex-1">
                            <div className="items-center xl:flex ml-20">
                              <InputGroup className="flex-1">
                                <FormInput type="text" placeholder="" />
                              </InputGroup>
                              <div className="flex mt-3 text-danger xl:mt-0 mr-8">  
                              </div>
                            </div>   
                          </div>  
                        </FormInline>
                        <div className="grid md:grid-cols-1 gap-7">
 {variationValues.map((value, index) => (
        <div key={index}>
 <FormInline>
                          <FormLabel className="font-medium ">
                          {`${t('productManagement.fields.variationValues.label')}`}
                          </FormLabel>
                          <div className="flex-1">
                            <div className="items-center xl:flex ml-20">
                              <InputGroup className="flex-1">
                                <FormInput type="text" placeholder="" /> 
                              </InputGroup>
                              <div className="flex mt-3 text-danger xl:mt-0">
                                <a onClick={() => handleRemoveVariation(index)} className=" xl:ml-4">
                                  <Lucide icon="Trash2" className="w-4 h-4" />
                                </a>
                              </div>
                            </div> 
                          </div>    
                        </FormInline>
        </div> 
      ))}
      <div className="text-right ">
        <Button
          variant="outline-primary"
          className=" xl:pl-20 xl:pr-20 mr-8 text-center border-dashed mb-3"
          onClick={handleAddVariation}
        >
          <Lucide icon="Plus" className="w-4 h-4 mr-2" /> Add New Variation
        </Button>
      </div>
      

    </div>
    </>
      )}
    <FormCheck >
            <FormCheck.Input
              id="vertical-form-3"
              type="checkbox"
              value=""
              onChange={handleChange}
            />
            <FormCheck.Label htmlFor="vertical-form-3" className="font-medium mr-2">Multi Variation Option</FormCheck.Label>
          </FormCheck>
          {checked && (
          <div className=" grid grid-cols-1 gap-7 md:grid-cols-1">
            <SelectElement
              label={`${t('productManagement.fields.multiVariationOption.label')}`}
              register={register}
              name="multiVariationOption"
              id="multiVariationOption"
            />
            </div>
             )}
            



                </Dialog.Description>

                <div className="flex justify-end px-12 pb-4 text-center mb-10">
                  <Button
                    type="submit"
                    variant="primary"
                    className="mb-2 mr-1 w-24"
                  >
                    {`${t('common.button.save')}`}
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
                      setEditVariationPreview(false)
                    }}
                    className="mb-2 mr-1 w-24"
                  >
                    Cancel
                  </Button>
                </div>
              </Dialog.Panel>
            </Dialog>
                    <Lucide icon="Edit" className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="danger"
                    className="mb-2 mr-1"
                    size="sm"
                    onClick={(event: { preventDefault: () => void }) => {
                      event.preventDefault()
                      setDeleteConfirmationModal(true)
                    }}
                  >
                    <Lucide icon="Trash" className="h-4 w-4" />
                  </Button>
                </Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>Color</Table.Td>
                <Table.Td>Black, Red, Blue</Table.Td>
                <Table.Td className="!px-2 text-center">
                  <Button variant="primary" className="mb-2 mr-1" size="sm">
                    <Lucide icon="Edit" className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="danger"
                    className="mb-2 mr-1"
                    size="sm"
                    onClick={(event: { preventDefault: () => void }) => {
                      event.preventDefault()
                      setDeleteConfirmationModal(true)
                    }}
                  >
                    <Lucide icon="Trash" className="h-4 w-4" />
                  </Button>
                </Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>Page</Table.Td>
                <Table.Td>80, 120, 160, 200</Table.Td>
                <Table.Td className="!px-2 text-center">
                  <Button variant="primary" className="mb-2 mr-1" size="sm">
                    <Lucide icon="Edit" className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="danger"
                    className="mb-2 mr-1"
                    size="sm"
                    onClick={(event: { preventDefault: () => void }) => {
                      event.preventDefault()
                      setDeleteConfirmationModal(true)
                    }}
                  >
                    <Lucide icon="Trash" className="h-4 w-4" />
                  </Button>
                </Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>Size</Table.Td>
                <Table.Td>
                  S, L, M, XM, XL, x, N, Large, Medium, Small, x-large,
                  xx-large, x-small, XXL, XS, XXL, XS
                </Table.Td>
                <Table.Td className="!px-2 text-center">
                  <Button variant="primary" className="mb-2 mr-1" size="sm">
                    <Lucide icon="Edit" className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="danger"
                    className="mb-2 mr-1"
                    size="sm"
                    onClick={(event: { preventDefault: () => void }) => {
                      event.preventDefault()
                      setDeleteConfirmationModal(true)
                    }}
                  >
                    <Lucide icon="Trash" className="h-4 w-4" />
                  </Button>
                </Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>Size- Memery-color</Table.Td>
                <Table.Td>
                  -S-8 GB-Black, -S-8 GB-Red, -S-8 GB-Blue, -S-16 GB-Black,
                  -S-16 GB-Red, -S-16 GB-Blue, -S-32 GB-Black, -S-32 GB-Red,
                  -S-32 GB-Blue, -S-64 GB-Black, -S-64 GB-Red, -S-64 GB-Blue,
                  -L-8 GB-Black, -L-8 GB-Red, -L-8 GB-Blue, -L-16 GB-Black,
                  -L-16 GB-Red, -L-16 GB-Blue, -L-32 GB-Black, -L-32 GB-Red,
                  -L-32 GB-Blue, -L-64 GB-Black, -L-64 GB-Red, -L-64 GB-Blue,
                  -m-8 GB-Black, -m-8 GB-Red, -m-8 GB-Blue, -m-16 GB-Black,
                  -m-16 GB-Red, -m-16 GB-Blue, -m-32 GB-Black, -m-32 GB-Red,
                  -m-32 GB-Blue, -m-64 GB-Black, -m-64 GB-Red, -m-64 GB-Blue,
                  -xm-8 GB-Black, -xm-8 GB-Red, -xm-8 GB-Blue, -xm-16 GB-Black,
                  -xm-16 GB-Red, -xm-16 GB-Blue, -xm-32 GB-Black, -xm-32 GB-Red,
                  -xm-32 GB-Blue, -xm-64 GB-Black, -xm-64 GB-Red, -xm-64
                  GB-Blue, -XL-8 GB-Black, -XL-8 GB-Red, -XL-8 GB-Blue, -XL-16
                  GB-Black, -XL-16 GB-Red, -XL-16 GB-Blue, -XL-32 GB-Black,
                  -XL-32 GB-Red, -XL-32 GB-Blue, -XL-64 GB-Black, -XL-64 GB-Red,
                  -XL-64 GB-Blue, -x-8 GB-Black, -x-8 GB-Red, -x-8 GB-Blue,
                  -x-16 GB-Black, -x-16 GB-Red, -x-16 GB-Blue, -x-32 GB-Black,
                  -x-32 GB-Red, -x-32 GB-Blue, -x-64 GB-Black, -x-64 GB-Red,
                  -x-64 GB-Blue, -n-8 GB-Black, -n-8 GB-Red, -n-8 GB-Blue, -n-16
                  GB-Black, -n-16 GB-Red, -n-16 GB-Blue, -n-32 GB-Black, -n-32
                  GB-Red, -n-32 GB-Blue, -n-64 GB-Black, -n-64 GB-Red, -n-64
                  GB-Blue, -Large-8 GB-Black, -Large-8 GB-Red, -Large-8 GB-Blue,
                  -Large-16 GB-Black, -Large-16 GB-Red, -Large-16 GB-Blue,
                  -Large-32 GB-Black, -Large-32 GB-Red, -Large-32 GB-Blue,
                  -Large-64 GB-Black, -Large-64 GB-Red, -Large-64 GB-Blue,
                  -Medium-8 GB-Black, -Medium-8 GB-Red, -Medium-8 GB-Blue,
                  -Medium-16 GB-Black, -Medium-16 GB-Red, -Medium-16 GB-Blue,
                  -Medium-32 GB-Black, -Medium-32 GB-Red, -Medium-32 GB-Blue,
                  -Medium-64 GB-Black, -Medium-64 GB-Red, -Medium-64 GB-Blue,
                  -Small-8 GB-Black, -Small-8 GB-Red, -Small-8 GB-Blue,
                  -Small-16 GB-Black, -Small-16 GB-Red, -Small-16 GB-Blue,
                  -Small-32 GB-Black, -Small-32 GB-Red, -Small-32 GB-Blue,
                  -Small-64 GB-Black, -Small-64 GB-Red, -Small-64 GB-Blue,
                  -x-large-8 GB-Black, -x-large-8 GB-Red, -x-large-8 GB-Blue,
                  -x-large-16 GB-Black, -x-large-16 GB-Red, -x-large-16 GB-Blue,
                  -x-large-32 GB-Black, -x-large-32 GB-Red, -x-large-32 GB-Blue,
                  -x-large-64 GB-Black, -x-large-64 GB-Red, -x-large-64 GB-Blue,
                  -xx-large-8 GB-Black, -xx-large-8 GB-Red, -xx-large-8 GB-Blue,
                  -xx-large-16 GB-Black, -xx-large-16 GB-Red, -xx-large-16
                  GB-Blue, -xx-large-32 GB-Black, -xx-large-32 GB-Red,
                  -xx-large-32 GB-Blue, -xx-large-64 GB-Black, -xx-large-64
                  GB-Red, -xx-large-64 GB-Blue, -x-small-8 GB-Black, -x-small-8
                  GB-Red, -x-small-8 GB-Blue, -x-small-16 GB-Black, -x-small-16
                  GB-Red, -x-small-16 GB-Blue, -x-small-32 GB-Black, -x-small-32
                  GB-Red, -x-small-32 GB-Blue, -x-small-64 GB-Black, -x-small-64
                  GB-Red, -x-small-64 GB-Blue
                </Table.Td>
                <Table.Td className="!px-2 text-center">
                  <Button variant="primary" className="mb-2 mr-1" size="sm">
                    <Lucide icon="Edit" className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="danger"
                    className="mb-2 mr-1"
                    size="sm"
                    onClick={(event: { preventDefault: () => void }) => {
                      event.preventDefault()
                      setDeleteConfirmationModal(true)
                    }}
                  >
                    <Lucide icon="Trash" className="h-4 w-4" />
                  </Button>
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
                        <div className="mt-5 text-3xl">Are you sure?</div>
                        <div className="mt-2 text-slate-500">
                          Do you really want to delete these records? <br />
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
      </div>
    </div>
  )
}

export default Main
