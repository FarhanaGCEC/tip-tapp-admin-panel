/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable import/order */
/* eslint-disable react/no-unknown-property */
/* eslint-disable react/self-closing-comp */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import _ from 'lodash'
import Table from '../../../components/common/table'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import Button from '../../../components/common/button'
import Lucide from '../../../components/common/lucide'
import { Menu, Dialog } from '../../../components/common/headless'
import Pagination from '../../../components/common/pagination'
import {
  FormInput,
  FormSelect,
} from '../../../components/common/form-elements/components'
import SharedDataContainer from '../../../containers/sharedData'
import SlideoverRegistry from './slideover-registry'
import ShortcutKey from '../../../components/common/shortcut-key'
import SlideoverPanel from '../../../components/slideover-panel'
import { useTranslation } from 'react-i18next'
import PreviewImage from '../../../assets/images/fakers/image2.jpg'

interface FormContent {
  title: string
  component: JSX.Element
}

interface Props {
  setSliderContent: React.Dispatch<React.SetStateAction<any>>
}

function Main() {
  const { handleSlider } = SharedDataContainer.useContainer()
  // eslint-disable-next-line prettier/prettier
  const handleChange = () => {}

  const [sliderSize, setSliderSize] = useState('xl')

  const [sliderContent, setSliderContent] = useState({
    header: '',
    children: <div />,
    footer: <div />,
  })
  const handleClick = ({ title, component }: FormContent) => {
    handleSlider()
    setSliderContent({
      header: title,
      children: component,
      footer: <div />,
    })
    setSliderSize('xl')
  }

  const handleKeyUp = (keyName: string) => {
    if (keyName === 'alt+s') {
      handleClick(SlideoverRegistry.addCustomerGroups)
    }
  }
  const { register } = useForm()
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false)
  const deleteButtonRef = useRef(null)
  const { t } = useTranslation('pos')

  return (
    <div className="">
      <div className="intro-y mt-4 flex flex-col items-center sm:flex-row">
            <h2 className="mr-auto text-lg font-medium ml-2">
            
              <h2 className="mr-auto text-lg font-medium">
                {`${t('contactManagement.fields.customerGroups.title')}`}
                <Button
                  variant="twitter"
                  className="intro-y mx-1 h-7 w-7 rounded-full"
                >
                ? 
                </Button>
              </h2>
            </h2>
            <div className="mt-4 flex w-full sm:mt-0 sm:w-auto">
              <Button
                variant="primary"
                className="mr-2 shadow-md sm:w-auto"
                onChange={handleChange}
                onClick={() => handleClick(SlideoverRegistry.addCustomerGroups)}
              >
                Add Customer Group
              </Button>

              <Button
                variant="primary"
                className=" mr-2 px-2 "
                onChange={handleChange}
                onClick={() => handleClick(SlideoverRegistry.addCustomerGroups)}
              >
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
              <Button  className="mr-2 flex items-center">
                <Lucide icon="Eye" className="mr-2 h-4 w-4" /> Column Visibility
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
                    <Lucide icon="FileText" className="mr-2 h-4 w-4" /> As CSV
                  </Menu.Item>
                  <Menu.Item>
                    <Lucide icon="FileText" className="mr-2 h-4 w-4" /> As Excel
                  </Menu.Item>
                  <Menu.Item>
                    <Lucide icon="FileText" className="mr-2 h-4 w-4" /> Print
                  </Menu.Item>
                  <Menu.Item>
                    <Lucide icon="FileText" className="mr-2 h-4 w-4" /> Export
                    to PDF
                  </Menu.Item>
                </Menu.Items>
              </Menu>
            </div>

            <div className="relative ml-2 mr-2 flex sm:mt-0 sm:w-72">
              <FormInput
                type="text"
                className="box custom-input"
                placeholder="Search by Customer Groups"
              />
              <Lucide
                icon="Search"
                className="absolute inset-y-0 right-0 my-auto mr-2 h-5 w-8"
              />
            </div>
          </div>
          <div className=" mb-3 py-5" style={{ overflowY: 'auto' }}>
            
            <Table
            // bordered
              hover
              style={{ width: '100%', whiteSpace: 'nowrap' }}
            >
              <Table.Thead variant="dark">
                <Table.Tr>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                    Customer Group Name
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                    Calculatio Percentage(%)
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                    Action
                  </Table.Th>

                </Table.Tr>

              </Table.Thead>
              <Table.Tbody>
            
              </Table.Tbody>
             <Table.Tr>
             <Table.Td className="!px-2">C890867</Table.Td>
             <Table.Td className="!px-2">C890867</Table.Td>
             <Table.Td className="!px-2">
              <Button variant="primary" className="mb-2 mr-1"  size="sm"   onClick={() => handleClick(SlideoverRegistry.editCustomerGroups)}>
    <Lucide icon="Edit" className="w-4 h-4" /></Button> 
    <Button variant="linkedin" className="mb-2 mr-1"  size="sm" >
    <Lucide icon="Eye" className="w-4 h-4" /></Button> 
    <Button variant="danger" className="mb-2 mr-1"  size="sm" onClick={(event: { preventDefault: () => void }) => {
                          event.preventDefault();
                          setDeleteConfirmationModal(true);
                        }}>
    <Lucide icon="Trash" className="w-4 h-4" /></Button> 
    <Dialog
              open={deleteConfirmationModal}
              onClose={() => {
                setDeleteConfirmationModal(false)
              }}
              initialFocus={deleteButtonRef}
            >
              <Dialog.Panel >
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
      <ShortcutKey onKeyUp={handleKeyUp} />
      <SlideoverPanel
        close
        size={sliderSize}
        heading={sliderContent.header}
        footer={sliderContent.footer}
      >
        {sliderContent.children}
      </SlideoverPanel>
    </div>
  )
}

export default Main
