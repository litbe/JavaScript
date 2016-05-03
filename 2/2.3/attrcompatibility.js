/* onloadイベントハンドラーにinitDocument関数をセット */
onload = initDocument;

/* HTML文書が読み込まれたときに実行させる処理 */
function initDocument() {
  /* Aタグ要素ノードオブジェクト */
  var anchor = document.getElementById('anchor');
  /* getAttributeメソッドでhref属性を読み取る */
  var href1 = anchor.getAttribute('href');
  /* 属性プロパティでhref属性を読み取る */
  var href2 = anchor.href;
  /* アラートウィンドウに表示 */
  alert("getAttributeメソッドの場合："+href1+"\n属性プロパティの場合："+href2);
}
