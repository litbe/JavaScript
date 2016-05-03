var dialog = new Object();

/* -------------------------------------------------------- */
/* アラートウィンドウ */
/* -------------------------------------------------------- */
dialog.show = function(title, msg, propertyObj) {
  /* ウィンドウ枠を生成 */
  var frame = dialog._makeFrame(title, msg);
  /* ボタンを生成 */
  var buttons = dialog._makeButtom(propertyObj);
  /* ボタン領域にボタンを追加 */
  var btnarea = frame.getElementsByTagName('DIV').item(2);
  for(var i=0; i<buttons.length; i++) {
    btnarea.appendChild(buttons[i]);
  }
  /* ウィンドウ表示 */
  dialog._display(frame);
};

/* -------------------------------------------------------- */
/* ▼以降、内部処理用関数 */
/* -------------------------------------------------------- */

/* -------------------------------------------------------- */
/* ウィンドウ削除処理 */
/* -------------------------------------------------------- */
dom._clear = function(evt) {
  /* ダイアログウィンドウ削除 */
  var frame = document.getElementById('dialog_frame');
  frame.parentNode.removeChild(frame);
  /* シャドー・レイヤー削除 */
  var shadow = document.getElementById('dialog_shadow');
  shadow.parentNode.removeChild(shadow);
};

/* -------------------------------------------------------- */
/* ウィンドウ表示処理 */
/* -------------------------------------------------------- */
dialog._display = function(elm) {
  /* 画面全体を覆うシャドー・レイヤーを生成表示 */
  dialog._makeShadowMask();
  /* BODYタグ内にウィンドウを追加 */
  elm.style.visibility = 'hidden';
  document.body.appendChild(elm);
  /* 位置をウィンドウ中央に移動 */
  dialog._setPositionCenter(elm);
  /* ウィンドウを可視化 */
  elm.style.visibility = 'visible';
  /* ドラッグ可能にする */
  var titlebar = document.getElementById('dialog_titlebar');
  dom.event.drag(elm, titlebar);
};

/* -------------------------------------------------------- */
/* ウィンドウ枠を組み立てる */
/* -------------------------------------------------------- */
dialog._makeFrame = function(title, msg) {
  /* ウィンドウ枠を生成 */
  var frame = document.createElement('DIV');
  frame.id = 'dialog_frame';
  /* タイトルバー生成 */
  var titlebar = document.createElement('DIV');
  titlebar.id = 'dialog_titlebar';
  titlebar.appendChild( document.createTextNode(title) );
  /* メッセージ領域生成 */
  var msgarea = document.createElement('DIV');
  msgarea.id = 'dialog_msgarea';
  msgarea.appendChild( document.createTextNode(msg) );
  /* ボタン領域生成 */
  var btnarea = document.createElement('DIV');
  btnarea.id = 'dialog_btnarea';
  /* ウィンドウの組み立て */
  frame.appendChild(titlebar);
  frame.appendChild(msgarea);
  frame.appendChild(btnarea);
  /* 要素ノードオブジェクトを返す */
  return frame;
};

/* -------------------------------------------------------- */
/* ボタンを生成 */
/* -------------------------------------------------------- */
dialog._makeButtom = function(buttonPropertyArray) {
  var buttons = new Array();
  for(var i=0; i<buttonPropertyArray.length; i++) {
    /* ボタン用のタグを生成 */
    var btn = document.createElement('INPUT');
    btn.type = 'button';
    btn.name = 'dialog_btn_' + i;
    btn.value = buttonPropertyArray[i].caption;
    btn.className = 'btn';
    /* clickイベントリスナーをセット */
    dom.event.addEventListener(btn, 'click', dom._clear);
    var callback = buttonPropertyArray[i].callback
    dom.event.addEventListener(btn, 'click', callback);
    /* BUTTONタグのノードオブジェクトを配列に追加 */
    buttons.push(btn);
  }
  return buttons;
};

/* -------------------------------------------------------- */
/* シャドー・レイヤーを生成・表示 */
/* -------------------------------------------------------- */
dialog._makeShadowMask = function() {
  var shadow = document.createElement('DIV');
  shadow.id = 'dialog_shadow';
  document.body.appendChild(shadow);
  shadow.style.width = '100%';
  shadow.style.height = '100%';
  /* Internet Explorer 6対策*/
  var wsize = dom.misc.getWindowSize();
  var shadow_width = parseInt(shadow.offsetWidth);
  var shadow_height = parseInt(shadow.offsetHeight);
  if(shadow_width < wsize.width || shadow_height < wsize.height) {
    shadow.style.width = wsize.width + 'px';
    shadow.style.height = wsize.height + 'px';
    var shadowResize = function() {
      var new_wsize = dom.misc.getWindowSize();
      shadow.style.width = new_wsize.width + 'px';
      shadow.style.height = new_wsize.height + 'px';
    };
    dom.event.addEventListener(window, 'resize', shadowResize);
  }
}

/*-----------------------------------------------------------------*/
/* 要素をブラウザー表示領域中央に移動 */
/*-----------------------------------------------------------------*/
dialog._setPositionCenter = function(elm) {
  /* ブラウザー表示領域のサイズを取得 */
  var wsize = dom.misc.getWindowSize();
  /* 中心に移動 */
  var left = ( wsize.width - elm.offsetWidth ) / 2;
  elm.style.left = parseInt(left) + 'px';
  var top = ( wsize.height - elm.offsetHeight ) / 2;
  elm.style.top = parseInt(top) + 'px';
};
