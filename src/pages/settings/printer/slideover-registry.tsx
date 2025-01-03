/* eslint-disable import/no-cycle */
/* eslint-disable prettier/prettier */
import {
AddNew,
EditNew,
} from '../../../components/printerSettings'

/* Note: Product title load from "i18next" language file located at "/public/locales"  */
const SlideoverRegistry = {
  addNew: {
    title: 'settings.fields.addPrinter.title',
    component: <AddNew />,
  },
  editNew: {
    title: 'settings.fields.editPrinter.title',
    component: <EditNew />,
  },

  
}

export default SlideoverRegistry
