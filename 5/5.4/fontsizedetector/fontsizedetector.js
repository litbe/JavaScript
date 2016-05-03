/* ----------------------------------------------------------- */
/* HTML文書が読み込まれたときに実行させる処理 */
/* ----------------------------------------------------------- */
dom.event.addEventListener(window, 'load', initDocument);
function initDocument() {
  var level = detectFontSizeLevel();
  var box = document.getElementById('box');
  dom.core.removeChildNodes(box);
  var text = '';
  if(level == 1) {
    text = 'フォントサイズレベルは「小」です。';
    box.style.width = '250px';
  } else if(level == 2) {
    text = 'フォントサイズレベルは「中」です。';
    box.style.width = '350px';
  } else if(level == 3) {
    text = 'フォントサイズレベルは「大」です。';
    box.style.width = '450px';
  }
  box.appendChild( document.createTextNode(text) );
}

/* ----------------------------------------------------------- */
/* フォントサイズレベル取得 */
/* ----------------------------------------------------------- */
function detectFontSizeLevel() {
  var target = document.getElementsByTagName('HTML').item(0);
  /* コンピューテッド・スタイルオブジェクト */
  var oStyle;
  if( document.defaultView ) {
    /* W3C DOM準拠ブラウザー */
    oStyle = document.defaultView.getComputedStyle(target, null);
  } else if( target.currentStyle ) {
    /* Internet Explorer */
    oStyle = target.currentStyle;
  }
  /* コンピューテッド・スタイルのフォントサイズ */
  var cSize = parseInt(oStyle.fontSize);
  /* W3C DOM準拠ブラウザーのデフォルトサイズ */
  var dSize = 16;
  /* Internet Explorerのでデフォルトサイズ */
  if( document.uniqueID ) { dSize = 12; }
  /* 表示サイズ検知 */
  if(cSize > dSize) {
      return 3;
  } else if(cSize < dSize) {
      return 1;
  } else {
      return 2;
  }
}
