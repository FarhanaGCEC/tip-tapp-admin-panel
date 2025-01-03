/* eslint-disable import/no-cycle */
/* eslint-disable prettier/prettier */
import {
  AddPurchaseReturn,
} from '../../../components/purchases'

/* Note: Product title load from "i18next" language file located at "/public/locales"  */
const SlideoverRegistry = {
  addPurchaseReturn: {
    title: 'purchases.fields.addPurchaseReturn.title',
    component: <AddPurchaseReturn />,
  },
  
}

export default SlideoverRegistry
