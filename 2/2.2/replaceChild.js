/* onloadイベントハンドラーにinitDocument関数をセット */
onload = initDocument;

/* HTML文書が読み込まれたときに実行させる処理 */
function initDocument() {
  /* ボタンにonclickイベントハンドラーをセット */
  document.getElementById('replaceBtn').onclick = replaceItem;
}

function replaceItem() {
  /* ULタグの要素ノードオブジェクト */
  var family = document.getElementById('family');
  /* "太郎"のLIタグの要素ノードオブジェクト */
  var taro = family.getElementsByTagName('LI').item(0);
  /* "三郎"のLIタグの要素ノードオブジェクト */
  var saburo = family.getElementsByTagName('LI').item(2);
  /* 太郎を三郎に置き換え、もともとあった三郎を削除 */
  family.replaceChild(saburo, taro);
  /* ボタンを無効にする */
  document.getElementById('replaceBtn').disabled = true;
}
