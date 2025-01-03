import React, { useState } from 'react'
import QuilEditor from '../../components/quil-text-editor'
import { useUpdateFooterContent } from '../../api/footer-management/footer-management'
import EditPen from '../../assets/images/svg/edit-pen.svg'
interface ViewFooterManagementDetailsProps {
  mainTopic: string
  content: any
}

const ViewFooterDetails: React.FC<ViewFooterManagementDetailsProps> = ({
  mainTopic,
  content,
}) => {
  const [editingId, setEditingId] = useState<number | null>(null)
  const updateMutation = useUpdateFooterContent()

  const handleUpdate = (id: number, newContent: string) => {
    updateMutation.mutate(
      { id, content: newContent },
      {
        onSuccess: () => {
          setEditingId(null)
        },
      }
    )
  }
  return (
    <div>
      <h2 className="Uppercase mb-4 text-xl font-bold">{mainTopic} SECTION</h2>
      <div>
        {content?.map((item: any, index: number) => (
          <div
            key={index as any}
            className="relative mb-4 rounded-lg !bg-[#fff] p-4 drop-shadow-lg"
          >
            <h3 className="text-lg font-semibold">{item.name}</h3>

            <div className="flex w-full flex-col items-end justify-end">
              <div dangerouslySetInnerHTML={{ __html: item.content }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ViewFooterDetails
