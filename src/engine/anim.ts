import { Player } from "../objects/Player"

export class StateMachine {
  initialState: string
  stateArgs: any[]
  possibleStates: { [name: string]: State }
  state?: string = undefined

  constructor(
    initialState: string,
    possibleStates: { [name: string]: State },
    stateArgs: any[] = []
  ) {
    this.initialState = initialState
    this.possibleStates = possibleStates
    this.stateArgs = stateArgs
    // this.state = null

    // State instances get access to the state machine via this.stateMachine.
    for (const state of Object.values(this.possibleStates)) {
      state.stateMachine = this
    }
  }

  _debug(args: {[key: string]: any}) {
    let payload = {
      name: 'AnimGraph',
      states: this.possibleStates,
      current: this.state,
      ...args,
    }
    const event = new CustomEvent('engine_debug', { detail: payload})

    window.dispatchEvent(event)
  }

  step() {
    // On the first step, the state is null and we need to initialize the first state.
    if (this.state === undefined || this.state === null) {
      this.state = this.initialState
      this.possibleStates[this.state].enter(...this.stateArgs)
    }

    // Run the current state's execute
    this.possibleStates[this.state].execute(...this.stateArgs)
  }

  transition(newState: string, ...enterArgs: []) {
    this._debug({newState: newState})
    this.state = newState
    this.possibleStates[this.state].enter(...this.stateArgs, ...enterArgs)
  }
}

export class State {
  stateMachine: StateMachine | undefined

  enter(scene: Phaser.Scene, hero: Player, ...args: any[]) {}

  execute(scene: Phaser.Scene, hero: Player, ...args: any[]) {}
}

