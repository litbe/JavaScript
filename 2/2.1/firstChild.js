/* onloadイベントハンドラーにinitDocument関数をセット */
onload = initDocument;

/* HTML文書が読み込まれたときに実行させる処理 */
function initDocument() {
  /* id属性に"groups"がセットされたDIVタグを取り出す */
  var divElement = document.getElementById('groups');
  /* 結果をアラート表示 */
  alert(divElement.firstChild.id);
}
