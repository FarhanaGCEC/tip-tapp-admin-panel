/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/no-cycle */
/* eslint-disable prettier/prettier */
import {
  AddLayout,
  EditLayout,
  AddReceiptLayout,
  EditReceiptLayout,
} from '../../../components/layoutSettings'

/* Note: Product title load from "i18next" language file located at "/public/locales"  */
const SlideoverRegistry = {
  addLayout: {
    title: 'settings.fields.addNewWaybillLayout.title',
    component: <AddLayout />,
  },
  editLayout: {
    title: 'settings.fields.editNewWaybillLayout.title',
    component: <EditLayout />,
  },
  addReceiptLayout: {
    title: 'settings.fields.paymentReceiptLayout.title',
    component: <AddReceiptLayout />,
  },
  editReceiptLayout: {
    title: 'settings.fields.editPaymentReceiptLayout.title',
    component: <EditReceiptLayout />,
  },
}

export default SlideoverRegistry
