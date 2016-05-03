/* ---------------------------------------------------------*/
/* HTML文書が読み込まれたときに実行させる処理 */
/* ---------------------------------------------------------*/
dom.event.addEventListener(window, 'load', initDocument);
function initDocument() {
  /* HTTPリクエスト送信 */
  var d = new Date();
  var url = 'printdate.php?ts=' + d.getTime();
  var oHttp = dom.ajax.httpGetRequest(url, printDate);
  /* リクエストに失敗したときの処理 */
  if( ! oHttp) {
    dom.core.removeChildNodes(frame);
    frame.appendChild( document.createTextNode('エラー') );
  }
}

/* ---------------------------------------------------------*/
/* 日時を表示 */
/* ---------------------------------------------------------*/
function printDate(oHttp) {
  /* HTTPレスポンスステータスが200(OK)かを評価 */
  if(oHttp.status != 200) {
    var msg = "エラー";
    frame.appendChild( document.createTextNode(msg) );
    return;
  }
  /* 受信したテキスト */
  var text = oHttp.responseText;
  /* DIVタグ */
  var frame = document.getElementById('frame');
  /* 中身を削除 */
  dom.core.removeChildNodes(frame);
  /* データを表示 */
  frame.appendChild( document.createTextNode(text) );
}
