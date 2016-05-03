/* onloadイベントハンドラーにinitDocument関数をセット */
onload = initDocument;

/* HTML文書が読み込まれたときに実行させる処理 */
function initDocument() {
  /* "追加"ボタンにonclickイベントハンドラーをセット */
  document.getElementById('addBtn').onclick = addItem;
}

function addItem() {
  /* LIタグの要素ノードオブジェクトを新たに生成する */
  var newLiElement = document.createElement('LI');
  /* テキストノードを新たに生成する */
  var textNode = document.createTextNode('四朗');
  /* テキストノードを新たに生成したLIタグに追加する */
  newLiElement.appendChild(textNode);
  /* 参照ノード（3番目のLIタグ）を特定する */
  var refChild = document.getElementsByTagName('LI').item(2);
  /* 新たに生成したLIタグをULタグの3番目の直前に追加する */
  document.getElementById('family').insertBefore(newLiElement, refChild);
  /* 追加ボタンを無効にする */
  document.getElementById('addBtn').disabled = true;
}
