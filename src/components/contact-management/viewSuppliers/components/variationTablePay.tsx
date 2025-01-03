/* eslint-disable import/no-useless-path-segments */
/* eslint-disable react/self-closing-comp */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/no-duplicates */
/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/anchor-is-valid */
import _ from 'lodash'
import {useRef, useState } from 'react'
import { Dialog } from '../../../common/headless'
import Table from '../../../common/table'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import Button from '../../../common/button'
import SharedDataContainer from '../../../../containers/sharedData'
import Lucide from '../../../common/lucide'


function VariationTablePay() {
  const {
    register,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  })
  const { t } = useTranslation('pos')
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false)
  const deleteButtonRef = useRef(null)
  const handleChange = () => {}
  
  return (
    <div className="overflow-y-auto overflow-x-scroll ">
      <Table bordered className="">
        <Table.Thead variant="dark">
          <Table.Tr>
            <Table.Th className="whitespace-nowrap bg-slate-50 text-slate-500 dark:bg-darkmode-800">
              Paid On
            </Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50  text-slate-500 dark:bg-darkmode-800">
             Reference No
            </Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50 text-right text-slate-500 dark:bg-darkmode-800">
             Amount
            </Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50  text-slate-500 dark:bg-darkmode-800">
              Payment Method
            </Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50 text-slate-500 dark:bg-darkmode-800">
             Payment For
            </Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50 text-center text-slate-500 dark:bg-darkmode-800">
             Action
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          <Table.Tr>
          <Table.Td >2023.05 14:12P.M</Table.Td>
            <Table.Td >123900</Table.Td>
            <Table.Td className="text-right">Rs. 1300.00</Table.Td>
            <Table.Td >Cash</Table.Td>
            <Table.Td >Bank</Table.Td>
            <Table.Td> <div className="flex justify-center">
                
                <Button variant="linkedin" size="sm" className="mb-2 mr-2">
                <a className="flex items-center" href="#">
                  <Lucide icon="Eye" className="h-4 w-4 " />
                </a>
                </Button>
                <Button variant="danger" size="sm" className="mb-2 flex items-center"
                onChange={handleChange}
                        onClick={(event: { preventDefault: () => void }) => {
                          event.preventDefault();
                          setDeleteConfirmationModal(true);
                        }}
                      >
                        <Lucide icon="Trash2" className="w-4 h-4 " /> 
                    
                </Button>
                
              </div></Table.Td>
          </Table.Tr>
         
         
        </Table.Tbody>
      </Table>
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
    </div>
  )
}

export default VariationTablePay