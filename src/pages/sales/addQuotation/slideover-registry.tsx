/* eslint-disable import/no-cycle */
/* eslint-disable prettier/prettier */
import {
AddProducts,
} from '../../../components/product-management'

/* Note: Product title load from "i18next" language file located at "/public/locales"  */
const SlideoverRegistry = {
  addProducts: {
    title: 'productManagement.fields.addProducts.title',
    component: <AddProducts />,
  }
}

export default SlideoverRegistry
