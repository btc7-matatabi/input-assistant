import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./InputPage.css";
import { useState } from "react";
import { orgCdAtom, StaticData } from "./atoms.ts";
import { format } from "date-fns";
import { useAtom } from "jotai";
// import {User} from "./column.tsx";

// 静的なデータ
const staticData = [
  {
    bundle: false,
    Individual: false,
    employeeCode: "E001",
    name: "山田 太郎",
    timeCode: "A001",
    gateInTime: "09:00",
    gateOutTime: "18:00",
    startToWorkTime: "09:00",
    endToWorkTime: "18:00",
    startHour: 9,
    startMinute: 0,
    restTime: false,
    endHour: 18,
    endMinute: 0,
    cleanUp: 30,
  },
  {
    bundle: false,
    Individual: false,
    employeeCode: "E002",
    name: "佐藤 花子",
    timeCode: "A002",
    gateInTime: "09:15",
    gateOutTime: "18:15",
    startToWorkTime: "09:15",
    endToWorkTime: "18:15",
    startHour: 9,
    startMinute: 15,
    restTime: false,
    endHour: 18,
    endMinute: 15,
    cleanUp: 20,
  },
];

export function InputPage() {
  const [orgCd] = useAtom(orgCdAtom); //組織コード
  const [targetDate, setTargetDate] = useState(new Date()); //検索する日にち
  const [data, setData] = useState<StaticData[]>(staticData); //データ表示用
  const URL = process.env.VITE_URL;

  // チェックボックスの状態を変更
  const handleCheckboxChange = (index: number, field: keyof StaticData) => {
    const newData = [...data];
    if (field === "bundle" || field === "Individual") {
      newData[index][field] = !newData[index][field];
    }
    setData(newData);
  };

  // 時間コードの変更を反映
  const handleTimeCodeChange = (index: number, newTimeCode: string) => {
    const newData = [...data];
    newData[index].timeCode = newTimeCode;
    setData(newData);
  };

  //get   /groupMemberInfos/:group_code/:yyyy-mm-dd
  const handleSearch = async () => {
    try {
      const formattedDate = format(targetDate, "yyyy-MM-dd");
      const apiUrl = `${URL}/groupMemberInfos/${orgCd}/${formattedDate}`;
      const resultInfo = await fetch(apiUrl);

      if (!resultInfo.ok) {
        throw new Error(`HTTP error! Status: ${resultInfo.status}`);
      }
      const datas: StaticData[] = await resultInfo.json();
      setData(datas);

      if (!datas) {
        alert("ユーザ情報が存在しませんでした。");
      }
    } catch (error) {
      console.error("Error in get user info:", error);
      alert("ユーザ情報の取得中にエラーが発生しました。");
    }
  };
  //get   /attendanceInfos/:group_code/:yyyy-mm-dd
  const handleDeside = () => {};
  return (
    <div className="input-container">
      <div className="date-container">
        <label htmlFor="inputDate">＊対象年月日</label>
        <DatePicker
          id="inputDate"
          dateFormat="yyyy/MM/dd"
          selected={targetDate}
          onChange={(selectedDate) => {
            if (selectedDate) {
              setTargetDate(selectedDate);
            }
          }}
        ></DatePicker>
        {/*<input type="date" disabled value={new Date().toLocaleDateString()} />*/}
      </div>
      <div className="org-container">
        <label>組織コード:</label>
        <input id="orgInput" type="text" value={orgCd} readOnly />
      </div>
      <button className="search-button" onChange={() => handleSearch()}>
        検索
      </button>
      <button className="decide-button" onChange={() => handleDeside()}>
        勤怠確定
      </button>
      <main>
        <table className="table">
          <thead>
            <tr>
              <th style={{ width: "4%" }}>一括</th>
              <th style={{ width: "4%" }}>個別</th>
              <th style={{ width: "10%" }}>従業員コード</th>
              <th style={{ width: "12%" }}>氏名</th>
              <th style={{ width: "8%" }}>時間管理コード</th>
              <th style={{ width: "6%" }}>入場時刻</th>
              <th style={{ width: "6%" }}>退場時刻</th>
              <th style={{ width: "6%" }}>始業時刻</th>
              <th style={{ width: "6%" }}>終業時刻</th>
              <th style={{ width: "6%" }}>開始時刻(時)</th>
              <th style={{ width: "6%" }}>開始時刻(分)</th>
              <th style={{ width: "4%" }}>残業前小休憩</th>
              <th style={{ width: "6%" }}>終了時刻(時)</th>
              <th style={{ width: "6%" }}>終了時刻(分)</th>
              <th style={{ width: "4%" }}>後始末</th>
            </tr>
          </thead>
          <tbody>
            {staticData.map((row, index) => (
              <tr key={index}>
                <td>
                  <label>
                    <input
                      type="checkbox"
                      id={`bundle-${index}`} // id を追加
                      name={`bundle-${index}`} // name を追加
                      checked={row.bundle}
                      onChange={() => handleCheckboxChange(index, "bundle")}
                    />
                  </label>
                </td>
                <td>
                  <label>
                    <input
                      type="checkbox"
                      id={`individual-${index}`} // id を追加
                      name={`individual-${index}`} // name を追加
                      checked={row.Individual}
                      onChange={() => handleCheckboxChange(index, "Individual")}
                    />
                  </label>
                </td>
                <td>{row.employeeCode}</td>
                <td>{row.name}</td>
                <td>
                  {/*{" "}*/}
                  {row.Individual ? (
                    <select
                      value={row.timeCode}
                      onChange={(e) =>
                        handleTimeCodeChange(index, e.target.value)
                      }
                    >
                      <option value="A001">A001</option>
                      <option value="A002">A002</option>
                      <option value="A003">A003</option>
                    </select>
                  ) : (
                    row.timeCode
                  )}
                </td>
                <td>{row.gateInTime}</td>
                <td>{row.gateOutTime}</td>
                <td>{row.startToWorkTime}</td>
                <td>{row.endToWorkTime}</td>
                <td>
                  {row.Individual ? (
                    <select
                      value={row.startHour}
                      onChange={(e) =>
                        handleTimeCodeChange(index, e.target.value)
                      }
                    >
                      {[...Array(24)].map((_, i) => (
                        <option key={i} value={i}>
                          {i}
                        </option>
                      ))}
                    </select>
                  ) : (
                    row.startHour
                  )}
                </td>
                <td>
                  {row.Individual ? (
                    <select
                      value={row.startMinute}
                      onChange={(e) =>
                        handleTimeCodeChange(index, e.target.value)
                      }
                    >
                      {[...Array(60)].map((_, i) => (
                        <option key={i} value={i}>
                          {i}
                        </option>
                      ))}
                    </select>
                  ) : (
                    row.startMinute
                  )}
                </td>
                <td>
                  <label>
                    <input
                      type="checkbox"
                      id={`restTime-${index}`} // id を追加
                      name={`restTime-${index}`} // name を追加
                      onChange={() => handleCheckboxChange(index, "restTime")}
                    />
                  </label>
                </td>
                <td>
                  {row.Individual ? (
                    <select
                      value={row.endHour}
                      onChange={(e) =>
                        handleTimeCodeChange(index, e.target.value)
                      }
                    >
                      {[...Array(24)].map((_, i) => (
                        <option key={i} value={i}>
                          {i}
                        </option>
                      ))}
                    </select>
                  ) : (
                    row.endHour
                  )}
                </td>
                <td>
                  {row.Individual ? (
                    <select
                      value={row.endMinute}
                      onChange={(e) =>
                        handleTimeCodeChange(index, e.target.value)
                      }
                    >
                      {[...Array(60)].map((_, i) => (
                        <option key={i} value={i}>
                          {i}
                        </option>
                      ))}
                    </select>
                  ) : (
                    row.endMinute
                  )}
                </td>
                <td>
                  {" "}
                  {row.Individual ? (
                    <input
                      style={{ width: "30px" }}
                      type="text"
                      value={row.cleanUp}
                    />
                  ) : (
                    row.cleanUp
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}
