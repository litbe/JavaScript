var weather = new Object();
weather.methods = new Object();
weather.params = new Object();
weather.params['days'] = new Array('today', 'tomorrow', 'dayaftertomorrow');
/* エリアID指定 */
weather.params['city'] = '63'; /* 東京 */

/* ---------------------------------------------------------*/
/* HTML文書が読み込まれたときに実行させる処理 */
/* ---------------------------------------------------------*/
weather.methods.initDocument = function() {
  for( var i=0; i<weather.params['days'].length; i++ ) {
    var day = weather.params['days'][i];
    var anchor = document.getElementById('weather_'+day);
    dom.event.addEventListener(anchor, 'click', weather.methods.requestWeather);
  }
  weather.methods.requestWeather();
};

/* ---------------------------------------------------------*/
/* 天気予報表示処理 */
/* ---------------------------------------------------------*/
weather.methods.requestWeather = function(evt) {
  var content = document.getElementById('weather_content');
  dom.core.removeChildNodes(content);
  content.appendChild( document.createTextNode('now loading...') );
  var day = 'today';
  if(evt) {
    var target = dom.event.target(evt);
    var m;
    if( m = target.id.match(/^weather_(\w+)$/) ) {
      day = m[1];
    }
    /* デフォルト・アクションの抑止 */
    dom.event.preventDefault(evt);
  }
  /* HTTPリクエスト送信 */
  var city = weather.params['city'];
  var url = "proxy.php?city=" + city + "&day="+day;
  var oHttp = dom.ajax.httpGetRequest(url, weather.methods.printWeather);
  /* リクエストに失敗したときの処理 */
  if( ! oHttp) {
    dom.core.removeChildNodes(content);
    content.appendChild( document.createTextNode('現在はご利用頂けません。') );
  }
}

/* ---------------------------------------------------------*/
/* ロードしたXMLを表示 */
/* ---------------------------------------------------------*/
weather.methods.printWeather = function(oHttp) {
  /* DIVタグ */
  var content = document.getElementById('weather_content');
  dom.core.removeChildNodes(content);
  /* HTTPレスポンスステータスが200(OK)かを評価 */
  if(oHttp.status != 200) {
    var msg = "現在はご利用頂けません。";
    content.appendChild( document.createTextNode(msg) );
    return;
  }
  /* 受信したXMLデータ */
  var xml = oHttp.responseXML;
  /* タイトル用のDIVタグ生成 */
  var titleElm = document.createElement('DIV');
  var titleNode = xml.getElementsByTagName('title').item(0);
  var titleText = titleNode.firstChild.nodeValue;
  titleElm.appendChild( document.createTextNode(titleText) );
  content.appendChild(titleElm);
  /* リクエストされたデータの地域に該当するlivedoor 天気情報のURL */
  var linkNode = xml.getElementsByTagName('link').item(0);
  var link = linkNode.firstChild.nodeValue;
  /* Aタグ生成 */
  var anchorElm = document.createElement('A');
  anchorElm.href = link;
  anchorElm.target = '_blank';
  /* IMGタグ生成 */
  var imgElm = document.createElement('IMG');
  var imageNode = xml.getElementsByTagName('image').item(0);
  for( var i=0; i<imageNode.childNodes.length; i++ ) {
    var elm = imageNode.childNodes.item(i);
    if(elm.nodeName == 'title') {
      imgElm.alt = elm.firstChild.nodeValue;
    } else if(elm.nodeName == 'url') {
      imgElm.src = elm.firstChild.nodeValue;
    } else if(elm.nodeName == 'width') {
      imgElm.width = elm.firstChild.nodeValue;
    } else if(elm.nodeName == 'height') {
      imgElm.height = elm.firstChild.nodeValue;
    }
  }
  anchorElm.appendChild(imgElm);
  content.appendChild(anchorElm);
  /* 天気 */
  var telopElm = document.createElement('DIV');
  var telopNode = xml.getElementsByTagName('telop').item(0);
  var telop = telopNode.firstChild.nodeValue;
  telopElm.appendChild( document.createTextNode(telop) );
  content.appendChild(telopElm);
}

/* ---------------------------------------------------------*/
/* HTML文書が読み込まれたときに実行させる処理 */
/* ---------------------------------------------------------*/
dom.event.addEventListener(window, 'load', weather.methods.initDocument);
