/* onloadイベントハンドラーにinitDocument関数をセット */
onload = initDocument;

/* HTML文書が読み込まれたときに実行させる処理 */
function initDocument() {
  /* id属性値に"level2"がセットされているノードオブジェクトを取り出す */
  var element = document.getElementById('level2');
  /* id属性の値を取り出すしてそれをアラート表示 */
  alert(element.id);
  
}
