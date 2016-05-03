/* loadイベントリスナーをセット */
dom.event.addEventListener(window, 'load', initDocument);

/* HTML文書が読み込まれたときに実行させる処理 */
function initDocument() {
  /* DIVタグのノードオブジェクト */
  var box = document.getElementById('box');
  /* DIVタグにmousedownイベント・リスナーをセット */
  dom.event.addEventListener(box, 'mousedown', buttonReport);
  /* DIVタグにcontextmenuイベント・リスナーをセット */
  /* 右クリックのデフォルト・アクションを抑止する */
  dom.event.addEventListener(box, 'contextmenu', contextmenuStop);
}

/* どのマウス・ボタンが押されたかを判定表示する */
function buttonReport(evt) {
  /* 押されたボタンの判定 */
  var report = '';
  if(document.uniqueID) {
    /* Internet Explorerの場合 */
    if(evt.button == 0) {
      report = 'ボタンが押されていない';
    } else if(evt.button == 1) {
      report = '左ボタンを押した';
    } else if(evt.button == 2) {
      report = '右ボタンを押した';
    } else if(evt.button == 3) {
      report = '左右のボタンを同時に押した';
    } else if(evt.button == 4) {
      report = '真ん中のボタン（ホイール）を押した';
    } else if(evt.button == 5) {
      report = '左ボタンと真ん中のボタンを同時に押した';
    } else if(evt.button == 6) {
      report = '右ボタンを真ん中のボタンを同時に押した';
    } else if(evt.button == 7) {
      report = '左ボタン、真ん中のボタン、右ボタンを同時に押した';
    }
  } else {
    /* DOM準拠ブラウザーの場合 */
    if(evt.button == 0) {
      report = '左ボタンを押した';
    } else if(evt.button == 1) {
      report = '真ん中のボタン（ホイール）を押した';
    } else if(evt.button == 2) {
      report = '右ボタンを押した';
    }
  }
  /* 結果を表示 */
  document.getElementById('box').firstChild.nodeValue = report;
}

/* 右クリック時のデフォルト・アクションを抑止 */
function contextmenuStop(evt) {
  dom.event.preventDefault(evt);
}
