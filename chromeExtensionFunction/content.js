(function () {
  console.log("スクリプトが実行されました。");

  // MutationObserver の設定
  const observer = new MutationObserver((mutations) => {
    const targetElement = document.querySelector(
      'div[class*="input-container"]',
    );
    console.log("MutationObserver 監視中...");
    if (targetElement) {
      console.log("対象のReactコンテナが見つかりました。");
      observer.disconnect(); // 見つかったら監視を停止

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

      function getInputData() {
        const inputElement = document.getElementById("orgInput");
        const orgCd = inputElement.value; // valueプロパティから値を取得
        console.log("組織コード:", orgCd);
      }
      // ボタンクリック時の処理
      button.addEventListener("click", () => {
        const reactApp = document.querySelector(
          'div[class*="input-container"]',
        );
        if (!reactApp) {
          console.error("React アプリが見つかりません");
          return;
        }
        getInputData();
        // const rows = document.querySelectorAll(".table tbody tr");
        // if (rows.length === 0) {
        //   console.error("テーブルの行が見つかりません");
        //   return;
        // }

        // const newRow = rows[0].cloneNode(true); // 既存の行をコピー
        // const cells = newRow.querySelectorAll("td");
        //
        // if (cells.length < 6) {
        //   console.error("セルの数が不足しています");
        //   return;
        // }
        //
        // // セルのデータを更新
        // cells[2].textContent = "新しい従業員コード"; // 従業員コード
        // cells[3].textContent = "新しい氏名"; // 氏名
        // cells[4].textContent = "新しい時間コード"; // 時間コード
        // cells[5].textContent = "10:00"; // 入場時刻
        //
        // // 新しい行をテーブルに追加
        // const tbody = document.querySelector(".table tbody");
        // if (!tbody) {
        //   console.error(".table tbody が見つかりません");
        //   return;
        // }
        // tbody.appendChild(newRow);
        // console.log("新しい行を追加しました。");
        // 個別のチェックボックスをオンにする

        const individualCheckboxes = document.querySelectorAll(
          'input[name^="individual-"]',
        );
        individualCheckboxes.forEach((checkbox) => {
          if (!checkbox.checked) {
            checkbox.click();
          }
        });

        // 時間コードを設定 (ドロップダウンに新しい値をセット)
        const timeCodeDropdowns = document.querySelectorAll(
          'select[name^="timeCode-"]',
        );
        timeCodeDropdowns.forEach((dropdown) => {
          dropdown.value = "A001"; // 値を変更
          const event = new Event("change", { bubbles: true }); // React 状態更新をトリガー
          dropdown.dispatchEvent(event);
        });
      });
    }
  });

  // ボディ全体を監視
  observer.observe(document.body, { childList: true, subtree: true });
})();
