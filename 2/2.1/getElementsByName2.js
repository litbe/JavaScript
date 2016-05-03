/* onloadイベントハンドラーにinitDocument関数をセット */
onload = initDocument;

/* HTML文書が読み込まれたときに実行させる処理 */
function initDocument() {
  /* name属性に"top"がセットされた要素のNodeListオブジェクトを取り出す */
  var nodeList = document.getElementsByName('top');
  /* 最初の要素のname属性をアラート表示 */
  alert(nodeList.item(0).name);
}
