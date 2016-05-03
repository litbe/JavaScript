/* onloadイベントハンドラーにinitDocument関数をセット */
onload = initDocument;

/* HTML文書が読み込まれたときに実行させる処理 */
function initDocument() {
  /* Aタグ要素ノードオブジェクト */
  var anchor = document.getElementById('w3c');
  /* title属性の値を取り出す。*/
  var title = anchor.getAttribute('title');
  /* アラート表示 */
  alert(title);
}
