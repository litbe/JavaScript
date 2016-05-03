/* loadイベントリスナーをセット */
dom.event.addEventListener(window, 'load', initDocument);

/* HTML文書が読み込まれたときに実行させる処理 */
function initDocument() {
  /* ボタンにclickイベントリスナーをセット */
  var btn1 = document.getElementById('btn1');
  var btn2 = document.getElementById('btn2');
  dom.event.addEventListener(btn1, 'click', disabledTextbox);
  dom.event.addEventListener(btn2, 'click', readOnlyTextbox);
}

/* テキストボックスを無効にする */
function disabledTextbox(evt) {
  var text1 = document.getElementById('text1');
  text1.disabled = true;
}

/* テキストボックスを読取専用にする */
function readOnlyTextbox(evt) {
  var text2 = document.getElementById('text2');
  text2.readOnly = true;
}

