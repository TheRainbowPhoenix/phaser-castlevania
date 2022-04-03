import Phaser from 'phaser'

import GameScene from './scenes/Game'
import SpineDemo from './scenes/SpineDemo'

import 'phaser/plugins/spine/dist/SpinePlugin'
import { PreloadScene } from './scenes/PreloadScene'
import { GamePlayScene } from './scenes/GamePlayScene'
import { GameUIScene } from './scenes/GameUIScene'


/*
  PreloadScene,
  GamePlayScene,
  GameUIScene
*/


export class GameApp extends Phaser.Game {
  constructor(config: Phaser.Types.Core.GameConfig) {
    super(
      Object.assign(config, {
        scene: [PreloadScene, GamePlayScene, GameUIScene], // SpineDemo, GameScene
        plugins: {
          scene: [
            {
              key: 'SpinePlugin',
              plugin: window.SpinePlugin,
              mapping: 'spine',
            },
          ],
        },
      })
    )
  }
}
