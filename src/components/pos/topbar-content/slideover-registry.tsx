/* eslint-disable import/no-useless-path-segments */
/* eslint-disable import/no-cycle */
/* eslint-disable prettier/prettier */
import {
  Customer,
  Product,
  NonReceipt,
  Discount,
  Packaging,
  RoundOff,
  Shipping,
  PaymentFee,
  Tax,
  Payment,
  Expenses,
  RegisterDetails,
  DueSale,
  Card,
  RecentTransaction,
  SuspendSales,
  StockReport,
  SuspendButton,
} from '../../../components/pos'

/* Note: Product title load from "i18next" language file located at "/public/locales"  */
const SlideoverRegistry = {
  customer: {
    title: 'customerForm.title',
    component: <Customer />,
  },
  product: {
    title: 'productForm.title',
    component: <Product />,
  },
  nonReceipt: {
    title: 'nonreceiptForm.title',
    component: <NonReceipt />,
  },
  payment: {
    title: 'paymentButtonForm.title',
    component: <Payment />,
  },
  discount: {
    title: 'discountForm.title',
    component: <Discount />,
  },
  tax: {
    title: 'taxForm.title',
    component: <Tax />,
  },
  shipping: {
    title: 'shippingForm.title',
    component: <Shipping />,
  },
  packaging: {
    title: 'packagingForm.title',
    component: <Packaging />,
  },
  roundOff: {
    title: 'roundOffForm.title',
    component: <RoundOff />,
  },
  paymentForm: {
    title: 'editPaymentFee.title',
    component: <PaymentFee />,
  },
  expenses: {
    title: 'expensesForm.title',
    component: <Expenses />,
  },
  registerDetails: {
    title: 'registerForm.title',
    component: <RegisterDetails />,
  },
  dueSales: {
    title: 'dueSales.title',
    component: <DueSale />,
  },
  card: {
    title: 'cardButton.title',
    component: <Card />,
  },
  recentTransaction: {
    title: 'recentTransaction.title',
    component: <RecentTransaction/>,
  },
  suspendSales: {
    title: 'suspendSales.title',
    component: <SuspendSales/>,
  },
  stockReport: {
    title: 'stockReport.title',
    component: <StockReport/>,
  },
  suspendButton: {
    title: 'suspendButtonForm.title',
    component: <SuspendButton />,
  },
}

export default SlideoverRegistry
