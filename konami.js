const KEY = Object.freeze({
  UP: "ArrowUp",
  DOWN: "ArrowDown",
  LEFT: "ArrowLeft",
  RIGHT: "ArrowRight",
  A: "a",
  B: "b"
})
const KONAMI_PATTERN = Object.freeze([
  KEY.UP,
  KEY.UP,
  KEY.DOWN,
  KEY.DOWN,
  KEY.LEFT,
  KEY.RIGHT,
  KEY.LEFT,
  KEY.RIGHT,
  KEY.B,
  KEY.A
])

const DEFAULT_SUCCESS_FUNCTION = () => console.log("Congrats!")

module.exports = class KonamiCatcher {
  currentKey = 0
  constructor({
    domToListen,
    pattern = KONAMI_PATTERN,
    successFunction = DEFAULT_SUCCESS_FUNCTION
  }) {
    this.onSuccess = successFunction
    this.pattern = pattern
    this.initListener(domToListen)
  }
  isSuccessful() {
    return this.pattern.length === this.currentKey
  }
  konamiCatcher(event) {
    if (event.key !== this.pattern[this.currentKey]) {
      this.currentKey = 0
      return
    }
    this.currentKey++
    if (this.isSuccessful()) {
      this.onSuccess()
    }
  }
  initListener(domElement) {
    domElement.addEventListener("keydown", this.konamiCatcher, false)
  }
}

