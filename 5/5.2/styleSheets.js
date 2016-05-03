/* loadイベントリスナーをセット */
dom.event.addEventListener(window, 'load', initDocument);

/* HTML文書が読み込まれたときに実行させる処理 */
function initDocument() {
  /* LINK,STYLEタグのリスト */
  var list = document.styleSheets;
  /* title属性を表示 */
  var msg = "";
  for( var i=0; i<list.length; i++ ) {
    /* スタイルシート・オブジェクト */
    var stylesheet = list.item(i);
    /* メッセージを追加 */
    msg += i + "：" + stylesheet.title + "\n";
  }
  /* 結果を表示 */
  alert(msg);
}
