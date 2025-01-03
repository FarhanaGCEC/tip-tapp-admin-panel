/* eslint-disable import/no-cycle */
/* eslint-disable prettier/prettier */
import {
  AddAsset,
  EditAsset,
  AssetAllocate,
} from '../../../components/assets-management'

/* Note: Product title load from "i18next" language file located at "/public/locales"  */
const SlideoverRegistry = {
  addAsset: {
    title: 'assets.fields.addAsset.title',
    component: <AddAsset />,
  },
  editAsset: {
    title: 'assets.fields.editAsset.title',
    component: <EditAsset />,
  },
  assetAllocate: {
    title: 'assets.fields.assetAllocation.title',
    component: <AssetAllocate />,
  },
  
}

export default SlideoverRegistry
