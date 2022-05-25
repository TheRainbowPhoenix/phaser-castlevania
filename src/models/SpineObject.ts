
export class SpineObject extends Phaser.GameObjects.GameObject  {
  /* extends Phaser.GameObjects.GameObject */
  scene: Phaser.Scene
  spine: SpineGameObject
  body: Phaser.Physics.Arcade.Body
  //| Phaser.Physics.Arcade.StaticBody
  //| MatterJS.BodyType
  private scale: number
  skins: Array<string>
  attachments: Array<string>
  animations: Array<string>
  flipped: boolean

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    key?: string,
    animationName?: string,
    loop?: boolean
  ) {
    super(scene, 'custom-spine')

    this.flipped = false

    this.scene = scene
    this.spine = scene.add.spine(x, y, key, animationName, loop)
    this.spine.customParams = {
      skin: 0,
      animation: 0,
      attachment: 0,
    }

    this.spine.drawDebug = true
    this.spine.drawBones = true

    this.scale = 1

    //@ts-ignore
    this.scene.physics.add.existing(this.spine)
    this.body = this.spine.body as Phaser.Physics.Arcade.Body

    const bounds = this.spine.getBounds()

    // this.setSkin('Normal')

    // TODO
    // this.setAnimation('Idle_Sniper', true)
    // this.setAttachment('Slot_Sniper', 'Sniper_02')

    // console.log(
    //   'Hookable Slots: ',
    //   this.getSlots().forEach((element: spine.Slot, index, array) => {
    //     if (element.data.attachmentName !== null) {
    //       console.log(element.data.attachmentName)
    //     }
    //   })
    // )

    // console.log('Attachments: ', this.getAttachments())
    // console.log('Slots: ', this.getSlots())

    this.initPhysics()

    scene.game.events.emit('createdSpineObject', scene, this)

    this.spine.on('loadSpineSkin', this.setSkin, this)
    // scene.game.events.on('loadSpineSkin', this.setSkin, this)
  }

  isFlipX(): boolean {
    return this.flipped
  }

  setFlipX(flip: boolean) {
    this.flipped = flip

    if (flip) {
      this.body.setOffset(this.spine.width, 0)
      this.spine.setScale(-this.scale, this.scale)
    } else if (!flip) {
      this.body.setOffset(0, 0)
      this.spine.setScale(this.scale)
    }
  }

  setScale(scale: number) {
    this.scale = scale
    this.spine.setScale(scale)
  }

  setPhysicsSize(width: number, height: number) {
    this.body.setSize(width, height)
  }

  setSkin(name: string) {
    this.spine.setSkin(null)
    this.spine.setSkinByName(name)

    this.spine.emit('changedSkin', name, this)
  }

  setAnimation(animation: string, loop: boolean = false) {
    this.spine.play(animation, loop)
  }

  setAttachment(slotName: string, attachmentName: string) {
    this.spine.skeleton.setAttachment(slotName, attachmentName)
  }

  getAttachments() {
    return !!this.spine.skeleton.skin
      ? this.spine.skeleton.skin.attachments
      : []
  }

  getSlots() {
    return this.spine.skeleton.slots
  }

  initPhysics() {
    let gravity = 300
    // TODO: change gravity on slime and stuff
    this.body.setGravityY(gravity).setCollideWorldBounds()
    this.body.setCollideWorldBounds(true)
  }

  refreshBody() {
    this.body.updateFromGameObject();

    return this;
  }
}