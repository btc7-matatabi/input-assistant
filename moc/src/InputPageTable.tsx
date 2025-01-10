import { StaticData } from "./atoms.ts";

interface InputPageTableProps {
    data: StaticData[];
    handleCheckboxChange: (index: number, field: keyof StaticData) => void;
    handleWork_codeChange: (index: number, newWork_code: string) => void;
}

export function InputPageTable({
                                   data,
                                   handleCheckboxChange,
                                   handleWork_codeChange,
                               }: InputPageTableProps) {

    return(
        <>
            <table className="table">
                <thead>
                <tr>
                    <th style={{width: "4%"}}>一括</th>
                    <th style={{width: "4%"}}>個別</th>
                    <th style={{width: "8%"}}>従業員コード</th>
                    <th style={{width: "10%"}}>氏名</th>
                    <th style={{width: "6%"}}>時間管理コード</th>
                    <th style={{width: "6%"}}>休務内容</th>
                    <th style={{width: "5%"}}>入場時刻</th>
                    <th style={{width: "5%"}}>退場時刻</th>
                    <th style={{width: "5%"}}>始業時刻</th>
                    <th style={{width: "5%"}}>終業時刻</th>
                    <th style={{width: "6%"}}>開始時刻(時)</th>
                    <th style={{width: "6%"}}>開始時刻(分)</th>
                    <th style={{width: "4%"}}>残業前小休憩</th>
                    <th style={{width: "6%"}}>終了時刻(時)</th>
                    <th style={{width: "6%"}}>終了時刻(分)</th>
                    <th style={{width: "4%"}}>超勤</th>
                    <th style={{width: "4%"}}>後始末</th>
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
                        <td>{row.holiday}</td>
                        <td>{row.gateInTime}</td>
                        <td>{row.gateOutTime}</td>
                        <td>{row.start_to_work_time}</td>
                        <td>{row.end_to_work_time}</td>
                        <td>
                            {row.Individual ? (
                                <select
                                    value={row.start_hour ?? ""}
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
                                row.start_hour
                            )}
                        </td>
                        <td>
                            {row.Individual ? (
                                <select
                                    value={row.start_minute ?? ""}
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
                                row.start_minute
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
                                    value={row.end_hour ?? ""}
                                    onChange={(e) =>
                                        handleWork_codeChange(index, e.target.value)
                                    }
                                >
                                    <option key={0} value="">
                                    </option>
                                    {[...Array(24)].map((_, i) => (
                                        <option key={i} value={String(i).padStart(2, '0')}>
                                            {String(i).padStart(2, '0')}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                row.end_hour
                            )}
                        </td>
                        <td>
                            {row.Individual ? (
                                <select
                                    value={row.end_minute ?? ""}
                                    onChange={(e) =>
                                        handleWork_codeChange(index, e.target.value)
                                    }
                                >
                                    <option key={0} value="">
                                    </option>
                                    {[...Array(60)].map((_, i) => (
                                        <option key={i} value={String(i).padStart(2, '0')}>
                                            {String(i).padStart(2, '0')}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                row.end_minute
                            )}
                        </td>
                        <td>{row.overtime_minute}</td>
                        <td>
                            {" "}
                            {row.Individual ? (
                                <input
                                    style={{width: "30px"}}
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
        </>
    )
}
