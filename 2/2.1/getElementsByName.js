/* onloadイベントハンドラーにinitDocument関数をセット */
onload = initDocument;

/* HTML文書が読み込まれたときに実行させる処理 */
function initDocument() {
  /* name属性に"gender"がセットされた要素のNodeListオブジェクトを取り出す */
  var nodeList = document.getElementsByName('gender');
  /* 全要素のvalue属性値を取り出す */
  var str = '';
  for( var i=0; i<nodeList.length; i++) {
    str += nodeList.item(i).value + "\n";
  }
  /* 結果をアラート表示 */
  alert(str);
}
