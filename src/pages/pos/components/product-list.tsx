/* TODO: Replace with Placeholder image */
import React from 'react'
import PreviewImage from '../../../assets/images/fakers/preview-1.jpg'
import { IProductListRes } from '../../../interfaces/pos.interface'

interface ProductListProps {
  product: IProductListRes
  onClick: React.MouseEventHandler<HTMLButtonElement>
}

function ProductList({ product, onClick }: ProductListProps) {
  const {
    id,
    name,
    product_id: productId,
    product_image: productImage,
    qty_available: qtyAvailable,
    selling_price: sellingPrice,
    short_name: shortName,
  } = product
  return (
    <button
      type="button"
      key={id}
      onClick={onClick}
      className="intro-y col-span-6 h-fit sm:col-span-2 lg:col-span-3"
    >
      <div className="box zoom-in relative rounded-md p-2">
        <div className="relative block flex-none before:block before:w-full before:pt-[60px]">
          <div className="image-fit absolute left-0 top-0 h-full max-h-[60px] w-full">
            <img
              alt={name}
              className="rounded-md"
              src={productImage || PreviewImage}
            />
          </div>
        </div>
        <div className="mt-1 block truncate text-center text-[10px] font-medium leading-4 text-primary">
          {productId}
        </div>
        <div className="block truncate text-center text-xs font-medium leading-4">
          {name}
        </div>
        <div className="flex">
          <div className="block truncate text-center text-[10px] font-medium leading-4">
            {`Rs. ${sellingPrice} | ${qtyAvailable} ${shortName}`}
          </div>
        </div>
      </div>
    </button>
  )
}

export default ProductList
