/* --------------------------------------------------------*/
/* 設定 */
/* --------------------------------------------------------*/
var fancy_params = new Object();
fancy_params['icon_path'] = './';   /* アイコン画像ファイルへの相対パス */
fancy_params['icon_ext'] = '.png'; /* アイコン画像ファイルの拡張子 */
fancy_params['controls'] = new Object();

/* --------------------------------------------------------*/
/* HTML文書が読み込まれたときに実行させる処理 */
/* --------------------------------------------------------*/
dom.event.addEventListener(window, 'load', initDocument);
function initDocument() {
  for(var i=0; i<document.forms.length; i++) {
    /* FORMタグの要素ノードオブジェクト */
    var form = document.forms.item(i);
    /* FORMタグの数 */
    var n = form.elements.length;
    for(var j=n-1; j>=0; j--) {
      /* コントロールの要素ノードオブジェクト */
      var elm = form.elements.item(j);
      /* class属性値を評価 */
      if(elm.className != 'fancy') {continue;}
      /* 識別子を生成 */
      var id = 'fancy_'+i+'_'+j;
      /* INPUTタグを配列に格納 */
      fancy_params['controls'][id] = elm;
      /* ファンシー・コントロールに置換 */
      replaceFancyControl(elm, id);
    }
  }
}
/* --------------------------------------------------------*/
/* ファンシー・コントロールに置換 */
/* --------------------------------------------------------*/
function replaceFancyControl(elm, id) {
  /* コントロールの種類に応じて振り分け */
  if(elm.type == 'checkbox') {
    /* チェックボックスを置換 */
    replaceFancyCheckbox(elm, id);
  } else if(elm.type == 'radio') {
    /* ラジオボタンを置換 */
    replaceFancyRadio(elm, id);
  } else if(elm.type == 'select-one') {
    /* セレクトを置換 */
    replaceFancySelect(elm, id);
  }
}

/* --------------------------------------------------------*/
/* セレクト置換 */
/* --------------------------------------------------------*/
function replaceFancySelect(elm, id) {
  /* 左側 */
  var framel = document.createElement('DIV');
  framel.className = 'fancy_select_left';
  /* 右側 */
  var framer = document.createElement('DIV');
  framer.className = 'fancy_select_right';
  /* テキスト部 */
  var framem = document.createElement('DIV');
  framem.className = 'fancy_select_middle';
  framem.style.width = (elm.offsetWidth + +27) + 'px';
  /* 現在選択されている項目を表示 */
  var selectedopt = elm.options.item(elm.selectedIndex);
  /* アイコンを生成 */
  var icon = document.createElement('IMG');
  icon.id = id + '_icon';
  icon.className = 'fancy_select_icon';
  icon.src = fancy_params['icon_path'] + elm.id + elm.selectedIndex + fancy_params['icon_ext'];
  framem.appendChild( icon );
  /* テキストを生成 */
  var span = document.createElement('SPAN');
  span.className = 'fancy_select_text';
  span.id = id + '_text';
  span.appendChild( document.createTextNode(selectedopt.text) );
  framem.appendChild(span);
  /* フレームを生成 */
  var frame = document.createElement('DIV');
  frame.className = 'fancy_select';
  frame.id = id;
  frame.style.width = (elm.offsetWidth + 60) + 'px';
  frame.appendChild(framel);
  frame.appendChild(framem);
  frame.appendChild(framer);
  /* ファンシー・セレクトメニューに置き換え */
  elm.style.display = 'none';
  elm.parentNode.insertBefore(frame, elm);
  var dummy = document.createElement('DIV');
  dummy.style.clear = 'both';
  elm.parentNode.insertBefore(dummy, elm);
  /* ファンシーセレクトメニューにイベントリスナーをセット */
  dom.event.addEventListener(frame, 'click', fancySelectControl);
}

/* --------------------------------------------------------*/
/* プルダウン生成・削除 */
/* --------------------------------------------------------*/
function fancySelectControl(evt) {
  /* イベント伝播を抑止 */
  dom.event.stopPropagation(evt);
  /* デフォルト・アクションを抑止 */
  dom.event.preventDefault(evt);
  /* クリックされた要素 */
  var target = dom.event.target(evt);
  /* ファンシーセレクトのDIVタグを特定 */
  var frame = target;
  while( frame ) {
    if( frame.className == 'fancy_select' ) { break; }
    frame = frame.parentNode;
  }
  /* すでにプルダウンが表示されているかをチェック */
  var pulldown = document.getElementById(frame.id + '_pulldown');
  if( pulldown ) {
    /* すでに表示済みなら削除して終了 */
    pulldown.parentNode.removeChild(pulldown);
    return;
  }
  /* ファンシーセレクト中央のDIVタグを特定 */
  var framem = frame.getElementsByTagName('DIV').item(1);
  /* オリジナルのSELECTタグを特定 */
  var select = fancy_params['controls'][frame.id];
  /* プルダウンの表示位置を特定 */
  var framem_pos = dom.misc.getElementAbsPos(framem);
  var pulldown_left = framem_pos.x;
  var pulldown_top = framem_pos.y + framem.offsetHeight;
  /* プルダウンを生成 */
  var pulldown = document.createElement('DIV');
  pulldown.style.position = 'absolute';
  pulldown.style.left = pulldown_left + 'px';
  pulldown.style.top = pulldown_top + 'px';
  pulldown.style.width = framem.offsetWidth + 'px';
  pulldown.className = 'fancy_select_pulldown';
  pulldown.id = frame.id + '_pulldown';
  /* プルダウンの項目を生成 */
  for( var i=0; i<select.options.length; i++ ) {
    /* オリジナルのOPTIONタグ */
    var opt = select.options.item(i);
    /* ファンシープルダウンの項目を生成 */
    var item = document.createElement('DIV');
    item.className = 'fancy_select_item';
    item.id = frame.id + '_' + i;
    var icon = document.createElement('IMG');
    icon.className = 'fancy_select_icon';
    icon.src = fancy_params['icon_path'] + select.id + i + fancy_params['icon_ext'];
    item.appendChild( icon );
    var span = document.createElement('SPAN');
    span.className = 'fancy_select_text';
    span.appendChild( document.createTextNode(opt.text) );
    item.appendChild( span );
    /* プルダウンメニューに項目を追加 */
    pulldown.appendChild(item);
    /* イベントリスナーをセット */
    dom.event.addEventListener(item, 'click', fancySelectFix);
    dom.event.addEventListener(item, 'mouseover', fancySelectMouseover);
  }
  /* プルダウンを表示 */
  document.body.appendChild(pulldown);
}

/* --------------------------------------------------------*/
/* セレクトの項目がクリックされたときの処理 */
/* --------------------------------------------------------*/
function fancySelectFix(evt) {
  /* クリックされた要素 */
  var target = dom.event.target(evt);
  /* クリックされた項目を特定し、そのid属性値から、SELECTタグの */
  /* idと、選択項目のインデックス番号を特定 */
  var item = target;
  var select_id;
  var sindex;
  while( item ) {
    var m = new Array;
    if( m = item.id.match(/^(fancy_\d+_\d+)_(\d+)$/) ) {
      select_id = m[1];
      sindex = parseInt(m[2]);
      break;
    }
    item = item.parentNode;
  }
  /* 該当のプルダウンを特定 */
  var pulldown = target;
  while( pulldown ) {
    if(pulldown.className == 'fancy_select_pulldown') {
      break;
    }
    pulldown = pulldown.parentNode;
  }
  /* オリジナルのSELECTタグを特定 */
  var select = fancy_params['controls'][select_id];
  /* オリジナルのSELECTの確定項目を変更 */
  select.selectedIndex = sindex;
  /* ファンシーセレクトに確定項目を表示 */
  /* アイコン画像変更 */
  var icon_img = document.getElementById(select_id + '_icon');
  var icon_src = fancy_params['icon_path'] + select.id + sindex + fancy_params['icon_ext'];
  icon_img.src = icon_src;
  /* テキスト変更 */
  var text_span = document.getElementById(select_id + '_text');
  text_span.firstChild.nodeValue = select.options.item(sindex).text;
  /* プルダウンを削除 */
  pulldown.parentNode.removeChild(pulldown);
}

/* --------------------------------------------------------*/
/* セレクトのプルダウンのマウスオーバー時の処理 */
/* --------------------------------------------------------*/
function fancySelectMouseover(evt) {
  /* 対象の要素 */
  var item = dom.event.target(evt);
  if(item.nodeName == 'IMG' || item.nodeName == 'SPAN') {
    item = item.parentNode;
  }
  /* プルダウンのDIVタグを特定 */
  var pulldown = item;
  while( pulldown ) {
    if( pulldown.className == 'fancy_select_pulldown' ) { break; }
    pulldown = pulldown.parentNode;
  }
  /* 全項目のclass属性を変更 */
  for(var i=0; i<pulldown.childNodes.length; i++) {
    var elm = pulldown.childNodes.item(i);
    if(elm == item) {
      elm.className = 'fancy_select_item_mouseover';
    } else {
      elm.className = 'fancy_select_item';
    }
  }
  /* イベント伝播を抑止 */
  dom.event.stopPropagation(evt);
  /* デフォルト・アクションを抑止 */
  dom.event.preventDefault(evt);
}

/* --------------------------------------------------------*/
/* ラジオボタン置換 */
/* --------------------------------------------------------*/
function replaceFancyRadio(elm, id) {
  /* ラジオボタン画像のIMGタグを生成 */
  var img = document.createElement('IMG');
  img.className = 'fancy_radio';
  img.id = id;
  if(elm.checked == true) {
    img.src = 'radio1.png';
  } else {
    img.src = 'radio0.png';
  }
  /* INPUTタグを非表示*/
  elm.style.display = 'none';
  /* IMGタグを表示 */
  elm.parentNode.insertBefore(img, elm);
  /* IMGタグにclickイベントリスナーをセット */
  dom.event.addEventListener(img, 'click', radioClicked);
}

/* --------------------------------------------------------*/
/* ラジオボタンがクリックされたときのコールバック関数 */
/* --------------------------------------------------------*/
function radioClicked(evt) {
  /* クリックされたラジオボタンのIMGタグ */
  var img = dom.event.target(evt);
  var id = img.id;
  /* オリジナルのラジオボタンにチェックを入れる */
  fancy_params['controls'][id].checked = true;
  /* 画像を置き換える */
  for(var key in fancy_params['controls']) {
    var elm = fancy_params['controls'][key];
    if(elm.type != 'radio') { continue; }
    if(elm.name != fancy_params['controls'][id].name) { continue; }
    if(elm.checked == true) {
      document.getElementById(key).src = 'radio1.png';
    } else {
      document.getElementById(key).src = 'radio0.png';
    }
  }
  /* イベント伝播を抑止 */
  dom.event.stopPropagation(evt);
  /* デフォルト・アクションを抑止 */
  dom.event.preventDefault(evt);
}

/* --------------------------------------------------------*/
/* チェックボックス置換 */
/* --------------------------------------------------------*/
function replaceFancyCheckbox(elm, id) {
  /* ラジオボタン画像のIMGタグを生成 */
  var img = document.createElement('IMG');
  img.className = 'fancy_checkbox';
  img.id = id;
  /* オリジナルのチェックボックスにチェックを入れる */
  if(elm.checked == true) {
    img.src = 'checkbox1.png';
  } else {
    img.src = 'checkbox0.png';
  }
  /* INPUTタグを非表示*/
  elm.style.display = 'none';
  /* IMGタグを表示 */
  elm.parentNode.insertBefore(img, elm);
  /* IMGタグにclickイベントリスナーをセット */
  dom.event.addEventListener(img, 'click', checkboxClicked);
}

/* --------------------------------------------------------*/
/* チェックボックスがクリックされたときのコールバック関数 */
/* --------------------------------------------------------*/
function checkboxClicked(evt) {
  /* クリックされたチェックボックス画像のIMGタグ */
  var img = dom.event.target(evt);
  var id = img.id;
  /* オリジナルのチェックボックスにチェックを入れる */
  if(fancy_params['controls'][id].checked == true) {
    fancy_params['controls'][id].checked = false;
  } else {
    fancy_params['controls'][id].checked = true;
  }
  /* 画像を置き換える */
  for(var key in fancy_params['controls']) {
    var elm = fancy_params['controls'][key];
    var type = elm.type;
    if(type != 'checkbox') { continue; }
    if(elm.checked == true) {
      document.getElementById(key).src = 'checkbox1.png';
    } else {
      document.getElementById(key).src = 'checkbox0.png';
    }
  }
  /* イベント伝播を抑止 */
  dom.event.stopPropagation(evt);
  /* デフォルト・アクションを抑止 */
  dom.event.preventDefault(evt);
}
