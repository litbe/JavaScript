/* onloadイベントハンドラーにinitDocument関数をセット */
onload = initDocument;

/* HTML文書が読み込まれたときに実行させる処理 */
function initDocument() {
  /* id属性に"para"がセットされたPタグを取り出す */
  var para = document.getElementById('para');
  /* テキスト情報を抽出 */
  var text = dom.core.getTextContent(para);
  /* テキスト情報をアラート表示 */
  alert(text);
}
