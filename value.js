module.exports = class Value {
  constructor (value) {
    this._value = value
    this._needsRender = true
  }

  render () {
    if (!this._needsRender) return false
    this._needsRender = false
    return true
  }

  get value () {
    return this._value
  }

  set value (v) {
    this._needsRender = true
    this._value = v
  }
}
