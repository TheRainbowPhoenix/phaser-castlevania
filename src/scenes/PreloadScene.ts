import { baseState } from "../objects/BaseState"
import { Store } from "../objects/Store"

export class PreloadScene extends Phaser.Scene {
  constructor() {
    super('PreloadScene')
  }

  preload() {
    this.load.glsl('bundle', 'assets/shaders/bundle2.glsl.js')

    const SPINE_KEY = 'Girl'

    // this.load.setPath('assets/girl/')
    this.load.spine(
      `${SPINE_KEY}`,
      `assets/girl/${SPINE_KEY}.json`,
      `assets/girl/${SPINE_KEY}.atlas`
    )

    this.load.spine(
      `NPC_PYM`,
      `assets/spine/NPC/NPC_PYM.json`,
      `assets/spine/NPC/NPC_PYM.atlas`
    )
    
    this.load.image('labo_test', 'assets/backgrounds/Laboratory_1.png')

    this.load.image('L_Wall01', 'assets/backgrounds/walls/L_Wall01.png')
    this.load.image('L_Wall02', 'assets/backgrounds/walls/L_Wall02.png')
    this.load.image('L_Wall03', 'assets/backgrounds/walls/L_Wall03.png')
    this.load.image('L_Wall04', 'assets/backgrounds/walls/L_Wall04.png')

    this.load.image('L_Ground_D01', 'assets/platforms/ground/L_Ground_D01.png')
    this.load.image('L_Ground04', 'assets/platforms/ground/L_Ground04.png')
    this.load.image('L_Ground06', 'assets/platforms/ground/L_Ground06.png')

    this.load.image('L_WallC01', 'assets/platforms/ground/L_WallC01.png')
    this.load.image('L_WallC02', 'assets/platforms/ground/L_WallC02.png')

    // this.load
    let store = Store.getInstance(baseState)

    this.registry.set('dummy', 42)
    this.registry.set('store', store)

    let data = store.unwrap().data
    data.health -= 10

    // console.log(data.health)
  }
  
  create() {
    this.scene.start('GamePlayScene')
  }
}