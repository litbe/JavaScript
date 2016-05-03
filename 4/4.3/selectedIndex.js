/* loadイベントリスナーをセット */
dom.event.addEventListener(window, 'load', initDocument);

/* HTML文書が読み込まれたときに実行させる処理 */
function initDocument() {
  /* SELECTタグの要素ノードオブジェクト */
  var select = document.getElementById('pref');
  /* changeイベントのリスナーをセット */
  dom.event.addEventListener(select, 'change', reportSelectedItem);
}

function reportSelectedItem(evt) {
  /* SELECTタグの要素ノードオブジェクト */
  var select = dom.event.target(evt);
  /* 選択されたOPTIONタグ */
  var option = select.options.item(select.selectedIndex);
  /* 結果をアラート表示 */
  var msg = '';
  msg += "『" + option.text + "』が選択されました。\n";
  msg += "値は " + select.value + " です。";
  alert(msg);
}
