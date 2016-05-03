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
  /* "次郎"のLIタグの要素ノードオブジェクト */
  var jiro = family.getElementsByTagName('LI').item(1);
  /* 次郎を削除 */
  family.removeChild(jiro);
  /* 追加ボタンを無効にする */
  document.getElementById('delBtn').disabled = true;
}
