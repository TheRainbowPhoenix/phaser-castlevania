import Phaser from 'phaser';

export default {
  title: 'Game',
  type: Phaser.AUTO,
  width: 800 * 1.5,
  height: 600 * 1.5,
  parent: document.getElementById('game'),
  hideBanner: true, // Hide the console banner
  input: {
    gamepad: true,
  },
  physics: {
    // default: 'matter',
    // matter: {
    //   debug: true
    // }
    default: 'arcade',
    arcade: {
      gravity: { y: 990 },
      debug: true,
    },
    fps: {
      target: 30,
      forceSetTimeOut: true,
    },
  },
  // pixelArt: true,
  // transparent: true,
  // scale:{
  //   zoom: 0.5
  // }
  // scene: {
  //   preload: preload,
  //   create: create,
  //   update: update,
  // },
}
