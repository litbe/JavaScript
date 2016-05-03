var webSearch = new Object();
webSearch.methods = new Object();
webSearch.params = new Object();
/* 返却結果の数 */
webSearch.params['results'] = 5;
/* 検索対象サイトのドメイン（最大30個まで） */
webSearch.params['site'] = new Array(
  'www.futomi.com'
);

/* ---------------------------------------------------------*/
/* HTML文書が読み込まれたときに実行させる処理 */
/* ---------------------------------------------------------*/
webSearch.methods.initDocument = function() {
  webSearch.methods.requestSearch();
};

/* ---------------------------------------------------------*/
/* Yahoo! ウェブ検索Webサービスへリクエスト */
/* ---------------------------------------------------------*/
webSearch.methods.requestSearch = function() {
  /* 検索キーワードを取得 */
  webSearch.params['parameters'] = webSearch.methods.getParameters(document.URL);
  var query = webSearch.params['parameters']['query'];
  var start = webSearch.params['parameters']['start'];
  if( ! query ) { return false; }
  /* 検索フォームにキーワードをセット */
  document.getElementById('websearch_query').value = query;
  /* 現在表示されている結果を削除 */
  var contentElm = document.getElementById('websearch_content');
  dom.core.removeChildNodes(contentElm);
  contentElm.appendChild( document.createTextNode('now loading...') );
  /* HTTPリクエスト送信 */
  var results = webSearch.params['results'];
  var url = "proxy.php";
  url += "?query=" + encodeURIComponent(query);
  url += "&start=" + start;
  url += "&results=" + webSearch.params['results'];
  for( var i=0; i<webSearch.params['site'].length; i++ ){
    var site = webSearch.params['site'][i];
    url += "&site=" + encodeURIComponent(site);
  }
  var oHttp = dom.ajax.httpGetRequest(url, webSearch.methods.printResult);
  /* リクエストに失敗したときの処理 */
  if( ! oHttp) {
    dom.core.removeChildNodes(content);
    content.appendChild( document.createTextNode('現在はご利用頂けません。') );
  }
}

/* ---------------------------------------------------------*/
/* URIからパラメータを分離してオブジェクトで返す */
/* ---------------------------------------------------------*/
webSearch.methods.getParameters = function() {
  var search = window.location.search.replace(/^\?/, "");
  var pairs = search.split("&");
  var params = new Object();
  for( var i=0; i<pairs.length; i++ ) {
    var pair = pairs[i].split("=");
    var key = pair[0];
    var value = pair[1];
    if( value ) {
      value = pair[1].replace(/\+/g, "%20");
    }
    params[key] = decodeURIComponent(value);
  }
  if( ! params['start'] ) { params['start'] = 1; }
  return params;
}

/* ---------------------------------------------------------*/
/* 検索結果を表示 */
/* ---------------------------------------------------------*/
webSearch.methods.printResult = function(oHttp) {
  /* 現在表示されている結果を削除 */
  var contentElm = document.getElementById('websearch_content');
  dom.core.removeChildNodes(contentElm);
  /* HTTPレスポンスステータスが200(OK)かを評価 */
  if(oHttp.status != 200) {
    var msg = "現在はご利用頂けません。";
    contentElm.appendChild( document.createTextNode(msg) );
    return;
  }
  /* 受信したXMLデータ */
  var xml = oHttp.responseXML;
  /* 検索結果サマリーを生成 */
  var resSummaryFrame = webSearch.methods.generateResSummary(xml);
  /* 検索項目リストを生成 */
  var itemElms = webSearch.methods.generateItems(xml);
  /* ページナビゲーションを生成 */
  var pageNaviFrame = webSearch.methods.generatePageNavi(xml);
  /* 結果を表示 */
  var contentElm = document.getElementById('websearch_content');
  contentElm.appendChild(resSummaryFrame);
  for( var i=0; i<itemElms.length; i++ ) {
    contentElm.appendChild(itemElms[i]);
  }
  if( pageNaviFrame != null ) {
    contentElm.appendChild(pageNaviFrame);
  }
};

/* ---------------------------------------------------------*/
/* 検索結果サマリーを生成 */
/* ---------------------------------------------------------*/
webSearch.methods.generateResSummary = function(xml) {
  /* 検索結果数 */
  var ResultSetNode = xml.getElementsByTagName('ResultSet').item(0);
  var total = ResultSetNode.getAttribute('totalResultsAvailable');
  total = parseInt(total);
  /* 受信した結果数 */
  var returned = ResultSetNode.getAttribute('totalResultsReturned');
  returned = parseInt(returned);
  /* 取り出した結果の開始番号 */
  var start = ResultSetNode.getAttribute('firstResultPosition');
  start = parseInt(start);
  if(total == 0) { start = 0; }
  /* HTML要素を生成 */
  var resSummaryFrame = document.createElement('DIV');
  resSummaryFrame.className = 'ressummary';
  var textbox = document.getElementById('websearch_query');
  var text = "「" + textbox.value + "」で" + total + "件がヒットしました。";
  var end = start + returned - 1;
  if(end < 0) { end = 0; }
  text += start + "～" + end + "件目を表示しています。";
  resSummaryFrame.appendChild( document.createTextNode(text) );
  /* 生成した要素ノードオブジェクトを返す */
  return resSummaryFrame;
};

/* ---------------------------------------------------------*/
/* 検索項目リストを生成 */
/* ---------------------------------------------------------*/
webSearch.methods.generateItems = function(xml) {
  /* 取り出した結果の開始番号 */
  var ResultSetNode = xml.getElementsByTagName('ResultSet').item(0);
  var start = ResultSetNode.getAttribute('firstResultPosition');
  start = parseInt(start);
  var n = start;
  /* 項目リスト格納配列 */
  var items = new Array();
  /* 検索結果のリスト */
  var results = xml.getElementsByTagName('Result');
  for( var i=0; i<results.length; i++ ) {
    var elm = results.item(i);
    var itemFrame = document.createElement('DIV');
    /* タイトルを生成 */
    var TitleNode = elm.getElementsByTagName('Title').item(0);
    var title = TitleNode.firstChild.nodeValue;
    var ClickUrlNode = elm.getElementsByTagName('ClickUrl').item(0);
    var clickurl = ClickUrlNode.firstChild.nodeValue;
    var titleFrame = document.createElement('DIV');
    titleFrame.className = "title";
    var titleAnchor = document.createElement('A');
    titleAnchor.href = clickurl;
    titleAnchor.appendChild( document.createTextNode(title) );
    titleFrame.appendChild( document.createTextNode(n + ". ") );
    titleFrame.appendChild(titleAnchor);
    itemFrame.appendChild(titleFrame);
    /* テキストサマリーを生成 */
    var SummaryNode = elm.getElementsByTagName('Summary').item(0);
    var summary = '';
    if( SummaryNode && SummaryNode.hasChildNodes() ) {
      summary = SummaryNode.firstChild.nodeValue;
    }
    var summaryFrame = document.createElement('DIV');
    summaryFrame.className = "summary";
    summaryFrame.appendChild( document.createTextNode(summary) );
    itemFrame.appendChild(summaryFrame);
    /* URL生成 */
    var UrlNode = elm.getElementsByTagName('Url').item(0);
    var url = UrlNode.firstChild.nodeValue;
    var urlFrame = document.createElement('DIV');
    urlFrame.className = "url";
    urlFrame.appendChild( document.createTextNode(url) );
    itemFrame.appendChild(urlFrame);
    /* 項目を追加 */
    items.push(itemFrame);
    n ++;
  }
  /* 生成したHTML要素のリストを返す */
  return items;
};

/* ---------------------------------------------------------*/
/* ページナビゲーションを生成 */
/* ---------------------------------------------------------*/
webSearch.methods.generatePageNavi = function(xml) {
  /* 検索結果数 */
  var ResultSetNode = xml.getElementsByTagName('ResultSet').item(0);
  var total = ResultSetNode.getAttribute('totalResultsAvailable');
  total = parseInt(total);
  /* 受信した結果数 */
  var returned = ResultSetNode.getAttribute('totalResultsReturned');
  returned = parseInt(returned);
  /* 取り出した結果の開始番号 */
  var start = ResultSetNode.getAttribute('firstResultPosition');
  start = parseInt(start);
  if(total == 0) { start = 0; }
  /* DIVタグを生成 */
  var frameElm = document.createElement('DIV');
  frameElm.className = 'navi';
  if(total == 0 || total < webSearch.params['results']) {
    return null;
  }
  /* ナビゲーションURLを生成 */
  var common_href = window.location.pathname;
  var query = webSearch.params['parameters']['query'];
  common_href += "?query=" + encodeURIComponent(query);
  var results = webSearch.params['results'];
  common_href += "&results=" + results;
  for( var i=0; i<webSearch.params['site'].length; i++ ){
    var site = webSearch.params['site'][i];
    common_href += "&site=" + encodeURIComponent(site);
  }
  /* 前へ */
  if(start > 1) {
    var pAnchorElm = document.createElement('A');
    pAnchorElm.className = 'prev';
    var pstart = start - webSearch.params['results'];
    pAnchorElm.href = common_href + "&start=" + pstart;
    pAnchorElm.appendChild( document.createTextNode('前へ') );
    frameElm.appendChild(pAnchorElm);
  }
  frameElm.appendChild( document.createTextNode(' | ') );
  /* 次へ */
  if(start + returned - 1 < total) {
    var nAnchorElm = document.createElement('A');
    nAnchorElm.className = 'next';
    var nstart = start + webSearch.params['results'];
    nAnchorElm.href = common_href + "&start=" + nstart;
    nAnchorElm.appendChild( document.createTextNode('次へ') );
    frameElm.appendChild(nAnchorElm);
  }
  /* 生成したHTMLの要素ノードオブジェクトを返す */
  return frameElm;
}


/* ---------------------------------------------------------*/
/* HTML文書が読み込まれたときに実行させる処理 */
/* ---------------------------------------------------------*/
dom.event.addEventListener(window, 'load', webSearch.methods.initDocument);
