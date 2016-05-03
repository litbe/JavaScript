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
    /* セレクターが"h3.sample"のCSSルール */
    if( selector.match(/^h3\.sample$/i) ) {
      /* スタイルオブジェクト */
      var oStyle = rule.style;
      /* 現在のスタイル情報を取得 */
      var msg = "現在のh3.sampleセレクタのフォントスタイル情報\n\n";
      msg += "  font-size: " + oStyle.fontSize + "\n";
      msg += "  color: " + oStyle.color + "\n\n";
      /* 警告メッセージを表示 */
      msg += "今からこれらスタイルを変更します。";
      alert(msg);
      /* スタイルを変更 */
      oStyle.fontSize = '18px';
      oStyle.color = '#00dd00';
      break;
    }
  }
}
