/* onloadイベントハンドラーにinitDocument関数をセット */
onload = initDocument;

/* HTML文書が読み込まれたときに実行させる処理 */
function initDocument() {
  /* IMGタグ要素ノードオブジェクト */
  var gazou = document.getElementById('gazou');
  /* onclickイベントハンドラーをセット */
  gazou.onclick = function() {
    /* src属性を変更する */
    gazou.setAttribute('src', 'new.gif');
    /* alt属性を変更する */
    gazou.setAttribute('alt', '新しい画像');
  };
}
