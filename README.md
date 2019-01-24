# @hyperdivision/component

WIP, UI component class

## Usage

``` js
const Component = require('@hyperdivision/component')

class View extends Component {
  constructor () {
    super(anElement) // exposed as this.element
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
}
```

Or you can use the shorthand if you are not subclassing

``` js
const view = new Component(someElement, {
  onload () {
    console.log('component loaded')
  },
  onunload () {
    console.log('component unloaded')
  }
})
```

## TODO

* Add .render that calls .update internally that is raf'ed
* Tests
