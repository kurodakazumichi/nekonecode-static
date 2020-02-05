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
 * Input Slider Component
 *****************************************************************************/
class InputSlider 
{
  static get defaultProps() {
    return {
      title: "タイトル",
      min    : -10,
      max    : 10,
      step   : 0.1,
      value  : 0,
      onInput: (e) => {},
      onChange: (e) => {},
    }
  }

  constructor(id, props) {
    // props初期化
    this.props = Object.assign(InputSlider.defaultProps, props);

    // dom初期化
    this.node = Util.id(id);
    this.label = null;
    this.value = null;
    this.input = null;

    // dom生成
    this.make();

    // event assign
    this.input.oninput = this.onInput.bind(this);
    this.input.onchange = this.onChange.bind(this);
  }

  make() {
    this.node.className = "inputSlider";
    this.makeLabel();
    this.makeValue();
    this.makeInput();
    this.node.appendChild(this.label);
    this.node.appendChild(this.value);
    this.node.appendChild(this.input);
  }

  makeLabel() {
    const {title} = this.props;
    this.label = Util.elm("label", {innerText:title})
  }

  makeValue() {
    const { value } = this.props;
    this.value = Util.elm("span", { innerText: value});
  }

  makeInput() {
    const { min, max, step, value } = this.props;
    this.input = Util.elm("input", { type:"range", min, max, step, value});
  }

  onInput(e) {
    this.props.onInput(e);
    this.value.innerText = e.target.value;
  }

  onChange(e) {
    this.props.onChange(e);
  }
}

/******************************************************************************
 * Label Text Component
 *****************************************************************************/
class LabelText {
  static defaultProps() {
    return {}
  }
  constructor(id, props) {
    this.props = Object.assign(LabelText.defaultProps, props);

    // dom初期化
    this.node = Util.id(id);
    this.label = null;
    this.span  = null;

    this.make();
  }

  make() {
    this.node.className = "labelText";
    this.label = Util.elm("label", { innerText: this.props.title });
    this.span = Util.elm("span", { innerText: this.props.text });

    this.node.appendChild(this.label);
    this.node.appendChild(this.span);
  }

  set text(value) {
    this.span.innerText = value;
  }
}

/******************************************************************************
 * Vector2
 *****************************************************************************/
class Vector2 {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  get magnitude() {
    const {x, y} = this;
    return Math.sqrt(x*x + y*y)
  }

  get normalize() {
    const { magnitude } = this;

    if (magnitude == 0) return {x:0, y:0}

    return {
      x: this.x/magnitude,
      y: this.y/magnitude
    };
  }

  
}