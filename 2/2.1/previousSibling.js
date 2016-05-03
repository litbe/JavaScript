/* onloadイベントハンドラーにinitDocument関数をセット */
onload = initDocument;

/* HTML文書が読み込まれたときに実行させる処理 */
function initDocument() {
  /* id属性に"jiro"がセットされたLIタグを取り出す */
  var jiro = document.getElementById('jiro');
  /* 直前の要素のid属性値 */
  var id1 = jiro.previousSibling.id;
  /* 直後の要素のid属性値 */
  var id2 = jiro.nextSibling.id;
  /* 結果をアラート表示 */
  alert("直前：" + id1 + "\n直後：" + id2);
}
