/* loadイベントリスナーをセット */
dom.event.addEventListener(window, 'load', initDocument);

/* HTML文書が読み込まれたときに実行させる処理 */
function initDocument() {
  /* documentにmousemoveイベント・リスナーをセット */
  dom.event.addEventListener(document, 'mousemove', mousePosReport);
}

/* マウス・ポインターの座標を判定表示する */
function mousePosReport(evt) {
  /* clientXプロパティ */
  document.getElementById('clientX').firstChild.nodeValue = evt.clientX;
  /* clientYプロパティ */
  document.getElementById('clientY').firstChild.nodeValue = evt.clientY;
  /* screenXプロパティ */
  document.getElementById('screenX').firstChild.nodeValue = evt.screenX;
  /* screenYプロパティ */
  document.getElementById('screenY').firstChild.nodeValue = evt.screenY;
}
