import { baseState } from "../objects/BaseState"
import { Store } from "../objects/Store"

export class PreloadScene extends Phaser.Scene {
  constructor() {
    super('PreloadScene')
  }

  preload() {
    const SPINE_KEY = 'Girl'

    this.load.spine(
      `assets/girl/${SPINE_KEY}`,
      `assets/girl/${SPINE_KEY}.json`,
      `assets/girl/${SPINE_KEY}.atlas`
    )

    // this.load
    let store = Store.getInstance(baseState)

    this.registry.set('dummy', 42)
    this.registry.set('store', store)

    let data = store.unwrap().data
    data.health -= 10

    console.log(data.health)
  }
  
  create() {
    this.scene.start('GamePlayScene')
  }
}