/* -----------------------------------------------------------------
* supersample.arrayクラスの使い方
* --------------------------------------------------------------- */
var ary1 = new Array('yamada', 'sato', 'tanaka');
/* supersample.arrayクラスのインスタンスを生成 */
var a = new supersample.array(ary1);
/* ary1をary2にコピーし要素数を確かめる */
var ary2 = a.copy();
alert( "コピーされた配列ary2の要素数は" + ary2.length + "個です。");
/* 配列ary2に'sato'が含まれているかをチェック */
var msg = "配列ary2に'sato'が";
if( a.find('sato') > 0 ) {
  alert( msg + "含まれています。" );
} else {
  alert( msg + "含まれていません。" );
}

/* -----------------------------------------------------------------
* supersample.dateクラスの使い方
* --------------------------------------------------------------- */
/* supersample.dateクラスのインスタンスを生成 */
var d = new supersample.date(2007, 2, 29);
/* 2007年2月の最終日を表示 */
var day = d.daysOfMonth();
alert(d.y + "年" + d.m + "月の最終日は" + day+"日です。"); /* 28日 */
/* 存在しない日であれば警告表示 */
if( d.checkDate() == false ) {
  alert(d.y + "年" + d.m + "月" + d.d + "日は存在しない日付です。");
}

