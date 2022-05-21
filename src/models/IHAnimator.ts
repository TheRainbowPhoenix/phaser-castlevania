export interface IHAnimator {
  meetHCondition: boolean

  enterHAnim(tag: string, target: IHAnimator): boolean
  endHAnim(): boolean
}
