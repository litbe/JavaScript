/* loadイベントリスナーをセット */
dom.event.addEventListener(window, 'load', initDocument);

/* HTML文書が読み込まれたときに実行させる処理 */
function initDocument() {
  /* 外側のDIVタグにclickイベント・リスナーをセット */
  var outer = document.getElementById('outer');
  dom.event.addEventListener(outer, 'click', outerChange);
  /* 内側のDIVタグにclickイベント・リスナーをセット */
  var inner = document.getElementById('inner');
  dom.event.addEventListener(inner, 'click', innerChange);
}

/* 外側のボックスの背景色を赤色にする */
function outerChange(evt) {
  var outer = document.getElementById('outer');
  outer.style.backgroundColor = '#ff0000';
}

/* 内側のボックスの背景色を白色にする */
function innerChange(evt) {
  var inner = document.getElementById('inner');
  inner.style.backgroundColor = '#ffffff';
  /* イベント伝播を抑止する */
  dom.event.stopPropagation(evt);
}

