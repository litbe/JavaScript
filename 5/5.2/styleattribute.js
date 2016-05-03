/* loadイベントリスナーをセット */
dom.event.addEventListener(window, 'load', initDocument);

/* HTML文書が読み込まれたときに実行させる処理 */
function initDocument() {
  /* LINKタグの要素ノードオブジェクト */
  var linknode = document.getElementsByTagName('LINK').item(0);
  /* 各種属性値をアラート表示 */
  var msg = '';
  msg += "href：" + linknode.href + "\n";
  msg += "rel：" + linknode.rel + "\n";
  msg += "title：" + linknode.title;
  alert(msg);
  /* href属性を切り替える */
  linknode.href = 'style2.css';
}
