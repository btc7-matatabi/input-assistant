

(function () {
  console.log("スクリプトが実行されました。");

  // const targetDate = new Date();  // 現在の日付
  const URL = "http://localhost:8080";  // APIのURL

  const observer = new MutationObserver((mutations) => {
    const targetElement = document.querySelector('div[class*="input-container"]');
    console.log("MutationObserver 監視中...");

    if (targetElement) {
      console.log("対象のReactコンテナが見つかりました。");
      observer.disconnect();

      // ボタンの作成と設定
      const button = document.createElement("button");
      button.textContent = "勤怠管理アプリから一括自動入力";
      button.style.position = "fixed";
      button.style.top = "35vh";
      button.style.left = "73vw";
      button.style.height = "50px";
      button.style.backgroundColor = "#fff79d";
      button.style.border = "1px solid #928f8f;";
      button.style.padding = "0 20px";
      button.style.borderRadius = "5px";
      button.style.font = "'Inter', 'Noto Sans JP'";
      button.style.fontSize = "16px";
      button.style.zIndex = 1000;
      document.body.appendChild(button);

      async function getInputData() {
        const inputElement = document.getElementById("orgInput");
        const orgCd = inputElement ? inputElement.value : ""; // 空の場合に備える
        console.log("組織コード:", orgCd);

        try {
          // const formattedDate = format(targetDate, "yyyy-MM-dd");

          const dateInput = document.querySelector("#inputDate");  // 日付入力欄
          if (dateInput) {
            targetDate = new Date(dateInput.value); // 日付が変更されていればその値を取得
            console.log("🍎取得した日付:", targetDate);
          } else {
            console.log("🍎対象日付が見つかりません");
          }
          const year = targetDate.getFullYear();
          const month = String(targetDate.getMonth() + 1).padStart(2, '0');
          const day = String(targetDate.getDate()).padStart(2, '0');
          const formattedDate = `${year}-${month}-${day}`;
          console.log("🍎formattedDate", formattedDate);

          const apiUrl = `${URL}/attendanceInfos/${orgCd}/${formattedDate}`;
          console.log("🍎apiUrl", apiUrl);

          const resultInfo = await fetch(apiUrl);
          if (!resultInfo.ok) {
            throw new Error(`HTTP error! Status: ${resultInfo.status}`);
          }

          const datas = await resultInfo.json();
          console.log("datas", datas);

          if (!datas || datas.length === 0) {
            alert("勤怠情報が存在しませんでした。");
            return [];
          }

          return datas;
        } catch (error) {
          console.error("Error in get user info:", error);
          alert("勤怠情報の取得中にエラーが発生しました。");
          return [];
        }
      }

      function setTableData(datas) {
        const tbody = document.querySelector(".table tbody");
        if (!tbody) {
          console.error(".table tbody が見つかりません");
          return;
        }
        const uniqueWorkCodes = [...new Set(datas.map(item => item.work_code))];
        console.log("🍎uniqueWorkCodes", uniqueWorkCodes);

        tbody.innerHTML = ""; // 既存のテーブルをクリア

        datas.forEach((data) => {
          const newRow = document.createElement("tr");

          newRow.innerHTML = `
            <td>
              <label>
                <input type="checkbox" name="bundle-${data.employee_code}" id="bundle-${data.employee_code}" />
              </label>
            </td>
            <td>
              <label>
                <input type="checkbox" name="individual-${data.employee_code}" id="individual-${data.employee_code}"  />
              </label>
            </td>
            <td>${data.employee_code|| ''}</td>
            <td>${data.name|| ''}</td>
            <td>
              <select name="work_code-${data.employee_code}" id="work_code-${data.employee_code}">
                ${uniqueWorkCodes.map(i => `<option value="${i}" ${i === data.work_code ? 'selected' : ''}>${i}</option>`).join('')}
              </select>
            </td>
            <td>${data.gateInTime|| ''}</td>
            <td>${data.gateOutTime|| ''}</td>
            <td>${data.startToWorkTime ? data.startToWorkTime.split(":").slice(0, 2).join(":") : ''}</td>
            <td>${data.endToWorkTime ? data.endToWorkTime.split(":").slice(0, 2).join(":") : ''}</td>
            <td>
              <select name="startHour"  >
                <option value=""></option>
                ${[...Array(24)].map((_, i) => `<option value="${i}" ${String(i).padStart(2, '0') === String(data.starthour) ? 'selected' : ''}>${i}</option>`).join('')}
              </select>
            </td>
            <td>              
              <select name="startMinute" >
                <option key={0} value=""></option>
                ${[...Array(60)].map((_, i) => `<option value="${i}" ${String(i).padStart(2, '0') ===String( data.startminute )? 'selected' : ''}>${i}</option>`).join('')}
              </select>
            </td>  
            <td>
              <label>
                <input type="checkbox" name="restTime-${data.employee_code}" id="restTime-${data.employee_code}"/>
              </label>
            </td>
            <td>
              <select name="endHour"  >
                <option key={0} value=""></option>
                ${[...Array(24)].map((_, i) => `<option value="${i}" ${String(i).padStart(2, '0') ===String( data.endhour) ? 'selected' : ''}>${i}</option>`).join('')}
              </select>
            </td>
            <td>              
              <select name="endMinute" >
                <option key={0} value=""></option>
                ${[...Array(60)].map((_, i) => `<option value="${i}" ${String(i).padStart(2, '0') ===String( data.endminute) ? 'selected' : ''}>${i}</option>`).join('')}
              </select>
            </td>
            <td>${data.cleanUp|| ''}</td>
          `;
          tbody.appendChild(newRow);
        });
      }

      button.addEventListener("click", async () => {
        console.log("addEventListener 実行")
        const datas = await getInputData();
        if (datas.length > 0) {
          setTableData(datas);
        }

        // チェックボックスをオンにする処理
        const individualCheckboxes = document.querySelectorAll('input[name^="individual-"]');
        individualCheckboxes.forEach((checkbox) => {
          if (!checkbox.checked) {
            checkbox.click();
          }
        });

        // 時間コードを設定 (ドロップダウンに新しい値をセット)
        // const work_codeDropdowns = document.querySelectorAll('select[name^="work_code-"]');
        // work_codeDropdowns.forEach((dropdown) => {
        //   dropdown.value = "A001"; // 値を変更
        //   const event = new Event("change", { bubbles: true }); // React 状態更新をトリガー
        //   dropdown.dispatchEvent(event);
        // });
      });
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
})();
