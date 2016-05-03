/* onloadイベントハンドラーにinitDocument関数をセット */
onload = initDocument;

/* HTML文書が読み込まれたときに実行させる処理 */
function initDocument() {
  /* h1タグ */
  var h1 = document.getElementsByTagName('H1').item(0);
  alert( h1.nodeName );
}
