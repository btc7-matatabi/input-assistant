import {useEffect, useState} from "react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import "./InputPage.css";
import { StaticData } from "./atoms.ts";
import { format } from "date-fns";
// import { useAtom } from "jotai";
// import {User} from "./column.tsx";

// 静的なデータ
// const staticData = [
//   {
//     bundle: false,
//     Individual: false,
//     employeeCode: "E001",
//     name: "山田 太郎",
//     work_code: "A001",
//     gateInTime: "09:00",
//     gateOutTime: "18:00",
//     startToWorkTime: "09:00",
//     endToWorkTime: "18:00",
//     startHour: 9,
//     startMinute: 0,
//     restTime: false,
//     endHour: 18,
//     endMinute: 0,
//     cleanUp: 30,
//   },
//   {
//     bundle: false,
//     Individual: false,
//     employeeCode: "E002",
//     name: "佐藤 花子",
//     work_code: "A002",
//     gateInTime: "09:15",
//     gateOutTime: "18:15",
//     startToWorkTime: "09:15",
//     endToWorkTime: "18:15",
//     startHour: 9,
//     startMinute: 15,
//     restTime: false,
//     endHour: 18,
//     endMinute: 15,
//     cleanUp: 20,
//   },
// ];

export function InputPage() {
  // const [orgCd,setOrgCd] = useAtom(orgCdAtom); //組織コード
  const [targetDate, setTargetDate] = useState<Date|null>(new Date()); //検索する日にち
  const [data, setData] = useState<StaticData[]>([]); //データ表示用
  const URL = process.env.VITE_URL;
  const orgCd= localStorage.getItem('orgCd')
  // const targetDate= localStorage.getItem('targetDate')
  // const targetDate= (new Date()).toString()
  console.log("orgCd🍎",orgCd)

  // チェックボックスの状態を変更
  const handleCheckboxChange = (index: number, field: keyof StaticData) => {
    const newData = [...data];
    if (field === "bundle" || field === "Individual") {
      newData[index][field] = !newData[index][field];
    }
    setData(newData);
  };

  // 時間コードの変更を反映
  const handleWork_codeChange = (index: number, newWork_code: string) => {
    const newData = [...data];
    newData[index].work_code = newWork_code;
    setData(newData);
  };

  //get   /groupMemberInfos/:group_code/:yyyy-mm-dd
  const handleSearch = async (orgCd:string|null) => {
    if (!orgCd) {
      console.error("組織コードが設定されていません。");
      return;
    }
    try {
      if(!targetDate){
        alert("対象年月日を選択してください。");
        return;
      }
      console.log("🍎handleSearch targetDate:",targetDate)
      const formattedDate = format(targetDate, "yyyy-MM-dd");
      const apiUrl = `${URL}/groupMemberInfos/${orgCd}/${formattedDate}`;
      // console.log("🍎apiUrl",apiUrl)
      const resultInfo = await fetch(apiUrl);

      if (!resultInfo.ok) {
        throw new Error(`HTTP error! Status: ${resultInfo.status}`);
      }
      const resultJson: StaticData[] = await resultInfo.json();
      console.log("resultJson",resultJson)
      setData(resultJson);

      if (!resultJson||resultJson.length === 0) {
        alert("ユーザ情報が存在しませんでした。");
      }
    } catch (error) {
      console.error("Error in get user info:", error);
      alert("ユーザ情報の取得中にエラーが発生しました。");
    }
  };
  //get   /attendanceInfos/:group_code/:yyyy-mm-dd
  const handleDecide = () => {
    alert("勤怠を確定してもよろしですか？");
  };

  useEffect(()=>{
    console.log("useEffect実行")
    const orgCd= localStorage.getItem('orgCd')
    console.log("orgCd🍎",orgCd)
    const storedDate = localStorage.getItem("targetDate");
    console.log("🍎storedDate targetDate:",targetDate)
    if (storedDate) {
      setTargetDate(new Date(storedDate)); // 文字列を `Date` に変換
    } else {
      setTargetDate(new Date()); // 初期値を設定
    }
    // if(orgCd){
    //   setOrgCd(orgCd)
    // }
    handleSearch(orgCd)},[])
  return (
    <div className="input-container">
      <div className="date-container">
        <label htmlFor="inputDate">＊対象年月日</label>
        <DatePicker
          id="inputDate"
          dateFormat="yyyy/MM/dd"
          selected={targetDate || null}
          onChange={(selectedDate: Date | null) => {
            if (selectedDate) {
              setTargetDate(selectedDate);
              localStorage.setItem("targetDate",selectedDate.toString())
            }
          }}
        ></DatePicker>
        {/*<input type="date" disabled value={new Date().toLocaleDateString()} />*/}
      </div>
      <div className="org-container">
        <span >組織コード: </span>
        <input type="text" id="orgInput" value={orgCd||''} ></input>
      </div>
      <button className="search-button" onClick={() => handleSearch(orgCd||'')}>
        検索
      </button>
      <button className="decide-button" onClick={() => handleDecide()}>
      {/*<button className="decide-button">*/}
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
            {/*{staticData.map((row, index) => (*/}
            {data.map((row, index) => (
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
                <td>{row.employee_code}</td>
                <td>{row.name}</td>
                <td>
                  {/*{" "}*/}
                  {row.Individual ? (
                      <select
                          value={row.work_code ?? ""}
                          onChange={(e) =>
                              handleWork_codeChange(index, e.target.value)
                          }
                      >
                        <option value="0001">0001</option>
                        <option value="0002">0002</option>
                        <option value="0003">0003</option>
                        <option value="0004">0004</option>
                        <option value="0005">0005</option>
                        <option value="B1VA">B1VA</option>
                        <option value="B1UA">B1UA</option>
                        <option value="B1TA">B1TA</option>
                      </select>
                  ) : (
                      row.work_code
                  )}
                </td>
                <td>{row.gateInTime}</td>
                <td>{row.gateOutTime}</td>
                <td>{row.startToWorkTime}</td>
                <td>{row.endToWorkTime}</td>
                <td>
                  {row.Individual ? (
                      <select
                          value={row.startHour ?? ""}
                          onChange={(e) =>
                              handleWork_codeChange(index, e.target.value)
                          }
                      >
                        <option key={0} value="">
                        </option>
                        {[...Array(60)].map((_, i) => (
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
                          value={row.startMinute ?? ""}
                          onChange={(e) =>
                              handleWork_codeChange(index, e.target.value)
                          }
                      >
                        <option key={0} value="">
                        </option>
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
                          value={row.endHour ?? ""}
                          onChange={(e) =>
                              handleWork_codeChange(index, e.target.value)
                          }
                      >
                        <option key={0} value="">
                        </option>
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
                          value={row.endMinute ?? ""}
                          onChange={(e) =>
                              handleWork_codeChange(index, e.target.value)
                          }
                      >
                        <option key={0} value="">
                        </option>
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
                      value={row.cleanUp || ""}
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
