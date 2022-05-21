export class DomDebugger {
  root: HTMLElement

  constructor(root: HTMLElement) {
    this.root = root
  }

  process(e: CustomEvent) {
    console.log(e.detail)

    let content = ''

    if (e.detail.name && e.detail.name === 'AnimGraph') {
      Object.keys(e.detail.states).forEach((name: string) => {
        if (name === e.detail.current) {
          content += `<div class="animCard prev">${name}<span></span></div>`
        } else if (name === e.detail.newState) {
          content += `<div class="animCard next">${name}<span></span></div>`
        } else {
          content += `<div class="animCard">${name}</div>`
        }
      })
    }

    this.root.innerHTML = content

    // TODO: create visual graph on screen !
  }
}