import { baseState, BaseStateInterface } from '../objects/BaseState'
import { Store } from '../objects/Store'

export class GameUIScene extends Phaser.Scene {
  coinsText: Phaser.GameObjects.Text
  energyText: Phaser.GameObjects.Text
  healthText: Phaser.GameObjects.Text
  ecsText: Phaser.GameObjects.Text

  store: Store

  constructor() {
    super('GameUIScene')
  }

  create() {
    this.store = this.registry.values.store

    // Debug test
    let data = this.store.unwrap().data
    // console.log(data.health)

    // this.store = this.registry.values.store.unwrap() || new Store(baseState).unwrap()

    this.setupUI()

    this.store.observe('coins', () => {
      this.coinsText.text = this.genCoinText(data.coins)
    })

    this.store.observe('energy', () => {
      this.energyText.text = this.genEnergyText(data.energy)
    })

    this.store.observe('health', () => {
      this.healthText.text = this.genHealthText(data.health)
    })

    this.store.observe('ecs', () => {
      this.ecsText.text = this.genECSText(data.ecs)
    })

    data.health -= 5
  }

  // Text-related methods
  genCoinText(value: number) {
    return `${value} Ɖ`
  }
  genEnergyText(value: number) {
    return `${value} %`
  }
  genHealthText(value: number) {
    return `${value} %`
  }
  genECSText(value: number) {
    return `${value} %`
  }

  setupUI() {
    let data = this.store.unwrap().data

    this.coinsText = this.add.text(100, 100, this.genCoinText(data.coins), {
      fontFamily: 'UI',
    })
    this.energyText = this.add.text(100, 120, this.genEnergyText(data.energy), {
      fontFamily: 'UI',
    })
    this.healthText = this.add.text(100, 140, this.genHealthText(data.health), {
      fontFamily: 'UI',
    })
    this.ecsText = this.add.text(100, 160, this.genECSText(data.ecs), {
      fontFamily: 'UI',
    })
  }

  refreshAllUI() {
    let data = this.store.unwrap().data

    this.coinsText.text = this.genCoinText(data.coins)
    this.energyText.text = this.genEnergyText(data.energy)
    this.healthText.text = this.genHealthText(data.health)
    this.ecsText.text = this.genECSText(data.ecs)
  }
}
