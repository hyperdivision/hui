const onload = require('on-load')

const unloaders = Symbol('unloaders')

class Component {
  constructor (element, opts) {
    if (!opts) opts = {}

    this.element = element || document.createElement('div')
    this[unloaders] = []

    onload(this.element,
      this._onload.bind(this),
      this._onunload.bind(this),
      this.constructor
    )

    if (opts.onload) this.onload = opts.onload
    if (opts.onunload) this.onunload = opts.onunload
  }

  on (emitter, name, fn) {
    this[unloaders].push([ emitter, name, fn ])
    emitter.on(name, fn)
  }

  once (emitter, name, fn) {
    this[unloaders].push([ emitter, name, fn ])
    emitter.once(name, fn)
  }

  onload () {
    // overwrite me
  }

  onunload () {
    // overwrite me
  }

  _onload () {
    this.onload()
  }

  _onunload () {
    const list = this[unloaders]

    while (list.length) {
      const [ emitter, name, fn ] = list.pop()
      off(emitter, name, fn)
    }

    this.onunload()
  }
}

function off (e, name, fn) {
  if (e.off) e.off(name, fn)
  else e.removeListener(name, fn)
}

module.exports = Component
