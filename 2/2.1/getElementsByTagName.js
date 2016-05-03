/* onloadイベントハンドラーにinitDocument関数をセット */
onload = initDocument;

/* HTML文書が読み込まれたときに実行させる処理 */
function initDocument() {
  /* LI要素のNodeListオブジェクトを取り出す */
  var nodeList = document.getElementsByTagName('LI');
  /* 2つ目のLIタグの要素ノードオブジェクト */
  var liElement = nodeList.item(1);
  /* title属性値をアラート表示 */
  alert(liElement.title);
}
