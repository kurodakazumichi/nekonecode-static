/******************************************************************************
 * 数学的な定義域
 *****************************************************************************/
class DomainOfDefinition {
  static get types() {
    return {
      Gr  :0,
      GrEq:1,
      Le  :2,
      LeEq:3
    }
  }

  constructor() {
    this._value = 0;
    this.type  = undefined;
  }

  get value() { return this._value; }
  set value(v) { this._value = Number(v); }

  set gr(v) {
    this.value = v;
    this.type = this.types.Gr;
  }
  set grEq(v) {
    this.value = v;
    this.type = this.types.GrEq;
  }
  set le(v) {
    this.value = v;
    this.type = this.types.Le;
  }
  set leEq(v) {
    this.value = v;
    this.type = this.types.LeEq;
  }

  undefined() {
    this.type = undefined;
  }

  get types() {
    return DomainOfDefinition.types;
  }

  get isUndefined() {
    return (this.type == undefined);
  }

  get isGr()   { return (this.type === this.types.Gr); }
  get isGrEq() { return (this.type === this.types.GrEq); }
  get isLe()   { return (this.type === this.types.Le); }
  get isLeEq() { return (this.type === this.types.LeEq); }

  /** 以上、以下のどちらかである */
  get isAboveOrBelow() {
    const { GrEq, LeEq } = this.types;
    return (this.type === GrEq || this.type === LeEq);
  }

  toString(char="x") {
    const { types } = this;

    switch(this.type) {
      case types.Gr  : return `${this.value} < ${char}`;      
      case types.GrEq: return `${this.value} <= ${char}`;
      case types.Le  : return `${char} < ${this.value}`;
      case types.LeEq: return `${char} <= ${this.value}`;
      default: return "";
    }
  }
}



/******************************************************************************
 * Util
 *****************************************************************************/
class Util {
  static id(id) {
    return document.getElementById(id);
  }
  static elm(tag, options) {
    let e = document.createElement(tag);

    Object.keys(options).map((key) => {
      e[key] = options[key];
    });
    return e;
  }
  static sign(num) {
    return (num < 0)? "-" : "+";
  }
  static abs(num) {
    return Math.abs(num);
  }

  static signed(num) {
    const sign = Util.sign(num);
    const abs  = Util.abs(num);
    return `${sign} ${abs}`
  }

  static toFixed(obj, num) {
    let r = {};

    Object.keys(obj).map((key) => {
      r[key] = obj[key].toFixed(num);
    });

    return r;
  }
}


/******************************************************************************
 * Application Base
 *****************************************************************************/
class AppBase {
  constructor() {
    this.beforeProc();
    this.initConfig();
    this.data = this.initData();
    this.graph = this.initGraph();
    this.shapes = this.makeShapes();
    this.graph.add(this.shapes);
    this.dom = this.makeDom();
  }

  /** 派生先で実装 */
  beforeProc() {}

  /** 設定の初期化 */
  initConfig() {
    c.setUnit(20);
  }

  /** 派生先で実装 */
  initData() { return {}; }

  /** グラフの初期化 */
  initGraph() {
    const graph = new Graph("container");
    graph.axisX().axisY();
    return graph;
  }

  /** 派生先で実装 */
  makeShapes() { return {}; }

  /** 派生先で実装 */
  makeDom(){ return {}; }

  /** 派生先で実装 */
  drawMath(){}

  /** 派生先で実装 */
  drawGraph(){}

  /** 派生先で実装 */
  drawInspector(){}

  /** 描画 */
  draw() {
    this.drawMath();
    this.drawGraph();
    this.drawInspector();
  }
}