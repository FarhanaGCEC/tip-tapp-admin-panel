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
import SharedDataContainer from '../../../containers/sharedData'
import ShortcutKey from '../../../components/common/shortcut-key'
import SlideoverPanel from '../../../components/slideover-panel'
import { useTranslation } from 'react-i18next'
import PreviewImage from '../../../assets/images/fakers/image2.jpg'
import UploadFilesElement from '../../../components/common/form-elements/upload-files-element'
import LoadingIcon from '../../../components/common/loading-icon'
import Alert from "../../../base-components/Alert"
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
              Bulk Stock Adjustment
                
              </h2>{' '}
            </h2>
      
          </div>  
          <div className="intro-y box mb-5 mt-5 px-5 py-5">
  <div className="mb-3 mt-2 flex items-center">
    <div className="mr-3 w-96">
      <SearchSelectElement
        label={`${t('sales.fields.b2bConnection.fields.location.label')}`}
        register={register}
        name="location"
        id="location"
        onChange={handleChange}
        iconLeft={Icons.LOCATION}
      />
    </div>
    <Button className="mr-2 flex items-center text-white" variant="success">
      <Lucide icon="Download" className="mr-2 h-4 w-4" /> Export Stock Count Sheet
    </Button>
    <div className="mb-3 mt-2 flex ">
  <div className="mr-3">
   
  </div>
  
  <div className="flex justify-end "> 
    
  </div>
</div>
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
             <Button
             variant="facebook"
             className="ml-2 text-white"
             onClick={handleSlider}
           >
             {`${t('common.button.submit')}`}
           </Button>
           

  </div>
</div>
       <div className="intro-y box mb-5 px-5 py-5">
       <div className="flex flex-col border-b mb-5 font-medium text-base  dark:border-darkmode-400">
                  <h2 className="mr-auto text-base font-medium mb-4">
                  {`${t('productManagement.fields.instruction.title')}`}
                  </h2>
                  </div>
                  <Alert variant="soft-dark" className="flex items-center "> 
      {/* <Lucide icon="AlertTriangle" className="w-6 h-6 mr-2" /> */}
     1. Export stock count report
    </Alert>
    <Alert variant="soft-dark" className="flex items-center  mt-3"> 
      {/* <Lucide icon="AlertTriangle" className="w-6 h-6 mr-2" /> */}
      2. Update the exported file and import the same file
    </Alert>
    <Alert variant="soft-dark" className="flex items-center  mt-3"> 
      {/* <Lucide icon="AlertTriangle" className="w-6 h-6 mr-2" /> */}
      3. Only change the Physical Stock column. If you change the Current Stock column it will not update
    </Alert>

</div>
<div className="intro-y box mb-5 px-5 py-5">
       <div className="flex flex-col border-b mb-5 font-medium text-base  dark:border-darkmode-400">
                  <h2 className="mr-auto text-base font-medium mb-4">
                  {`${t('stockAdjustment.fields.bulkStock.fields.stockCount.title')}`}
                  </h2>
                  </div>
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
                        <Lucide icon="Eye" className="mr-2 h-4 w-4" /> Column
                        Visibility
                      </Button>

                      <Menu>
                        <Menu.Button
                          as={Button}
                          variant="facebook"
                          className="flex items-center "
                        >
                          Export As{' '}
                          <Lucide icon="ChevronDown" className="ml-2 h-4 w-4" />
                        </Menu.Button>
                        <Menu.Items className="w-40">
                          <Menu.Item>
                            <Lucide icon="FileText" className="mr-2 h-4 w-4" />{' '}
                            As CSV
                          </Menu.Item>
                          <Menu.Item>
                            <Lucide icon="FileText" className="mr-2 h-4 w-4" />{' '}
                            As Excel
                          </Menu.Item>
                          <Menu.Item>
                            <Lucide icon="FileText" className="mr-2 h-4 w-4" />{' '}
                            Print
                          </Menu.Item>
                          <Menu.Item>
                            <Lucide icon="FileText" className="mr-2 h-4 w-4" />{' '}
                            Export to PDF
                          </Menu.Item>
                        </Menu.Items>
                      </Menu>
                    </div>

                    <div className="relative ml-2 mr-2 flex sm:mt-0 sm:w-72">
                      <FormInput
                        type="text"
                        className="box custom-input"
                        placeholder="Search.."
                      />
                      <Lucide
                        icon="Search"
                        className="absolute inset-y-0 right-0 my-auto mr-2 h-5 w-8"
                      />
                    </div>

                    
                  </div>
                  <div className=" mb-3 py-5" style={{ overflowY: 'auto' }}>
                  <Table
            //   bordered
            //   striped
              hover
              style={{ width: '100%', whiteSpace: 'nowrap' }}
            >
              <Table.Thead variant="dark">
                <Table.Tr>
               
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                   Action
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                  Batch number
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                 Date
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                  Location
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                 User
                  </Table.Th>
                  
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
              <Table.Td className="!px-2"> <Button variant="primary" className="mb-2 mr-1"  size="sm"  as="a" href="/stock-adjustment/stockCountReport" >
              <Lucide icon="Eye" className="h-4 w-4 " />
                </Button></Table.Td>
              <Table.Td className="!px-2">2</Table.Td>
                  <Table.Td className="!px-2">05/09/2023 03:00 PM</Table.Td>
                  <Table.Td className="!px-2">Bunny</Table.Td>
                  <Table.Td className="!px-2">Liza</Table.Td>

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
