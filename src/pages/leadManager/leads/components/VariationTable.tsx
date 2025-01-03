/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-empty-pattern */
/* eslint-disable react/self-closing-comp */
/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useForm } from 'react-hook-form'
import clsx from "clsx"
import Table from '../../../../components/common/table'
import Lucide from '../../../../components/common/lucide'
import Tippy from '../../../../components/common/tippy'
import { Menu} from '../../../../components/common/headless'
import PreviewImage from '../../../../assets/images/fakers/image2.jpg'
import Button from '../../../../components/common/button'
import fakerData from "../../../../utils/faker"
import _ from 'lodash'

function VariationTable() {
  const {
  } = useForm({
    mode: 'onChange',
  })

  const handleChange = () => {}

  return (

    
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
                   Contact ID
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                   Name
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                  Mobile
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                   Email
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                  Source
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                   Last Follow Up
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                 Upcoming Follow Up
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                   Life Stage
                  </Table.Th>
                  
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                  Assigned To
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                  Address
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                  Tax Number
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                    Added On
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                    Custom Field 
                  </Table.Th>
                  

                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
              <Table.Tr>
                  <Table.Td className="!px-1" >
                    <Menu>
                      <Menu.Button
                        className="h-8 w-16 "
                        as={Button}
                        size="sm"
                        variant="primary"
                      >
                        Action <Lucide icon="ChevronDown" className="w-4 h-4 ml-2" />
                      </Menu.Button>
                      <Menu.Items className="w-52 h-auto overflow-y-auto"  placement="right-start" >
                      
                        <Menu.Item onChange={handleChange}
                >
                          <Lucide icon="Eye" className="mr-2 h-4 w-4" /> 
                          View
                        </Menu.Item >
                        <Menu.Item  onChange={handleChange}
                
                      >
                         <Lucide icon="Edit" className="mr-2 h-4 w-4" />
                          Edit
                        </Menu.Item>
                        <Menu.Item onChange={handleChange}
                >
                          <Lucide icon="RotateCw" className="mr-2 h-4 w-4" />
                          Convert to Customer
                        </Menu.Item>
                        <Menu.Item>
                          <Lucide icon="Trash2" className="mr-2 h-4 w-4" />
                         Delete
                        </Menu.Item>
  
                      </Menu.Items>
                    </Menu>
                  </Table.Td>
                  <Table.Td className="!px-2">1234</Table.Td>
                  <Table.Td className="!px-2">Lizas Closet</Table.Td>
                  <Table.Td className="!px-2">08154567890</Table.Td>
                  <Table.Td className="!px-2">ertr@gmail.com</Table.Td>
                  <Table.Td className="!px-2">123</Table.Td>
                  <Table.Td className="!px-2">123</Table.Td>
                  <Table.Td className="!px-2"><Button variant='primary' size='sm' className="mr-2 flex items-center">
                       Add Follow Up
                      </Button></Table.Td>
                  <Table.Td className="!px-2">Liza</Table.Td>
                  <Table.Td className="!px-2">123</Table.Td>
                  <Table.Td className="!px-2">
                  123
                  </Table.Td>
                  <Table.Td className="!px-2">Null</Table.Td>
                  <Table.Td className="!px-2">2023.10.09</Table.Td>
                  <Table.Td className="!px-2">2023.10.09</Table.Td>
                </Table.Tr>
              </Table.Tbody>
            </Table>


    </div>
  )
}

export default VariationTable
