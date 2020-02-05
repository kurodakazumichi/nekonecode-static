/******************************************************************************
 * ２次関数
 *****************************************************************************/
class Quadratic 
{
  constructor() {
    this._a = this._b = this._c = this._p = this._q = 0;
  }

  //---------------------------------------------------------------------------
  // getter / setter
  //---------------------------------------------------------------------------
  /** aの操作 */
  get a() { return this._a; }
  set a(v) { this._a = Number(v); }

  /** bの操作 */
  get b() { return this._b; }
  set b(v) {
    this._b = Number(v);
    this._p = this.calcP_By_ab(this.a, this.b);
    this._q = this.calcQ_By_abc(this.a, this.b, this.c);
  }

  /** cの操作 */
  get c() { return this._c; }
  set c(v) {
    this._c = Number(v);
    this._q = this.calcQ_By_abc(this.a, this.b, this.c);
  }

  /** pの操作 */
  get p() { return this._p; }
  set p(v) {
    this._p = Number(v);
    this._b = this.calcB_By_ap(this.a, this.p);
    this._c = this.calcC_By_pq(this.p, this.q);
  }

  /** ｑの操作 */
  get q() { return this._q; }
  set q(v) {
    this._q = Number(v);
    this._c = this.calcC_By_pq(this.p, this.q);
  }

  /** 頂点 */
  get apex() {
    return { x: this.p, y: this.q }
  }

  /** 軸 */
  get axix() {
    return this.p;
  }

  /** 無効 */
  get isInvalid() {
    const { a } = this;
    if (isNaN(a)) return true;
    if (a == Math.abs(Infinity)) return true;
    return false;
  }

  //---------------------------------------------------------------------------
  // 初期化
  //---------------------------------------------------------------------------
  /**
   * y = ax^2 + bx + cの式で初期化する
   */
  initABC(a, b, c) {
    this._a = a, this._b = b, this._c = c;
    this._p = this.calcP_By_ab(a, b);
    this._q = this.calcQ_By_abc(a, b, c);
  }

  /**
   * y = a(x - p)^2 + qの式で初期化する
   * @param {*} a 
   * @param {*} p 
   * @param {*} q 
   */
  initAPQ(a, p, q) {
    this._a = a, this._p = p, this._q = q;
    this._b = this.calcB_By_ap(a, p);
    this._c = this.calcC_By_pq(p, q);
  }

  /**
   * 頂点(p, q)と通過する１点(x, y)の情報を元に初期化する 
   */
  initByApexAndPassPoint(p, q, x, y) {
    const a = this.calcA_By_pqxy(p, q, x, y);
    this.initAPQ(a, p, q);
  }

  //---------------------------------------------------------------------------
  // 計算
  //---------------------------------------------------------------------------

  /** a, b要素からpを求める */
  calcP_By_ab(a, b) {
    return -b / (2 * a);
  }

  /** a, b, c要素からqを求める */
  calcQ_By_abc(a, b, c) {
    return -((b**2) - (4 * a * c)) / (4 * a);
  }

  /** a, p要素からbを求める */
  calcB_By_ap(a, p) {
    return -2 * a * p;
  }

  /** p, q要素からcを求める */
  calcC_By_pq(p, q) {
    return p**2 + q;
  }

  /** 頂点pqと通過する１点xyから傾きを計算する */
  calcA_By_pqxy(p, q, x, y) {
    const nume = y - q;
    const deno = (x - p) ** 2;
    return nume / deno;
  }

  /** xからyを求める */
  fx(x) {
    if (this.isInvalid) return 0;

    const { a, p, q } = this;
    return a * ((x - p) * (x - p)) + q;
  }

  //---------------------------------------------------------------------------
  // 文字列
  //---------------------------------------------------------------------------
  /** 傾き */
  toAString(fixed = 1) {
    if (this.isInvalid) return "なし";
    return this.a.toFixed(fixed);
  }

  /** グラフの軸を表す文字列 */
  toAxisString(fixed = 1) {
    const axis = this.axix.toFixed(fixed);
    return `x=${axis}`;
  }

  /** グラフの頂点を表す文字列 */
  toApexString(fixed = 1) {
    const x = this.apex.x.toFixed(fixed);
    const y = this.apex.y.toFixed(fixed);
    return `(${x}, ${y})`
  }

  /** y=a(x-p)^2 + q 形式のLatex文字列 */
  toLatexStringAPQ(fixed = 1) {
    if (this.isInvalid) return "none";

    const a = this.a.toFixed(fixed);
    const p = this.p.toFixed(fixed);
    const q = this.q.toFixed(fixed);

    return `$$y=${a}(x - (${p})) + (${q})$$`;
  }

  /** y=ax^2+bx+c 形式のLatex文字列 */
  toLatexStringABC(fixed = 1) {
    if (this.isInvalid) return "none";

    const a = this.a.toFixed(fixed);
    const b = this.b.toFixed(fixed);
    const c = this.c.toFixed(fixed);
    return `$$y=${a}x^2 + (${b})x + (${c})$$`;
  }

  /** 二次関数に関する文字列 */
  toString() {
    const a = this.a;
    // 解説
    if (this.isInvalid) return "この２次関数は無効";

    if (a == 0) {
      return "水平線";
    } else if (a < 0) {
      return "上向きに凸である。";
    } else {
      return "下向きに凸である。";
    }
  }
}