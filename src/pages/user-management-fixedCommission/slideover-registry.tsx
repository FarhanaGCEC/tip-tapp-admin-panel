/* eslint-disable import/no-cycle */
/* eslint-disable prettier/prettier */
import {
AddCommision,
EditCommision,

} from '../../components/user-management'

/* Note: Product title load from "i18next" language file located at "/public/locales"  */
const SlideoverRegistry = {
  addUserManagementCommision: {
    title: 'fixedCommission.fields.addCommisionType.title',
    component: <AddCommision />,
  },
  editUserManagementCommision: {
    title: 'fixedCommission.fields.editCommisionType.title',
    component: <EditCommision />,
  },
  
}

export default SlideoverRegistry
