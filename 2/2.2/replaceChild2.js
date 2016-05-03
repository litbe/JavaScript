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
  /* "三郎"の複製 */
  var saburo_copy = saburo.cloneNode(true);
  /* 太郎を、複製した三郎に置き換える */
  family.replaceChild(saburo_copy, taro);
  /* ボタンを無効にする */
  document.getElementById('replaceBtn').disabled = true;
}
