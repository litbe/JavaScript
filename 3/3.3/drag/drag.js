/*-----------------------------------------------------------------*/
/* HTML文書が読み込まれたときに実行させる処理 */
/*-----------------------------------------------------------------*/
/* loadイベントリスナーをセット */
dom.event.addEventListener(window, 'load', initDocument);
function initDocument() {
  for( var i=1; i<=3; i++) {
    /* ボタンの要素ノードオブジェクト */
    var btn = document.getElementById('btn'+i);
    /* ボタンにclickイベントリスナーをセット */
    dom.event.addEventListener(btn, 'click', openWin);
  }
}

/*-----------------------------------------------------------------*/
/* 子ウィンドウ表示処理 */
/*-----------------------------------------------------------------*/
function openWin(evt) {
  var btn = dom.event.target(evt);
  /* 子ウィンドウをドラッグ可能にセット */
  var win, num, m;
  if( m = btn.id.match(/^btn(\d+)$/) ) {
    num = m[1];
    win = document.getElementById('win'+num);
  }
  if( win ) {
    /* 子ウィンドウを表示 */
    win.style.display = 'block';
    /* 手前に表示させるため、いったん削除して再表示 */
    win.parentNode.removeChild(win);
    document.body.appendChild(win);
    /* 閉じるボタンの画像をセット */
    var close = document.getElementById('win_close'+num);
    close.src = 'close.png';
    /* 閉じるボタンにmouseupイベントリスナーをセット */
    dom.event.addEventListener(close, 'mouseup', closeWin);
    /* 閉じるボタンにmouseoverイベントリスナーをセット */
    dom.event.addEventListener(close, 'mouseover', highlightCloseBtn);
    /* 閉じるボタンにmouseoutイベントリスナーをセット */
    dom.event.addEventListener(close, 'mouseout', lowlightCloseBtn);
    /* タイトルバー */
    var titlebar = document.getElementById('win_titlebar'+num);
    /* 子ウィンドウをドラッグ可能に */
    dom.event.drag(win, titlebar);
    /* クリックすれば一番手前に表示するために、タイトルバーに*/
    /* mousedownイベントリスナーをセット */
    dom.event.addEventListener(titlebar, 'mousedown', activateWin);
  }
}

/*-----------------------------------------------------------------*/
/* 子ウィンドウ非表示処理 */
/*-----------------------------------------------------------------*/
function closeWin(evt) {
  var close = dom.event.target(evt);
  var win, num, m;
  if( m = close.id.match(/^win_close(\d+)$/) ) {
    num = m[1];
    win = document.getElementById('win'+num);
  }
  /* 子ウィンドウを非表示に */
  if( win ) {
    win.style.display = 'none';
  }
  /* イベント伝播を抑止 */
  dom.event.stopPropagation(evt);
}

/*-----------------------------------------------------------------*/
/* 閉じるボタン画像切り替え処理 */
/*-----------------------------------------------------------------*/
function lowlightCloseBtn(evt) {
  var img = dom.event.target(evt);
  img.src = 'close.png';
}
function highlightCloseBtn(evt) {
  var img = dom.event.target(evt);
  img.src = 'close_h.png';
}

/*-----------------------------------------------------------------*/
/* ウィンドウを最前面に表示する */
/*-----------------------------------------------------------------*/
function activateWin(evt) {
  var titlebar = dom.event.target(evt);
  var win, num, m;
  if( m = titlebar.id.match(/^win_titlebar(\d+)$/) ) {
    num = m[1];
    win = document.getElementById('win'+num);
  }
  /* いったん画面から削除して、再度、BODYタグに追加 */
  if( win ) {
    win.parentNode.removeChild(win);
    document.body.appendChild(win);
  }
  /* イベント伝播を抑止 */
  dom.event.stopPropagation(evt);
}
