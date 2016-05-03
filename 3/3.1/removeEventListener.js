/* loadイベントリスナーをセット */
dom.event.addEventListener(window, 'load', initDocument);

/* HTML文書が読み込まれたときに実行させる処理 */
function initDocument() {
  /* DIVタグにイベント・リスナーをセット */
  var box = document.getElementById('box');
  dom.event.addEventListener(box, 'click', changeBlockSize);
}

function changeBlockSize() {
  /* DIVタグの現在のサイズを取得 */
  var box = document.getElementById('box');
  var width = box.offsetWidth;
  var height = box.offsetHeight;
  /* サイズを倍にする */
  box.style.width = (width * 2) + 'px';
  box.style.height = (height * 2) + 'px';
  /* イベント・リスナーを解除 */
  dom.event.removeEventListener(box, 'click', changeBlockSize);
  /* 文字を変更 */
  box.firstChild.nodeValue = 'リスナーが解除されました。';
}