import { GameApp } from './GameApp'

import config from './config'

window.addEventListener('load', () => {
  window.game = new GameApp(config)

  const event = new CustomEvent('engine_ready', { detail: window.game })

  window.dispatchEvent(event)
})

// Debug only
// import { DomDebugger } from './engine/debug'

// let debugRoot: HTMLElement | null = document.getElementById("debug")
// if (debugRoot !== null) {
//   let debuger = new DomDebugger(debugRoot);

//   window.addEventListener('engine_debug', (e) => {
//     debuger.process(e);
//   })
// } 