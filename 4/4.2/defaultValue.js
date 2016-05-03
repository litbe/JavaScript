/* --------------------------------------------------- */
/* HTML文書が読み込まれたときに実行させる処理 */
/* --------------------------------------------------- */
dom.event.addEventListener(window, 'load', initDocument);
function initDocument() {
  /* テキストボックスの要素ノードオブジェクト */
  var box = document.getElementById('keyword');
  /* focusイベントのリスナーをセット */
  dom.event.addEventListener(box, 'focus', inputStart);
  /* blurイベントのリスナーをセット */
  dom.event.addEventListener(box, 'blur', inputEnd);
  /* テキストボックスの文字色を変更 */
  if(box.value == box.defaultValue) {
    box.style.color = '#888888';
  } else {
    box.style.color = '#000000';
  }
  /* フォームにsubmitイベントリスナーをセット */
  var form = document.forms.item(0);
  dom.event.addEventListener(form, 'submit', submitForm);
}

/* --------------------------------------------------- */
/* テキストボックスにフォーカスがあたった時の処理 */
/* --------------------------------------------------- */
function inputStart() {
  /* テキストボックスの要素ノードオブジェクト */
  var box = document.getElementById('keyword');
  /* 入力値とデフォルト値の違いをチェック */
  if(box.value == box.defaultValue) {
    /* デフォルト値を消去 */
    box.value = '';
    /* 文字色を黒へ */
    box.style.color = '#000000';
  }
}

/* --------------------------------------------------- */
/* テキストボックスからフォーカスが外れた時の処理 */
/* --------------------------------------------------- */
function inputEnd() {
  /* テキストボックスの要素ノードオブジェクト */
  var box = document.getElementById('keyword');
  /* 未入力ならデフォルト値を再セット */
  if(box.value == '') {
    /* デフォルト値をセット */
    box.value = box.defaultValue;
    /* 文字色をグレーへ */
    box.style.color = '#888888';
  }
}

/* --------------------------------------------------- */
/* フォーム送信処理 */
/* --------------------------------------------------- */
function submitForm(evt) {
  /* テキストボックスの要素ノードオブジェクト */
  var box = document.getElementById('keyword');
  /* 入力値をチェック */
  if( box.value == box.defaultValue ) {
    box.value = '';
  }
  /* フォーム送信 */
  document.forms.item(0).submit();
  /* デフォルト・アクションを抑止 */
  dom.event.preventDefault(evt);
}
