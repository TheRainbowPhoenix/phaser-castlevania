import { State } from "../../engine/anim"
import { SpineObject } from "../../models/SpineObject"
import { Player } from "../Player"

export class IdleState extends State {
  next: number = 0

  enter(scene: Phaser.Scene, hero: Player) {
    // console.log('doing - IdleState')

    // hero.body.setVelocity(0, 0)

    // hero.states.transition('idle')

    // hero.spine.once('animationcomplete', () => {
    //   hero.states.transition('idle')
    // })

    hero.body.setVelocity(0, 0)
    hero.spine.play(`Idle_Sniper`, false, true)


    // hero.setVelocity(0)
    // hero.body.setVelocity(0, 0)
    // hero.spine.play(`Idle_Sniper`, false, false)
    // hero.spine.stop()

    this.next = Math.floor(Math.random() * 10)

    // console.log('doing - IdleState : ' + this.next)

    hero.spine.once('complete', () => {
      if (this.next >= 7) {
        hero.states.transition('swing')
      } else {
        hero.states.transition('idle')
      }
    })

    

    
  }

  // execute(scene: Phaser.Scene, hero: Player) {
    // console.log('doing - IdleState : ' + this.next)

  //   // let next = Math.floor(Math.random() * 10);

  //   // console.log('doing - IdleState : ' + next)

  //   // hero.body.setVelocity(0, 0)

  //   // if (next == 7) {
  //   //     hero.states.transition('swing')
  //   // }

  //   // hero.spine.once('complete', () => {
  //   //   console.debug('complete')
  //   //   hero.states.transition('idle')
  //   // })
    
    // hero.spine.once('complete', () => {
    //   console.debug('animationcomplete')
    //   // hero.states.transition('idle')
    //   this.next = Math.floor(Math.random() * 10)
    //   hero.states.transition('idle')
    // })

  //   // const { left, right, up, down, space, shift } = scene.keys

  //   // Transition to swing if pressing space
  //   // if (space.isDown) {
  //   //   this.stateMachine.transition('swing')
  //   //   return
  //   // }

  //   // Transition to dash if pressing shift
  //   // if (shift.isDown) {
  //   //   this.stateMachine.transition('dash')
  //   //   return
  //   // }

  //   // Transition to move if pressing a movement key
  //   // if (left.isDown || right.isDown || up.isDown || down.isDown) {
  //   //   this.stateMachine.transition('move')
  //   //   return
  //   // }
  // }
}

export class SwingState extends State {
  enter(scene: Phaser.Scene, hero: Player) {
    // console.log('doing - SwingState')

    hero.body.setVelocity(0, 0)
    hero.spine.play(`Dash_Forward`, false, true)

    // hero.states.transition('idle')

    hero.spine.once('complete', () => {
      hero.states.transition('idle')
    })
  }
}

