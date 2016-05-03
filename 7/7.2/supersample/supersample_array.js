/* 名前空間を定義 */
if( typeof supersample == 'undefined' ) {
  supersample = new Object();
}

/* ---------------------------------------------------------
* arrayクラス
* ------------------------------------------------------- */
/* コンストラクタをセット */
supersample.array = function(ary) {
  this.ary = ary;
}
/* prototypeにメソッドをセット */
supersample.array.prototype = {
  /* 配列をコピーするメソッド */
  copy: function() {
    var newary = new Array();
    for( var i=0; i<this.ary.length; i++ ) {
      newary.push( this.ary[i] );
    }
    return newary;
  },
  /* 引数に指定した文字列が配列にいくつ存在するかを調べるメソッド */
  find: function(string) {
    var match = 0;
    for( var i=0; i<this.ary.length; i++ ) {
      if( this.ary[i] == string ) {
        match ++;
      }
    }
    return match;
  }
};