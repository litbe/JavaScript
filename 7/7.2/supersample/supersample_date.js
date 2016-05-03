/* 名前空間を定義 */
if( typeof supersample == 'undefined' ) {
  supersample = new Object();
}

/* ---------------------------------------------------------
* dateクラス
* ------------------------------------------------------- */
/* コンストラクタをセット */
supersample.date = function(y, m, d) {
  this.y = y;
  this.m = m;
  this.d = d;
};
/* prototypeにメソッドをセット */
supersample.date.prototype = {
  /* 月末の日付を調べるメソッド */
  daysOfMonth: function() {
    var next_y = this.y;
    var next_m = this.m;
    if(next_m >= 12) {
      next_y ++;
      next_m = 0;
    }
    var d = new Date(next_y, next_m, 1);
    d.setTime( d.getTime() - 86400000 );
    return d.getDate();
  },
  /* 指定日が存在する日付かどうかをチェックするメソッド */
  checkDate: function() {
    if(this.m < 0 || this.m > 12) { return false; }
    if(this.d < 0 || this.d > 31) { return false; }
    if(this.d > this.daysOfMonth()) { return false; }
    return true;
  }
};