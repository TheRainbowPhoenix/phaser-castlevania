import Mathf from "../helpers/Mathf";
import { SpineObject } from "./SpineObject";

export abstract class BaseCharacter extends SpineObject {
  protected moveDirection: Phaser.Math.Vector2
  protected moveVelocity: number
  // characterBody
  protected markDic: { [name: string]: number }

  protected useGravity: boolean = true
  private gravity: number = 7.0

  public attack: number
  public attackSpeed: number
  public moveSpeed: number

  /* Base Object */
  public canBeInjured: boolean
  public maxLife: number

  private _life: number = 0

  get life(): number {
    return this._life
  }

  public set life(v : number) {
    this._life = Mathf.clamp(v, 0.0, this.maxLife)
  }
  

  get isNoLife() { return this._life == 0 }

  private direction: integer = 0


  protected anim: any // TODO: SkeletonAnimation
  protected mesh: any // TODO: MeshRenderer

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    key?: string,
    animationName?: string,
    loop?: boolean
  ) {
    super(scene, x, y, key, animationName, loop)

    this.attackSpeed = 1.0
    this.moveDirection = Phaser.Math.Vector2.ZERO
    this.moveVelocity = 1.0

    // TODO: remove all passive
  }

  public initCharacter(
    maxLife: integer,
    attack: integer,
    moveSpeed: number
  ): void {
    // initObject(maxLife)
    this.attack = attack
    this.moveSpeed = moveSpeed
  }

  public changeAttack(value: number): void {
    this.attack += value
  }

  public changeMoveSpeed(value: number): void {
    this.moveVelocity += value
  }

  public changeMoveSpeedVelocity(value: number): void {
    this.moveVelocity += value
  }

  public abstract canAction(): boolean

  public setDirection(value: number): void {
    // Anim.Skeleton.ScaleX = ((!(value > 0f)) ? 1 : (-1));
  }

  public addPassiveSkill(
    type: any /* TODO: PassiveType */,
    passiveSkill: any /* PassiveSkillDelegate */
  ): void {
    // this.passiveDelDic[type] = combine(this.passiveDelDic[type], passiveSkill)
  }

  public removePassiveSkill(
    type: any /* TODO: PassiveType */,
    passiveSkill: any /* PassiveSkillDelegate */
  ): void {
    // this.passiveDelDic[type] = remove(this.passiveDelDic[type], passiveSkill)
  }

  public removeAllPassiveSkill(type: any /* TODO: PassiveType */): void {
    // this.passiveDelDic[type] = null
  }

  public addMark(mark: string, time: number): void {
    if (Object.keys(this.markDic).length == 0) {
      // startCoroutine(markTimeDown())
    }

    this.markDic[mark] = time
  }

  public hasMark(mark: string): boolean {
    return mark in this.markDic
  }

  public die(killer: any /* TODO: BaseObject */): void {
    // StopAllCoroutines
    this.markDic = {}
    this.moveVelocity = 1.0
    this.attackSpeed = 1.0
  }

  public strikedUp(speed: number): void {}
  public shootDown(speed: number): void {}

  public makeDisplacement(speed: number, direction: Phaser.Math.Vector2) {
    // startCoroutine(IE_Displacement(speed, direction))
  }

  public IE_Displacement(
    speed: number,
    direction: Phaser.Math.Vector2
  ): number {
    while (speed > 0.5) {
      // base.transform.position += speed * speed * Time.deltaTime * direction.normalized;
      speed *= 0.9
    }
    return speed
  }

  public hitDown(direction: number): void {}

  // TODO: makeSelfDisplacement, IE_SelfDisplacement

  protected getGround(): any /* TODO: Hit2D */ {
    // if CharacterRigibody.velocity.y <= 0.1f:
    //   return Physics2D.Raycast(base.transform.position, Vector2.down, 0.1f, (1 << LayerMask.NameToLayer("Ground")) | (1 << LayerMask.NameToLayer("Platform")));
    // else:
    //   return Physics2D.Raycast(base.transform.position, Vector2.down, 0.1f, 0);
  }

  private showShadow(): void {
    /*
    RaycastHit2D raycastHit2D = Physics2D.Raycast(Position, Vector2.down, 5f, (1 << LayerMask.NameToLayer("Ground")) | (1 << LayerMask.NameToLayer("Platform")));
		if ((bool)raycastHit2D)
		{
			Shadow.transform.position = raycastHit2D.point;
			float num = Vector2.Distance(raycastHit2D.point, Position);
			Shadow.color = new Color(1f, 1f, 1f, Mathf.Clamp01((5f - num) / 2f));
		}
		else
		{
			Shadow.color = new Color(1f, 1f, 1f, 0f);
		}
    */
  }

  public setSpasticity(): void {

  }

  // On-State
  public OnAttacked(): void {
    // super.OnAttacked()
    this.setSpasticity()
  }
}