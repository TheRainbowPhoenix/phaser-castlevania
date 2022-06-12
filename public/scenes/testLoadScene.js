// @ts-check

class TestLoadScene extends Phaser.Scene {
  constructor() {
    super('TestLoadScene')
  }

  /** @type Phaser.GameObjects.Text */
  debugText

  create() {
    this.debugText = this.add.text(10, 200, 'debug gamepad', {
      fontFamily: 'UI',
    })
  }

  dummyGamePadTest() {
    if (this.input.gamepad.total === 0) {
      return // TODO: no gamepad, fallback ?
    }
    let debug = []

    /**
     * @type Phaser.Input.Gamepad.Gamepad[]
     */
    let pads = this.input.gamepad.gamepads

    for (let pad of pads) {
      if (!pad) {
        return
      }

      //  Timestamp, index. ID
      debug.push(pad.id)
      debug.push('Index: ' + pad.index + ' Timestamp: ' + pad.timestamp)

      //  Buttons
      var buttons = ''

      for (var b = 0; b < pad.buttons.length; b++) {
        var button = pad.buttons[b]
        buttons = buttons.concat(
          'B' + button.index + ': ' + button.value + '  '
        )
        // buttons = buttons.concat('B' + b + ': ' + button.value + '  ');
        if (b === 8) {
          debug.push(buttons)
          buttons = ''
        }
      }

      debug.push(buttons)

      //  Axis
      var axes = ''
      for (var a = 0; a < pad.axes.length; a++) {
        var axis = pad.axes[a]
        axes = axes.concat('A' + axis.index + ': ' + axis.getValue() + '  ')
        // axes = axes.concat('A' + a + ': ' + axis + '  ');
        if (a === 1) {
          debug.push(axes)
          axes = ''
        }
      }

      debug.push(axes)
      debug.push('')
    }
    this.debugText.setText(debug)
  }

  /**
   * @param {number} time
   * @param {number} delta
   */
  update(time, delta) {
    this.dummyGamePadTest()
  }
}
