import "./InputPage.css";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { React, useEffect, useState } from "react";

import { columns, User } from "./column.tsx";
import { getData } from "./data.ts";

export function InputPage() {
  const [data, setData] = useState<User[]>([]);
  const Today = new Date();
  const [date, setDate] = useState(Today);

  const initialPageIndex = 0;
  const initialPageSize = 10;

  const table = useReactTable<User>({
    columns,
    data,
    initialState: {
      pagination: {
        pageIndex: initialPageIndex,
        pageSize: initialPageSize,
      },
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  useEffect(() => {
    const fetchData = async () => {
      setData(await getData());
    };
    fetchData();
  }, []);

  return (
    <div className="input-container">
      <div className="date-container">
        <label>＊対象年月日</label>
        <DatePicker
          dateFormat="yyyy/MM/dd"
          selected={date}
          onChange={(selectedDate) => {
            setDate(selectedDate || Today);
          }}
        ></DatePicker>
      </div>
      <button className="search-button">検索</button>
      <button className="decide-button">勤怠確定</button>
      <main>
        <table className="table">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => {
              return (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </main>
    </div>
  );
}
