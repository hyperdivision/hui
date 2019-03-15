const Component = require('./')
const morph = require('nanomorph')

module.exports = class MorphComponent extends Component {
  render () {
    morph(this.element, this.createElement(), { childrenOnly: true })
  }
}
