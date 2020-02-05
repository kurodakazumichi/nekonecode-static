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



