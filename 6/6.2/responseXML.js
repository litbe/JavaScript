/* ---------------------------------------------------------*/
/* HTML文書が読み込まれたときに実行させる処理 */
/* ---------------------------------------------------------*/
dom.event.addEventListener(window, 'load', initDocument);
function initDocument() {
  /* HTTPリクエスト送信 */
  var url = 'http://www.futomi.com/index.xml';
  var oHttp = dom.ajax.httpGetRequest(url, printHeadline);
  /* リクエストに失敗したときの処理 */
  if( ! oHttp) {
    dom.core.removeChildNodes(frame);
    frame.appendChild( document.createTextNode('現在はご利用頂けません。') );
  }
}

/* ---------------------------------------------------------*/
/* ロードしたRSSを表示 */
/* ---------------------------------------------------------*/
function printHeadline(oHttp) {
  /* HTTPレスポンスステータスが200(OK)かを評価 */
  if(oHttp.status != 200) {
    var msg = "現在はご利用頂けません。";
    frame.appendChild( document.createTextNode(msg) );
    return;
  }
  /* 受信したXMLデータ */
  var xml = oHttp.responseXML;
  /* DIVタグ */
  var frame = document.getElementById('frame');
  /* 各記事の情報を読み取り配列に格納 */
  var list = new Array();
  var items = xml.getElementsByTagName('item');
  for(var i=0; i<5; i++) {
    var obj = new Object();
    var nodes = items.item(i).childNodes;
    for( var j=0; j<nodes.length; j++ ) {
      var node = nodes.item(j);
      if( node.nodeType == 1 && node.hasChildNodes() && node.firstChild.nodeType == 3) {
        obj[node.nodeName] = node.firstChild.nodeValue;
      }
    }
    list.push(obj);
  }
  /* DIVタグの中身を削除 */
  dom.core.removeChildNodes(frame);
  /* HTMLを生成表示 */
  for( var i=0; i<list.length; i++ ) {
    /* 記事用DIVタグ生成 */
    var div = document.createElement('DIV');
    div.className = 'item';
    /* pubDate（日付）を解析し、"MM月DD日"に変換 */
    var m = list[i]['pubDate'].match(/^\w+,\s+(\d+)\s+(\w+)\s+(\d+)/);
    var oDate = new Date(m[2] + " " +  m[1] + ", " + m[3] + " 00:00:00");
    var month = oDate.getMonth() + 1;
    if(month < 10) { month = "0" + month; }
    var day = oDate.getDate();
    if(day < 10) { day = "0" + day; }
    div.appendChild( document.createTextNode("[" + month + "月" + day + "日] ") );
    /* Aタグ生成 */
    var anchor = document.createElement('A');
    anchor.href = list[i]['link'];
    anchor.appendChild( document.createTextNode(list[i]['title']) );
    div.appendChild(anchor);
    /* 記事用DIVを表示 */
    frame.appendChild(div);
  }
}
