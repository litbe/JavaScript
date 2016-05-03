/* ----------------------------------------------------------- */
/* スイッチャーの初期化（このjsが読み込まれたらすぐに実行） */
/* ----------------------------------------------------------- */
fontSizeWitch();

/* ----------------------------------------------------------- */
/* HTML文書が読み込まれたときに実行させる処理 */
/* ----------------------------------------------------------- */
dom.event.addEventListener(window, 'load', initDocument);
function initDocument() {
  var ary = new Array('l', 'm', 's');
  for( var i=0; i<3; i++ ) {
    var elm = document.getElementById('fontsizeswitcher_' + ary[i]);
    if( ! elm ) { continue; }
    dom.event.addEventListener(elm, 'click', fontSizeWitch);
  }
}

/* ----------------------------------------------------------- */
/* フォントサイズ切り替え処理 */
/* ----------------------------------------------------------- */
function fontSizeWitch(evt) {
  /* サイズ初期値 */
  var selector = 'm';
  /* Cookieの値を取得 */
  var cookie_value = getCookie('fontsizeswitcher');
  /* サイズを決定 */
  if( evt ) {
    /* クリックイベント発生時の指定サイズ取得 */
    var target = dom.event.target(evt);
    var m;
    if( m = target.id.match(/^fontsizeswitcher_(l|m|s)$/) ) {
      selector = m[1];
    }
    dom.event.preventDefault(evt);
  } else if( cookie_value ) {
    /* ページロード時の指定サイズ取得 */
    var m;
    if( m = cookie_value.match(/^(l|m|s)$/) ) {
      selector = m[1];
    }
  }
  /* LINKタグのリスト */
  var list = document.getElementsByTagName('LINK');
  /* LINKタグの切り替え */
  for( var i=0; i<list.length; i++ ) {
    var rel = list.item(i).rel;
    var title = list.item(i).title;
    if( rel.match(/alternate/) && title.match(/^(l|m|s)\ssize$/) ) {
      list.item(i).disabled = true;
      if(title == selector + " size") {
        list.item(i).disabled = false;
      }
    }
  }
  /* Cookieセット（有効期限を30日後） */
  var expires = new Date();
  var msec = expires.getTime() + (3600 * 24 * 30 * 1000);
  expires.setTime(msec);
  setCookie('fontsizeswitcher', selector, expires);
}

/* ----------------------------------------------------------- */
/* Cookieセット */
/* ----------------------------------------------------------- */
function setCookie(name, value, expires) {
  var cookie = name + "=" + encodeURIComponent(value);
  if(expires) {
    cookie += "; expires=" + expires.toGMTString();
  }
  document.cookie = cookie;
}

/* ----------------------------------------------------------- */
/* Cookie読み取り */
/* ----------------------------------------------------------- */
function getCookie(name) {
  var sRegExp = "(?:; )?" + name + "=([^;]*);?";
  var oRegExp = new RegExp(sRegExp);
  if(oRegExp.test(document.cookie)) {
    return decodeURIComponent(RegExp["$1"]);
  } else {
    return '';
  }
}
