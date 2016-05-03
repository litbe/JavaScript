/* loadイベントリスナーをセット */
dom.event.addEventListener(window, 'load', initDocument);

/* HTML文書が読み込まれたときに実行させる処理 */
function initDocument() {
  /* Aタグの要素ノードオブジェクト */
  var anchor = document.getElementById('anchor');
  /* Aタグにclickイベント・リスナーをセット */
  dom.event.addEventListener(anchor, 'click', popupMessage);
}

function popupMessage(evt) {
  alert('クリックされました。');
  /* デフォルト・アクションを抑止 */
  dom.event.preventDefault(evt);
}