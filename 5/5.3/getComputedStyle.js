/* loadイベントリスナーをセット */
dom.event.addEventListener(window, 'load', initDocument);

/* HTML文書が読み込まれたときに実行させる処理 */
function initDocument() {
  /* H1タグの要素ノードオブジェクト */
  var h1 = document.getElementsByTagName('H1').item(0);
  /* コンピューテッド・スタイルオブジェクト */
  var oStyle;
  if( document.defaultView ) {
    /* W3C DOM準拠ブラウザー */
    oStyle = document.defaultView.getComputedStyle(h1, null);
  } else if( h1.currentStyle ) {
    /* Internet Explorer */
    oStyle = h1.currentStyle;
  }
  /* 各種CSSプロパティの値をアラート表示 */
  var msg = '';
  msg += "font-size: " + oStyle.fontSize + "\n";
  msg += "color: " + oStyle.color + "\n";
  msg += "width: " + oStyle.width + "\n";
  msg += "height: " + oStyle.height + "\n";
  alert(msg);
}
