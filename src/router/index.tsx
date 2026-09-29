/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { useRoutes } from 'react-router-dom'
import RouteRegistry from './router-registry'
import PosLayout from '../layouts/pos-layout'
import Pos from '../pages/pos'
import Error from '../pages/error'
import SideMenu from '../layouts/SimpleMenu'
import TopMenu from '../layouts/TopMenu'
import User from '../pages/user-management'
import Roles from '../pages/user-management-roles'
import Agent from '../pages/user-management-agent'
import FixedCommission from '../pages/user-management-fixedCommission'
import Suppliers from '../pages/contact-management/suppliers'
import Customers from '../pages/contact-management/customers'
import CustomerGroups from '../pages/contact-management/customerGroups'
import ImportContacts from '../pages/contact-management/importContacts'
import CustomerLogins from '../pages/contact-management/customerLogins'
import ListProducts from '../pages/product-management/listProducts'
import AddProducts from '../pages/product-management/addProducts'
import PrintLabels from '../pages/product-management/printLabels'
import ImportProducts from '../pages/product-management/importProducts'
import Variations from '../pages/product-management/variations'
import Categories from '../pages/product-management/categories'
import OpeningStock from '../pages/product-management/importOpeningStock'
import Brands from '../pages/product-management/brands'
import Warranty from '../pages/product-management/warranty'
import SellingPriceGroup from '../pages/product-management/sellingPriceGroup'
import Recipe from '../pages/manufacturing/recipe'
import AddIngrediants from '../pages/manufacturing/recipe/addIngrediants'
import Production from '../pages/manufacturing/production'
import AddProduction from '../pages/manufacturing/production/addProduction'
import Settings from '../pages/manufacturing/settings'
import ManufacturingReport from '../pages/manufacturing/manufacturingReport'
import Units from '../pages/product-management/units'
import JobSheet from '../pages/repair/jobSheet'
import AddJobSheet from '../pages/repair/addJobSheet'
import BrandsRepair from '../pages/repair/brands'
import ListInvoice from '../pages/repair/listInvoice'
import SettingsRepair from '../pages/repair/settings'
import RepairDashbaord from '../pages/repair/dashbaord'
import ListPurchases from '../pages/purchases/listPurchases'
import ListPurchasesReturn from '../pages/purchases/listPurchasereturn'
import ReturnSettlement from '../pages/purchases/returnSettlement'
import ImportPurchase from '../pages/purchases/importPurchase'
import AllSales from '../pages/sales/allSales'
import AddQuotation from '../pages/sales/addQuotation'
import ListPos from '../pages/sales/listPos'
import ListDrafts from '../pages/sales/listDrafts'
import ListQuotation from '../pages/sales/listQuotation'
import SellReturn from '../pages/sales/saleReturn'
import SaleReturnSettlement from '../pages/sales/saleReturnSettlement'
import Shipment from '../pages/sales/shipment'
import Subscriptions from '../pages/sales/subscriptions'
import Discounts from '../pages/sales/discounts'
import ImportSales from '../pages/sales/importSales'
import ImportDiscount from '../pages/sales/importDiscount'
import SaleTypes from '../pages/sales/saleTypes'
import MultiSaleTypes from '../pages/sales/multiSaleTypes'
import B2BConnection from '../pages/sales/b2bConnection'
import MinimumSale from '../pages/sales/minimumSalePrice'
import ListStockTransfer from '../pages/stock-transfer/listStockTransfer'
import AddStockTransfer from '../pages/stock-transfer/addStockTransfer'
import ListStockAdjustment from '../pages/stock-adjustment/listStockAdjustment'
import AddStockAdjustment from '../pages/stock-adjustment/addStockAdjustment'
import BulkStockAdjustment from '../pages/stock-adjustment/bulkStockAdjustment'
import StockCountReport from '../pages/stock-adjustment/stockCountReport'
import ListExpenses from '../pages/expenses/listExpenses'
import ExpenseVoucher from '../pages/expenses/expenseVoucher'
import AddExpense from '../pages/expenses/addExpenses'
import EditExpense from '../pages/expenses/editExpenses'
import ExpenseCategories from '../pages/expenses/expenseCategories'
import ListPaymentAccounts from '../pages/payment-accounts/listAccounts'
import AccountBook from '../pages/payment-accounts/accountBook'
import PaymentAccountReport from '../pages/payment-accounts/paymentAccountReport'
import CashFlow from '../pages/payment-accounts/cashFlow'
import BalanceSheet from '../pages/payment-accounts/balanceSheet'
import ProfitLossReport from '../pages/reports/profitLossReport'
import TaxReport from '../pages/reports/taxReport'
import ExpenseReport from '../pages/reports/expenseReport'
import RegisterReport from '../pages/reports/registerReport'
import PurchasePaymentReport from '../pages/reports/purchasePayment'
import ProductSellReport from '../pages/reports/productSellReport'
import DailySaleReport from '../pages/reports/dailySale'
import ProductPurchaseReport from '../pages/reports/productPurchase'
import LocationWiseProductSell from '../pages/reports/locationWiseProductSell'
import SellPayment from '../pages/reports/sellPayment'
import ChequeReport from '../pages/reports/chequeReport'
import PurchaseNSale from '../pages/reports/purchaseNSale'
import InvoicePrintCount from '../pages/reports/invoicePrintCount'
import TrendingProducts from '../pages/reports/trendingProducts'
import ItemsReport from '../pages/reports/itemsReport'
import StockExpiry from '../pages/reports/stockExpiry'
import StockReport from '../pages/reports/stockReport'
import StockAdjustment from '../pages/reports/stockAdjustment'
import StockMovement from '../pages/reports/stockMovement'
import LotReport from '../pages/reports/lotReport'
import LocationWiseStock from '../pages/reports/locationWiseStock'
import SupplierWiseStock from '../pages/reports/supplierWiseStock'
import Bartender from '../pages/reports/bartender'
import DateWiseStock from '../pages/reports/dateWiseStock'
import CustomerNSupplier from '../pages/reports/customernSupplier'
import CustomerGroup from '../pages/reports/customerGroup'
import SalesRepresentative from '../pages/reports/salesRepresentative'
import AgingReport from '../pages/reports/agingReport'
import UserList from '../pages/reports/userList'
import TransExCod from '../pages/reports/transExCod'
import KoombiyoCod from '../pages/reports/koombiyoCod'
import Kitchen from '../pages/reports/kitchenReport'
import TableReport from '../pages/reports/tableReport'
import AdministerBackup from '../pages/administerBackup'
import ViewContact from '../pages/view-contact'
import Modules from '../pages/manageModules'
import CustomerNotify from '../pages/notificationTemplates/customerNotifications'
import BusinessSettings from '../pages/settings/businessSettings'
import BusinessLocation from '../pages/settings/businessLocation'
import LayoutSettings from '../pages/settings/layoutSettings'
import AddLayout from '../pages/settings/layoutSettings/addNewInvoiceLayout'
import EditLayout from '../pages/settings/layoutSettings/editInvoiceLayout'
import AddSuspendLayout from '../pages/settings/layoutSettings/addSuspendLayout'
import EditSuspendLayout from '../pages/settings/layoutSettings/editSuspendLayout'
import LabelSettings from '../pages/settings/labelSettings'
import LabelSettingsBeta from '../pages/settings/labelSettingsBeta'
import Printer from '../pages/settings/printer'
import TaxRates from '../pages/settings/taxRates'
import PaymentFee from '../pages/settings/paymentFee'
import Subscription from '../pages/settings/subscription'
import LeadDashboard from '../pages/leadManager/dashboard'
import Lead from '../pages/leadManager/leads'
import ViewLead from '../pages/viewLead'
import FollowUps from '../pages/leadManager/followUps'
import Campaigns from '../pages/leadManager/campaigns'
import ContactLogins from '../pages/leadManager/contactsLogin'
import Sources from '../pages/leadManager/sources'
import LifeStage from '../pages/leadManager/lifeStage'
import LeadReports from '../pages/leadManager/reports'
import ProposalTemplate from '../pages/leadManager/proposalTemplate'
import Proposals from '../pages/leadManager/proposals'
import LeadSettings from '../pages/leadManager/settings'
import AssetsDashboard from '../pages/assetsManager/dashboard'
import Assets from '../pages/assetsManager/assets'
import AssetAllocated from '../pages/assetsManager/assetAllocated'
import AssetRevoked from '../pages/assetsManager/assetRevoked'
import AssetMaintenance from '../pages/assetsManager/assetmaintain'
import AssetCategory from '../pages/assetsManager/assetCategory'
import WooCommerce from '../pages/woo-commerce/wooCommerce'
import SyncLog from '../pages/woo-commerce/syncLog'
import APISettings from '../pages/woo-commerce/apiSettings'
import Shopify from '../pages/shopify/shopify'
import ShopifySyncLog from '../pages/shopify/syncLog'
import ShopifyAPISettings from '../pages/shopify/apiSettings'
import Cod from '../pages/cod/cod'
import CodSyncLog from '../pages/cod/syncLog'
import CodAPISettings from '../pages/cod/apiSettings'
import PromoCards from '../pages/promoCard/promoCards'
import PromoCard from '../pages/promoCard/card'
import SetPromoCard from '../pages/promoCard/setPromoCard'
import CommissionReport from '../pages/promoCard/commissionReport'
import AddGiftCard from '../pages/giftCard/addGiftCard'
import GiftCard from '../pages/giftCard/giftCard'
import MappingPurchase from '../pages/internalIntegration/mappingPurchase'
import B2BInternal from '../pages/internalIntegration/b2b'
import Login from '../pages/login'
import Dashboard from '../pages/dashboard'
import ChatAI from '../pages/chatAI'
import UpdateProfile from '../pages/update-profile'
import Tabulator from '../pages/tabulator'
import Drag from '../pages/drag/drag'
import Table from '../pages/table'
import PrivateRoute from './PrivateRoute'
import TpManagemtComponent from '../pages/tp-management/tp-management'
import FeedbackManagementPage from '../pages/feedback-management'
import TipManagementPage from '../pages/tip-management'
import {
  CommonComponent,
  DatepickerComponent,
  SelectComponent,
  ValidateComponent,
  WysiwygEditor,
  FormComponent,
  ButtonCom,
  ImageUploadComponent,
  ProgressComponent,
} from '../pages/forms'
import SpManagementComponent from '../pages/sp-management/sp-management'
import GatewaySettingtPage from '../pages/gateway-setting/gateway-setting'
import TipSetting from '../pages/tip-setting/tip-setting'
import AdminUserManagePage from '../pages/admin-management/admin-users'
import AdminUserRolesManagePage from '../pages/admin-management/admin-user-roles'
import FooterManagement from '../pages/footer-management'
import NewsLettersManagement from '../pages/news-letters-management'
import FAQManagement from '../pages/faq-management'
import FAQCategoryManagement from '../pages/faq-category-management'
import ReportPage from '../pages/report/report'
import Annoucements from '../pages/annoucements'
import Notifications from '../pages/notifications'
import ContactUsManagement from '../pages/contact-us-management'
import AddTripPage from '../pages/share-a-ride/add-trip'

function Router() {
  const { error, pos } = RouteRegistry

  const routes = [
    {
      path: '/',
      element: (
        <PrivateRoute>
          <SideMenu />
        </PrivateRoute>
      ),
      children: [
        {
          path: '/',
          element: <Dashboard />,
        },
        {
          path: 'form',
          element: <FormComponent />,
        },
        {
          path: 'manage-users',
          element: <AdminUserManagePage />,
        },
        {
          path: 'manage-user-roles',
          element: <AdminUserRolesManagePage />,
        },
        {
          path: 'manage-tippers',
          element: <TpManagemtComponent />,
        },
        {
          path: 'manage-service-providers',
          element: <SpManagementComponent />,
        },
        {
          path: 'manage-reviews',
          element: <FeedbackManagementPage />,
        },
        {
          path: 'manage-finances',
          element: <TipManagementPage />,
        },
        {
          path: 'footer-management',
          element: <FooterManagement />,
        },
        {
          path: 'newsletter-management',
          element: <NewsLettersManagement />,
        },
        {
          path: 'annoucements',
          element: <Annoucements />,
        },
        {
          path: 'notifications',
          element: <Notifications />,
        },
        {
          path: 'contact-us-management',
          element: <ContactUsManagement />,
        },
        {
          path: 'share-a-ride/add-trip',
          element: <AddTripPage />,
        },
        {
          path: 'contact-management/suppliers',
          element: <Suppliers />,
        },
        {
          path: 'user-management-user',
          element: <User />,
        },
        {
          path: 'reports',
          element: <ReportPage />,
        },
        {
          path: 'user-management-roles',
          element: <Roles />,
        },
        {
          path: 'user-management-agent',
          element: <Agent />,
        },
        {
          path: 'user-management-fixedCommission',
          element: <FixedCommission />,
        },
        {
          path: 'gateway-setting',
          element: <GatewaySettingtPage />,
        },
        {
          path: 'tip-setting',
          element: <TipSetting />,
        },
        {
          path: 'manage-faqs',
          element: <FAQManagement />,
        },
        {
          path: '/manage-faq-categories',
          element: <FAQCategoryManagement />,
        },
        {
          path: 'contact-management/suppliers',
          element: <Suppliers />,
        },
        {
          path: 'contact-management/customers',
          element: <Customers />,
        },
        {
          path: 'contact-management/customerGroups',
          element: <CustomerGroups />,
        },
        {
          path: 'contact-management/importContacts',
          element: <ImportContacts />,
        },
        {
          path: 'contact-management/customerLogins',
          element: <CustomerLogins />,
        },
        {
          path: 'product-management/listProducts',
          element: <ListProducts />,
        },
        {
          path: 'product-management/addProducts',
          element: <AddProducts />,
        },
        {
          path: 'product-management/printLabels',
          element: <PrintLabels />,
        },
        {
          path: 'product-management/importProducts',
          element: <ImportProducts />,
        },
        {
          path: 'product-management/variations',
          element: <Variations />,
        },
        {
          path: 'product-management/units',
          element: <Units />,
        },
        {
          path: 'product-management/categories',
          element: <Categories />,
        },
        {
          path: 'product-management/openingStock',
          element: <OpeningStock />,
        },
        {
          path: 'product-management/sellingPriceGroup',
          element: <SellingPriceGroup />,
        },
        {
          path: 'product-management/brands',
          element: <Brands />,
        },
        {
          path: 'product-management/warranty',
          element: <Warranty />,
        },
        {
          path: '/tabulator',
          element: <Tabulator />,
        },
        {
          path: '/table',
          element: <Table />,
        },
        {
          path: 'manufacturing/recipe',
          element: <Recipe />,
        },
        {
          path: 'manufacturing/recipe/addIngrediants',
          element: <AddIngrediants />,
        },
        {
          path: 'manufacturing/production',
          element: <Production />,
        },
        {
          path: 'manufacturing/production/addProduction',
          element: <AddProduction />,
        },
        {
          path: 'manufacturing/settings',
          element: <Settings />,
        },
        {
          path: 'manufacturing/manufacturingReport',
          element: <ManufacturingReport />,
        },
        {
          path: 'repair/jobSheet',
          element: <JobSheet />,
        },
        {
          path: 'repair/addJobSheet',
          element: <AddJobSheet />,
        },
        {
          path: 'repair/brands',
          element: <BrandsRepair />,
        },
        {
          path: 'repair/listInvoice',
          element: <ListInvoice />,
        },
        {
          path: 'repair/settings',
          element: <SettingsRepair />,
        },
        {
          path: 'repair/dashboard',
          element: <RepairDashbaord />,
        },
        {
          path: 'purchases/listPurchases',
          element: <ListPurchases />,
        },
        {
          path: 'purchases/listPurchasereturn',
          element: <ListPurchasesReturn />,
        },
        {
          path: 'purchases/returnSettlement',
          element: <ReturnSettlement />,
        },
        {
          path: 'purchases/importPurchase',
          element: <ImportPurchase />,
        },
        {
          path: 'sales/allSales',
          element: <AllSales />,
        },
        {
          path: 'sales/addQuotation',
          element: <AddQuotation />,
        },
        {
          path: 'sales/listPos',
          element: <ListPos />,
        },
        {
          path: 'sales/listDrafts',
          element: <ListDrafts />,
        },
        {
          path: 'sales/listQuotation',
          element: <ListQuotation />,
        },
        {
          path: 'sales/sellReturn',
          element: <SellReturn />,
        },
        {
          path: 'sales/saleReturnSettlement',
          element: <SaleReturnSettlement />,
        },
        {
          path: 'sales/shipment',
          element: <Shipment />,
        },
        {
          path: 'sales/discounts',
          element: <Discounts />,
        },
        {
          path: 'sales/subscriptions',
          element: <Subscriptions />,
        },
        {
          path: 'sales/importSales',
          element: <ImportSales />,
        },
        {
          path: 'sales/importDiscount',
          element: <ImportDiscount />,
        },
        {
          path: 'sales/saleTypes',
          element: <SaleTypes />,
        },
        {
          path: 'sales/multiSaleTypes',
          element: <MultiSaleTypes />,
        },
        {
          path: 'sales/b2bConnection',
          element: <B2BConnection />,
        },
        {
          path: 'sales/minimumSalePrice',
          element: <MinimumSale />,
        },
        {
          path: 'stock-transfer/listStockTransfer',
          element: <ListStockTransfer />,
        },
        {
          path: 'stock-transfer/addStockTransfer',
          element: <AddStockTransfer />,
        },
        {
          path: 'stock-adjustment/listStockAdjustment',
          element: <ListStockAdjustment />,
        },
        {
          path: 'stock-adjustment/addStockAdjustment',
          element: <AddStockAdjustment />,
        },
        {
          path: 'stock-adjustment/bulkStockAdjustment',
          element: <BulkStockAdjustment />,
        },
        {
          path: 'stock-adjustment/stockCountReport',
          element: <StockCountReport />,
        },
        {
          path: 'expenses/listExpenses',
          element: <ListExpenses />,
        },
        {
          path: 'expenses/expenseVoucher',
          element: <ExpenseVoucher />,
        },
        {
          path: 'expenses/addExpenses',
          element: <AddExpense />,
        },
        {
          path: 'expenses/editExpenses',
          element: <EditExpense />,
        },
        {
          path: 'expenses/expenseCategories',
          element: <ExpenseCategories />,
        },
        {
          path: 'payment-accounts/listAccounts',
          element: <ListPaymentAccounts />,
        },
        {
          path: 'payment-accounts/accountBook',
          element: <AccountBook />,
        },
        {
          path: 'payment-accounts/paymentAccountReport',
          element: <PaymentAccountReport />,
        },
        {
          path: 'payment-accounts/cashFlow',
          element: <CashFlow />,
        },
        {
          path: 'payment-accounts/balanceSheet',
          element: <BalanceSheet />,
        },
        {
          path: 'reports/profitLossReport',
          element: <ProfitLossReport />,
        },
        {
          path: 'reports/taxReport',
          element: <TaxReport />,
        },
        {
          path: 'reports/expenseReport',
          element: <ExpenseReport />,
        },
        {
          path: 'reports/registerReport',
          element: <RegisterReport />,
        },
        {
          path: 'reports/purchasePayment',
          element: <PurchasePaymentReport />,
        },
        {
          path: 'reports/productSellReport',
          element: <ProductSellReport />,
        },
        {
          path: 'reports/dailySale',
          element: <DailySaleReport />,
        },
        {
          path: 'reports/productPurchase',
          element: <ProductPurchaseReport />,
        },
        {
          path: 'reports/locationWiseProductSell',
          element: <LocationWiseProductSell />,
        },
        {
          path: 'reports/sellPayment',
          element: <SellPayment />,
        },
        {
          path: 'reports/chequeReport',
          element: <ChequeReport />,
        },
        {
          path: 'reports/purchaseNSale',
          element: <PurchaseNSale />,
        },
        {
          path: 'reports/invoicePrintCount',
          element: <InvoicePrintCount />,
        },
        {
          path: 'reports/trendingProducts',
          element: <TrendingProducts />,
        },
        {
          path: 'reports/itemsReport',
          element: <ItemsReport />,
        },
        {
          path: 'reports/stockExpiry',
          element: <StockExpiry />,
        },
        {
          path: 'reports/stockReport',
          element: <StockReport />,
        },
        {
          path: 'reports/stockAdjustment',
          element: <StockAdjustment />,
        },
        {
          path: 'reports/stockMovement',
          element: <StockMovement />,
        },
        {
          path: 'reports/lotReport',
          element: <LotReport />,
        },
        {
          path: 'reports/locationWiseStock',
          element: <LocationWiseStock />,
        },
        {
          path: 'reports/supplierWiseStock',
          element: <SupplierWiseStock />,
        },
        {
          path: 'reports/bartender',
          element: <Bartender />,
        },
        {
          path: 'reports/dateWiseStock',
          element: <DateWiseStock />,
        },
        {
          path: 'reports/customernSupplier',
          element: <CustomerNSupplier />,
        },
        {
          path: '/view-contact',
          element: <ViewContact />,
        },
        {
          path: 'reports/customerGroup',
          element: <CustomerGroup />,
        },
        {
          path: 'reports/salesRepresentative',
          element: <SalesRepresentative />,
        },
        {
          path: 'reports/agingReport',
          element: <AgingReport />,
        },
        {
          path: 'reports/userList',
          element: <UserList />,
        },
        {
          path: 'reports/transExCod',
          element: <TransExCod />,
        },
        {
          path: 'reports/koombiyoCod',
          element: <KoombiyoCod />,
        },
        {
          path: 'reports/kitchenReport',
          element: <Kitchen />,
        },
        {
          path: 'reports/tableReport',
          element: <TableReport />,
        },
        {
          path: 'administerBackup',
          element: <AdministerBackup />,
        },
        {
          path: 'manageModules',
          element: <Modules />,
        },
        {
          path: 'notificationTemplates/customerNotifications',
          element: <CustomerNotify />,
        },
        {
          path: 'settings/businessSettings',
          element: <BusinessSettings />,
        },
        {
          path: 'settings/businessLocation',
          element: <BusinessLocation />,
        },
        {
          path: 'settings/layoutSettings',
          element: <LayoutSettings />,
        },
        {
          path: 'settings/layoutSettings/addNewInvoiceLayout',
          element: <AddLayout />,
        },
        {
          path: 'settings/layoutSettings/editInvoiceLayout',
          element: <EditLayout />,
        },
        {
          path: 'settings/layoutSettings/addSuspendLayout',
          element: <AddSuspendLayout />,
        },
        {
          path: 'settings/layoutSettings/editSuspendLayout',
          element: <EditSuspendLayout />,
        },
        {
          path: 'settings/labelSettings',
          element: <LabelSettings />,
        },
        {
          path: 'settings/labelSettingsBeta',
          element: <LabelSettingsBeta />,
        },
        {
          path: 'settings/printer',
          element: <Printer />,
        },
        {
          path: 'settings/taxRates',
          element: <TaxRates />,
        },
        {
          path: 'settings/paymentFee',
          element: <PaymentFee />,
        },
        {
          path: 'settings/subscription',
          element: <Subscription />,
        },
        {
          path: 'leadManager/dashboard',
          element: <LeadDashboard />,
        },
        {
          path: 'leadManager/leads',
          element: <Lead />,
        },
        {
          path: 'viewLead',
          element: <ViewLead />,
        },
        {
          path: 'leadManager/followUps',
          element: <FollowUps />,
        },
        {
          path: 'leadManager/campaigns',
          element: <Campaigns />,
        },
        {
          path: 'leadManager/contactLogins',
          element: <ContactLogins />,
        },
        {
          path: 'leadManager/sources',
          element: <Sources />,
        },
        {
          path: 'leadManager/lifeStage',
          element: <LifeStage />,
        },
        {
          path: 'leadManager/reports',
          element: <LeadReports />,
        },
        {
          path: 'leadManager/proposalTemplate',
          element: <ProposalTemplate />,
        },
        {
          path: 'leadManager/proposals',
          element: <Proposals />,
        },
        {
          path: 'leadManager/settings',
          element: <LeadSettings />,
        },
        {
          path: 'assetsManager/dashboard',
          element: <AssetsDashboard />,
        },
        {
          path: 'assetsManager/assets',
          element: <Assets />,
        },
        {
          path: 'assetsManager/assetAllocated',
          element: <AssetAllocated />,
        },
        {
          path: 'assetsManager/assetRevoked',
          element: <AssetRevoked />,
        },
        {
          path: 'assetsManager/assetmaintain',
          element: <AssetMaintenance />,
        },
        {
          path: 'assetsManager/assetCategory',
          element: <AssetCategory />,
        },
        {
          path: 'woo-commerce/wooCommerce',
          element: <WooCommerce />,
        },
        {
          path: 'woo-commerce/syncLog',
          element: <SyncLog />,
        },
        {
          path: 'woo-commerce/apiSettings',
          element: <APISettings />,
        },
        {
          path: 'shopify/shopify',
          element: <Shopify />,
        },
        {
          path: 'shopify/syncLog',
          element: <ShopifySyncLog />,
        },
        {
          path: 'shopify/apiSettings',
          element: <ShopifyAPISettings />,
        },
        {
          path: 'cod/cod',
          element: <Cod />,
        },
        {
          path: 'cod/syncLog',
          element: <CodSyncLog />,
        },
        {
          path: 'cod/apiSettings',
          element: <CodAPISettings />,
        },
        {
          path: 'promoCard/promoCard',
          element: <PromoCards />,
        },
        {
          path: 'promoCard/card',
          element: <PromoCard />,
        },
        {
          path: 'promoCard/setPromoCard',
          element: <SetPromoCard />,
        },
        {
          path: 'promoCard/commissionReport',
          element: <CommissionReport />,
        },
        {
          path: 'giftCard/addGiftCard',
          element: <AddGiftCard />,
        },
        {
          path: 'giftCard/giftCard',
          element: <GiftCard />,
        },
        {
          path: 'internalIntegration/mappingPurchase',
          element: <MappingPurchase />,
        },
        {
          path: 'internalIntegration/b2b',
          element: <B2BInternal />,
        },
        {
          path: 'dashboard',
          element: <Dashboard />,
        },
        {
          path: 'chatAI',
          element: <ChatAI />,
        },
        {
          path: 'update-profile',
          element: <UpdateProfile />,
        },
        {
          path: 'drag',
          element: <Drag />,
        },
      ],
    },
    {
      path: '/pos',
      element: <PosLayout />,
      children: [
        {
          path: '',
          element: <Pos />,
        },
      ],
    },
    {
      path: '/user-management-user',
      element: <User />,
    },
    {
      path: '/user-management-roles',
      element: <Roles />,
    },
    {
      path: '/user-management-agent',
      element: <Agent />,
    },
    {
      path: '/user-management-fixedCommission',
      element: <FixedCommission />,
    },
    {
      path: '/contact-management/suppliers',
      element: <Suppliers />,
    },
    {
      path: '/form',
      element: <FormComponent />,
    },
    {
      path: '/form/common',
      element: <CommonComponent />,
    },
    {
      path: '/form/validation',
      element: <ValidateComponent />,
    },
    {
      path: '/form/datepicker',
      element: <DatepickerComponent />,
    },
    {
      path: '/form/select',
      element: <SelectComponent />,
    },
    {
      path: '/form/editor',
      element: <WysiwygEditor />,
    },
    {
      path: '/form/button',
      element: <ButtonCom />,
    },
    {
      path: '/form/imageupload',
      element: <ImageUploadComponent />,
    },
    {
      path: '/progress',
      element: <ProgressComponent />,
    },
    {
      path: '/login',
      element: <Login />,
    },
    /* END */
    {
      path: error.path,
      element: <Error />,
    },
    {
      path: '*',
      element: <Error />,
    },
  ]

  return useRoutes(routes)
}

export default Router
