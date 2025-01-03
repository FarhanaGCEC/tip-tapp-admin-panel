import React from 'react'
import EditFooterManagement from '../../../pages/footer-management/edit-footer-management'
import ViewFooterDetails from '../../../pages/footer-management/view-footer-management'

interface ViewFooterManagementDetailsProps {
  mainTopic: string
  content: any
}

const ViewFooterManagementDetails: React.FC<
  ViewFooterManagementDetailsProps
> = ({ mainTopic, content }) => {
  return <ViewFooterDetails mainTopic={mainTopic} content={content} />
}

export default ViewFooterManagementDetails
