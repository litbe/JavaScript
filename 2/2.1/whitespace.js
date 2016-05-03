/* onloadイベントハンドラーにinitDocument関数をセット */
onload = initDocument;

/* HTML文書が読み込まれたときに実行させる処理 */
function initDocument() {
  /* ULタグを取り出す */
  var ul = document.getElementById('family');
  /* 子要素を取り出す */
  var children = dom.core.childNodes(ul);
  /* 子要素の数をアラート表示する */
  alert( children.length );
  /* "次郎"のLIタグの要素ノードオブジェクト */
  var jiro = children.item(1);
  /* 直前の要素ノードオブジェクト */
  var prev = dom.core.previousSibling(jiro);
  /* 直後の要素ノードオブジェクト */
  var next = dom.core.nextSibling(jiro);
  /* id属性値をアラート表示 */
  alert('直前：' + prev.id + "\n直後：" + next.id);
}
