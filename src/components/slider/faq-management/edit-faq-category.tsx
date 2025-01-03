/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/* eslint-disable prettier/prettier */
/* eslint-disable react/self-closing-comp */
import React from 'react'
import EditFAQCategoryManagement from '../../../pages/faq-category-management/edit-faq-category-management'

interface ViewFooterManagementDetailsProps {
  mainTopic: string
  content: any
}

const EditFAQDetails: React.FC<
  ViewFooterManagementDetailsProps
> = ({ mainTopic, content }) => {
  return <EditFAQCategoryManagement mainTopic={mainTopic} content={content} />
}

export default EditFAQDetails
