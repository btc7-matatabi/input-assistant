import { Column, ColumnDef, SortDirection } from "@tanstack/react-table";
// import { format, parse } from "date-fns";
// import { ja } from "date-fns/locale/ja";
// import { JSX } from "react";
// import {
//   TiArrowSortedDown,
//   TiArrowSortedUp,
//   TiArrowUnsorted,
//   TiEdit,
// } from "react-icons/ti";

export type User = {
  bundle: boolean;
  Individual: boolean;
  employeeCode: string;
  name: string;
  timeCode: string;
  gateInTime: string;
  gateOutTime: string;
  startToWorkTime: string;
  endToWorkTime: string;
  startHour: number;
  startMinute: number;
  restTime: number;
  endHour: number;
  endMinute: number;
  cleanUp: number;
};

// const sortableHeader =
//   (headerName: string) =>
//   ({ column }: { column: Column<User, unknown> }): JSX.Element => {
//     return (
//       <div
//         style={{ flex: "auto", alignItems: "center", cursor: "pointer" }}
//         onClick={column.getToggleSortingHandler()}
//       >
//         {headerName}
//         {/*{getSortIcon(column.getIsSorted())}*/}
//       </div>
//     );
//   };

export const columns: ColumnDef<User>[] = [
  // {
  //   id: "actions",
  //   cell: ({ row }) => {
  //     const user = row.original;
  //     return (
  //       <div
  //         style={{ cursor: "pointer" }}
  //         onClick={() => alert(`編集ボタンがクリックされました。`)}
  //       >
  //         {/*<TiEdit />*/}
  //       </div>
  //     );
  //   },
  // },
  {
    accessorKey: "bundle",
    header: "一括",
    cell: ({ row }) => <input type="checkbox" checked={row.original.bundle} />,
  },
  {
    accessorKey: "Individual",
    header: "個別",
    cell: ({ row }) => (
      <input type="checkbox" checked={row.original.Individual} />
    ),
  },
  {
    accessorKey: "employeeCode",
    header: "従業員コード",
  },
  {
    accessorKey: "name",
    header: "氏名",
  },
  {
    accessorKey: "timeCode",
    header: "時間管理コード",
    cell: ({ row }) => {
      const currentValue = row.original.timeCode;
      return (
        <select value={currentValue} style={{ width: "60px" }}>
          <option key={currentValue} value={currentValue}>
            {currentValue}
          </option>
        </select>
      );
    },
  },
  {
    accessorKey: "gateInTime",
    header: "入場時刻",
  },
  {
    accessorKey: "gateOutTime",
    header: "退場時刻",
  },
  {
    accessorKey: "startToWorkTime",
    header: "始業時刻",
  },
  {
    accessorKey: "endToWorkTime",
    header: "終業時刻",
  },
  {
    accessorKey: "startHour",
    header: "開始時刻(時)",
  },
  {
    accessorKey: "startMinute",
    header: "開始時刻(分)",
  },
  {
    accessorKey: "restTime",
    header: "残業前小休憩",
  },
  {
    accessorKey: "endHour",
    header: "終了時刻(時)",
  },
  {
    accessorKey: "endMinute",
    header: "終了時刻(分)",
  },
  {
    accessorKey: "cleanUp",
    header: "後始末",
  },
];
