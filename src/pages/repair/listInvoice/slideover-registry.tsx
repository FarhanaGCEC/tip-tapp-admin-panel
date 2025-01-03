/* eslint-disable import/no-cycle */
/* eslint-disable prettier/prettier */
import {
AddJobSheet,
} from '../../../components/repair'

/* Note: Product title load from "i18next" language file located at "/public/locales"  */
const SlideoverRegistry = {
  addJobSheet: {
    title: 'repair.fields.jobsheet.fields.addJobSheet.title',
    component: <AddJobSheet />,
  }
}

export default SlideoverRegistry
