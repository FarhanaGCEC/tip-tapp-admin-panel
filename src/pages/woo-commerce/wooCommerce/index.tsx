/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable prettier/prettier */
import _ from 'lodash'
import { SetStateAction, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import Table from '../../../components/common/table'
import Button from '../../../components/common/button'
import Tippy from '../../../components/common/tippy'
import Lucide from '../../../components/common/lucide'
import Alert from "../../../base-components/Alert"
import { SelectElement } from '../../../components/common/form-elements'
import LoadingIcon from '../../../components/common/loading-icon'

function Main() {
  const { t } = useTranslation('pos')
  const {
    register,
   
  } = useForm({
    mode: 'onChange',
  })
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [tooltipContent1] = useState('Synchronizes only newly created products with the Woocommerce App.*(Less time consuming process)Please, Do not refresh or leave the page while synchronizing')
  const [tooltipContent2] = useState('Synchronizes all your products with the Woocommerce App.*(Time consuming process)Please, Do not refresh or leave the page while synchronizing')

    return (
       <div>
        <div className="intro-y mt-4 flex flex-col items-center sm:flex-row">
            <h2 className="mr-auto text-lg font-medium ml-2">
            
              <h2 className="mr-auto text-lg font-medium">
              WooCommerce
                
              </h2>
            </h2>
            
          </div>


       <div className='flex justify-center mt-5'>
       <div className="w-full md:w-1/2 text-center intro-y box   px-5 mb-5 py-5">
       <div className="flex flex-col border-b font-medium text-base  dark:border-darkmode-400">
                  <h2 className="mr-auto text-base font-medium mb-4">
                  {`Sync Product Categories `}
                  </h2>
                  </div>
                  <Alert
        variant="pending"
        dismissible
        className="intro-y box col-span-11 mt-5 dark:bg-pending dark:border-darkmode-600"
      >
        {({ dismiss }) => (
          <div className="flex items-center">
            <span>
              <Lucide icon="Info" className="mr-2 h-4 w-4" />
            </span>
            <span>
            15 Categories not synced
            </span>
            
            <Alert.DismissButton
              className="text-white"
              onClick={dismiss}
              aria-label="Close"
            >
              <Lucide icon="X" className="h-4 text-white w-4" />
            </Alert.DismissButton>
          </div>
        )}
      </Alert>

      <Button variant="primary" className="mt-5 w-full mb-2 mr-2">
        <Lucide icon="RefreshCw" className="w-4 h-4 mr-3" />{" "}
        Sync 
        
    </Button>
   
    <span >
          Last Synced : 1 Year Ago
        </span>
        <div>
          <Button variant="danger" rounded className="mt-5 w-auto mb-2 mr-2">
        <Lucide icon="RotateCcw" className="w-4 h-4 mr-3" />{" "}
       Rest Synced Categories
        
    </Button>
        </div>
        
       </div>

       <div className="w-full md:w-1/2 ml-5 intro-y box px-5 mb-5 py-5">
       <div className="flex flex-col border-b font-medium text-base  dark:border-darkmode-400">
                  <h2 className="mr-auto text-base font-medium mb-4">
                  {`Sync Products `}
                  </h2>
                  </div>
                  <Alert
        variant="warning"
        dismissible
        className="intro-y box col-span-11 mt-5 dark:bg-warning dark:border-darkmode-600"
      >
        {({ dismiss }) => (
          <>
          <div className="flex items-center">
                    <Alert.DismissButton
                      className=""
                      onClick={dismiss}
                      aria-label="Close"
                    >
                      <Lucide icon="X" className="h-4  w-4 mt-3" />
                    </Alert.DismissButton>
                  </div>
                  <div className="items-center">
                    
                  <div className='flex mb-2'>
                  <span >
              <Lucide icon="Info" className="mr-2 h-4 w-4" />
            </span>
                    334 Products not synced
                  </div>
                  <div className='flex mb-2'>
                  <span >
              <Lucide icon="Info" className="mr-2 h-4 w-4" />
            </span>
            7 Products have been updated after last sync
                  </div>

                </div></>
        )}
      </Alert>
<div className='flex mr-2'>
  <div>
  <Button variant="primary" className="mt-5 w-full mb-2 mr-2">
        <Lucide icon="RefreshCw" className="w-4 h-4 mr-3" />{" "}
        Sync
        <Tippy content={tooltipContent1}>
                {' '}
                <a>
                  {' '}
                  <Lucide icon="Info" className=" mx-2 h-4 w-4 " />
                </a>{' '}
              </Tippy>
    </Button>
    <span >
          Last Synced : 1 Year Ago
        </span>
  </div>
  <div>
  <Button variant="twitter" className="mt-5 w-full mb-2  ml-2">
        <Lucide icon="RefreshCw" className="w-4 h-4 mr-3" />{" "}
        Sync All
        <Tippy content={tooltipContent2}>
                {' '}
                <a>
                  {' '}
                  <Lucide icon="Info" className=" mx-2 h-4 w-4 " />
                </a>{' '}
              </Tippy>
    </Button>
    <span className=" ml-2">
          Last Synced : 1 Year Ago
        </span>
  </div>
       
</div>
      
        <div className='text-center'>
          <Button variant="danger" rounded className="mt-5 w-auto mb-2 mr-2">
        <Lucide icon="RotateCcw" className="w-4 h-4 mr-3" />{" "}
       Rest Synced Categories
        
    </Button>
        </div>

       </div>
       </div>


       <div className='flex justify-center'>
       <div className="w-full md:w-1/2 text-center intro-y box   px-5 mb-5 py-5">
       <div className="flex flex-col border-b font-medium text-base  dark:border-darkmode-400">
                  <h2 className="mr-auto text-base font-medium mb-4">
                  {` Map Tax Rates `}
                  </h2>
                  </div>
                  <div className="intro-y  py-5 overflow-x-auto ">
    <Table striped>
        <Table.Thead variant='default'>
            <Table.Tr>
                <Table.Th className="whitespace-nowrap">
                POS Tax Rate
                </Table.Th>
                <Table.Th className="whitespace-nowrap">
                	Equivalent Woocommerce Tax Rate
                </Table.Th>
               
            </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
            <Table.Tr>
                <Table.Td>GST</Table.Td>
                <Table.Td>
                  <SelectElement
           
            register={register}
            name="invoiceScheme"
            id="invoiceScheme"

          /></Table.Td>

            </Table.Tr>
           
        </Table.Tbody>
    </Table>
</div>
<div className="flex justify-end">
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
       <div className="w-full md:w-1/2 ml-5 intro-y box px-5 mb-5 text-center py-5">
       <div className="flex flex-col border-b font-medium text-base  dark:border-darkmode-400">
                  <h2 className="mr-auto text-base font-medium mb-4">
                  {`Sync Orders `}
                  </h2>
                  </div>
<Button variant="primary" className="mt-5 w-full mb-2 mr-2">
        <Lucide icon="RefreshCw" className="w-4 h-4 mr-3" />{" "}
        Sync
        
    </Button>
    <span >
          Last Synced : 1 Year Ago
        </span>
        

       </div>
      
       </div>

       <div className='flex mr-4'>
       <div className="w-full md:w-1/2 text-center   intro-y box   px-5 mb-5 py-5">
       <div className="flex flex-col border-b font-medium text-base  dark:border-darkmode-400">
                  <h2 className="mr-auto text-base font-medium mb-4">
                  {` Map Payment Fee Rates `}
                  </h2>
                  </div>
                  <div className="intro-y py-5 overflow-x-auto ">
    <Table striped>
        <Table.Thead variant='default'>
            <Table.Tr>
                <Table.Th className="whitespace-nowrap">
                POS Payment Fee
                </Table.Th>
                <Table.Th className="whitespace-nowrap">
                Equivalent Woocommerce Payment Fee
                </Table.Th>
               
            </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
            <Table.Tr>
                <Table.Td>Pay Fee</Table.Td>
                <Table.Td>
                  <SelectElement
           
            register={register}
            name="invoiceScheme"
            id="invoiceScheme"

          /></Table.Td>

            </Table.Tr>
           
        </Table.Tbody>
    </Table>
</div>
<div className="flex justify-end">
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
       </div>
        )
    }
    
    export default Main