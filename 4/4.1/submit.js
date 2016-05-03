/* loadイベントリスナーをセット */
dom.event.addEventListener(window, 'load', initDocument);

/* HTML文書が読み込まれたときに実行させる処理 */
function initDocument() {
  /* フォームにsubmitイベントリスナーをセット */
  var form = document.forms.item(0);
  dom.event.addEventListener(form, 'submit', submitForm);
}

/* フォーム送信処理 */
function submitForm(evt) {
  /* テキストボックスの要素ノードオブジェクト */
  var text1 = document.getElementById('text1');
  /* 入力値をチェック */
  if( text1.value == '' ) {
    /* エラー表示 */
    alert('この項目は必須です。');
  } else if( text1.value.match(/[^\d]/) ) {
    /* エラー表示 */
    alert('この項目には半角数字で入力してください。');
  } else {
    /* フォーム送信 */
    document.forms.item(0).submit();
  }
  /* デフォルト・アクションを抑止 */
  dom.event.preventDefault(evt);
}
