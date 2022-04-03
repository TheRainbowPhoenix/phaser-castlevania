import { GameApp } from './GameApp'

import config from './config'

window.addEventListener('load', () => {
  const game = new GameApp(config)
})