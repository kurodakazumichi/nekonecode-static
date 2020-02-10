class MyMathJax {
  static preview(elm, text) {
    elm.innerHTML = text;
    MathJax.Hub.Queue(
      ["Typeset", MathJax.Hub, elm],
    );
  }
}