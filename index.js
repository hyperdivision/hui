const onload = require('fast-on-load')

const unloaders = Symbol('unloaders')
const updating = Symbol('updating')
const first = Symbol('first')
const element = Symbol('element')

module.exports = class Component {
  constructor (opts) {
    if (!opts) opts = {}

    this[element] = opts.element || null
    this[unloaders] = []
    this[updating] = false
    this[first] = true

    this.loaded = false

    if (opts.onload) this.onload = opts.onload
    if (opts.onunload) this.onunload = opts.onunload
    if (opts.render) this.render = opts.render
    if (opts.createElement) this.createElement = opts.createElement
  }

  get element () {
    if (!this[element]) this[element] = this.createElement()

    if (this[element] && this[first]) {
      this[first] = false
      onload(this[element],
        this._onload.bind(this),
        this._onunload.bind(this),
        this.constructor
      )
    }

    return this[element]
  }

  set element (el) {
    this[element] = el
  }

  on (emitter, name, fn) {
    this[unloaders].push([emitter, name, fn])
    on(emitter, name, fn)
  }

  once (emitter, name, fn) {
    this[unloaders].push([emitter, name, fn])
    once(emitter, name, fn)
  }

  off (emitter, name, fn) {
    off(emitter, name, fn)

    // swap and pop
    for (let i = 0; i < this[unloaders].length; i++) {
      const [e, n, f] = this[unloaders][i]
      if (e === emitter && n === name && f === fn) {
        this[unloaders][i] = this[unloaders][this[unloaders].length - 1]
        this[unloaders].pop()
      }
    }
  }

  update () {
    if (this[updating]) return
    this[updating] = true
    window.requestAnimationFrame(this._reallyUpdate.bind(this))
  }

  _reallyUpdate () {
    if (!this[updating]) return
    this[updating] = false
    this.render()
  }

  createElement () {
    // overwrite me
    return null
  }

  render () {
    // overwrite me
  }

  onload () {
    // overwrite me
  }

  onunload () {
    // overwrite me
  }

  _onload () {
    this.loaded = true
    this.onload()
    // if any listeners were attached in onload we trigger a rerender as state
    // may have changed between createElement or unload/load
    if (this[unloaders].length) this.render()
  }

  _onunload () {
    this.loaded = false
    this[updating] = false

    const list = this[unloaders]

    while (list.length) {
      const [emitter, name, fn] = list.pop()
      off(emitter, name, fn)
    }

    this.onunload()
  }
}

function on (e, name, fn) {
  if (e.on) e.on(name, fn)
  else if (e.addEventListener) e.addEventListener(name, fn)
}

function off (e, name, fn) {
  if (e.off) e.off(name, fn)
  else if (e.removeEventListener) e.removeEventListener(name, fn)
  else e.removeListener(name, fn)
}

function once (e, name, fn) {
  if (e.once) {
    e.once(name, fn)
  } else if (e.addEventListener) {
    e.addEventListener(name, fn, { once: true })
  }
}
