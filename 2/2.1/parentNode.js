/* onloadイベントハンドラーにinitDocument関数をセット */
onload = initDocument;

/* HTML文書が読み込まれたときに実行させる処理 */
function initDocument() {
  /* id属性に"jiro"がセットされたLIタグを取り出す */
  var jiro = document.getElementById('jiro');
  /* 親要素のid属性値をアラート表示 */
  alert(jiro.parentNode.id);
}
