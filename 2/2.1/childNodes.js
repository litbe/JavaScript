/* onloadイベントハンドラーにinitDocument関数をセット */
onload = initDocument;

/* HTML文書が読み込まれたときに実行させる処理 */
function initDocument() {
  /* id属性に"groups"がセットされたDIVタグを取り出す */
  var divElement = document.getElementById('groups');
  /* 子要素すべてのid属性を取り出す */
  var nodeList = divElement.childNodes;
  var str = '';
  for( var i=0; i<nodeList.length; i++) {
    str += nodeList.item(i).id + "\n";
  }
  /* 結果をアラート表示 */
  alert(str);
}
