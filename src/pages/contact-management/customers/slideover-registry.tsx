/* eslint-disable import/no-cycle */
/* eslint-disable prettier/prettier */
import {
AddCustomers,
AddPayCustomer,
ViewCustomer,
EditCustomer,
} from '../../../components/contact-management'

/* Note: Product title load from "i18next" language file located at "/public/locales"  */
const SlideoverRegistry = {
  addCustomers: {
    title: 'contactManagement.fields.customers.fields.addContact.title',
    component: <AddCustomers />,
  },
  editCustomer: {
    title: 'contactManagement.fields.customers.fields.editContact.title',
    component: <EditCustomer />,
  },
  addPayCustomer: {
    title: 'contactManagement.fields.customers.fields.pay.title',
    component: <AddPayCustomer />,
  },
  viewCustomer: {
    title: 'contactManagement.fields.customers.fields.viewContact.title',
    component: <ViewCustomer />,
  },
  
}

export default SlideoverRegistry
