/* onloadイベントハンドラーにinitDocument関数をセット */
onload = initDocument;

/* HTML文書が読み込まれたときに実行させる処理 */
function initDocument() {
  /* H1タグの要素ノードオブジェクトを取り出す */
  var h1Element = document.getElementsByTagName('H1').item(0);
  /* H1タグのid属性の値を取り出す */
  id = h1Element.id;
  /* id属性の値をアラート表示する */
  alert(id);
}
