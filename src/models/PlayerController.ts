import Mathf from "../helpers/Mathf";
import { BaseCharacter } from "./BaseCharacter";
import { IHAnimator } from "./IHAnimator";
import { IPlayerInput } from "./IPlayerInput";

export class PlayerController extends BaseCharacter implements IHAnimator {
  targetBoneName: string = 'Aim'
  rightHandBoneName: string = 'Hand_R9'
  aimCenterBoneName: string = 'Hand_L'
  downAnim: string = 'Down'
  downIdleAnim: string = 'Down_Idle'
  dashCost: number = 37
  playerState: string = 'Normal'
  isEnteringH: boolean = false
  hAnimController: any /* HAnimController */
  playerInput: IPlayerInput

  lastIsGround: boolean
  _energy: number
  energyRegeneration: number
  maxEnergy: number = 200.0

  get energy(): number {
    return this._energy
  }

  public set energy(v: number) {
    this._energy = Mathf.clamp(v, 0.0, this.maxEnergy)
  }

  jumpCount: number = 0
  extraJumpCount: number = 0

  get meetHCondition(): boolean {
    return true
    // base.Anim.AnimationName == DownIdleAnim;
  }

  public constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    key?: string,
    animationName?: string,
    loop?: boolean
  ) {
    super(scene, x, y, key, animationName, loop)

    // base.Anim.state.SetAnimation(0, Weapon.IdleAnimName, loop: true);

    this._energy = this.maxEnergy
    this.extraJumpCount = 1
  }

  public canAction(): boolean {
    throw new Error('Method not implemented.')
  }

  enterHAnim(tag: string, target: IHAnimator): boolean {
    throw new Error('Method not implemented.')
  }

  endHAnim(): boolean {
    throw new Error('Method not implemented.')
  }

  protected OnAttacked(): void {
    super.OnAttacked()
    // playAudio("Player_Behit", SoundType.SoundEffect, loop: false)
    if (this.playerState === 'Broke' /* && GameTool.probability(0.3) */) {
      this.Down()
    } else {
      this.setSpasticity()
    }
  }

  private Down(): void {
    console.log("Down")
    this.canBeInjured = false
  }

  private Up(): void {
    console.log('Up')

  }
}