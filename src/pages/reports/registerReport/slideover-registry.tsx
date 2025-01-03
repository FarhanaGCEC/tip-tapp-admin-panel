/* eslint-disable import/no-cycle */
/* eslint-disable prettier/prettier */
import {
RegisterDetails,
CloseRegisterDetails,
} from '../../../components/RegisterReport'

/* Note: Product title load from "i18next" language file located at "/public/locales"  */
const SlideoverRegistry = {
  registerDetails: {
    title: 'registerForm.title',
    component: <RegisterDetails />,
  },
  closeRegisterDetails: {
    title: 'reports.fields.closeRegister.title',
    component: <CloseRegisterDetails />,
  },
  
}

export default SlideoverRegistry
