# @hyperdivision/component

WIP, UI component class

## Usage

``` js
const Component = require('@hyperdivision/component')

class View extends Component {
  constructor () {
    super()
  }

  // only called once on first .element access
  createElement () {
    return someDomElement
  }

  onload () {
    console.log('component loaded')
    this.on(someEmitter, 'eventName', () => {
      console.log('this event listener is auto removed on unload')
    })
  }

  onunload () {
    console.log('component unloaded')
  }

  render () {
    console.log('you should update the rendering of your component here')
    console.log('called on the next raf tick when you call .update() debounced')
    this.element.someUpdates()
  }
}
```

Or you can use the shorthand if you are not subclassing

``` js
const view = new Component({
  element: someDomElement,
  onload () {
    console.log('component loaded')
  },
  onunload () {
    console.log('component unloaded')
  },
  render () {
    console.log('update the rendering')
  }
})
```

Call `component.update()` to trigger a rendering on the next raf. Multiple calls to `.update()` are automatically debounced.

## TODO

* Tests
