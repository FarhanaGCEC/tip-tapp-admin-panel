/* eslint-disable prettier/prettier */
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { SelectApi } from '../../../api'
import { SelectElement } from '../../../components/common/form-elements'

function ProductSearch() {
  const selectApi = SelectApi.useAPI()
  const [category, setCategory] = useState([{ id: 0, name: 'Category' }])
  const [brand] = useState([{ id: 0, name: 'Brand' }])
  const [type] = useState([{ id: 0, name: 'Type' }])

  const { register } = useForm({
    mode: 'onChange',
  })

  const sucessHandlerGetCategory = (categoryData: any) => {
    setCategory(categoryData.datatable)
  }

  const errorHandler = (error: any) => {
    setCategory([{ id: 0, name: 'Category' }])
  }

  const fetchCategories = async () => {
    const res = await selectApi.getProductCategories({
      category_type: 'product',
    })
    if (res) {
      const { data } = res
      const { data: categoryData } = data
      sucessHandlerGetCategory(categoryData)
    } else {
      errorHandler(null)
    }
  }

  useEffect(() => {
    fetchCategories()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <SelectElement
        register={register}
        options={category}
        name="category"
        id="category"
      />
      <SelectElement
        register={register}
        options={brand}
        name="brand"
        id="brand"
      />
      <SelectElement 
      register={register} 
      options={type} 
      name="type" 
      id="type" 
      />
    </>
  )
}

export default ProductSearch
