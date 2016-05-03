/* ---------------------------------------------------------*/
/* HTML文書が読み込まれたときに実行させる処理 */
/* ---------------------------------------------------------*/
dom.event.addEventListener(window, 'load', initDocument);
function initDocument() {
  /* DIVタグにclickイベントリスナーをセット */
  var frame = document.getElementById('frame');
  dom.event.addEventListener(frame, 'click', loadText);
}

/* ---------------------------------------------------------*/
/* テキストデータをロード */
/* ---------------------------------------------------------*/
function loadText(evt) {
  /* DIVタグ内にローディング中メッセージを表示 */
  var frame = document.getElementById('frame');
  dom.core.removeChildNodes(frame);
  frame.appendChild( document.createTextNode('now loading...') );
  /* HTTPリクエスト送信 */
  var url = 'data.txt';
  var oHttp = dom.ajax.httpGetRequest(url, printText);
  /* リクエストに失敗したときの処理 */
  if( ! oHttp) {
    dom.core.removeChildNodes(frame);
    frame.appendChild( document.createTextNode('エラー') );
  }
}

/* ---------------------------------------------------------*/
/* ロードしたデータを表示 */
/* ---------------------------------------------------------*/
function printText(oHttp) {
  /* DIVタグ */
  var frame = document.getElementById('frame');
  /* 中身を削除 */
  dom.core.removeChildNodes(frame);
  /* HTTPレスポンスステータスが200(OK)かを評価 */
  if(oHttp.status == 200) {
    /* 受信したデータ */
    text = oHttp.responseText;
    /* データを表示 */
    frame.appendChild( document.createTextNode(text) );
  } else {
    var msg = "エラー";
    msg += "[" + oHttp.status + ":" + oHttp.statusText + "]";
    frame.appendChild( document.createTextNode(msg) );
  }
}
