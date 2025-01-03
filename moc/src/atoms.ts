import { atom } from "jotai";
export interface StaticData {
  bundle: boolean| undefined;
  Individual: boolean| undefined;
  employee_code: string;
  name: string;
  work_code: string | undefined;
  gateInTime: string| undefined;
  gateOutTime: string| undefined;
  startToWorkTime: string| undefined;
  endToWorkTime: string| undefined;
  startHour: string| undefined;
  startMinute: number| undefined;
  restTime: boolean| undefined;
  endHour: number| undefined;
  endMinute: number| undefined;
  cleanUp: number| undefined;
}
export const orgCdAtom = atom<string>("");
