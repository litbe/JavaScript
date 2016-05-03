/*----------------------------------------------- */
/* グローバル変数の初期化 */
/*----------------------------------------------- */
/* バナー情報 */
var banners = new Array(
  {
    "src":"banner1.gif",
    "title":"CGI/Perl専門サイト 『futomi's CGI Cafe』",
    "href":"http://www.futomi.com/"
  },
  {
    "src":"banner2.gif",
    "title":"携帯GPS位置情報ポートタル 『このへん.mobi』",
    "href":"http://konohen.mobi/"
  },
  {
    "src":"banner3.gif",
    "title":"サーバ監視サービス 『ServerPatrol.JP』",
    "href":"http://www.serverpatrol.jp/"
  }
);

/* バナー表示ミリ秒 */
var banner_interval_ms = 3000;

/* タイマーID */
var banner_tid;
/* 現在表示すべきバナーのインデックス番号 */
var banner_index = 0;

/*----------------------------------------------- */
/* HTMLの初期化 */
/*----------------------------------------------- */
/* onloadイベントハンドラーにinitDocument関数をセット */
onload = initDocument;
/* HTML文書が読み込まれたときに実行させる処理 */
function initDocument() {
  /* 最初のバナーを表示 */
  changeBanner();
  /* タイマーセット */
  banner_tid = setInterval(changeBanner, banner_interval_ms);
}
/*----------------------------------------------- */
/* バナー表示処理 */
/*----------------------------------------------- */
function changeBanner() {
  /* 表示すべきバナーデータを取り出す */
  var data = banners[banner_index];
  /* バナーのIMGタグを変更 */
  var img = document.getElementById('banner_img');
  img.setAttribute('src', data['src']);
  img.setAttribute('alt', data['title']);
  /* バナーのAタグを変更 */
  var anchor1 = document.getElementById('banner_anchor1');
  anchor1.setAttribute('href', data['href']);
  var anchor2 = document.getElementById('banner_anchor2');
  anchor2.setAttribute('href', data['href']);
  /* バナータイトルを変更 */
  anchor2.firstChild.nodeValue = data['title'];
  /* バナー表示インデックスをインクリメント */
  banner_index ++;
  if(banner_index >= banners.length) {
    banner_index = 0;
  }
}
