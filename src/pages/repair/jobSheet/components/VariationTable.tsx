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

    
    <div className="mt-3 overflow-x-auto">

      <Table
            //   bordered
            //   striped
              hover
              style={{ width: '100%', whiteSpace: 'nowrap' }}
            >
              <Table.Thead variant="dark">
                <Table.Tr>
                <Table.Th className="whitespace-nowrap bg-slate-50 text-slate-500 dark:bg-darkmode-800"></Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 text-slate-500 dark:bg-darkmode-800">Image</Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                   Action
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                    Product
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                    Business Location
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                    Unit Purchase Price
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                   Selling Price
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                    Current Stock
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                    Product Type
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                   Category
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                    Brand
                  </Table.Th>
                  
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                    Tax
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                    SKU
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                   Custom Field
                  </Table.Th>
                  <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
                    Weight
                  </Table.Th>
                 
                  

                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
              <Table.Tr>
              <Table.Td className="!px-2"></Table.Td>
                  <Table.Td>
                    <div className="image-fit mr-3 h-10 w-10">
                      <img
                        alt="Midone Tailwind HTML Admin Template"
                        className="rounded-full"
                        src={PreviewImage}
                      />
                    </div>
                  </Table.Td>
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
                      <Menu.Items className="w-52 h-48 overflow-y-auto"  placement="right-start" >
                      <Menu.Item onChange={handleChange} 
               >
                          <Lucide icon="Repeat" className="mr-2 h-4 w-4" />
                          Labels
                        </Menu.Item>
                        
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
                        <Menu.Item>
                          <Lucide icon="Power" className="mr-2 h-4 w-4" />
                         Delete
                        </Menu.Item>
                        <Menu.Devider />
                        
                        <Menu.Item onChange={handleChange}
                >
                          {/* <Lucide icon="FileText" className="mr-2 h-4 w-4" /> */}
                        Add or Edit Opening Stock
                        </Menu.Item>
                        <Menu.Item onChange={handleChange}
                >
                          {/* <Lucide icon="ArrowUpCircle" className="mr-2 h-4 w-4" /> */}
                      Product Stock History
                        </Menu.Item>
                        <Menu.Item onChange={handleChange}
                >
                          {/* <Lucide icon="Link" className="mr-2 h-4 w-4" /> */}
                        Add or Edit Group Prces
                        </Menu.Item>
                        <Menu.Item onChange={handleChange}
                >
                          {/* <Lucide icon="Link" className="mr-2 h-4 w-4" /> */}
                        Duplicate Prodcut
                        </Menu.Item>
                      </Menu.Items>
                    </Menu>
                  </Table.Td>
                  <Table.Td className="!px-2">Frock</Table.Td>
                  <Table.Td className="!px-2">Lizas Closet</Table.Td>
                  <Table.Td className="!px-2">Rs.4545,454.00</Table.Td>
                  <Table.Td className="!px-2">Rs.4545,454.00</Table.Td>
                  <Table.Td className="!px-2">200Pc(s)</Table.Td>
                  <Table.Td className="!px-2">Cloth</Table.Td>
                  <Table.Td className="!px-2">Frock</Table.Td>
                  <Table.Td className="!px-2">Liza</Table.Td>
                  <Table.Td className="!px-2">Rs.454.00</Table.Td>
                  <Table.Td className="!px-2">
                  Rs.4545454.00
                  </Table.Td>
                  <Table.Td className="!px-2">Null</Table.Td>
                  <Table.Td className="!px-2">10g</Table.Td>
                  
               
                </Table.Tr>
                <Table.Tr>
              <Table.Td className="!px-2"></Table.Td>
                  <Table.Td>
                    <div className="image-fit mr-3 h-10 w-10">
                      <img
                        alt="Midone Tailwind HTML Admin Template"
                        className="rounded-full"
                        src={PreviewImage}
                      />
                    </div>
                  </Table.Td>
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
                      <Menu.Items className="w-52 h-48 overflow-y-auto"  placement="right-start" >
                      <Menu.Item onChange={handleChange}
               >
                          <Lucide icon="Repeat" className="mr-2 h-4 w-4" />
                          Labels
                        </Menu.Item>
                        
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
                        <Menu.Item>
                          <Lucide icon="Power" className="mr-2 h-4 w-4" />
                         Delete
                        </Menu.Item>
                        <Menu.Devider />
                        
                        <Menu.Item onChange={handleChange}
                >
                          {/* <Lucide icon="FileText" className="mr-2 h-4 w-4" /> */}
                        Add or Edit Opening Stock
                        </Menu.Item>
                        <Menu.Item onChange={handleChange}
                >
                          {/* <Lucide icon="ArrowUpCircle" className="mr-2 h-4 w-4" /> */}
                      Product Stock History
                        </Menu.Item>
                        <Menu.Item onChange={handleChange}
                >
                          {/* <Lucide icon="Link" className="mr-2 h-4 w-4" /> */}
                        Add or Edit Group Prces
                        </Menu.Item>
                        <Menu.Item onChange={handleChange}
                >
                          {/* <Lucide icon="Link" className="mr-2 h-4 w-4" /> */}
                        Duplicate Prodcut
                        </Menu.Item>
                      </Menu.Items>
                    </Menu>
                  </Table.Td>
                  <Table.Td className="!px-2">Frock</Table.Td>
                  <Table.Td className="!px-2">Lizas Closet</Table.Td>
                  <Table.Td className="!px-2">Rs.4545,454.00</Table.Td>
                  <Table.Td className="!px-2">Rs.4545,454.00</Table.Td>
                  <Table.Td className="!px-2">200Pc(s)</Table.Td>
                  <Table.Td className="!px-2">Cloth</Table.Td>
                  <Table.Td className="!px-2">Frock</Table.Td>
                  <Table.Td className="!px-2">Liza</Table.Td>
                  <Table.Td className="!px-2">Rs.454.00</Table.Td>
                  <Table.Td className="!px-2">
                  Rs.4545454.00
                  </Table.Td>
                  <Table.Td className="!px-2">Null</Table.Td>
                  <Table.Td className="!px-2">10g</Table.Td>
                  
               
                </Table.Tr>
              </Table.Tbody>
            </Table>


            {/* <Table className="border-spacing-y-[10px] border-separate sm:mt-2">
                  <Table.Thead variant='default'>
                    <Table.Tr>
                      <Table.Th className="border-b-0 whitespace-nowrap">
                        IMAGES
                      </Table.Th>
                      <Table.Th className="border-b-0 whitespace-nowrap">
                        PRODUCT NAME
                      </Table.Th>
                      <Table.Th className="text-center border-b-0 whitespace-nowrap">
                        STOCK
                      </Table.Th>
                      <Table.Th className="text-center border-b-0 whitespace-nowrap">
                        STATUS
                      </Table.Th>
                      <Table.Th className="text-center border-b-0 whitespace-nowrap">
                        ACTIONS
                      </Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {_.take(fakerData, 4).map((faker, fakerKey) => (
                      <Table.Tr key={fakerKey} className="intro-x">
                        <Table.Td className="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                          <div className="flex">
                            <div className="w-10 h-10 image-fit zoom-in">
                              <Tippy
                                as="img"
                                alt="Midone Tailwind HTML Admin Template"
                                className="rounded-full shadow-[0px_0px_0px_2px_#fff,_1px_1px_5px_rgba(0,0,0,0.32)] dark:shadow-[0px_0px_0px_2px_#3f4865,_1px_1px_5px_rgba(0,0,0,0.32)]"
                                src={faker.images[0]}
                                content={`Uploaded at ${faker.dates[0]}`}
                              />
                            </div>
                            <div className="w-10 h-10 -ml-5 image-fit zoom-in">
                              <Tippy
                                as="img"
                                alt="Midone Tailwind HTML Admin Template"
                                className="rounded-full shadow-[0px_0px_0px_2px_#fff,_1px_1px_5px_rgba(0,0,0,0.32)] dark:shadow-[0px_0px_0px_2px_#3f4865,_1px_1px_5px_rgba(0,0,0,0.32)]"
                                src={faker.images[1]}
                                content={`Uploaded at ${faker.dates[1]}`}
                              />
                            </div>
                            <div className="w-10 h-10 -ml-5 image-fit zoom-in">
                              <Tippy
                                as="img"
                                alt="Midone Tailwind HTML Admin Template"
                                className="rounded-full shadow-[0px_0px_0px_2px_#fff,_1px_1px_5px_rgba(0,0,0,0.32)] dark:shadow-[0px_0px_0px_2px_#3f4865,_1px_1px_5px_rgba(0,0,0,0.32)]"
                                src={faker.images[2]}
                                content={`Uploaded at ${faker.dates[2]}`}
                              />
                            </div>
                          </div>
                        </Table.Td>
                        <Table.Td className="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                          <a href="" className="font-medium whitespace-nowrap">
                            {faker.products[0].name}
                          </a>
                          <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">
                            {faker.products[0].category}
                          </div>
                        </Table.Td>
                        <Table.Td className="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                          {faker.stocks[0]}
                        </Table.Td>
                        <Table.Td className="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                          <div
                            className={clsx({
                              "flex items-center justify-center": true,
                              "text-success": faker.trueFalse[0],
                              "text-danger": !faker.trueFalse[0],
                            })}
                          >
                            <Lucide
                              icon="CheckSquare"
                              className="w-4 h-4 mr-2"
                            />
                            {faker.trueFalse[0] ? "Active" : "Inactive"}
                          </div>
                        </Table.Td>
                        <Table.Td className="first:rounded-l-md last:rounded-r-md w-56 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] py-0 relative before:block before:w-px before:h-8 before:bg-slate-200 before:absolute before:left-0 before:inset-y-0 before:my-auto before:dark:bg-darkmode-400">
                          <div className="flex items-center justify-center">
                            <a className="flex items-center mr-3" href="">
                              <Lucide
                                icon="CheckSquare"
                                className="w-4 h-4 mr-1"
                              />
                              Edit
                            </a>
                            <a
                              className="flex items-center text-danger"
                              href=""
                            >
                              <Lucide icon="Trash2" className="w-4 h-4 mr-1" />{" "}
                              Delete
                            </a>
                          </div>
                        </Table.Td>
                      </Table.Tr>
                    ))}
                  </Table.Tbody>
                </Table> */}
    </div>
  )
}

export default VariationTable
