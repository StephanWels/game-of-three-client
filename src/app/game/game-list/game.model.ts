import { Player } from '../player-list/player.model';

export interface GameTurn {
    player: Player;
    move: number;
}

export interface Game {
    name: string;
    id: string;
    players: Player[];
    gameTurns: GameTurn[];
    gameValue: number;
    winner?: Player;
}
