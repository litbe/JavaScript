/* loadイベントリスナーをセット */
dom.event.addEventListener(window, 'load', initDocument);

/* HTML文書が読み込まれたときに実行させる処理 */
function initDocument() {
  /* 外側のDIVタグにclickイベント・リスナーをセット */
  var outer = document.getElementById('outer');
  dom.event.addEventListener(outer, 'click', specifyTarget);
}

function specifyTarget(evt) {
  /* イベント・ターゲットとなる要素を特定 */
  var targetElm = dom.event.target(evt);
  /* イベント・ターゲットのid属性値をアラート表示 */
  alert(targetElm.id);
}