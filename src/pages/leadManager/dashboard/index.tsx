/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable prettier/prettier */
import _ from 'lodash'
import { SetStateAction, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import clsx from 'clsx'
import Table from '../../../components/common/table'
import Button from '../../../components/common/button'
import Tippy from '../../../components/common/tippy'
import Lucide from '../../../components/common/lucide'

function Main() {
    return (
       <div>
        <div className="intro-y mt-4 flex flex-col items-center sm:flex-row">
            <h2 className="mr-auto text-lg font-medium ml-2">
            
              <h2 className="mr-auto text-lg font-medium">
              Lead Manager
                
              </h2>
            </h2>
            
          </div>
          <div className="grid grid-cols-12 gap-6 mt-5">
          <div className="col-span-12  sm:col-span-6 xl:col-span-3 intro-y">
                <div
                  className={clsx([
                    "relative zoom-in",
                    "before:content-[''] before:w-[90%] before:shadow-[0px_3px_20px_#0000000b] before:bg-slate-50 before:h-full before:mt-3 before:absolute before:rounded-md before:mx-auto before:inset-x-0 before:dark:bg-darkmode-400/70",
                  ])}
                >
                  <div className="p-5 px-5 box relative">
  <div className="text-3xl text-success font-medium leading-8">
    2.149
  </div>
  <div className="mt-1 text-base dark:text-white text-slate-500">
    Customers
  </div>
  <div className="absolute top-1/2 transform -translate-y-1/2 right-0">
    <Button
      variant="success"
      className="w-14 h-14 mx-4 rounded-full intro-y"
    >
      <Lucide
        icon="Users"
        className="w-[28px] h-[28px] text-white"
      />
    </Button>
  </div>
</div>

                </div>
              </div>
              <div className="col-span-12  sm:col-span-6 xl:col-span-3 intro-y">
                <div
                  className={clsx([
                    "relative zoom-in",
                    "before:content-[''] before:w-[90%] before:shadow-[0px_3px_20px_#0000000b] before:bg-slate-50 before:h-full before:mt-3 before:absolute before:rounded-md before:mx-auto before:inset-x-0 before:dark:bg-darkmode-400/70",
                  ])}
                >
                  <div className="p-5 px-5 box relative">
  <div className="text-3xl text-primary font-medium leading-8">
    2
  </div>
  <div className="mt-1 text-base dark:text-white text-slate-500">
    Leads
  </div>
  <div className="absolute top-1/2 transform -translate-y-1/2 right-0">
    <Button
      variant="primary"
      className="w-14 h-14 mx-4 rounded-full intro-y"
    >
      <Lucide
        icon="Hand"
        className="w-[28px] h-[28px] text-white"
      />
    </Button>
  </div>
</div>

                </div>
              </div>
              <div className="col-span-12  sm:col-span-6 xl:col-span-3 intro-y">
                <div
                  className={clsx([
                    "relative zoom-in",
                    "before:content-[''] before:w-[90%] before:shadow-[0px_3px_20px_#0000000b] before:bg-slate-50 before:h-full before:mt-3 before:absolute before:rounded-md before:mx-auto before:inset-x-0 before:dark:bg-darkmode-400/70",
                  ])}
                >
                  <div className="p-5 px-5 box relative">
  <div className="text-3xl text-warning font-medium leading-8">
    10
  </div>
  <div className="mt-1 text-base  text-slate-500 dark:text-white">
    Sources
  </div>
  <div className="absolute top-1/2 transform -translate-y-1/2 right-0">
    <Button
      variant="warning"
      className="w-14 h-14 mx-2 rounded-full intro-y"
    >
      <Lucide
        icon="Search"
        className="w-[28px] h-[28px] text-white"
      />
    </Button>
  </div>
</div>

                </div>
              </div>
              <div className="col-span-12  sm:col-span-6 xl:col-span-3 intro-y">
                <div
                  className={clsx([
                    "relative zoom-in",
                    "before:content-[''] before:w-[90%] before:shadow-[0px_3px_20px_#0000000b] before:bg-slate-50 before:h-full before:mt-3 before:absolute before:rounded-md before:mx-auto before:inset-x-0 before:dark:bg-darkmode-400/70",
                  ])}
                >
                  <div className="p-5 px-5 box relative">
  <div className="text-3xl text-danger font-medium leading-8">
  90
  </div>
  <div className="mt-1 text-base  text-slate-500 dark:text-white">
    Life Stages
  </div>
  <div className="absolute top-1/2 transform -translate-y-1/2 right-0">
    <Button
      variant="danger"
      className="w-14 h-14 mx-2 rounded-full intro-y"
    >
      <Lucide
        icon="LifeBuoy"
        className="w-[28px] h-[28px] text-white"
      />
    </Button>
  </div>
</div>

                </div>
              </div>
            </div>
            <div className="intro-y mt-10   box px-5 mb-5 py-5">
     <div className="flex justify-between items-center border-b mb-4 font-medium text-base border-slate-200/60 dark:border-darkmode-400">
    <h2 className="text-base font-medium mb-4">Birthdays</h2>
    <Button variant="primary" size='sm' rounded className="w-32 mb-4">
        Send Wishes
        <Lucide
        icon="Cake"
        className="w-[14px] h-[14px] ml-2 text-white"
      />
    </Button>
</div>
<div className="flex  justify-center items-center font-medium text-base">
    <Button
        variant="outline-secondary"
        className="relative justify-start rounded-full w-32"
    >
        Today
        <span className="w-8 h-8 absolute flex justify-center items-center bg-secondary text-black rounded-full right-0 top-0 bottom-0 my-auto ml-auto mr-0.5">
            <Lucide icon="Calendar" className="w-4 h-4" />
        </span>
    </Button>
</div>
<div className="intro-y mb-3 py-5 overflow-x-auto border-b">
    <Table striped>
        <Table.Thead variant='default'>
            <Table.Tr>
                <Table.Th className="whitespace-nowrap">#</Table.Th>
                <Table.Th className="whitespace-nowrap">
                    Name
                </Table.Th>
                <Table.Th className="whitespace-nowrap">
                   Birthday
                </Table.Th>
               
            </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
            <Table.Tr>
                <Table.Td>1</Table.Td>
                <Table.Td>Angelina</Table.Td>
                <Table.Td>2023.11.06</Table.Td>
            </Table.Tr>
            <Table.Tr>
                <Table.Td>2</Table.Td>
                <Table.Td>Brad</Table.Td>
                <Table.Td>2023.11.06</Table.Td>
            </Table.Tr>
            <Table.Tr>
                <Table.Td>3</Table.Td>
                <Table.Td>Charlie</Table.Td>
                <Table.Td>2023.11.06</Table.Td>
            </Table.Tr>
        </Table.Tbody>
    </Table>
</div>
<div className="flex  justify-center items-center font-medium text-base">
    <Button
        variant="outline-secondary"
        className="relative justify-start rounded-full w-32"
    >
        Yesterday
        <span className="w-8 h-8 absolute flex justify-center items-center bg-secondary text-black rounded-full right-0 top-0 bottom-0 my-auto ml-auto mr-0.5">
            <Lucide icon="Calendar" className="w-4 h-4" />
        </span>
    </Button>
</div>
<div className="intro-y mb-5 py-5 overflow-x-auto ">
    <Table striped>
        <Table.Thead variant='default'>
            <Table.Tr>
                <Table.Th className="whitespace-nowrap">#</Table.Th>
                <Table.Th className="whitespace-nowrap">
                    Name
                </Table.Th>
                <Table.Th className="whitespace-nowrap">
                   Birthday
                </Table.Th>
               
            </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
            <Table.Tr>
                <Table.Td>1</Table.Td>
                <Table.Td>Angelina</Table.Td>
                <Table.Td>2023.11.06</Table.Td>
            </Table.Tr>
            <Table.Tr>
                <Table.Td>2</Table.Td>
                <Table.Td>Brad</Table.Td>
                <Table.Td>2023.11.06</Table.Td>
            </Table.Tr>
            <Table.Tr>
                <Table.Td>3</Table.Td>
                <Table.Td>Charlie</Table.Td>
                <Table.Td>2023.11.06</Table.Td>
            </Table.Tr>
        </Table.Tbody>
    </Table>
</div>
                  
       </div> 
       <div className='flex justify-center '>
       <div className="w-full md:w-1/2 intro-y box px-5 mb-5 py-5">
       <div className="intro-y py-5 overflow-x-auto ">
    <Table striped>
        <Table.Thead variant='default'>
            <Table.Tr>
                <Table.Th className="whitespace-nowrap">Source</Table.Th>
                <Table.Th className="whitespace-nowrap">
                   Table
                </Table.Th>
                <Table.Th className="whitespace-nowrap">
                  Coversion
                </Table.Th>
               
            </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
            <Table.Tr>
                <Table.Td>1</Table.Td>
                <Table.Td>Angelina</Table.Td>
                <Table.Td>2023.11.06</Table.Td>
            </Table.Tr>
            <Table.Tr>
                <Table.Td>2</Table.Td>
                <Table.Td>Brad</Table.Td>
                <Table.Td>2023.11.06</Table.Td>
            </Table.Tr>
            <Table.Tr>
                <Table.Td>3</Table.Td>
                <Table.Td>Charlie</Table.Td>
                <Table.Td>2023.11.06</Table.Td>
            </Table.Tr>
        </Table.Tbody>
    </Table>
</div>
       </div>
       <div className="w-full md:w-1/2 ml-5 intro-y box px-5 mb-5 py-5">
       <div className="intro-y  py-5 overflow-x-auto ">
    <Table striped>
        <Table.Thead variant='default'>
            <Table.Tr>
            <Table.Th className="whitespace-nowrap">Life Stages</Table.Th>
                <Table.Th className="whitespace-nowrap text-right">
                   Total
                </Table.Th>
                
               
            </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
            <Table.Tr>
                <Table.Td>1</Table.Td>
                <Table.Td className="text-right">100</Table.Td>

            </Table.Tr>
            <Table.Tr>
                <Table.Td>2</Table.Td>
                <Table.Td className="text-right">200</Table.Td>

            </Table.Tr>
            <Table.Tr>
                <Table.Td>3</Table.Td>
                <Table.Td className="text-right">600</Table.Td>
              
            </Table.Tr>
        </Table.Tbody>
    </Table>
</div>
       </div>
       </div>
       </div>
        )
    }
    
    export default Main