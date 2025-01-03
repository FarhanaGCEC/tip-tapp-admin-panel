/* eslint-disable import/no-cycle */
/* eslint-disable prettier/prettier */
import {
AddProducts,
AddorEditGroupPrice,
EditProducts,
ProductStockHistory,
} from '../../../components/product-management'

/* Note: Product title load from "i18next" language file located at "/public/locales"  */
const SlideoverRegistry = {
  addProducts: {
    title: 'productManagement.fields.addProducts.title',
    component: <AddProducts />,
  },
  editProducts: {
    title: 'productManagement.fields.editProducts.title',
    component: <EditProducts />,
  },
  productStockHistory: {
    title: 'productManagement.fields.stockHistory.title',
    component: <ProductStockHistory />,
  },
  addorEditGroupPrice: {
    title: 'productManagement.fields.addorEditGroupPrices.title',
    component: <AddorEditGroupPrice />,
  }
}

export default SlideoverRegistry
