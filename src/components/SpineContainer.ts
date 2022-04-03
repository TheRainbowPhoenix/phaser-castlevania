import Phaser from 'phaser'

export default class SpineContainer extends Phaser.GameObjects.Container {
  private sgo: SpineGameObject;

  get spine() {
    return this.sgo;
  }

  
}