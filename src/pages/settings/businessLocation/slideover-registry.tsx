/* eslint-disable import/no-cycle */
/* eslint-disable prettier/prettier */
import {
AddNew,
EditNew,
Settings,

} from '../../../components/businessSettings'

/* Note: Product title load from "i18next" language file located at "/public/locales"  */
const SlideoverRegistry = {
  addNew: {
    title: 'settings.fields.addNewBusinessLocation.title',
    component: <AddNew />,
  },
 editNew: {
    title: 'settings.fields.editNewBusinessLocation.title',
    component: <EditNew />,
  },
  settings: {
    title: 'settings.fields.settingsBusinessLocation.title',
    component: <Settings />,
  },
  
}

export default SlideoverRegistry
