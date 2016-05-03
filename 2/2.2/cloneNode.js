/* onloadイベントハンドラーにinitDocument関数をセット */
onload = initDocument;

/* HTML文書が読み込まれたときに実行させる処理 */
function initDocument() {
  /* "複製"ボタンにonclickイベントハンドラーをセット */
  document.getElementById('copyBtn').onclick = copyItem;
}

function copyItem() {
  /* ULタグの要素ノードオブジェクト */
  var family = document.getElementById('family');
  /* 要素を複製 */
  var copy = family.cloneNode(true);
  /* id属性値を変更 */
  copy.id = 'family2';
  /* 複製した要素を表示 */
  document.body.appendChild(copy);
  /* 追加ボタンを無効にする */
  document.getElementById('copyBtn').disabled = true;
}
