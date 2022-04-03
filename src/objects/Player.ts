import { EventHandler } from "../handlers/EventHandler";
import { SpineObject } from "./SpineObject";

export class Player extends SpineObject {
  cursors: Phaser.Types.Input.Keyboard.CursorKeys
  eventHandler: EventHandler

  alive: boolean
  jumping: boolean
  jumpCount: number

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    key?: string,
    animationName?: string,
    loop?: boolean
  ) {
    super(scene, x, y, key, animationName, loop)
    // this.state = State.Run
    // this.spine.setDepth(Constants.Boy.depth)

    this.setScale(0.5)

    this.initStates()
    this.initEvents()

    this.initPhysics()

    this.initControls()

    this.initBullet()

    // this.spine.play('idle', true, true)
  }

  initStates() {
      this.alive = true
      this.jumping = false
      this.jumpCount = 0
  }

  initEvents() {
    this.eventHandler = new EventHandler()
    this.eventHandler.playerEvents.on('player_death', () => {
        this.alive = false
    })
  }

  initPhysics() {
    let gravity = 300
    // TODO: change gravity on slime and stuff
    this.body.setGravityY(gravity).setCollideWorldBounds()
  }

  initControls() {
    this.cursors = this.scene.input.keyboard.createCursorKeys()
  }

  initBullet() {}

  update(time: number, delta: number) {

    if (!this.alive) {
        // this.spine.play('Down', false, true)
        this.spine.play('Down_Idle', true, true)

    } else {
        if (this.cursors.space.isDown) {
          this.eventHandler.doPlayerHit(1)
        }

        if (this.body.velocity.y > 20) {
          this.jumping = false
          this.spine.play('Drop_Beifen', true, true)
          if (this.jumpCount > 0) {
              this.jumpCount = 0
          }
        }

        if (this.cursors.left.isDown) {
          this.body.setVelocityX(-160)

          if (this.isFlipX()) this.setFlipX(false)

          // Move_Gun || Move_Knife

          if (this.body.velocity.y == 0) {
            this.spine.play('Move_Knife', true, true)
          }

          // this.player.anims.play('left', true)
        } else if (this.cursors.right.isDown) {
          this.body.setVelocityX(160)

          if (!this.isFlipX()) this.setFlipX(true)

          if (this.body.velocity.y == 0) {
            this.spine.play('Move_Knife', true, true)
          }
          // this.player.anims.play('right', true)
        } else {
          this.body.setVelocityX(0)

          // this.spine.play('Idle_Knife', true, true)
        }

        if (this.body.velocity.y == 0 && this.body.velocity.x == 0) {
          this.spine.play('Idle_Knife', true, true)
        }
        if (this.cursors.up.isDown) {
            this.jumpCount += 1

            if (this.jumping) {
                if (this.jumpCount > 2) {
                  // 2 = MAX_JUMP
                  
                
                } else {
                  // Jump_Up_Double || Jump_Up
                  this.spine.play('Jump_Up_Double', false, true)
                  this.body.setVelocityY(-200)
                } 
            } else {
                this.spine.play('Jump_Up', false, true)
                this.body.setVelocityY(-250)
            }

            this.jumping = true;
            

          
          

          // Down: Drop_Down || Drop_Beifen
          // this.spine.play('Drop_Down', true, true)

          // Touch floor
          // Hup | Hup_HadGun | Hup_Knife | Hup_MeleeWeapon_04 | Hup_Rifle | Hup_Shootgun | Hup_Sniper | Hup_Submachine
        }

        if (this.jumping && this.jumpCount > 0 && this.body.velocity.y == 0) {
        //   this.jumping = false
        //   this.jumpCount = 0
        }
        // if (this.body.velocity.y > 40) {
        // this.spine.play('Drop_Beifen', true, true)
        // }
    }
  }
}