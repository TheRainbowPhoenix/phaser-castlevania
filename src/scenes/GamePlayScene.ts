import { Player } from "../objects/Player"

export class GamePlayScene extends Phaser.Scene {
  player: Player

  constructor() {
    super('GamePlayScene')
  }

  preload() {
    let SPINEBOY_KEY = "Girl"
    this.load.setPath('assets/girl/')
    this.load.spine(
      SPINEBOY_KEY,
      `${SPINEBOY_KEY}.json`,
      `${SPINEBOY_KEY}.atlas`
    )
  }

  create() {
    this.scene.run('GameUIScene')

    this.player = new Player(
      this,
      400 * 1.5,
      600 * 1.5,
      'Girl',
      'Idle_Knife',
      true
    )

    // this.setSkin('Normal')

    // initMapLayer()

    // TODO: wall colider camera
    this.cameras.main.startFollow(this.player.spine, true)
    this.cameras.main.setLerp(1, 0)

    this.player.setFlipX(true)
    this.physics.world.setBoundsCollision(true, false, false, true)

    this.initCollider()
  }

  initCollider() {}

  update(time: number, delta: number) {
    this.player.update(time, delta)
  }
}