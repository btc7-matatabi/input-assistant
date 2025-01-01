import { atom } from "jotai";
export interface StaticData {
  bundle: boolean;
  Individual: boolean;
  employeeCode: string;
  name: string;
  timeCode: string | null;
  gateInTime: string;
  gateOutTime: string;
  startToWorkTime: string;
  endToWorkTime: string;
  startHour: number;
  startMinute: number;
  restTime: boolean;
  endHour: number;
  endMinute: number;
  cleanUp: number;
}
export const orgCdAtom = atom<string>("");
