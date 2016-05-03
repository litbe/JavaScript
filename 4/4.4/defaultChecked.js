/* loadイベントリスナーをセット */
dom.event.addEventListener(window, 'load', initDocument);

/* HTML文書が読み込まれたときに実行させる処理 */
function initDocument() {
  /* ボタン */
  var btn = document.getElementById('btn');
  /* clickイベントのリスナーをセット */
  dom.event.addEventListener(btn, 'click', reportCheckStatus);
}

function reportCheckStatus(evt) {
  /* チェックボックスのリスト */
  var checkboxes = document.getElementsByName('check');
  /* チェック状態の変更を判定 */
  var changed = false;
  for( var i=0; i<checkboxes.length; i++ ) {
    var elm = checkboxes.item(i);
    if(elm.defaultChecked != elm.checked) {
      changed = true;
      break;
    }
  }
  /* 結果をアラート表示 */
  if(changed == true) {
    alert("状態が変更されました。");
  } else {
    alert("なにも変更されていません。");
  }
}
