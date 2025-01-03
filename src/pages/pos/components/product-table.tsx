import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Lucide from '../../../components/common/lucide'
import Tippy from '../../../components/common/tippy'
import Table from '../../../components/common/table'
import {
  InputElement,
  SelectElement,
} from '../../../components/common/form-elements'
import PreviewImage from '../../../assets/images/fakers/preview-1.jpg'
import { IProductListRes } from '../../../interfaces/pos.interface'
import { Icons } from '../../../constants'
import Button from '../../../components/common/button'

interface InvoiceItemProps {
  invoiceItems: IProductListRes[]
  onClick: (id: number) => void
}

function ProductTable({ invoiceItems, onClick }: InvoiceItemProps) {
  const {
    register,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  })
  const [qty, setQty] = useState<number>(1)

  /* TODO: Logic implementation */
  const handleQty = (type: string, qtyAvailable: number) => {
    if (type === 'plus' && qty < qtyAvailable) {
      setQty((prevQty) => prevQty + 1)
    } else if (type === 'minus' && qty > 1) {
      setQty((prevQty) => prevQty - 1)
    }
  }

  return (
    <div className="intro-y scrollbar-hidden mt-8 h-[calc(100vh-350px)] overflow-auto overflow-y-scroll sm:mt-0">
      <Table className="border-separate border-spacing-y-[10px] sm:mt-2">
        <Table.Thead variant="default">
          <Table.Tr>
            <Table.Th className="whitespace-nowrap border-b-0">
              PRODUCT
            </Table.Th>
            <Table.Th className="whitespace-nowrap border-b-0">
              QUANTITY
            </Table.Th>
            <Table.Th className="whitespace-nowrap border-b-0 text-center">
              PRICE INC.TAX
            </Table.Th>
            <Table.Th className="whitespace-nowrap border-b-0 text-center">
              SUBTOTAL
            </Table.Th>
            <Table.Th className="whitespace-nowrap border-b-0 text-center">
              <Lucide icon={Icons.CLOSE} className="h-4 w-4 text-danger" />
            </Table.Th>
            <Table.Th className="whitespace-nowrap border-b-0 text-center">
              KOT
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {invoiceItems.length > 0 ? (
            invoiceItems.map(
              ({
                id,
                name,
                product_image,
                product_id,
                selling_price,
                qty_available,
                kot,
              }: IProductListRes) => (
                <Table.Tr key={id} className="intro-x">
                  <Table.Td className="w-40 border-b-0 bg-white p-2 shadow-[20px_3px_20px_#0000000b] first:rounded-l-md last:rounded-r-md dark:bg-darkmode-600">
                    <div className="flex">
                      <div className="image-fit zoom-in h-10 w-10">
                        <Tippy
                          as="img"
                          alt="Midone Tailwind HTML Admin Template"
                          className="rounded-full shadow-[0px_0px_0px_2px_#fff,_1px_1px_5px_rgba(0,0,0,0.32)] dark:shadow-[0px_0px_0px_2px_#3f4865,_1px_1px_5px_rgba(0,0,0,0.32)]"
                          src={product_image || PreviewImage}
                          content=""
                        />
                      </div>
                      <div className="ml-3 flex flex-col items-center">
                        <div className="w-full whitespace-nowrap font-medium">
                          {name}
                        </div>
                        <div className="mt-0.5 w-full whitespace-nowrap text-xs text-slate-500">
                          {product_id}
                        </div>
                      </div>
                    </div>
                  </Table.Td>
                  <Table.Td className="border-b-0 bg-white p-2 shadow-[20px_3px_20px_#0000000b] first:rounded-l-md last:rounded-r-md dark:bg-darkmode-600">
                    <div className="flex items-center">
                      <SelectElement register={register} name="exp" id="exp" />
                      <div className="flex items-center px-2">
                        <Button
                          variant="primary"
                          className="rounded-full p-1"
                          onClick={() => handleQty('minus', qty_available)}
                        >
                          <Lucide
                            icon={Icons.MINUS}
                            className="h-3 w-3 rounded-full text-white"
                          />
                        </Button>
                        <div className="px-2 font-medium">{qty}</div>
                        <Button
                          variant="primary"
                          className="rounded-full p-1"
                          onClick={() => handleQty('plus', qty_available)}
                        >
                          <Lucide
                            icon={Icons.PLUS}
                            className="h-3 w-3 rounded-full text-white"
                          />
                        </Button>
                      </div>
                      <SelectElement register={register} name="pcs" id="pcs" />
                    </div>
                  </Table.Td>
                  <Table.Td className="w-40 border-b-0 bg-white p-2 text-center shadow-[20px_3px_20px_#0000000b] first:rounded-l-md last:rounded-r-md dark:bg-darkmode-600">
                    <InputElement
                      register={register}
                      name="unit_price"
                      id="unit_price"
                      error={errors.unit_price}
                      type="number"
                      value={selling_price}
                    />
                  </Table.Td>
                  <Table.Td className="w-40 border-b-0 bg-white p-2 shadow-[20px_3px_20px_#0000000b] first:rounded-l-md last:rounded-r-md dark:bg-darkmode-600">
                    <InputElement
                      register={register}
                      name="line_price"
                      id="line_price"
                      error={errors.line_price}
                      type="number"
                      value={selling_price * qty}
                    />
                  </Table.Td>
                  <Table.Td className="relative border-b-0 bg-white py-0 pl-2 shadow-[20px_3px_20px_#0000000b] before:absolute before:inset-y-0 before:left-0 before:my-auto before:block before:h-8 before:bg-slate-200 first:rounded-l-md last:rounded-r-md dark:bg-darkmode-600 before:dark:bg-darkmode-400">
                    <div className="flex items-center justify-center">
                      <Button
                        onClick={() => onClick(id)}
                        className="flex items-center border-0 shadow-none"
                      >
                        <Lucide
                          icon={Icons.CLOSE}
                          className="h-4 w-4 text-danger"
                        />
                      </Button>
                    </div>
                  </Table.Td>
                  <Table.Td className="w-40 border-b-0 bg-white p-2 shadow-[20px_3px_20px_#0000000b] first:rounded-l-md last:rounded-r-md dark:bg-darkmode-600">
                    <InputElement
                      register={register}
                      name="kot"
                      id="kot"
                      error={errors.kot}
                      type="number"
                      value={kot}
                    />
                  </Table.Td>
                </Table.Tr>
              )
            )
          ) : (
            <Table.Tr className="intro-x">
              <Table.Td
                colSpan={6}
                className="w-full border-b-0 bg-white p-2 shadow-[20px_3px_20px_#0000000b] first:rounded-l-md last:rounded-r-md dark:bg-darkmode-600"
              >
                {/* <div className="text-center">Please Select Product Item</div> */}
              </Table.Td>
            </Table.Tr>
          )}
        </Table.Tbody>
      </Table>
    </div>
  )
}

export default ProductTable
