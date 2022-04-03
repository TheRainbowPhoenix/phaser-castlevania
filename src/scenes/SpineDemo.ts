import Phaser from "phaser";

const SPINEBOY_KEY = "Girl";

export default class SpineDemo extends Phaser.Scene {
  girl: SpineGameObject;
  skins: Array<string>;
  attachments: Array<string>;
  animations: Array<string>;

  constructor() {
    super("spine-demo");
  }

  preload() {
    this.load.setPath("assets/girl/");
    this.load.spine(
      SPINEBOY_KEY,
      `${SPINEBOY_KEY}.json`,
      `${SPINEBOY_KEY}.atlas`
    );
  }

  create() {
    this.girl = this.add.spine(
      400 * 1.5,
      600 * 1.5,
      SPINEBOY_KEY,
      "Idle_HandGun",
      true
    );
    this.girl.customParams = {
      skin: 0,
      animation: 0,
      attachment: 0,
    };
    // window.scene = this;

    this.setSkin("Normal");

    // this.girl.setMix("walk", "idle", 0.3);
    // this.girl.setMix("idle", "walk", 0.3);

    // replace "-" by " "
    let allSlots = {
      Slot_CrossBow01: ['CrossBow_4'],
      Slot_CrossBow02: ['CrossBow_1'],
      Slot_CrossBow03: ['CrossBow_3'],
      Slot_CrossBow04: ['CrossBow_2'],
      Slot_Grenade: ['Grenade'],
      Slot_HandGun: [
        'HandGun_01',
        'HandGun_02',
        'HandGun_03',
        'HandGun_04',
        'HandGun_05',
      ],
      Slot_MeleeWeapon: [
        'MeleeWeapon_01',
        'MeleeWeapon_02',
        'MeleeWeapon_03',
        'MeleeWeapon_04_2',
      ],
      Slot_Rifle: ['Rifle_01', 'Rifle_02', 'Rifle_03'],
      Slot_ShootGun: [
        'ShootGun_01',
        'ShootGun_02',
        'ShootGun_03',
        'ShootGun_04',
      ],
      Slot_Sniper: ['Sniper_01', 'Sniper_02', 'Sniper_03'],
      Slot_Submachine: ['Submachine_01', 'Submachine_02', 'Submachine_03'],
      WeaponPendant_1: ['MeleeWeapon_04_1'],
    }

    let allIDLE = [
      'Idle_CrossBow',
      'Idle_HandGun',
      'Idle_Knife',
      'Idle_MeleeWeapon_04',
      'Idle_Rifle',
      'Idle_ShootGun',
      'Idle_Sniper',
      'Idle_Submachine',
    ]

    this.setAnimation('Idle_Sniper', true)
    this.setAttachment('Slot_Sniper', 'Sniper_02')

    console.log(
      "Hookable Slots: ",
      this.getSlots().forEach((element: spine.Slot, index, array) => {
        if (element.data.attachmentName !== null) {
          console.log(element.data.attachmentName);
        }
      })
    );

    console.log("Attachments: ", this.getAttachments());
    console.log("Slots: ", this.getSlots());
  }

  setSkin(name: string) {
    this.girl.setSkin(null);
    this.girl.setSkinByName(name);
  }

  setAnimation(animation: string, loop: boolean = false) {
    this.girl.play(animation, loop);
  }

  setAttachment(slotName: string, attachmentName: string) {
    this.girl.skeleton.setAttachment(slotName, attachmentName);
  }

  getAttachments() {
    return this.girl.skeleton.skin.attachments;
  }

  getSlots() {
    return this.girl.skeleton.slots;
  }

  update() {}
}
