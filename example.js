const Component = require('./')
const { EventEmitter } = require('events')

let tick = 0
const e = new EventEmitter()

const c = new Component({
  createElement () {
    return document.createElement('div')
  },

  onload () {
    console.log('component loaded')

    this.on(e, 'tick', tick => {
      console.log('ontick')
      this.element.innerText = 'tick: ' + tick
    })
  },

  onunload () {
    console.log('got unloaded')
  }
})

document.body.appendChild(c.element)

setInterval(() => e.emit('tick', tick++), 100)
setTimeout(() => document.body.removeChild(c.element), 1000)
