/* onloadイベントハンドラーにinitDocument関数をセット */
onload = initDocument;

/* HTML文書が読み込まれたときに実行させる処理 */
function initDocument() {
  /* "削除"ボタンにonclickイベントハンドラーをセット */
  document.getElementById('delBtn').onclick = delItem;
}

function delItem() {
  /* ULタグの要素ノードオブジェクト */
  var family = document.getElementById('family');
  /* 子要素を削除 */
  dom.core.removeChildNodes(family);
  /* 追加ボタンを無効にする */
  document.getElementById('delBtn').disabled = true;
}
