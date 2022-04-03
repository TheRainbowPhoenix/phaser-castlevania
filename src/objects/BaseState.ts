export interface BaseStateInterface {
  health: number
  energy: number
  ecs: number
  transformed: boolean
  coins: number
  runSpeed: number
  jumpSpeed: number
}

export const baseState: BaseStateInterface = {
  // UI
  health: 200,
  energy: 100,
  ecs: 0,
  transformed: false,
  coins: 0,
  // Physics
  runSpeed: 500,
  jumpSpeed: 700,
}