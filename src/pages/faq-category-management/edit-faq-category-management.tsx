/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-danger */
/* eslint-disable react/button-has-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/* eslint-disable prettier/prettier */
/* eslint-disable react/self-closing-comp */
import React, { useState } from 'react'
import QuilEditor from '../../components/quil-text-editor'
import { useUpdateFooterContent } from '../../api/footer-management/footer-management'
import EditPen from '../../assets/images/svg/edit-pen.svg'
import { useUpdateFAQCategory } from '../../api/faq-management/faq-management'
 
interface ViewFAQManagementDetailsProps {
  mainTopic: string
  content: any
}

const EditFAQCategoryManagement: React.FC<ViewFAQManagementDetailsProps> = ({
  mainTopic,
  content,
}) => {
  const [editingId, setEditingId] = useState<number | null>(null)
  const updateMutation = useUpdateFAQCategory()

  const handleUpdate = (id: number, orderType: string) => {
    updateMutation.mutate(
      { id, content: content },
      {
        onSuccess: () => {
          setEditingId(null)
        },
      }
    )
  }
  return (
    <div className="p-4">
      <h2 className="Uppercase mb-4 text-xl font-bold">{mainTopic} SECTION</h2>
      <div>
        {content?.map((item: any, index: number) => (
          <div
            key={index as any}
            className="relative mb-4 rounded-lg !bg-[#fff] p-4 drop-shadow-lg"
          >
            <h3 className="text-lg font-semibold">{item.name}</h3>
            {editingId === item.id ? (
              <QuilEditor
                defaultText={item.content}
                onUpdate={(newContent: string) =>
                  handleUpdate(item.id, newContent)
                }
                onCancel={() => setEditingId(null)}
              />
            ) : (
              <div className='flex w-full justify-end items-end flex-col'>
                <div dangerouslySetInnerHTML={{ __html: item.content }} />
                <div
                  className="mt-2 flex justify-center items-center gap-3  min-w-[104px] max-w-[104px] rounded-lg bg-black px-3 py-2 text-center text-[15px] text-white"
                  onClick={() => setEditingId(item.id)}
                >
                  <img src={EditPen} alt="" />
                  Edit
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default EditFAQCategoryManagement
