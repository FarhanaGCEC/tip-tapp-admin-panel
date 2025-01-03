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
              Promo Cards
                
              </h2>
            </h2>
            
          </div>

       <div className='flex justify-center mt-5'>
       <div className="w-full md:w-1/2 intro-y box px-5 mb-5 py-5">
       <div className="flex flex-col border-b font-medium text-base  dark:border-darkmode-400">
                  <h2 className="mr-auto text-base font-medium mb-4">
                  {`PC N01 `}
                  </h2>
                  </div>
                  <div className='bg-warning dark:bg-warning dark:bg-opacity-20 box bg-opacity-10 '>
                  <div className="flex mt-4 grid grid-cols-1 py-2 gap-7 md:grid-cols-2">
                    <div className='ml-2'>
                    <strong>Card Type</strong> : Normal
                    </div>
                    <div className='justify-end text-right mr-2'>
                    <strong> Required Point</strong> :  20
                   
                    </div>
                  </div></div>
       <div className="intro-y py-5 overflow-x-auto ">
    <Table striped>
        <Table.Thead variant='default'>
            <Table.Tr>
                <Table.Th className="whitespace-nowrap">From invoice value</Table.Th>
                <Table.Th className="whitespace-nowrap"> To invoice value</Table.Th>
                <Table.Th className="whitespace-nowrap "> Discount %</Table.Th>
                <Table.Th className="whitespace-nowrap ">Commission %</Table.Th>
            </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
            <Table.Tr>
                <Table.Td>500</Table.Td>
                <Table.Td >100</Table.Td>
                <Table.Td >10</Table.Td>
                <Table.Td >10</Table.Td>
            </Table.Tr>
            <Table.Tr>
                <Table.Td>500</Table.Td>
                <Table.Td >100</Table.Td>
                <Table.Td >10</Table.Td>
                <Table.Td >10</Table.Td>
            </Table.Tr>
        </Table.Tbody>
    </Table>
</div>
       </div>
       <div className="w-full md:w-1/2 ml-5 intro-y box px-5 mb-5 py-5">
       <div className="flex flex-col border-b font-medium text-base  dark:border-darkmode-400">
                  <h2 className="mr-auto text-base font-medium mb-4">
                  {`PC N02 `}
                  </h2>
                  </div>
                  <div className='bg-success box bg-opacity-10 dark:bg-success dark:bg-opacity-20 '>
                  <div className="flex mt-4 grid grid-cols-1 py-2 gap-7 md:grid-cols-2">
                    <div className='ml-2'>
                    <strong>Card Type</strong> : Normal
                    </div>
                    <div className='justify-end text-right mr-2'>
                    <strong> Required Point</strong> :  40
                   
                    </div>
                  </div></div>
       <div className="intro-y py-5 overflow-x-auto ">
    <Table striped>
        <Table.Thead variant='default'>
            <Table.Tr>
                <Table.Th className="whitespace-nowrap">From invoice value</Table.Th>
                <Table.Th className="whitespace-nowrap"> To invoice value</Table.Th>
                <Table.Th className="whitespace-nowrap "> Discount %</Table.Th>
                <Table.Th className="whitespace-nowrap ">Commission %</Table.Th>
            </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
            <Table.Tr>
                <Table.Td>500</Table.Td>
                <Table.Td >100</Table.Td>
                <Table.Td >10</Table.Td>
                <Table.Td >10</Table.Td>
            </Table.Tr>
            <Table.Tr>
                <Table.Td>500</Table.Td>
                <Table.Td >100</Table.Td>
                <Table.Td >10</Table.Td>
                <Table.Td >10</Table.Td>
            </Table.Tr>
        </Table.Tbody>
    </Table>
</div>
       </div>
      
       </div>
       <div className='flex justify-center '>
       <div className="w-full md:w-1/2 intro-y box px-5 mb-5 py-5">
       <div className="flex flex-col border-b font-medium text-base  dark:border-darkmode-400">
                  <h2 className="mr-auto text-base font-medium mb-4">
                  {`PC N03 `}
                  </h2>
                  </div>
                  <div className='bg-primary box bg-opacity-10 dark:bg-primary dark:bg-opacity-10 '>
                  <div className="flex mt-4 grid grid-cols-1 py-2 gap-7 md:grid-cols-2">
                    <div className='ml-2'>
                    <strong>Card Type</strong> : Normal
                    </div>
                    <div className='justify-end text-right mr-2'>
                    <strong> Required Point</strong> :  20
                   
                    </div>
                  </div></div>
       <div className="intro-y py-5 overflow-x-auto ">
    <Table striped>
        <Table.Thead variant='default'>
            <Table.Tr>
                <Table.Th className="whitespace-nowrap">From invoice value</Table.Th>
                <Table.Th className="whitespace-nowrap"> To invoice value</Table.Th>
                <Table.Th className="whitespace-nowrap "> Discount %</Table.Th>
                <Table.Th className="whitespace-nowrap ">Commission %</Table.Th>
            </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
            <Table.Tr>
                <Table.Td>500</Table.Td>
                <Table.Td >100</Table.Td>
                <Table.Td >10</Table.Td>
                <Table.Td >10</Table.Td>
            </Table.Tr>
            <Table.Tr>
                <Table.Td>500</Table.Td>
                <Table.Td >100</Table.Td>
                <Table.Td >10</Table.Td>
                <Table.Td >10</Table.Td>
            </Table.Tr>
        </Table.Tbody>
    </Table>
</div>
       </div>
       <div className="w-full md:w-1/2 ml-5 intro-y box px-5 mb-5 py-5">
       <div className="flex flex-col border-b font-medium text-base  dark:border-darkmode-400">
                  <h2 className="mr-auto text-base font-medium mb-4">
                  {`PC S01 `}
                  </h2>
                  </div>
                  <div className='bg-danger box bg-opacity-10 dark:bg-danger dark:bg-opacity-10 '>
                  <div className="flex mt-4 grid grid-cols-1 py-2 gap-7 md:grid-cols-2">
                    <div className='ml-2'>
                    <strong>Card Type</strong> : Special
                    </div>
                    <div className='justify-end text-right mr-2'>
                    <strong> Required Point</strong> :  40
                   
                    </div>
                  </div></div>
       <div className="intro-y py-5 overflow-x-auto ">
    <Table striped>
        <Table.Thead variant='default'>
            <Table.Tr>
                <Table.Th className="whitespace-nowrap">From invoice value</Table.Th>
                <Table.Th className="whitespace-nowrap"> To invoice value</Table.Th>
                <Table.Th className="whitespace-nowrap "> Discount %</Table.Th>
                <Table.Th className="whitespace-nowrap ">Commission %</Table.Th>
            </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
            <Table.Tr>
                <Table.Td>500</Table.Td>
                <Table.Td >100</Table.Td>
                <Table.Td >10</Table.Td>
                <Table.Td >10</Table.Td>
            </Table.Tr>
            <Table.Tr>
                <Table.Td>500</Table.Td>
                <Table.Td >100</Table.Td>
                <Table.Td >10</Table.Td>
                <Table.Td >10</Table.Td>
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