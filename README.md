# `hui`

[![Build Status](https://travis-ci.org/hyperdivision/hui.svg?branch=master)](https://travis-ci.org/hyperdivision/hui)

> Generic UI component class

## Usage

``` js
const Component = require('hui')

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
  createElement () {
    return someDomElement
  },
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

### Morph components

If your render method just involves reconstructing the entire dom of your element and then diffing it against the mounted one
you can use a morph component as a conveinience.

``` js
const Component = require('hui/morph')

const el = new Component({
  createElement () {
    return html`...` // this is called on every render
  }
})
```

## API

### `const Component = require('hui')`

Base component with manual rendering and hooks for load, unload and
automatic event life cycle

### `const MorphComponent = require('hui/morph')`

A auto morphing component using DOM diffing.

### `component.on(emitter, name, fn)`

`addEventListener` / `on` helper that auto gc's the listener on unload.

### `component.off(emitter, name, fn)`

`removeEventListener` / `off` helper that cancels out the above method.

### `component.loaded`

Boolean wheather or not the component is currently loaded.

### `component.element`

The DOM element attached.

### `component.update()`

Trigger a render in the next animation frame.

### `const html = require('hui/html')`

HTML with template strings

### `const raw = require('hui/html/raw')`

Prevent escaping with template strings

### `const css = require('hui/css')`

Inline css styles

### `const guard = require('hui/guard')`

Protect a DOM subtree against morphing

## Install

```sh
npm install hui
```

## License

[ISC](LICENSE)
