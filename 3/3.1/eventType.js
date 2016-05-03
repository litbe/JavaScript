/* loadイベントリスナーをセット */
dom.event.addEventListener(window, 'load', initDocument);

/* HTML文書が読み込まれたときに実行させる処理 */
function initDocument() {
  /* DIVタグの要素ノードオブジェクト */
  var box = document.getElementById('box');
  /* DIVタグにmouseoverイベント・リスナーをセット */
  dom.event.addEventListener(box, 'mouseover', specifyEventType);
  /* DIVタグにmouseoutイベント・リスナーをセット */
  dom.event.addEventListener(box, 'mouseout', specifyEventType);
  /* DIVタグにmousedownイベント・リスナーをセット */
  dom.event.addEventListener(box, 'mousedown', specifyEventType);
  /* DIVタグにmouseupイベント・リスナーをセット */
  dom.event.addEventListener(box, 'mouseup', specifyEventType);
}

function specifyEventType(evt) {
  /* イベントの種類を特定 */
  var eventType = evt.type;
  /* イベントの種類をDIVタグ内に表示 */
  var box = document.getElementById('box');
  box.firstChild.nodeValue = eventType + 'イベントを検知しました。';
}