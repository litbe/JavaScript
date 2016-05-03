/* loadイベントリスナーをセット */
dom.event.addEventListener(window, 'load', initDocument);

/* HTML文書が読み込まれたときに実行させる処理 */
function initDocument() {
  /* フォームのリストを取得 */
  var formlist = document.forms;
  /* 1つ目のFORMタグのname属性 */
  var name1 = formlist.item(0).name;
  /* 2つ目のFORMタグのname属性 */
  var name2 = formlist.item(1).name;
  /* 結果をアラート表示 */
  alert('1つ目：'+ name1 +"\n2つ目：" + name2);
}
