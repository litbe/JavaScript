/* loadイベントリスナーをセット */
dom.event.addEventListener(window, 'load', initDocument);

/* HTML文書が読み込まれたときに実行させる処理 */
function initDocument() {
  /* SELECTタグの要素ノードオブジェクト */
  var select = document.getElementById('pref');
  /* OPTIONタグのリスト */
  var list = select.options;
  /* 全項目のテキストを取り出す */
  var msg = '';
  for( var i=0; i<list.length; i++ ) {
    var option = list.item(i);
    msg += option.value + " : " + option.text + "\n";
  }
  /* アラートウィンドウに表示 */
  alert(msg);
}
