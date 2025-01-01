import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import { useAtom } from "jotai";
import { orgCdAtom } from "./atoms.ts";

export default function LoginPage() {
  const [orgCd, setOrgCd] = useAtom(orgCdAtom);
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [, setCompanyCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const URL = process.env.VITE_URL;

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    //get   /loginUserInfo/:id
    try {
      setErrorMessage(""); // エラーメッセージをリセット
      // const response = await fetch(`${server_url}/login`, {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ userId, password }),
      //   credentials: "include",
      // });
      const apiUrl = `${URL}/loginUserInfo/${userId}`;
      const response = await fetch(apiUrl);
      if (response.ok) {
        const Data = await response.json();
        setOrgCd(Data.group_code);
        navigate("/top"); // ログイン成功時にリダイレクト
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "エラーが発生しました");
      }
    } catch (error) {
      // if (error instanceof Error) {
      //   console.error("エラー:", error.message); // 安全にアクセス
      // } else {
      // console.error("未知のエラー:", error); // その他の型の場合
      // }
      navigate("/top");
      setOrgCd("12345");
    }
  };

  return (
    <>
      <form id="loginForm" onSubmit={submit}>
        <div className="title">
          <h2>トヨタ認証システム(BTC)</h2>
        </div>
        <div className="header">
          <h2>- Login -</h2>
        </div>
        <div className="login-container">
          <button className="language-button">ENGLISH</button>

          <div className="form-group">
            <input
              type="text"
              id="userId"
              name="userId"
              value={userId}
              placeholder="ユーザーID："
              onChange={(e) => setUserId(e.target.value)}
            />
            <span>@</span>
            <input
              type="text"
              value="01000"
              className="companyCode"
              onChange={(e) => setCompanyCode(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              placeholder="パスワード："
              onChange={(e) => setPassword(e.target.value)}
            />

            <input type="checkbox" id="saveCompanyCode" />
            <label htmlFor="saveCompanyCode">会社コードを保存する</label>
          </div>
          <div className="button-group">
            <button type="submit" className="login-button">
              ログイン
            </button>
            <button type="reset" className="clear-button">
              クリア
            </button>
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
      </form>
    </>
  );
}
