/*----------------------------------------------- */
/* グローバル変数の初期化 */
/*----------------------------------------------- */
/* テロップ移動間隔ミリ秒 */
var telop_interval_ms = 30;
/* テロップ移動間隔ピクセル */
var telop_interval_px = 1;

/* タイマーID */
var telop_tid;
/* テロップの内容 */
var telop_lines = new Array();
/* 最初に表示したいニュース記事のインデックス番号 */
var telop_index = 0;

/*----------------------------------------------- */
/* HTMLの初期化 */
/*----------------------------------------------- */
/* onloadイベントハンドラーにinitDocument関数をセット */
onload = initDocument;
/* HTML文書が読み込まれたときに実行させる処理 */
function initDocument() {
  /* テロップ初期化 */
  initTelop();
}
/*----------------------------------------------- */
/* テロップ表示処理 */
/*----------------------------------------------- */
function initTelop() {
  /* テロップ外枠 */
  var telop_div = document.getElementById('telop');
  /* ニュース記事収容枠 */
  var content_div = document.getElementById('telop_content');
  /* テロップの内容を取り出し、配列に格納 */
  var line_divs = content_div.getElementsByTagName('DIV');
  for( var i=0; i<line_divs.length; i++ ) {
    var line = line_divs.item(i).firstChild.nodeValue;
    telop_lines.push(line);
  }
  /* ニュース記事収容枠の内容をクリア */
  var content_div = document.getElementById('telop_content');
  dom.core.removeChildNodes(content_div);
  /* テロップ表示開始 */
  content_div.style.display = 'block';
  startTelop();
}

function startTelop() {
  /* 表示すべきニュース記事の特定 */
  var string = telop_lines[telop_index];
  /* ニュース記事収容枠の内容をクリア */
  var content_div = document.getElementById('telop_content');
  dom.core.removeChildNodes(content_div);
  /* ニュース記事をセット */
  content_div.appendChild( document.createTextNode(string) );
  /* ニュース記事収容枠をテロップ外枠の右端に移動 */
  var telop_div = document.getElementById('telop');
  content_div.style.left = telop_div.offsetWidth+'px';
  /* ニュース記事表示開始 */
  tid = setInterval(moveTelop, telop_interval_ms);
}

function moveTelop() {
  /* ニュース記事収容枠の左側の相対座標を取得 */
  var content_div = document.getElementById('telop_content');
  var current_left = parseInt(content_div.style.left);
  /* 左に移動した後の相対座標を計算 */
  var new_left = current_left - telop_interval_px;
  /* ニュース記事収容枠を左に移動 */
  if(new_left + content_div.offsetWidth > 0) {
    content_div.style.left = new_left + 'px';
  } else {
    /* タイマーを停止 */
    clearInterval(tid);
    /* 表示テロップのインデックスをインクリメント */
    telop_index ++;
    if(telop_index >= telop_lines.length) {
      telop_index = 0;
    }
    /* 次のテロップ表示開始 */
    startTelop();
  }
}
