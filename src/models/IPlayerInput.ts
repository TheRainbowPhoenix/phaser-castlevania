export class Action extends Phaser.Events.EventEmitter {
  // TODO: use Key instead ?
}

export interface IPlayerInput
{
	Left(e: Action): void;

	Right(e: Action): void;

	Up(e: Action): void;

	Down(e: Action): void;

	Fire(e: Action): void;

	Fire2(e: Action): void;

	Reload(e: Action): void;

	Cure(e: Action): void;

	Dash(e: Action): void;

	Q(e: Action): void;
}
