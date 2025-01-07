import {useEffect, useState} from "react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import "./InputPage.css";
import { StaticData } from "./atoms.ts";
import { format } from "date-fns";
import {InputPateTable} from "./InputPageTable.tsx";


export function InputPage() {
  const [targetDate, setTargetDate] = useState<Date|null>(new Date()); //検索する日にち
  const [bfTargetDate, setBfTargetDate] = useState<Date|null>(new Date()); //検索する日にち
  const [data, setData] = useState<StaticData[]>([]); //データ表示用
  // const [componentKey, setComponentKey] = useState(0); // コンポーネントをリセットするためのキー
  const URL = process.env.VITE_URL;
  const orgCd= localStorage.getItem('orgCd')
  const [bfOrgCd,setBfOrgCd] = useState(orgCd); //組織コード

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
      alert("組織コードが設定されていません。");
      return;
    }
    if(!targetDate){
      alert("対象年月日を選択してください。");
      return;
    }
    if(orgCd!==bfOrgCd || targetDate!==bfTargetDate){
      try {
        setBfTargetDate(targetDate);
        setBfOrgCd(orgCd);

        setData([]);
        const formattedDate = format(targetDate, "yyyy-MM-dd");
        const apiUrl = `${URL}/groupMemberInfos/${orgCd}/${formattedDate}`;
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
        // コンポーネントをリセットするためにキーを変更
        // setComponentKey(prevKey => prevKey + 1);
      } catch (error) {
        console.error("Error in get user info:", error);
        alert("ユーザ情報の取得中にエラーが発生しました。");
      }
    }
  };
  //get   /attendanceInfos/:group_code/:yyyy-mm-dd
  const handleDecide = () => {
    alert("勤怠を確定してもよろしですか");
  };

  useEffect(()=>{
    const orgCd= localStorage.getItem('orgCd')
    const storedDate = localStorage.getItem("targetDate");
    if (storedDate) {
      setTargetDate(new Date(storedDate)); // 文字列を `Date` に変換
    } else {
      setTargetDate(new Date()); // 初期値を設定
    }
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
        <InputPateTable
            key={data.length}// key を使って再マウント
            data={data}
            handleCheckboxChange={handleCheckboxChange}
            handleWork_codeChange={handleWork_codeChange}
        />
      </main>
    </div>
  );
}
