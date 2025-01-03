/* eslint-disable import/no-cycle */
/* eslint-disable prettier/prettier */
import {
AddCustomerLogin,
EditCustomerLogin,
ViewCustomerLogin,
} from '../../../components/contact-management'

/* Note: Product title load from "i18next" language file located at "/public/locales"  */
const SlideoverRegistry = {
  addCustomerLogin: {
    title: 'contactManagement.fields.customerLogins.fields.add.title',
    component: <AddCustomerLogin />,
  },
  editCustomerLogin: {
    title: 'contactManagement.fields.customerLogins.fields.edit.title',
    component: <EditCustomerLogin />,
  },
  viewCustomerLogin: {
    title: 'contactManagement.fields.customerLogins.fields.view.title',
    component: <ViewCustomerLogin />,
  },
  
}

export default SlideoverRegistry
