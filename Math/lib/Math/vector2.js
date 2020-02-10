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