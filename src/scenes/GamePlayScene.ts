import { SpineObject } from "../models/SpineObject"
import { Player } from "../objects/Player"

export class GamePlayScene extends Phaser.Scene {
  player: Player
  npcTest: SpineObject

  controls: Phaser.Cameras.Controls.SmoothedKeyControl
  platforms: Phaser.Physics.Arcade.StaticGroup

  constructor() {
    super('GamePlayScene')
  }

  preload() {
    this.game.events.emit('preloadScene', 'GamePlayScene', this)

    // let SPINEBOY_KEY = 'Girl'
    // this.load.setPath('assets/girl/')
    // this.load.spine(
    //   SPINEBOY_KEY,
    //   `${SPINEBOY_KEY}.json`,
    //   `${SPINEBOY_KEY}.atlas`
    // )
  }

  create() {
    this.add.image(400, 625, 'labo_test')

    this.scene.run('GameUIScene')

    // BG Walls
    let bgWallsGroup = this.add.group()

    for (let pos = 0; pos < 6; pos++) {
      bgWallsGroup
        .create(-644 + 0 * 700, -84 - pos * 2 * 700, 'L_Wall03')
        .setName(`L_Wall 0`)
      bgWallsGroup
        .create(-644 + 1 * 700, -84 - pos * 2 * 700, 'L_Wall01')
        .setName(`L_Wall 1`)
      bgWallsGroup
        .create(-644 + 2 * 700, -84 - pos * 2 * 700, 'L_Wall01')
        .setName(`L_Wall 2`)
      bgWallsGroup
        .create(-644 + 3 * 700, -84 - pos * 2 * 700, 'L_Wall02')
        .setName(`L_Wall 3`)
      bgWallsGroup
        .create(-644 + 4 * 700, -84 - pos * 2 * 700, 'L_Wall01')
        .setName(`L_Wall 4`)
      bgWallsGroup
        .create(-644 + 5 * 700, -84 - pos * 2 * 700, 'L_Wall01')
        .setName(`L_Wall 5`)
      bgWallsGroup
        .create(-644 + 6 * 700, -84 - pos * 2 * 700, 'L_Wall03')
        .setName(`L_Wall 6`)

      bgWallsGroup
        .create(-644 + 0 * 700, 616 - pos * 2 * 700, 'L_Wall01')
        .setName(`L_Wall 10`)
      bgWallsGroup
        .create(-644 + 1 * 700, 616 - pos * 2 * 700, 'L_Wall01')
        .setName(`L_Wall 11`)
      bgWallsGroup
        .create(-644 + 2 * 700, 616 - pos * 2 * 700, 'L_Wall04')
        .setName(`L_Wall 12`)
      bgWallsGroup
        .create(-644 + 3 * 700, 616 - pos * 2 * 700, 'L_Wall01')
        .setName(`L_Wall 13`)
      bgWallsGroup
        .create(-644 + 4 * 700, 616 - pos * 2 * 700, 'L_Wall01')
        .setName(`L_Wall 14`)
      bgWallsGroup
        .create(-644 + 5 * 700, 616 - pos * 2 * 700, 'L_Wall01')
        .setName(`L_Wall 15`)
      bgWallsGroup
        .create(-644 + 6 * 700, 616 - pos * 2 * 700, 'L_Wall01')
        .setName(`L_Wall 16`)
    }

    // Floor
    let groundGroup = this.add.group()

    for (let grounds = 0; grounds <= 6; grounds++) {
      let groundImage = grounds == 5 ? 'L_Ground04' : 'L_Ground06'
      groundGroup
        .create(-642 + grounds * 700, 1006, groundImage)
        .setName(`L_Ground ${grounds}`)
    }

    // Player and stuff

    this.player = new Player(
      this,
      400 * 1.5,
      600 * 1.5,
      'Girl',
      'Idle_Knife',
      true
    )

    // this.npcTest = new SpineObject(
    //   this,
    //   100 * 1.5,
    //   600 * 1.5,
    //   'NPC_PYM',
    //   'animation',
    //   true
    // )
    // this.npcTest.setScale(0.5)
    // this.npcTest.setName('NPC PYM')

    // this.setSkin('Normal')

    // initMapLayer()

    // TODO: wall colider camera
    this.cameras.main.name = 'Main Camera'
    // Disable for manual mode
    this.cameras.main.startFollow(this.player.spine, true)

    this.cameras.main.setLerp(1, 0.2)

    this.player.setFlipX(true)
    this.physics.world.setBoundsCollision(true, false, false, true)

    this.physics.add.existing(this.player.spine)
    // this.player.body.setOffset(0, 120)
    this.player.body.setBounce(0.4, 0.4)
    this.player.body.setCollideWorldBounds(false)
    this.player.body.setGravityY(300)

    this.player.body.setSize(150, 480)
    this.player.body.setOffset(290, 5)
    this.player.body.updateFromGameObject()
    
    // let bodyBound = new Phaser.Geom.Rectangle(0, 0, );
    // this.player.body.setBoundsRectangle(bodyBound)
    // this.physics.add.existing(this.npcTest.spine)

    // Platforms

    this.platforms = this.physics.add.staticGroup()

    this.platforms
      .create(1462, 1182, 'L_Ground_D01')
      .setScale(62.14389, 1)
      .setName('Main ground 1')
      //.setPosition(x, y, z, w)
      //.setOrigin(x, y) (0.5, 0.5)
      //.setOffset(x, y)
      //.setSize(width, height, center)
      //.setBodySize(width, height, center)
      //.setBounce(x, y)
      //.setMass(value)
      //.setPushable(bool)
      //.setW, .setX, .setY, .setZ
      .refreshBody()

    this.platforms
      .create(-1128, 307, 'L_WallC01')
      .setName('L_WallC01')
      .setScale(1, 29)
      .refreshBody()

    this.platforms.create(-1128, 1182, 'L_WallC02').setScale(1, 1).refreshBody()

    // Test platforms
    this.platforms
      .create(600, -800, 'L_Ground_D01')
      .setName('Floating ground 1')
      .setScale(20, 1)
      .refreshBody()
    this.platforms
      .create(50, 50, 'L_Ground_D01')
      .setName('Floating ground 2')
      .setScale(20, 1)
      .refreshBody()
    this.platforms
      .create(750, -1520, 'L_Ground_D01')
      .setName('Floating ground 3')
      .setScale(20, 1)
      .refreshBody()

    this.initCollider()

    // Camera control code

    var cursors = this.input.keyboard.createCursorKeys()

    var controlConfig = {
      camera: this.cameras.main,
      // NumPad navigation like in VIM
      left: this.input.keyboard.addKey(
        Phaser.Input.Keyboard.KeyCodes.NUMPAD_FOUR
      ),
      right: this.input.keyboard.addKey(
        Phaser.Input.Keyboard.KeyCodes.NUMPAD_SIX
      ),
      up: this.input.keyboard.addKey(
        Phaser.Input.Keyboard.KeyCodes.NUMPAD_EIGHT
      ),
      down: this.input.keyboard.addKey(
        Phaser.Input.Keyboard.KeyCodes.NUMPAD_TWO
      ),
      zoomIn: this.input.keyboard.addKey(
        Phaser.Input.Keyboard.KeyCodes.NUMPAD_NINE
      ),
      zoomOut: this.input.keyboard.addKey(
        Phaser.Input.Keyboard.KeyCodes.NUMPAD_THREE
      ),
      acceleration: 0.3,
      drag: 0.01,
      maxSpeed: 1.2,
    }

    this.controls = new Phaser.Cameras.Controls.SmoothedKeyControl(
      controlConfig
    )

    // Bones control code

    /*
    var controlBones = Object.values(
      this.player.spine.skeletonData.ikConstraints
    )

    let player = this.player

    controlBones.forEach(({ name, bendDirection, order, bones }) => {
      bones.forEach((boneData) => {
        let name = boneData.name

        console.log(name)
        var bone = this.player.spine.findBone(name)
        console.log(bone.data.name, bone.worldX, bone.worldY)

        var control = this.add
          .circle(bone.worldX, 600 - bone.worldY, 4, 0xff00ff)
          .setData('bone', bone)

        control.setInteractive()

        this.input.setDraggable(control)

        this.input.on(
          'drag',
          function (pointer: any, gameObject: any, dragX: any, dragY: any) {
            gameObject.x = dragX
            gameObject.y = dragY

            var bone = gameObject.getData('bone')

            console.log(bone.data.name)

            var coords = this.spine.worldToLocal(
              dragX,
              dragY,
              player.spine.skeleton,
              bone
            )

            bone.x = coords.x
            bone.y = coords.y

            bone.update()
          },
          this
        )
      })
    })

    */

    this.game.events.emit('loadScene', 'GamePlayScene', this)
  }

  initCollider() {
    this.physics.add.collider(this.player, this.platforms)
    this.player.body.customBoundsRectangle.height = 1800
    this.player.refreshBody()
  }

  update(time: number, delta: number) {
    this.player.update(time, delta)
    // this.npcTest.update(time, delta)
    this.controls.update(delta)
  }
}