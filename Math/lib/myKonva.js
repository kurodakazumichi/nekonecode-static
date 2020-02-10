/******************************************************************************
 * 設定値を保持
 *****************************************************************************/
class Config {
  constructor() {
    this.w  = 1080;             // canvas width
    this.h  = 720;              // canvas height
    this.u  = 100;              // 1メモリあたりのpx
    this.hw = this.w/2;         // canvas widthの半分
    this.hh = this.h/2;         // canvas heightの半分
    this.calcLRTD();
  }

  setUnit(num) {
    this.u = num;
    this.calcLRTD();
  }

  calcLRTD() {
    this.r  = this.hw / this.u; // 右端の座標
    this.l  = -this.r;          // 左端の座標
    this.t  = this.hh / this.u; // 下端の座標
    this.d  = -this.t;          // 上端の座標   
  }
}
const c = new Config();

/******************************************************************************
 * 座標再計算関数
 *****************************************************************************/
const x = (_x) => {
  return _x * c.u + c.hw;
}
const y = (_y) => {
  return -_y * c.u + c.hh;
}
const xy = (_x, _y) => {
  return {x:x(_x), y:y(_y)};
}
const points = (list) => {
  return list.map((p, i) => {
    return (i%2 == 0)? x(p) : y(p);
  })
}
const invX = (x) => {
  return (x - c.hw) / c.u;
}
const invY = (y) => {
  return -((y - c.hh) / c.u);
}
const getLocalXY = (e) => {
  const x = e.target.x();
  const y = e.target.y();
  return {x:invX(x), y:invY(y)};
}

/******************************************************************************
 * 形状
 *****************************************************************************/
/** 形状基底クラス */
class Shape {
  constructor() {
    this.node = this.createNode();
  }

  /** 派生先で定義 */
  createNode() {}

  points(list) {
    this.node.setAttr("points", points(list)); return this;
  }
  strokeWidth(w) {
    this.node.setAttr("strokeWidth", w); return this;
  }
  dash(d) {
    this.node.setAttr("dash", [d]); return this;
  }
  stroke(c) {
    this.node.setAttr("stroke", c); return this;
  }
  radius(r) {
    this.node.setAttr("radius", r); return this;
  }
  fill(c) {
    this.node.setAttr("fill", c); return this;
  }
  x(_x) {
    this.node.setAttr("x", x(_x)); return this;
  }
  y(_y) {
    this.node.setAttr("y", y(_y)); return this;
  }
  xy(x, y) {
    this.x(x).y(y); return this;
  }
  text(text) {
    this.node.setAttr("text", text); return this;
  }
  fontSize(s) {
    this.node.setAttr("fontSize", s); return this;
  }
  visible(flg) {
    this.node.setAttr("visible", flg); return this;
  }
  draggable(flg = true) {
    this.node.setAttr("draggable", flg); return this;
  }
  pointerLength(len) {
    this.node.setAttr("pointerLength", len);
  }
  pointerWidth(width) {
    this.node.setAttr("pointerWidth", width);
  }

  onMouseMove(cb) {
    this.node.on('mousemove', cb);
    return this;
  }
  onDragMove(cb) {
    this.node.on('dragmove', cb);
    return this;
  }
}

/** Line */
class ShapeLine extends Shape
{
  createNode() {
    return new Konva.Line({
      stroke      : "black",
      strokeWidth : 1,
    });
  }
}

/** Circle */
class ShapeCircle extends Shape {
  createNode() {
    return new Konva.Circle();
  }
}

/** Text */
class ShapeText extends Shape {
  createNode() {
    return new Konva.Text();
  }
}

/** Arrow  */
class ShapeArrow extends Shape {
  createNode() {
    return new Konva.Arrow({
      strokeWidth:2, 
      pointerLength: 10,
      pointerWidth: 10,
      stroke:"black",
      fill : "black",
    });
  }
}

/******************************************************************************
 * 形状システム
 *****************************************************************************/
class ShapeSystem {

  axisX() {
    return new ShapeLine().points([c.l, 0, c.r, 0]);
  }

  axisY() {
    return new ShapeLine().points([0, c.t, 0, c.d]);
  }

  solidLine(width=2) {
    return new ShapeLine().strokeWidth(width);
  }
  brokenLine(width=2) {
    return new ShapeLine().strokeWidth(width).dash(5);
  }
  dot(color = "black") {
    return new ShapeCircle().radius(4).fill(color);
  }
  text(text="", size=15, color="black"){
    return new ShapeText().text(text).fontSize(size).fill(color);
  }
  arrow(width=2, color="black") {
    return new ShapeArrow().strokeWidth(width).stroke(color).fill(color);
  }
}
const sShape = new ShapeSystem();

/******************************************************************************
 * グラフ
 *****************************************************************************/
class Graph {
  constructor(id) {
    this.stage = new Konva.Stage({
      container: id,
      width    : c.w,
      height   : c.h,
    });

    this.layer = new Konva.Layer();
    this.stage.add(this.layer);
  }
  add(shapes) {
    Object.values(shapes).map((s) => {
      this.layer.add(s.node);
    })
  }
  axisX() {
    this.layer.add(sShape.axisX().node);
    return this;
  }
  axisY() {
    this.layer.add(sShape.axisY().node);
    return this;
  }
  draw() {
    this.layer.draw();
  }
}

