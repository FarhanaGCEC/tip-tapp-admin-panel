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
import Lucide from '../../../common/lucide'
import {
  FormCheck,
  FormInfo,
} from '../../../../components/common/form-elements/components'
import {
  InputElement, 
} from '../../../../components/common/form-elements'
import UploadFilesElement from '../../../common/form-elements/upload-files-element'
import ClassicEditorElement from '../../../common/form-elements/classic-editor-element'

function VariationTableDoc() {
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
  const [buttonDocsModalPreview, setDocsButtonModalPreview] = useState(false)
  const [editorDataDescription] = useState(
    )
  return (
    <div className="overflow-y-auto overflow-x-scroll ">
      <Table bordered className="">
        <Table.Thead variant="dark">
          <Table.Tr>
            <Table.Th className="whitespace-nowrap bg-slate-50 text-center text-slate-500 dark:bg-darkmode-800">
              Action
            </Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50  text-slate-500 dark:bg-darkmode-800">
             Heading
            </Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50  text-slate-500 dark:bg-darkmode-800">
              Added By
            </Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50  text-slate-500 dark:bg-darkmode-800">
              Creadted At
            </Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50  text-slate-500 dark:bg-darkmode-800">
              Update At
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          <Table.Tr>
            <Table.Td> <div className=" flex justify-center">
                <Button variant="primary" size="sm" className="mb-2  mr-2 "  onClick={(event: React.MouseEvent) => {
                      event.preventDefault()
                      setDocsButtonModalPreview(true)
                    }}>
                  <a className="flex items-center" href="#">
                    <Lucide icon="Edit" className="h-4 w-4 " /> 
                  </a>
                </Button>
                <Dialog
                    size="xl"
                    open={buttonDocsModalPreview}
                    onClose={() => {
                      setDocsButtonModalPreview(false)
                    }}
                  >
                    <Dialog.Panel className="max-h-screen overflow-y-auto">
                    <Dialog.Title>
                  <h2 className="mr-auto text-base font-medium">{`${t(
                    'Edit Note'
                  )}`}</h2>
                </Dialog.Title>
                      <a
                        onClick={(event: React.MouseEvent) => {
                          event.preventDefault()
                          setDocsButtonModalPreview(false)
                        }}
                        className="absolute right-0 top-0 mr-3 mt-3"
                        href="#"
                      >
                        <Lucide icon="X" className="h-8 w-8 text-slate-400" />
                      </a>
                      <div className="px-3 text-center font-medium mb-5">
                       
                       <div className="overflow-x-auto p-3">
                         <div className="grid grid-cols-1 gap-7 md:grid-cols-1">
                           <InputElement
                             label={`${t(
                               'contactManagement.fields.suppliers.fields.viewSuppliers.fields.viewNotes.fields.heading.label'
                             )}`}
                             register={register}
                             name="heading"
                             id="heading"
                             error={errors.heading}
                             type="text"
                             required
                           />
                           <div className="pt-2">
                             <ClassicEditorElement
                               id="description"
                               name="description"
                               label={`${t(
                                 'contactManagement.fields.suppliers.fields.viewSuppliers.fields.viewNotes.fields.description.label'
                               )}`}
                               register={register}
                               value={editorDataDescription}
                             />
                           </div>
                           <UploadFilesElement
                             id="attach_document"
                             name="attach_document"
                             register={register}
                             label={`${t(
                               'contactManagement.fields.suppliers.fields.viewSuppliers.fields.viewNotes.fields.documents.label'
                             )}`}
                             variant="primary"
                             btnLabel={`${t(
                               'contactManagement.fields.suppliers.fields.viewSuppliers.fields.viewNotes.fields.documents.btnPlaceolder'
                             )}`}
                           />

                           <FormCheck className="">
                             <div className="mr-2 font-medium">{`${t(
                               'contactManagement.fields.suppliers.fields.viewSuppliers.fields.viewNotes.fields.activeStatus.label'
                             )}`}</div>

                             <FormCheck.Input
                               id="vertical-form-3"
                               type="checkbox"
                               value=""
                               onChange={handleChange}
                             />
                             <FormCheck.Label
                               className="mr-2"
                               htmlFor="vertical-form-3"
                             >
                               <div className="mx-1 -ml-1 flex">
                                 <FormInfo
                                   tooltip={`${t(
                                     'contactManagement.fields.suppliers.fields.viewSuppliers.fields.viewNotes.fields.activeStatus.tooltip'
                                   )}`}
                                 />

                               </div>

                             </FormCheck.Label>
                           </FormCheck>
                         </div>
                       </div>
                       <div className="flex justify-end px-3 pb-4 text-center">
                         <Button
                           type="submit"
                           variant="primary"
                           className="mb-2 mr-1 w-24"
                         >
                           {`${t('common.button.update')}`}
                           
                         </Button>
                         <Button
                   type="button"
                   variant="outline-secondary"
                   onClick={() => {
                    setDocsButtonModalPreview(false)
                   }}
                   className="mb-2 mr-1 w-24"
                 >
                   Cancel
                 </Button>
                       </div>
                     </div>
                    </Dialog.Panel>
                  </Dialog>
                <Button variant="linkedin" size="sm" className="mb-2 mr-2 ">
                <a className=" flex items-center" href="#">
                  <Lucide icon="Eye" className="h-4 w-4 " /> 
                </a>
                </Button>
                <Button variant="danger" size="sm" className="mb-2  flex items-center"
                onChange={handleChange}
                        onClick={(event: { preventDefault: () => void }) => {
                          event.preventDefault();
                          setDeleteConfirmationModal(true);
                        }}
                      >
                        <Lucide icon="Trash2" className="w-4 h-4 " /> 
                    
                </Button>
                
              </div></Table.Td>
            <Table.Td >J.K.L Nandasena</Table.Td>
            <Table.Td >J.K.L Nandasena</Table.Td>
            <Table.Td >2023.04.05 14:12P.M</Table.Td>
            <Table.Td >2023.04.05 14:12P.M</Table.Td>
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
    </div>
  )
}

export default VariationTableDoc