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
  var checkboxes = document.getElementsByName('hobby');
  /* チェック項目を判定し、title属性値を取り出す */
  var msg = '';
  for( var i=0; i<checkboxes.length; i++ ) {
    var elm = checkboxes.item(i);
    if(elm.checked == true) {
      msg += "■";
    } else {
      msg += "□";
    }
    msg += elm.title + "\n";
  }
  /* 結果をアラート表示 */
  alert(msg);
}
