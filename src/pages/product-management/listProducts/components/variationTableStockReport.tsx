/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable import/no-useless-path-segments */
/* eslint-disable react/self-closing-comp */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/no-duplicates */
/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/anchor-is-valid */

// import Lucide from "../../../../base-components/lucide";
// import Button from "../../../../components/common/button";
// import { FormInput, FormSelect } from "../../../../components/common/form-elements/components";
// import * as xlsx from "xlsx"
// import { useEffect,useState, useRef, createRef } from "react";
// import { createIcons, icons } from "lucide"
// import { TabulatorFull as Tabulator } from "tabulator-tables";
// import { stringToHTML } from "../../../../utils/helper";
// import {  Menu } from "../../../../components/common/headless";

//   interface Response {
//     name?: string;
//     category?: string;
//     images?: string[];
//     status?: string;
//   }
  
//   function VariationTableStockReport() {
//     const tableRef = createRef<HTMLDivElement>();
//     const tabulator = useRef<Tabulator>();
//     const [filter, setFilter] = useState({
//       field: "name",
//       type: "like",
//       value: "",
//     });
  
//     const imageAssets = import.meta.glob<{
//       default: string;
//     }>("/src/assets/images/fakers/*.{jpg,jpeg,png,svg}", { eager: true });
//     const initTabulator = () => {
//       if (tableRef.current) {
//         tabulator.current = new Tabulator(tableRef.current, {
//           ajaxURL: "https://dummy-data.left4code.com",
//           paginationMode: "remote",
//           // filterMode: "remote",
//           // sortMode: "remote",
//           printAsHtml: true,
//           printStyled: true,
//           pagination: true,
//           paginationSize: 10,
//           paginationSizeSelector: [10, 20, 30, 40],
//           layout: "fitColumns",
//           responsiveLayout: "collapse",
//           placeholder: "No matching records found",
//           columns: [
//             {
//               title: "",
//               formatter: "responsiveCollapse",
//               width: 40,
//               minWidth: 30,
//               hozAlign: "center",
//               resizable: false,
//               headerSort: false,
//             },
            
  
//             // For HTML table
//             {
//               title: "PRODUCT NAME",
//               minWidth: 200,
//               responsive: 0,
//               field: "name",
//               vertAlign: "middle",
//               print: false,
//               download: false,
//               formatter(cell) {
//                 const response: Response = cell.getData();
//                 return `<div>
//                   <div class="font-medium whitespace-nowrap">${response.name}</div>
//                   <div class="text-slate-500 text-xs whitespace-nowrap">${response.category}</div>
//                 </div>`;
//               },
//             },
            
//             {
//               title: "REMAINING STOCK",
//               minWidth: 200,
//               field: "remaining_stock",
//               hozAlign: "center",
//               headerHozAlign: "center",
//               vertAlign: "middle",
//               print: false,
//               download: false,
//             },
            
            
//             {
//               title: "STATUS",
//               minWidth: 200,
//               field: "status",
//               hozAlign: "center",
//               headerHozAlign: "center",
//               vertAlign: "middle",
//               print: false,
//               download: false,
//               formatter(cell) {
//                 const response: Response = cell.getData();
//                 return `<div class="flex items-center lg:justify-center ${
//                   response.status ? "text-success" : "text-danger"
//                 }">
//                   <i data-lucide="check-square" class="w-4 h-4 mr-2"></i> ${
//                     response.status ? "Active" : "Inactive"
//                   }
//                 </div>`;
//               },
//             },
//             {
//               title: "ACTIONS",
//               minWidth: 200,
//               field: "actions",
//               responsive: 1,
//               hozAlign: "center",
//               headerHozAlign: "center",
//               vertAlign: "middle",
//               print: false,
//               download: false,
//               formatter(cell, formatterParams, onRendered) {
//                 const actionsContainer = document.createElement("div");
//                 actionsContainer.classList.add("flex", "lg:justify-center", "items-center");
            
                
//                 const actionButton = document.createElement("a");
//                 actionButton.classList.add("flex", "items-center", "mr-3");
//                 actionButton.href = "javascript:;";
                
//                 const menuButton = document.createElement("button");
//                 menuButton.className = "h-8 w-16";
//                 menuButton.innerText = "Action";
                
//                 const chevronIcon = document.createElement("span");
//                 chevronIcon.className = "w-4 h-4 ml-2";
//                 chevronIcon.textContent = "▼";
            
//                 menuButton.appendChild(chevronIcon);
//                 actionButton.appendChild(menuButton);
//                 actionsContainer.appendChild(actionButton);
                
//                 // ... (previous code)
  
//                 const menuItems = document.createElement("div");
//                 menuItems.className = "menu-tab hidden w-52 h-48 overflow-y-auto"; // Add the "menu-tab" class
  
            
//                 const menuItemLabels = [
//                   "Labels",
//                   "View",
//                   "Edit",
//                   "Delete",
//                   "Add or Edit Opening Stock",
//                   "Product Stock History",
//                   "Add or Edit Group Prices",
//                   "Duplicate Product"
//                 ];
            
//                 menuItemLabels.forEach(label => {
//                   const menuItem = document.createElement("div");
//                   menuItem.className = "menu-item"; // Apply the "menu-item" class here
//                   menuItem.textContent = label;
//                   menuItems.appendChild(menuItem);
                
//                   menuItem.addEventListener("click", function () {
//                     // Handle menu item click here
//                     console.log("Clicked on:", label);
                
//                     // Hide the menu after clicking
//                     menuItems.classList.add("hidden");
//                   });
//                 });
            
//                 actionsContainer.appendChild(menuItems);
            
//                 actionButton.addEventListener("click", function () {
//                   menuItems.classList.toggle("hidden");
//                 });
            
//                 return actionsContainer;
//               },
//             },
//             // For print format
//             {
//               title: "PRODUCT NAME",
//               field: "name",
//               visible: false,
//               print: true,
//               download: true,
//             },
//             {
//               title: "CATEGORY",
//               field: "category",
//               visible: false,
//               print: true,
//               download: true,
//             },
//             {
//               title: "REMAINING STOCK",
//               field: "remaining_stock",
//               visible: false,
//               print: true,
//               download: true,
//             },
//             {
//               title: "STATUS",
//               field: "status",
//               visible: false,
//               print: true,
//               download: true,
//               formatterPrint(cell) {
//                 return cell.getValue() ? "Active" : "Inactive";
//               },
//             },
//             {
//               title: "IMAGE 1",
//               field: "images",
//               visible: false,
//               print: true,
//               download: true,
//               formatterPrint(cell) {
//                 return cell.getValue()[0];
//               },
//             },
//             {
//               title: "IMAGE 2",
//               field: "images",
//               visible: false,
//               print: true,
//               download: true,
//               formatterPrint(cell) {
//                 return cell.getValue()[1];
//               },
//             },
//             {
//               title: "IMAGE 3",
//               field: "images",
//               visible: false,
//               print: true,
//               download: true,
//               formatterPrint(cell) {
//                 return cell.getValue()[2];
//               },
//             },
//           ],
//         });
//       }
  
//       tabulator.current?.on("renderComplete", () => {
//         createIcons({
//           icons,
//           attrs: {
//             "stroke-width": 1.5,
//           },
//           nameAttr: "data-lucide",
//         });
//       });
//     };
  
//     // Redraw table onresize
//     const reInitOnResizeWindow = () => {
//       window.addEventListener("resize", () => {
//         if (tabulator.current) {
//           tabulator.current.redraw();
//           createIcons({
//             icons,
//             attrs: {
//               "stroke-width": 1.5,
//             },
//             nameAttr: "data-lucide",
//           });
//         }
//       });
//     };
  
//     // Filter function
//     const onFilter = () => {
//       if (tabulator.current) {
//         tabulator.current.setFilter(filter.field, filter.type, filter.value);
//       }
//     };
  
//     // On reset filter
//     const onResetFilter = () => {
//       setFilter({
//         ...filter,
//         field: "name",
//         type: "like",
//         value: "",
//       });
//       onFilter();
//     };
  
//     // Export
//     const onExportCsv = () => {
//       if (tabulator.current) {
//         tabulator.current.download("csv", "data.csv");
//       }
//     };
  
//     const onExportJson = () => {
//       if (tabulator.current) {
//         tabulator.current.download("json", "data.json");
//       }
//     };
  
//     const onExportXlsx = () => {
//       if (tabulator.current) {
//         (window as any).XLSX = xlsx;
//         tabulator.current.download("xlsx", "data.xlsx", {
//           sheetName: "Products",
//         });
//       }
//     };
  
//     const onExportHtml = () => {
//       if (tabulator.current) {
//         tabulator.current.download("html", "data.html", {
//           style: true,
//         });
//       }
//     };
  
//     // Print
//     const onPrint = () => {
//       if (tabulator.current) {
//         tabulator.current.print();
//       }
//     };
  
//     useEffect(() => {
//       initTabulator();
//       reInitOnResizeWindow();
//     }, []);
  
//     return (
//       <>

//         {/* BEGIN: HTML Table Data */}
//         <div className="overflow-x-auto scrollbar-hidden">
          
//             <div id="tabulator" ref={tableRef} className="mt-5"></div>
//           </div>
//         {/* END: HTML Table Data */}
//       </>
//     );

import _ from 'lodash'
import Table from '../../../../components/common/table'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import Button from '../../../../components/common/button'
import SharedDataContainer from '../../../../containers/sharedData'
import Lucide from '../../../../components/common/lucide'
import Tippy from '../../../../components/common/tippy'
import {
  InputElement, SelectElement, DateElement, TextareaElement,
} from '../../../../components/common/form-elements'
import { Dialog } from '../../../../components/common/headless'

function VariationTableStockReport() {

  const {
    register,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  })
  const { t } = useTranslation('pos')
  const [tooltipContent1] = useState(
    'Stock Left from Total Manufactured'
  )
  const [buttonViewPricePreview, setViewPricePreview] = useState(false)


  return (
    <div className="overflow-y-auto overflow-x-scroll ">
      <Table bordered className="">
        <Table.Thead variant="dark">
          <Table.Tr>
          <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
             SKU
            </Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
              Products
            </Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
              Location
            </Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
            Current Stock (Main Unit)
            </Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
             Purchase Price after Discount
            </Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
            Current Stock Value <div>(by Purchase Price)</div>
            </Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
           Selling Price
            </Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
            Current Stock Value  <div>(By Sale Price)</div>
            </Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
           Total Unit Sold
            </Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
           Total Unit Transfered
            </Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
           Total Unit Adjusted
            </Table.Th>
            <Table.Th className="whitespace-nowrap bg-slate-50 !px-2 text-slate-500 dark:bg-darkmode-800">
            Current Stock Value<div className="flex"> (Manufacturing) <Tippy content={tooltipContent1} className="ml-2">
                  {' '}
                  <a>
                    {' '}
                    <Lucide icon="Info" className=" h-4 w-4" />{' '}
                  </a>{' '}
                </Tippy></div> 
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
        <Table.Tr>
          <Table.Td className="!px-4">23467</Table.Td>
            <Table.Td className="!px-4">Iphone</Table.Td>
            <Table.Td className="!px-4">Kandy</Table.Td>
            <Table.Td className="!px-2"><div className="text-right">20,000,000.00</div></Table.Td>
            <Table.Td className="!px-2"><div className="text-right">20,000,000.00</div></Table.Td>
            <Table.Td className="!px-2"><div className="text-right">20,000,000.00</div></Table.Td>
            <Table.Td className="!px-2">
  <div className="justify-end text-right"> <span className="mr-1 text-right">20,000,000.00</span>
    <Button variant="linkedin" size="sm" className="w-32 mb-2" onClick={(event: React.MouseEvent) => {
                      event.preventDefault()
                      setViewPricePreview(true)
                    }}> View Group Price </Button> </div> </Table.Td>
    <Dialog
                  size="lg"
                  open={buttonViewPricePreview}
                  onClose={() => {
                    setViewPricePreview(false)
                  }}
                >
                  <Dialog.Panel className="max-h-screen overflow-y-auto">
                    <Dialog.Title>
                      <h2 className="mr-auto text-base font-medium">{`${t(
                        'productManagement.fields.viewGroupPrice.title'
                      )}`}</h2>
                    </Dialog.Title>
                    <a
                      onClick={(event: React.MouseEvent) => {
                        event.preventDefault()
                        setViewPricePreview(false)
                      }}
                      className="absolute right-0 top-0 mr-3 mt-3"
                      href="#"
                    >
                      <Lucide icon="X" className="h-8 w-8 text-slate-400" />
                    </a>

                    <Dialog.Description>
                  
        <div >
        <Table>
        <Table.Thead variant="default" className=" bg-primary text-white">
            <Table.Tr>
                <Table.Th className="whitespace-nowrap">
                Default Selling Price (Inc. tax)
                </Table.Th>
                <Table.Th className="whitespace-nowrap">
                Group Prices
                </Table.Th>

            </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
            <Table.Tr>
                <Table.Td>₨ 270.00</Table.Td>
                <Table.Td><div><strong>Whole Sale</strong> - 0</div> 
                          <div><strong>Discounted Sale</strong>- 0</div></Table.Td>
            </Table.Tr>
        </Table.Tbody>
    </Table>
        </div>
        
     

                    </Dialog.Description>

                    <div className="flex justify-end px-3 pb-4 text-center ">
                      {/* <Button
                        type="submit"
                        variant="primary"
                        className="mb-2 mr-1 w-24"
                        
                      >
                        {`${t('common.button.save')}`}
                        {isLoading ? (
                          <LoadingIcon
                            icon="oval"
                            color="white"
                            className="ml-2 h-4 w-4"
                          />
                        ) : (
                          ''
                        )}
                      </Button> */}
                 <Button type="button" variant="outline-secondary" onClick={()=> {
                setViewPricePreview(false);
                }}
                className="mb-2 mr-1 w-24"
                >
                Cancel
            </Button>
                    </div>
                  </Dialog.Panel>
                </Dialog>
            <Table.Td className="!px-2"><div className="text-right">20,000,000.00</div></Table.Td>
            <Table.Td className="!px-2"><div className="text-right"> 20,000,000.00</div></Table.Td>
            <Table.Td className="!px-2"><div className="text-right"> 20,000,000.00</div></Table.Td>
            <Table.Td className="!px-2"><div className="text-right"> 20,000,000.00</div></Table.Td>
            <Table.Td className="!px-2"><div className="text-right"> 20,000,000.00</div></Table.Td>

          </Table.Tr>
        
         
        </Table.Tbody>
      </Table>
    </div>
  )
}
                
export default VariationTableStockReport