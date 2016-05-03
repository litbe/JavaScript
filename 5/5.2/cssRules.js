/* loadイベントリスナーをセット */
dom.event.addEventListener(window, 'load', initDocument);

/* HTML文書が読み込まれたときに実行させる処理 */
function initDocument() {
  /* LINKタグで読み込まれたスタイルシートのオブジェクト */
  var stylesheet = document.styleSheets.item(0);
  /* CSSルールのリスト */
  var cssrules;
  if( stylesheet.cssRules ) { /* W3C DOM準拠ブラウザー */
    cssrules = stylesheet.cssRules;
  } else if( stylesheet.rules ) { /* Internet Explorer */
    cssrules = stylesheet.rules;
  }
  /* CSSルールの内容を取り出す */
  var msg = '';
  for( var i=0; i<cssrules.length; i++ ) {
    /* CSSルールオブジェクト */
    var rule = cssrules.item(i);
    /* セレクター */
    var selector = rule.selectorText;
    /* スタイルオブジェクト */
    var oStyle = rule.style;
    /* CSS宣言ブロックの内容 */
    var text = oStyle.cssText;
    /* メッセージに追加 */
    msg += "【" + selector + "】\n";
    msg += text + "\n\n";
    /* セレクターがpなら値を変更 */
    if( selector.match(/^p$/i) ) {
      oStyle.cssText = 'font-size: 14px; color: red;';
    }
  }
  /* アラート表示 */
  alert(msg);
}
