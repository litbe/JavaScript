/* loadイベントリスナーをセット */
dom.event.addEventListener(window, 'load', initDocument);

/* HTML文書が読み込まれたときに実行させる処理 */
function initDocument() {
  /* 選択解除ボタン */
  var btn = document.getElementById('relBtn');
  /* clickイベントのリスナーをセット */
  dom.event.addEventListener(btn, 'click', relRadio);
}

function relRadio(evt) {
  /* ラジオボタンのリスト */
  var radios = document.getElementsByName('gender');
  /* チェック項目を判定しチェックを解除 */
  var checkedradio = null;
  for( var i=0; i<radios.length; i++ ) {
    var elm = radios.item(i);
    if(elm.checked == true) {
      checkedradio = elm;
      elm.checked = false;
    }
  }
  /* 結果をアラート表示 */
  if(checkedradio != null) {
    var msg = '';
    msg += "value属性値 " + checkedradio.value + " の項目が\n";
    msg += "チェックされていましたが、\n";
    msg += "それを解除しました。";
    alert(msg);
  }
}
