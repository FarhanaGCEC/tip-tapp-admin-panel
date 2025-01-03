/* eslint-disable import/no-cycle */
/* eslint-disable prettier/prettier */
import {
AddNew,
EditNew,

} from '../../../components/labelSettings'

/* Note: Product title load from "i18next" language file located at "/public/locales"  */
const SlideoverRegistry = {
  addNew: {
    title: 'settings.fields.addLabelStickerSetting.title',
    component: <AddNew />,
  },
  editNew: {
    title: 'settings.fields.editLabelStickerSetting.title',
    component: <EditNew />,
  },

  
}

export default SlideoverRegistry
