import { atom } from "jotai";
export interface StaticData {
  bundle: boolean| undefined;
  Individual: boolean| undefined;
  employee_code: string;
  name: string;
  work_code: string | undefined;
  holiday: string;
  gateInTime: string| undefined;
  gateOutTime: string| undefined;
  start_to_work_time: string| undefined;
  end_to_work_time: string| undefined;
  start_hour: string| undefined;
  start_minute: number| undefined;
  restTime: boolean| undefined;
  end_hour: number| undefined;
  end_minute: number| undefined;
  overtime_minute: number| undefined;
  cleanUp: number| undefined;
}
export const orgCdAtom = atom<string>("");
