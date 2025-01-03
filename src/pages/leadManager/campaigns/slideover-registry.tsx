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
  EditCampaign,

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
  addCampaign: {
    title: 'lead.fields.addCampaign.title',
    component: <AddCampaign />,
  },
  editCampaign: {
    title: 'lead.fields.editCampaign.title',
    component: <EditCampaign />,
  },
  
}

export default SlideoverRegistry
