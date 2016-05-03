/* loadイベントリスナーをセット */
dom.event.addEventListener(window, 'load', initDocument);

/* HTML文書が読み込まれたときに実行させる処理 */
function initDocument() {
  /* DIVタグのノードオブジェクト */
  var box = document.getElementById('box');
  /* DIVタグにclickイベント・リスナーをセット */
  dom.event.addEventListener(box, 'click', keyReport);
}

/* どのキーを押しながらクリックされたかを判定表示する */
function keyReport(evt) {
  /* 押されたボタンの判定 */
  var report = '';
  if(evt.shiftKey == true) {
      report = 'Shift';
  } else if(evt.ctrlKey == true) {
      report = 'Ctrl';
  } else if(evt.metaKey == true) {
      report = 'Meta';
  }
  /* 結果を表示 */
  if(report == '') {
    report = 'どのキーも押されませんでした。';
  } else {
    report += 'キーを押しながらクリックされました。';
  }
  document.getElementById('box').firstChild.nodeValue = report;
}
