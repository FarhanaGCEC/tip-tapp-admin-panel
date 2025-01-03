/* eslint-disable import/no-cycle */
/* eslint-disable prettier/prettier */
import {
  AddCustomers,
  AddFollowUp,
  EditCustomers,
  EditFollowUp,
  FollowUpView,
  AddRecurringFollowUp,
  AddOneTimeFollowUp,
  AddCampaign,
  AddProposalTemplate,
  EditProposalTemplate,
  ViewProposalTemplate,
  SendProposalTemplate,

} from '../../../components/leads'

/* Note: Product title load from "i18next" language file located at "/public/locales"  */
const SlideoverRegistry = {
  addCustomer: {
    title: 'contactManagement.fields.customers.fields.addContact.title',
    component: <AddCustomers />,
  },
  addFollowUp: {
    title: 'lead.fields.addFollowUp.title',
    component: <AddFollowUp />,
  },
  editCustomer: {
    title: 'lead.fields.editContact.title',
    component: <EditCustomers />,
  },
  editFollowUp: {
    title: 'lead.fields.editFollowUp.title',
    component: <EditFollowUp />,
  },
  followUp: {
    title: 'lead.fields.followUp.title',
    component: <FollowUpView />,
  },
  recurringFollowUp: {
    title: 'lead.fields.recurringfollowUp.title',
    component: <AddRecurringFollowUp />,
  },
  adOneTimeFollowUp: {
    title: 'lead.fields.addOnetimeFollowUp.title',
    component: <AddOneTimeFollowUp />,
  },
  adOCampaign: {
    title: 'lead.fields.addCampaign.title',
    component: <AddCampaign />,
  },
  addProposalTemplate: {
    title: 'lead.fields.addProposalTemplate.title',
    component: <AddProposalTemplate />,
  },
  editProposalTemplate: {
    title: 'lead.fields.editProposalTemplate.title',
    component: <EditProposalTemplate />,
  },
  viewProposalTemplate: {
    title: 'lead.fields.viewProposalTemplate.title',
    component: <ViewProposalTemplate />,
  },
  sendProposalTemplate: {
    title: 'lead.fields.sendProposalTemplate.title',
    component: <SendProposalTemplate />,
  },
  
}

export default SlideoverRegistry
