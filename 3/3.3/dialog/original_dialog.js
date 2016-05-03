/*-----------------------------------------------------------------*/
/* HTML文書が読み込まれたときに実行させる処理 */
/*-----------------------------------------------------------------*/
/* loadイベントリスナーをセット */
dom.event.addEventListener(window, 'load', initDocument);
function initDocument() {
  /* ボタン1 */
  var btn1 = document.getElementById('btn1');
  dom.event.addEventListener(btn1, 'click', showDialog1);
  /* ボタン2 */
  var btn2 = document.getElementById('btn2');
  dom.event.addEventListener(btn2, 'click', showDialog2);
  /* ボタン3 */
  var btn3 = document.getElementById('btn3');
  dom.event.addEventListener(btn3, 'click', showDialog3);
}

/*-----------------------------------------------------------------*/
/* 1つボタンのダイアログを表示 */
/*-----------------------------------------------------------------*/
function showDialog1(evt) {
  /* ボタン情報 */
  var buttonProperties = new Array(
    {
      "caption":"はい",
      "callback":resAction
    }
  );
  /* タイトル */
  var title = "1つボタンダイアログ";
  /* メッセージ */
  var msg = "ボタンがひとつだけのダイアログです。";
  msg += "「はい」を押すと、ダイアログが消えます。";
  /* ダイアログ表示 */
  dialog.show(title, msg, buttonProperties);
}

/*-----------------------------------------------------------------*/
/* 2つボタンのダイアログを表示 */
/*-----------------------------------------------------------------*/
function showDialog2(evt) {
  /* ボタン情報 */
  var buttonProperties = new Array(
    {
      "caption":"はい",
      "callback":resAction
    },
    {
      "caption":"いいえ",
      "callback":resAction
    }
  );
  /* タイトル */
  var title = "2つボタンダイアログ";
  /* メッセージ */
  var msg = "ボタンが2つあるダイアログです。";
  msg += "「はい」「いいえ」のいずれかを押してください。";
  /* ダイアログ表示 */
  dialog.show(title, msg, buttonProperties);
}

/*-----------------------------------------------------------------*/
/* 3つボタンのダイアログを表示 */
/*-----------------------------------------------------------------*/
function showDialog3(evt) {
  /* ボタン情報 */
  var buttonProperties = new Array(
    {
      "caption":"選択A",
      "callback":resAction
    },
    {
      "caption":"選択B",
      "callback":resAction
    },
    {
      "caption":"選択C",
      "callback":resAction
    }
  );
  /* タイトル */
  var title = "3つボタンダイアログ";
  /* メッセージ */
  var msg = "ボタンが3つあるダイアログです。";
  msg += "いずれかのボタンを押してください。";
  /* ダイアログ表示 */
  dialog.show(title, msg, buttonProperties);
}

/* ダイアログウィンドウのボタンが押されたときに */
/* 実行するコールバック関数 */
function resAction(evt) {
  /* 押されたボタンのINPUTタグのノードオブジェクト */
  var btn = dom.event.target(evt);
  /* 押されたボタンのname属性値とvalue属性値を表示 */
  var txt = "「" + btn.value + "」(" + btn.name + ")が押されました。";
  document.getElementById('res').firstChild.nodeValue = txt;
}

