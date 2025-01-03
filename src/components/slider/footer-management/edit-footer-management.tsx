/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/* eslint-disable prettier/prettier */
/* eslint-disable react/self-closing-comp */
import React from 'react'
import EditFooterManagement from '../../../pages/footer-management/edit-footer-management'

interface ViewFooterManagementDetailsProps {
  mainTopic: string
  content: any
}

const EditFooterManagementDetails: React.FC<
  ViewFooterManagementDetailsProps
> = ({ mainTopic, content }) => {
  return <EditFooterManagement mainTopic={mainTopic} content={content} />
}

export default EditFooterManagementDetails
