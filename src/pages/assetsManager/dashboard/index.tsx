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
              Asset Management
                
              </h2>
            </h2>
            
          </div>
          <div className="grid grid-cols-9 gap-6 mt-5">
          <div className="col-span-12  sm:col-span-6 xl:col-span-3 intro-y">
                <div
                  className={clsx([
                    "relative zoom-in",
                    "before:content-[''] before:w-[90%] before:shadow-[0px_3px_20px_#0000000b] before:bg-slate-50 before:h-full before:mt-3 before:absolute before:rounded-md before:mx-auto before:inset-x-0 before:dark:bg-darkmode-400/70",
                  ])}
                >
                  <div className="p-5 px-5 box relative">
  <div className="text-3xl text-pending font-medium leading-8">
    2.149
  </div>
  <div className="mt-1 text-base dark:text-white text-slate-500">
  Assets Allocated to You
  </div>
  <div className="absolute top-1/2 transform -translate-y-1/2 right-0">
    <Button
      variant="pending"
      className="w-14 h-14 mx-4 rounded-full intro-y"
    >
      <Lucide
        icon="Boxes"
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
    Total Assets
  </div>
  <div className="absolute top-1/2 transform -translate-y-1/2 right-0">
    <Button
      variant="primary"
      className="w-14 h-14 mx-4 rounded-full intro-y"
    >
      <Lucide
        icon="Boxes"
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
  Total Assets Allocated
  </div>
  <div className="absolute top-1/2 transform -translate-y-1/2 right-0">
    <Button
      variant="warning"
      className="w-14 h-14 mx-2 rounded-full intro-y"
    >
      <Lucide
        icon="Boxes"
        className="w-[28px] h-[28px] text-white"
      />
    </Button>
  </div>
</div>

                </div>
              </div>

            </div>

       <div className='flex justify-center mt-10'>
       <div className="w-full md:w-1/3 intro-y box px-5 mb-5 py-5">
       <div className="flex flex-col border-b font-medium text-base  dark:border-darkmode-400">
                  <h2 className="mr-auto text-base font-medium mb-4">
                  {`Topic `}
                  </h2>
                  </div>
       <div className="intro-y py-5 overflow-x-auto ">
    <Table striped>
        <Table.Thead variant='default'>
            <Table.Tr>
                <Table.Th className="whitespace-nowrap">Category</Table.Th>
                <Table.Th className="whitespace-nowrap text-right">
                Assets Allocated to you
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
                <Table.Td className="text-right">100</Table.Td>
           
            </Table.Tr>
            <Table.Tr>
                <Table.Td>3</Table.Td>
                <Table.Td className="text-right">100</Table.Td>
         
            </Table.Tr>
        </Table.Tbody>
    </Table>
</div>
       </div>
       <div className="w-full md:w-1/3 ml-5 intro-y box px-5 mb-5 py-5">
       <div className="flex flex-col border-b font-medium text-base  dark:border-darkmode-400">
                  <h2 className="mr-auto text-base font-medium mb-4">
                  {`Assets by Category `}
                  </h2>
                  </div>
       <div className="intro-y  py-5 overflow-x-auto ">
    <Table striped>
        <Table.Thead variant='default'>
            <Table.Tr>
            <Table.Th className="whitespace-nowrap">Category</Table.Th>
                <Table.Th className="whitespace-nowrap text-right">
                   Total Assets
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
       <div className="w-full md:w-1/3 ml-5 intro-y box px-5 mb-5 py-5">
       <div className="flex flex-col border-b font-medium text-base  dark:border-darkmode-400">
                  <h2 className="mr-auto text-base font-medium mb-4">
                  {`Assets Expired or Expiring in 1 Month `}
                  </h2>
                  </div>
       <div className="intro-y  py-5 overflow-x-auto ">
    <Table striped>
        <Table.Thead variant='default'>
            <Table.Tr>
            <Table.Th className="whitespace-nowrap">Assets</Table.Th>
                <Table.Th className="whitespace-nowrap text-right">
                Warranty Status
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