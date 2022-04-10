import { EventHandler } from "../handlers/EventHandler";
import { SpineObject } from "./SpineObject";

enum moveDirection {
  right,
  left,
  default,
}

export class Player extends SpineObject {
  cursors: Phaser.Types.Input.Keyboard.CursorKeys
  eventHandler: EventHandler

  alive: boolean
  jumping: boolean
  jumpCount: number
  animWait: number
  dash: boolean
  dashCooldown: number
  moveDirection: moveDirection

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
    this.animWait = -1
    this.dashCooldown = -1
    this.moveDirection = moveDirection.right
    this.dash = false
  }

  initEvents() {
    this.eventHandler = new EventHandler()
    this.eventHandler.playerEvents.on('player_death', () => {
      this.alive = false
    })

    const ignoredEv = ['Idle_Knife']

    const handleEvent = (ev: spine.TrackEntry, name: string) => {
      if (ev.animation !== null && ev.animation.name !== 'Idle_Knife') {
        console.log(name, ev.animation)
      }
    }

    this.spine.on(
      'end',
      (ev) => {
        handleEvent(ev, 'end')
      },
      this
    )

    this.spine.on(
      'start',
      (ev) => {
        handleEvent(ev, 'start')
      },
      this
    )

    this.spine.on(
      'complete',
      (ev) => {
        handleEvent(ev, 'complete')
      },
      this
    )
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


      this.dash = this.cursors.shift.isDown && this.dashCooldown <= time

      let moveVelocity = this.dash ? 650 : 160

      /* Big logical table moment !

              | right | left  |
      dash    | 
      !dash   | 


      */

      if (this.animWait > 0 && this.animWait >= time) {
        // STOP PROCESSING MOVES !
        console.log('ignore')
        return;
      } else {
        this.animWait = -1
      }

      let newMoveDirection = this.moveDirection

      /* TODO:
        - case where player is going right and suddently press both left and right and dash to go back
        - case where player press both left and right and left ?
      */

      if (this.cursors.left.isDown) {
        newMoveDirection = moveDirection.left
      } else if (this.cursors.right.isDown) {
        newMoveDirection = moveDirection.right
      }

      let noFlip = (this.dash && newMoveDirection != this.moveDirection)

      if (this.cursors.left.isDown) {
        this.body.setVelocityX(-moveVelocity)

        if (this.isFlipX()) this.setFlipX(noFlip)

        // Move_Gun || Move_Knife

        if (this.dash || this.body.velocity.y == 0) {
          if (this.dash) {
            if (this.moveDirection == moveDirection.left) {
              this.spine.play('Dash_Forward', true, true)
              this.animWait = time + 0.34 * 1000
              // 1s dash cooldown
              this.dashCooldown = this.animWait + 1 * 1000
            } else {
              this.spine.play('Dash_Back', true, true)
              this.animWait = time + 0.34 * 1000
              this.dashCooldown = this.animWait + 1 * 1000
            }
          } else {
            this.moveDirection = moveDirection.left
            this.spine.play('Move_Knife', true, true)
          }
        }

        // this.player.anims.play('left', true)
      } else if (this.cursors.right.isDown) {
        this.body.setVelocityX(moveVelocity)

        if (!this.isFlipX()) this.setFlipX(!noFlip)

        if (this.dash || this.body.velocity.y == 0) {
          if (this.dash) {
            if (this.moveDirection == moveDirection.right) {
              this.spine.play('Dash_Forward', true, true)
              this.animWait = time + 0.34 * 1000
              this.dashCooldown = this.animWait + 1 * 1000
            } else {
              this.spine.play('Dash_Back', true, true)
              this.animWait = time + 0.34 * 1000
              this.dashCooldown = this.animWait + 1 * 1000
            }
          } else {
            this.moveDirection = moveDirection.right
            this.spine.play('Move_Knife', true, true)
          }
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

        this.jumping = true

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