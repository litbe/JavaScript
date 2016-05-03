/* グローバル変数の初期化 */
var numonly_params = new Object;

/* ------------------------------------------------------------ */
/* HTML文書が読み込まれたときに実行させる処理 */
/* ------------------------------------------------------------ */
dom.event.addEventListener(window, 'load', initDocument);
function initDocument() {
  /* テキストボックスのリストを取得 */
  var inputs = document.getElementsByTagName('INPUT');
  /* class属性値に'numonly'がセットされたテキストボックスに */
  /* イベントリスナーをセット */
  for( var i=0; i<inputs.length; i++ ) {
    var elm = inputs.item(i);
    if(elm.className == 'numonly') {
      /* 入力開始時の処理 */
      dom.event.addEventListener(elm, 'focus', textInputStart);
      /* 入力終了時の処理 */
      dom.event.addEventListener(elm, 'blur', textInputEnd);
      /* 右クリックによるコンテキストメニュー表示を禁止 */
      /* （ペーストを禁止するため） */
      dom.event.addEventListener(elm, 'contextmenu', forbidAction);
      /* ペーストの禁止（Internet Explorerのみ有効） */
      dom.event.addEventListener(elm, 'paste', forbidAction);
      /* IME起動を禁止（Internet Explorerのみ有効） */
      elm.style.imeMode = 'disabled';
    }
  }
}

/* ------------------------------------------------------------ */
/* 入力開始処理 */
/* ------------------------------------------------------------ */
function textInputStart(evt) {
  var target = dom.event.target(evt);
  dom.event.addEventListener(target, 'keydown', textInputCheck);
  dom.event.addEventListener(target, 'keyup', textInputCheck);
  numonly_params['target'] = target;
  textInputCheck();
}

/* ------------------------------------------------------------ */
/* 入力終了処理
/* ------------------------------------------------------------ */
function textInputEnd(evt) {
  var target = dom.event.target(evt);
  dom.event.removeEventListener(target, 'keydown', textInputCheck);
  dom.event.removeEventListener(target, 'keyup', textInputCheck);
  textInputCheck();
  numonly_params['target'] = null;
}

/* ------------------------------------------------------------ */
/* 入力文字のチェック */
/* ------------------------------------------------------------ */
function textInputCheck(evt) {
  var elm = numonly_params['target'];
  /* 数字以外の文字を除外 */
  if( elm.value.match(/[^\d]/) ) {
    /* 数字以外の文字の位置を特定 */
    var pos = elm.value.search(/[^\d]/);
    /* 数字以外の文字を削除 */
    elm.value = elm.value.replace(/[^\d]/g, '');
    /* カーソルの位置を変更 */
    if(elm.setSelectionRange) {
      /* Firefox,Opera,Safariの場合 */
      elm.setSelectionRange(pos,pos); 
    } else if(elm.createTextRange) {
      /* Internet Explorerの場合 */
      var range = elm.createTextRange();
      range.move('character', pos);
      range.select();
    }
  }
}

/* ------------------------------------------------------------ */
/* デフォルトアクションの抑止 */
/* ------------------------------------------------------------ */
function forbidAction(evt) {
  dom.event.preventDefault(evt);
}