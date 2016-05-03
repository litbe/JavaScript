/*-----------------------------------------------------------------*/
/* グローバル変数 */
/*-----------------------------------------------------------------*/
/* すでに拡大画像がキャッシュされたかを格納する連想配列 */
var cached = new Object();

/*-----------------------------------------------------------------*/
/* HTML文書が読み込まれたときに実行させる処理 */
/*-----------------------------------------------------------------*/
/* loadイベントリスナーをセット */
dom.event.addEventListener(window, 'load', initDocument);
function initDocument() {
  /* class属性に'pic'がセットされたIMGタグにclickイベント・リスナーをセット */
  var pics = document.getElementsByTagName('IMG');
  for(var i=0; i<pics.length; i++) {
    if(pics.item(i).className == 'pic') {
      dom.event.addEventListener(pics.item(i), 'click', initDisplayPic);
      cached[pics.item(i).id] = false;
    }
  }
}

/*-----------------------------------------------------------------*/
/* 拡大画像表示の準備処理 */
/*-----------------------------------------------------------------*/
function initDisplayPic(evt) {
  /* クリックされたサムネイルIMGタグのノードオブジェクト */
  var target = dom.event.target(evt);
  /* シャドーレイヤーを生成・表示 */
  showShadowLayer();
  /* now loadingをウィンドウの中心に表示 */
  showNowLoading();
  /* 拡大画像用IMGタグを生成・表示 */
  var bigimage = document.createElement('IMG');
  bigimage.src = target.parentNode.href;
  bigimage.alt = target.alt;
  bigimage.id = 'bigimage';
  bigimage.style.visibility = 'hidden';
  bigimage.style.cursor = 'pointer';
  document.body.appendChild(bigimage);
  /* bigimageにclickイベント・リスナーをセット */
  dom.event.addEventListener(bigimage, 'click', clearPic);
  if( cached[target.id] == true ) {
    /* 拡大画像がキャッシュ済みなら表示処理実行 */
    displayPic();
  } else {
    /* 拡大画像が未キャッシュならloadイベント・リスナーをセット */
    dom.event.addEventListener(bigimage, 'load', displayPic);
    cached[target.id] = true
  }
  /* デフォルト・アクションの抑止 */
  dom.event.preventDefault(evt);
}

/*-----------------------------------------------------------------*/
/* now loadingをウィンドウの中心に表示 */
/*-----------------------------------------------------------------*/
function showNowLoading() {
  var loading_div = document.createElement('DIV');
  loading_div.id = 'loading';
  loading_div.style.visibility = 'hidden';
  loading_div.appendChild( document.createTextNode('now loading...') );
  document.body.appendChild(loading_div);
  setPositionCenter(loading_div);
  loading_div.style.visibility = 'visible';
}

/*-----------------------------------------------------------------*/
/* シャドー・レイヤーを生成・表示 */
/*-----------------------------------------------------------------*/
function showShadowLayer() {
  var shadow = document.createElement('DIV');
  shadow.id = 'shadow';
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
/* 拡大画像表示処理 */
/*-----------------------------------------------------------------*/
function displayPic() {
  /* 拡大画像IMGタグのノードオブジェクト */
  var bigimage = document.getElementById('bigimage');
  /* 拡大画像がウィンドウの中心に位置するようセット */
  setPositionCenter(bigimage);
  /* now loadingを削除 */
  if( document.getElementById('loading') ) {
    loading_div = document.getElementById('loading');
    loading_div.parentNode.removeChild(loading_div);
  }
  /* 拡大画像表示 */
  bigimage.style.visibility = 'visible';
}

/*-----------------------------------------------------------------*/
/* 拡大画像をクリアする */
/*-----------------------------------------------------------------*/
function clearPic(evt) {
  /* 拡大画像用IMGタグの削除 */
  if( document.getElementById('bigimage') ) {
    var bigimage = document.getElementById('bigimage');
    bigimage.parentNode.removeChild(bigimage);
  }
  /* シャドーレイヤーの削除 */
  if( document.getElementById('shadow') ) {
    var shadow = document.getElementById('shadow');
    shadow.parentNode.removeChild(shadow);
  }
  /* デフォルト・アクションの抑止 */
  dom.event.preventDefault(evt);
}

/*-----------------------------------------------------------------*/
/* 要素をブラウザー表示領域中央に移動 */
/*-----------------------------------------------------------------*/
function setPositionCenter(elm) {
  /* ブラウザー表示領域のサイズを取得 */
  var wsize = dom.misc.getWindowSize();
  /* 中心に移動 */
  var left = ( wsize.width - elm.offsetWidth ) / 2;
  elm.style.left = parseInt(left) + 'px';
  var top = ( wsize.height - elm.offsetHeight ) / 2;
  elm.style.top = parseInt(top) + 'px';
}
