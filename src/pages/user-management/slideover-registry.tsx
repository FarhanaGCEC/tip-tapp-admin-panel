/* eslint-disable import/no-cycle */
/* eslint-disable prettier/prettier */
import UpdateGatewaySetting from '../../api/gateway-setting-management/gateway-setting-update/gateway-setting-update'
import AddGatewaySetting from '../../components/gateway-setting-view/gateway-setting-add-view'
import GatewaySettingView from '../../components/gateway-setting-view/gateway-setting-view'
import { AddUser, EditUser, ViewUser } from '../../components/user-management'
import ViewTpandSp from '../../components/user-management/viewUser/view-tp-and-sp/view-tp-and-sp'
import { ViewFeedback } from '../../components/review-feedback-management'
import AddFAQCategory from '../../components/faq-management/add-faq-category'
import AddFAQ from '../../components/faq-management/add-faq'
import ViewFAQCategoryDetails from '../../components/faq-management/view-faq-category'
import ViewFAQCategory from '../../components/faq-management/view-faq-category'
import ViewNewsLettersDetails from '../../components/slider/news-letters/view-newsletters'
import ViewFooterManagementDetails from '../../components/slider/footer-management/view-footer-management'
import EditNewsLettes from '../news-letters-management/edit-newsletter'
import ViewFAQManagementDetails from '../../components/slider/faq-management/view-faq'

export interface FormContents {
  title: string
  component: JSX.Element | ((props: { userId: string }) => JSX.Element)
}
const SlideoverRegistry = {
  userManagement: {
    title: 'userManagement.title',
    component: <AddUser />,
  },
  editUserManagement: {
    title: 'editUserManagement.title',
    component: <EditUser />,
  },
  viewUserManagement: {
    title: 'viewUserManagement.title',
    component: <ViewUser />,
  },
  viewGatewaySettingAdd: {
    title: 'Add Gateway Settings',
    component: <AddGatewaySetting />,
  },
  viewTpAndSpManagement: {
    title: '',
    component: (props: { userId: string; Ispending: boolean }) => (
      <ViewTpandSp {...props} />
    ),
  },
  viewGatewaySetting: {
    title: 'View Gateway Settings',
    component: (props: { userId: string }) => <GatewaySettingView {...props} />,
  },
  GatewaySettingUpdate: {
    title: 'Edit Gateway Settings',
    component: (props: { userId: string }) => (
      <UpdateGatewaySetting {...props} />
    ),
  },
  viewReviewFeedbackManagement: {
    title: 'viewReviewFeedbackManagement.title',
    component: (props: { reviewId: string }) => <ViewFeedback {...props} />,
  },
  viewNewsLetterManagement: {
    title: 'View Newsletter',
    component: (props: { userletterId: number }) => (
      <ViewNewsLettersDetails {...props} />
    ),
  },
  viewAddFaqCategory: {
    title: 'Add FAQ Category',
    component: <AddFAQCategory />,
  },
  viewAddFaq: {
    title: 'Add FAQ Category',
    component: <AddFAQ />,
  },
  viewFaqCategory: {
    title: 'View FAQ Category',
    component: (props: { categoryId: string }) => (
      <ViewFAQCategory {...props} />
    ),
  },
  viewFooterManagement: {
    title: 'View FAQ Category',
    component: (props: { userletterId: number }) => (
      <ViewFAQManagementDetails {...props} />
    ),
  },
  EditNewsLettes: {
    title: 'Edit Newsletters',
    component: (props: { userletterId: number }) => (
      <EditNewsLettes {...props} />
    ),
  },
}

export default SlideoverRegistry
