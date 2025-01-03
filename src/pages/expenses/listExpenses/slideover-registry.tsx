/* eslint-disable import/no-cycle */
/* eslint-disable prettier/prettier */
import {
AddJobSheet,
AddJobSheetParts,
EditJobSheet,
UploadJobSheetDocs,
ViewJobSheet,
} from '../../../components/repair'

/* Note: Product title load from "i18next" language file located at "/public/locales"  */
const SlideoverRegistry = {
  addJobSheet: {
    title: 'repair.fields.jobsheet.fields.addJobSheet.title',
    component: <AddJobSheet />,
  },
  addJobSheetParts: {
    title: 'repair.fields.jobsheet.fields.addJobSheetParts.title',
    component: <AddJobSheetParts />,
  },
  editJobSheet: {
    title: 'repair.fields.jobsheet.fields.editJobSheet.title',
    component: <EditJobSheet />,
  },
  uploadJobSheetDocs: {
    title: 'repair.fields.jobsheet.fields.uploadJobSheet.title',
    component: <UploadJobSheetDocs />,
  },
  viewJobSheet: {
    title: 'repair.fields.jobsheet.fields.viewJobSheet.title',
    component: <ViewJobSheet />,
  }
}

export default SlideoverRegistry
