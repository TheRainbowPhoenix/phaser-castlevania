import { writable, derived } from 'svelte/store'

function createScene() {
  const { subscribe, set, update } = writable({})

  return {
    subscribe,
    // increment: () => update((n) => n + 1),
    // decrement: () => update((n) => n - 1),
    reset: () => set({}),
    update,
    set,
  }
}

export const currentScene = createScene()
// export const currentScene = writable(0)


export function reducible(state, reducer) {
  const { update, subscribe } = writable(state)

  function dispatch(action) {
    update((state) => reducer(state, action))
  }

  return [{ subscribe }, dispatch]
}


// function createInspectedGameObject () {
//   const { subscribe, set, update } = writable({})

//   return {
//     subscribe,
//     // increment: () => update((n) => n + 1),
//     // decrement: () => update((n) => n - 1),
//     reset: () => set({}),
//     update,
//     set: (value) => {
//       console.log(value)
//       set(value)
//     }
//   }

// }

export const inspectedGameObject = writable({})
// export const inspectedGameObject = createInspectedGameObject()
// TODO override set and update to add .setTint(0xffff00)
