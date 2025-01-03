/* eslint-disable import/no-cycle */
/* eslint-disable prettier/prettier */
import {
  AddDiscount,
  EditDiscount,
} from '../../../components/discount'

/* Note: Product title load from "i18next" language file located at "/public/locales"  */
const SlideoverRegistry = {
  addDiscount: {
    title: 'sales.fields.discounts.fields.addDiscounts.title',
    component: <AddDiscount/>,
  },
  editDiscount: {
    title: 'sales.fields.discounts.fields.editDiscounts.title',
    component: <EditDiscount/>,
  }
}

export default SlideoverRegistry
