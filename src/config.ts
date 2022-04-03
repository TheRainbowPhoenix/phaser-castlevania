import Phaser from 'phaser';

export default {
  title: 'Game',
  type: Phaser.AUTO,
  width: 800 * 1.5,
  height: 600 * 1.5,
  parent: 'phaser-example',
  physics: {
    default: 'arcade',
    arcade: {
      // gravity: { y: 300 },
      debug: true,
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
