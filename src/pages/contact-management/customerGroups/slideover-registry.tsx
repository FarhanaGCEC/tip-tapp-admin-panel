/* eslint-disable import/no-cycle */
/* eslint-disable prettier/prettier */
import {
AddCustomerGroups,
EditCustomerGroups,
} from '../../../components/contact-management'

/* Note: Product title load from "i18next" language file located at "/public/locales"  */
const SlideoverRegistry = {
  addCustomerGroups: {
    title: 'contactManagement.fields.customerGroups.fields.addCustomerGroups.title',
    component: <AddCustomerGroups />,
  },
  editCustomerGroups: {
    title: 'contactManagement.fields.customerGroups.fields.editCustomerGroups.title',
    component: <EditCustomerGroups />,
  },
  
}

export default SlideoverRegistry
