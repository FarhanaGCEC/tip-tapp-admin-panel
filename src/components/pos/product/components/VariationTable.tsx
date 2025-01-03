/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/anchor-is-valid */
import _ from 'lodash'
import { useForm } from 'react-hook-form'
import Table from '../../../common/table'
import Lucide from '../../../common/lucide'
import { FormInput, InputGroup } from '../../../common/form-elements/components'

function VariationTable() {
  const {
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  })

  return (
    <div className="intro-y scrollbar-hidden mb-3 mt-8 overflow-auto overflow-y-scroll sm:mt-0">
      <Table className="border">
        <Table.Thead variant="default">
          <Table.Tr>
            <Table.Th className="whitespace-nowrap bg-slate-50 text-slate-500 dark:bg-darkmode-800">
              Size
            </Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50 text-slate-500 dark:bg-darkmode-800">
              <div className="flex items-center">
                Color <Lucide icon="HelpCircle" className="ml-2 h-4 w-4" />
              </div>
            </Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
              Price
            </Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
              <div className="flex items-center">
                <div className="relative -mt-0.5 mr-2 h-4 w-4 before:absolute before:h-4 before:w-4 before:rounded-full before:bg-primary/20 before:content-[''] after:absolute after:h-4 after:w-4 after:rounded-full after:border-4 after:border-white/60 after:bg-primary after:content-[''] after:dark:border-darkmode-300 lg:before:animate-ping" />
                Stock <Lucide icon="HelpCircle" className="ml-2 h-4 w-4" />
              </div>
            </Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50 !pl-2 text-slate-500 dark:bg-darkmode-800">
              Variant Code
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          <Table.Tr>
            <Table.Td rowSpan={3} className="border-r">
              Small
            </Table.Td>
            <Table.Td>Black</Table.Td>
            <Table.Td className="!px-2">
              <InputGroup>
                <InputGroup.Text>$</InputGroup.Text>
                <FormInput
                  type="text"
                  className="min-w-[6rem]"
                  placeholder="Price"
                />
              </InputGroup>
            </Table.Td>
            <Table.Td className="!px-2">
              <FormInput
                type="text"
                className="min-w-[6rem]"
                placeholder="Stock"
              />
            </Table.Td>
            <Table.Td className="!pl-2">
              <FormInput
                type="text"
                className="min-w-[6rem]"
                placeholder="Variant Code"
              />
            </Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td>White</Table.Td>
            <Table.Td className="!px-2">
              <InputGroup>
                <InputGroup.Text>$</InputGroup.Text>
                <FormInput
                  type="text"
                  className="min-w-[6rem]"
                  placeholder="Price"
                />
              </InputGroup>
            </Table.Td>
            <Table.Td className="!px-2">
              <FormInput
                type="text"
                className="min-w-[6rem]"
                placeholder="Stock"
              />
            </Table.Td>
            <Table.Td className="!pl-2">
              <FormInput
                type="text"
                className="min-w-[6rem]"
                placeholder="Variant Code"
              />
            </Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td>Gray</Table.Td>
            <Table.Td className="!px-2">
              <InputGroup>
                <InputGroup.Text>$</InputGroup.Text>
                <FormInput
                  type="text"
                  className="min-w-[6rem]"
                  placeholder="Price"
                />
              </InputGroup>
            </Table.Td>
            <Table.Td className="!px-2">
              <FormInput
                type="text"
                className="min-w-[6rem]"
                placeholder="Stock"
              />
            </Table.Td>
            <Table.Td className="!pl-2">
              <FormInput
                type="text"
                className="min-w-[6rem]"
                placeholder="Variant Code"
              />
            </Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td rowSpan={3} className="border-r">
              Medium
            </Table.Td>
            <Table.Td>Black</Table.Td>
            <Table.Td className="!px-2">
              <InputGroup>
                <InputGroup.Text>$</InputGroup.Text>
                <FormInput
                  type="text"
                  className="min-w-[6rem]"
                  placeholder="Price"
                />
              </InputGroup>
            </Table.Td>
            <Table.Td className="!px-2">
              <FormInput
                type="text"
                className="min-w-[6rem]"
                placeholder="Stock"
              />
            </Table.Td>
            <Table.Td className="!pl-2">
              <FormInput
                type="text"
                className="min-w-[6rem]"
                placeholder="Variant Code"
              />
            </Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td>White</Table.Td>
            <Table.Td className="!px-2">
              <InputGroup>
                <InputGroup.Text>$</InputGroup.Text>
                <FormInput
                  type="text"
                  className="min-w-[6rem]"
                  placeholder="Price"
                />
              </InputGroup>
            </Table.Td>
            <Table.Td className="!px-2">
              <FormInput
                type="text"
                className="min-w-[6rem]"
                placeholder="Stock"
              />
            </Table.Td>
            <Table.Td className="!pl-2">
              <FormInput
                type="text"
                className="min-w-[6rem]"
                placeholder="Variant Code"
              />
            </Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td>Gray</Table.Td>
            <Table.Td className="!px-2">
              <InputGroup>
                <InputGroup.Text>$</InputGroup.Text>
                <FormInput
                  type="text"
                  className="min-w-[6rem]"
                  placeholder="Price"
                />
              </InputGroup>
            </Table.Td>
            <Table.Td className="!px-2">
              <FormInput
                type="text"
                className="min-w-[6rem]"
                placeholder="Stock"
              />
            </Table.Td>
            <Table.Td className="!pl-2">
              <FormInput
                type="text"
                className="min-w-[6rem]"
                placeholder="Variant Code"
              />
            </Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td rowSpan={3} className="border-r">
              Large
            </Table.Td>
            <Table.Td>Black</Table.Td>
            <Table.Td className="!px-2">
              <InputGroup>
                <InputGroup.Text>$</InputGroup.Text>
                <FormInput
                  type="text"
                  className="min-w-[6rem]"
                  placeholder="Price"
                />
              </InputGroup>
            </Table.Td>
            <Table.Td className="!px-2">
              <FormInput
                type="text"
                className="min-w-[6rem]"
                placeholder="Stock"
              />
            </Table.Td>
            <Table.Td className="!pl-2">
              <FormInput
                type="text"
                className="min-w-[6rem]"
                placeholder="Variant Code"
              />
            </Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td>White</Table.Td>
            <Table.Td className="!px-2">
              <InputGroup>
                <InputGroup.Text>$</InputGroup.Text>
                <FormInput
                  type="text"
                  className="min-w-[6rem]"
                  placeholder="Price"
                />
              </InputGroup>
            </Table.Td>
            <Table.Td className="!px-2">
              <FormInput
                type="text"
                className="min-w-[6rem]"
                placeholder="Stock"
              />
            </Table.Td>
            <Table.Td className="!pl-2">
              <FormInput
                type="text"
                className="min-w-[6rem]"
                placeholder="Variant Code"
              />
            </Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td>Gray</Table.Td>
            <Table.Td className="!px-2">
              <InputGroup>
                <InputGroup.Text>$</InputGroup.Text>
                <FormInput
                  type="text"
                  className="min-w-[6rem]"
                  placeholder="Price"
                />
              </InputGroup>
            </Table.Td>
            <Table.Td className="!px-2">
              <FormInput
                type="text"
                className="min-w-[6rem]"
                placeholder="Stock"
              />
            </Table.Td>
            <Table.Td className="!pl-2">
              <FormInput
                type="text"
                className="min-w-[6rem]"
                placeholder="Variant Code"
              />
            </Table.Td>
          </Table.Tr>
        </Table.Tbody>
      </Table>
    </div>
  )
}

export default VariationTable
