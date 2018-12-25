import { Component, OnDestroy, OnInit } from '@angular/core';
import { GameService } from './game.service';
import { Game } from './game.model';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { LoginService } from '../../login/login.service';
import { Player } from '../player-list/player.model';

@Component({
    selector: 'app-game-list',
    templateUrl: './game-list.component.html',
    styleUrls: ['./game-list.component.scss']
})
export class GameListComponent implements OnInit, OnDestroy {

    games: Subject<Game[]> = new Subject<Game[]>();
    pollIntervalId: number;

    constructor(private gameService: GameService,
                private loginService: LoginService,
                private router: Router) {
    }

    ngOnInit() {
        this.refreshPlayerList();
        this.pollIntervalId = setInterval(this.refreshPlayerList.bind(this), 1000);
    }

    private refreshPlayerList() {
        // use web sockets instead of polling
        this.gameService.listGames().subscribe((games: Game[]) => this.games.next(games));
    }

    joinGame(game: Game, automaticTurns: boolean) {
        const playerJoinedAlready = game.players.some(player => player.id === this.loginService.getCurrentPlayerId());
        if (playerJoinedAlready) {
            this.navigateToGame(game);
        } else {
            this.gameService.joinGame(game.id, automaticTurns).subscribe((joinedGame: Game) => this.navigateToGame(joinedGame));
        }
    }

    private navigateToGame(game: Game): void {
        this.router.navigate(['/game', game.id]);
    }

    ngOnDestroy(): void {
        clearInterval(this.pollIntervalId);
    }
}
