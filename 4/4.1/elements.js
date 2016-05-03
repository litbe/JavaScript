/* loadイベントリスナーをセット */
dom.event.addEventListener(window, 'load', initDocument);

/* HTML文書が読み込まれたときに実行させる処理 */
function initDocument() {
  /* フォーム・コントロールのリストを取得 */
  var controls = document.forms.item(0).elements;
  /* メッセージ初期化 */
  var msg = '';
  /* タグ名とtype属性を取得 */
  for(var i=0; i<controls.length; i++) {
    var tag = controls.item(i).nodeName;
    var type = controls.item(i).type;
    msg += tag + ":" + type + "\n";
  }
  /* 結果をアラーと表示 */
  alert(msg);
}
