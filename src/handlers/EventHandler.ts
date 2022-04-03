import { Store } from "../objects/Store"

export class EventHandler {
  store: Store
  playerEvents: Phaser.Events.EventEmitter

  constructor() {
    this.store = Store.getInstance()
    this.playerEvents = new Phaser.Events.EventEmitter()
  }

  doPlayerHit(value: number) {
    this.store.unwrap().data.health -= value

    console.log(`hit ! ${this.store.unwrap().data.health}`)

    if (this.store.unwrap().data.health <= 0) {
      console.log('Player iz ded')
      this.playerEvents.emit('player_death')
      //TODO: do player dead ?
    }
  }
}