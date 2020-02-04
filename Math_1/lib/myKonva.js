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

/******************************************************************************
 * 形状システム
 *****************************************************************************/
class Shape {

  axisX() {
    return new Konva.Line({
      points: points([c.l, 0, c.r, 0]),
      stroke: 'black',
      strokeWidth: 1,
    });
  }

  axisY() {
    return new Konva.Line({
      points: points([0, c.t, 0, c.d]),
      stroke: 'black',
      strokeWidth: 1,
    });
  }

  solidLine(width=2) {
    return new Konva.Line({
      points: points([0, 0, 0, 0]),
      stroke: 'black',
      strokeWidth: width,
    });
  }
  brokenLine(width=2) {
    return new Konva.Line({
      points: points([0, 0, 0, 0]),
      stroke: 'black',
      strokeWidth: width,
      dash:[5]
    });
  }

  dot1(color = "black") {
    return new Konva.Circle({
      radius:5,
      fill: color,
    })
  }

  text(text="", size=15, color="black"){
    return new Konva.Text({
      text,
      fontSize:size,
      fill:color,
    })
  }
}
const sShape = new Shape();

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
      this.layer.add(s);
    })
  }
  axisX() {
    this.layer.add(sShape.axisX());
    return this;
  }
  axisY() {
    this.layer.add(sShape.axisY());
    return this;
  }
  draw() {
    this.layer.draw();
  }
}

