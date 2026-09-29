/* eslint-disable react/destructuring-assignment */
/* eslint-disable prettier/prettier */
import { twMerge } from 'tailwind-merge'
import { createContext, useContext } from 'react'

interface TableProps
  extends React.PropsWithChildren,
    React.ComponentPropsWithoutRef<'table'> {
  dark?: boolean
  bordered?: boolean
  hover?: boolean
  striped?: boolean
  sm?: boolean
  /** Flat navy-header + zebra TipApp list layout */
  cards?: boolean
}

const tableContext = createContext<{
  dark: TableProps['dark']
  bordered: TableProps['bordered']
  hover: TableProps['hover']
  striped: TableProps['striped']
  sm: TableProps['sm']
  cards: TableProps['cards']
}>({
  dark: false,
  bordered: false,
  hover: true,
  striped: false,
  sm: false,
  cards: false,
})

function Table({
  className,
  dark,
  bordered,
  hover = true,
  striped,
  sm,
  cards,
  ...props
}: TableProps) {
  return (
    <tableContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        dark,
        bordered,
        hover,
        striped,
        sm,
        cards,
      }}
    >
      <div
        className={twMerge([
          'w-full overflow-x-auto',
          cards && 'tipapp-table-wrap',
        ])}
      >
        <table
          className={twMerge([
            'w-full text-left',
            dark && 'bg-dark text-white dark:bg-black/30',
            cards && 'tipapp-table',
            className,
          ])}
          {...props}
        >
          {props.children}
        </table>
      </div>
    </tableContext.Provider>
  )
}

interface TheadProps
  extends React.PropsWithChildren,
    React.ComponentPropsWithoutRef<'thead'> {
  variant?: 'default' | 'light' | 'dark'
}

const theadContext = createContext<{
  variant: TheadProps['variant']
}>({
  variant: 'default',
})

Table.Thead = function Thead({ className, variant = 'default', ...props }: TheadProps) {
  const table = useContext(tableContext)
  return (
    <theadContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        variant,
      }}
    >
      <thead
        className={twMerge([
          variant === 'light' && 'bg-slate-200/60 dark:bg-slate-200',
          variant === 'dark' && 'bg-dark text-white dark:bg-black/30',
          table.cards && 'tipapp-table__head',
          className,
        ])}
        {...props}
      >
        {props.children}
      </thead>
    </theadContext.Provider>
  )
}

type TbodyProps = React.PropsWithChildren<
  React.ComponentPropsWithoutRef<'tbody'>
>

Table.Tbody = function Tbody({ className, ...props }: TbodyProps) {
  return (
    <tbody className={twMerge(['tipapp-table__body', className])} {...props}>
      {props.children}
    </tbody>
  )
}

type TrProps = React.PropsWithChildren & React.ComponentPropsWithoutRef<'tr'>

Table.Tr = function Tr({ className, ...props }: TrProps) {
  const table = useContext(tableContext)
  return (
    <tr
      className={twMerge([
        table.hover &&
          !table.cards &&
          '[&:hover_td]:bg-slate-50 [&:hover_td]:dark:bg-darkmode-300/50',
        table.striped &&
          '[&:nth-of-type(odd)_td]:bg-slate-100 [&:nth-of-type(odd)_td]:dark:bg-darkmode-300 [&:nth-of-type(odd)_td]:dark:bg-opacity-50',
        table.cards && 'tipapp-table__row',
        className,
      ])}
      {...props}
    >
      {props.children}
    </tr>
  )
}

type ThProps = React.PropsWithChildren & React.ComponentPropsWithoutRef<'th'>

Table.Th = function Th({ className, ...props }: ThProps) {
  const table = useContext(tableContext)
  const thead = useContext(theadContext)
  return (
    <th
      className={twMerge([
        !table.cards &&
          'border-b-2 border-slate-200/80 px-5 py-3.5 text-left text-[11px] font-semibold uppercase tracking-[0.06em] text-slate-500 dark:border-darkmode-300',
        !table.cards && thead.variant === 'light' && 'border-b-0 text-slate-700',
        !table.cards && thead.variant === 'dark' && 'border-b-0 text-white',
        table.dark && 'border-slate-600 dark:border-darkmode-300',
        table.bordered && 'border-l border-r border-t',
        table.sm && 'px-4 py-2.5',
        table.cards && 'tipapp-table__th text-left',
        className,
      ])}
      {...props}
    >
      {props.children}
    </th>
  )
}

type TdProps = React.PropsWithChildren & React.ComponentPropsWithoutRef<'td'>

Table.Td = function Td({ className, ...props }: TdProps) {
  const table = useContext(tableContext)
  return (
    <td
      className={twMerge([
        !table.cards &&
          'border-b border-slate-100 px-5 py-3.5 text-left text-sm text-slate-700 dark:border-darkmode-300',
        table.dark && 'border-slate-600 dark:border-darkmode-300',
        table.bordered && 'border-l border-r border-t',
        table.sm && 'px-4 py-2.5',
        table.cards && 'tipapp-table__td text-left',
        className,
      ])}
      {...props}
    >
      {props.children}
    </td>
  )
}

export default Table

Table.defaultProps = {
  dark: false,
  bordered: false,
  hover: true,
  striped: false,
  sm: false,
  cards: false,
}
