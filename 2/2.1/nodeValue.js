/* onloadイベントハンドラーにinitDocument関数をセット */
onload = initDocument;

/* HTML文書が読み込まれたときに実行させる処理 */
function initDocument() {
  /* H1タグの要素ノードオブジェクト */
  var h1Node = document.getElementsByTagName('H1').item(0);
  /* H1タグのテキストノードオブジェクト */
  var h1TextNode = h1Node.firstChild;
  /* H1タグの文字をアラート表示 */
  alert(h1TextNode.nodeValue);
  /* H1タグのテキストを書き換える */
  h1TextNode.nodeValue = 'W3C';
}
