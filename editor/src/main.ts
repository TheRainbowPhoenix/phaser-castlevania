import Editor from './Editor.svelte'

new Editor({
  target: document.querySelector('#editor'),
  anchor: document.querySelector('#game'),
  // props: {
  //   game: document.querySelector('#game'),
  // },
})