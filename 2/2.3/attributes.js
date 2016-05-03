/* onloadイベントハンドラーにinitDocument関数をセット */
onload = initDocument;

/* HTML文書が読み込まれたときに実行させる処理 */
function initDocument() {
  /* Aタグ要素ノードオブジェクト */
  var anchor = document.getElementById('w3c');
  /* すべての属性を取り出す。*/
  var attrs = anchor.attributes;
  /* アラート表示 */
  var msg = '';
  for(var i=0; i<attrs.length; i++) {
    var name = attrs.item(i).nodeName;
    var value = attrs.item(i).nodeValue;
    /* 属性値がnullもしくは空の場合は無視 */
    if(value == null || value == '') {
      continue;
    }
    msg += name + " : " + value + "\n";
  }
  alert(msg);
}
