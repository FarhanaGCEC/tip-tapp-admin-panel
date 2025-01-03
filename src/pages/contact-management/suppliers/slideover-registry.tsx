/* eslint-disable import/no-cycle */
/* eslint-disable prettier/prettier */
import {
AddSuppliers,
EditSuppliers,
AddPay,
ViewSuppliers,
} from '../../../components/contact-management'

/* Note: Product title load from "i18next" language file located at "/public/locales"  */
const SlideoverRegistry = {
  addSuppliers: {
    title: 'contactManagement.fields.suppliers.fields.addSuppliers.title',
    component: <AddSuppliers />,
  },
  editSuppliers: {
    title: 'contactManagement.fields.suppliers.fields.editSuppliers.title',
    component: <EditSuppliers />,
  },
  addPay: {
    title: 'contactManagement.fields.suppliers.fields.addPay.title',
    component: <AddPay />,
  },
  viewSuppliers: {
    title: 'contactManagement.fields.suppliers.fields.viewSuppliers.title',
    component: <ViewSuppliers />,
  },
  
}

export default SlideoverRegistry
