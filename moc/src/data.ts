import { User } from "./column.tsx";

const data: User[] = [
  {
    bundle: true,
    Individual: false,
    employeeCode: "0000001",
    name: "佐藤",
    timeCode: "0002",
    gateInTime: "05:00",
    gateOutTime: "14:00",
    startToWorkTime: "5:20",
    endToWorkTime: "14:20",
    startHour: 14,
    startMinute: 10,
    restTime: 20,
    endHour: 14,
    endMinute: 20,
    cleanUp: 10,
  },
  {
    bundle: true,
    Individual: false,
    employeeCode: "0000002",
    name: "鈴木",
    timeCode: "0002",
    gateInTime: "05:00",
    gateOutTime: "14:00",
    startToWorkTime: "5:20",
    endToWorkTime: "14:20",
    startHour: 14,
    startMinute: 10,
    restTime: 20,
    endHour: 14,
    endMinute: 20,
    cleanUp: 10,
  },
  {
    bundle: true,
    Individual: false,
    employeeCode: "0000003",
    name: "高橋",
    timeCode: "0002",
    gateInTime: "05:00",
    gateOutTime: "14:00",
    startToWorkTime: "5:20",
    endToWorkTime: "14:20",
    startHour: 14,
    startMinute: 10,
    restTime: 20,
    endHour: 14,
    endMinute: 20,
    cleanUp: 10,
  },
];

export const getData: () => Promise<User[]> = async () => data;
