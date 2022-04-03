import { BaseStateInterface, baseState } from "./BaseState"

export interface StoreDataInterface {
  data: BaseStateInterface
}

export class Store {
  private static instance: Store

  public static getInstance(dataObj: BaseStateInterface = baseState): Store {
    if (!Store.instance) {
      Store.instance = new Store(dataObj)
    }

    return Store.instance
  }

  signals: { [signal: string]: Array<Function> }
  events: Phaser.Events.EventEmitter
  _data: BaseStateInterface

  private constructor(dataObj: BaseStateInterface) {
    this.signals = {}
    this.events = new Phaser.Events.EventEmitter()
    this._data = dataObj

    this.observeData(this._data)
  }

  /**
   * Push an handler for a given signal
   * @param property signal name
   * @param signalHandler method handler
   */
  observe(property: string, signalHandler: Function): void {
    if (!this.signals[property]) {
      this.signals[property] = []
    }

    this.signals[property].push(signalHandler)
  }

  /**
   * Notify handlers for change
   * Also notify events with $signal_changed where "signal" is your signal name
   * @param signal signal name
   * @returns
   */
  notify(signal: string): void {
    if (!this.signals[signal] || this.signals[signal].length < 1) return

    this.signals[signal].forEach((signalHandler) => signalHandler())

    this.emit(`$${signal}_changed`)
  }

  /**
   * Make an array key reactive
   * @param obj array or object
   * @param key object key or array index
   */
  makeReactive(obj: { [key: string]: any }, key: string) {
    let val = obj[key]
    let parent = this

    Object.defineProperty(obj, key, {
      get() {
        return val
      },
      set(newVal) {
        val = newVal
        parent.notify(key)
      },
    })
  }

  /**
   * Make an entire object reactive
   * @param obj object
   */
  observeData(obj: { [key: string]: any }): void {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        this.makeReactive(obj, key)
      }
    }
  }

  /**
   * Manually emit event for update / refresh
   * @param event signal key
   */
  emit(event: string): void {
    this.events.emit(event)
  }

  /**
   * Obtains the store data
   * @returns
   */
  unwrap(): StoreDataInterface {
    return {
      data: this._data,
    }
  }
}