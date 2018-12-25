import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Game } from '../game-list/game.model';
import { GameService } from '../game-list/game.service';
import { Subject } from 'rxjs';
import { NotificationService } from '../../notification.service';

@Component({
    selector: 'app-game-details',
    templateUrl: './game-details.component.html',
    styleUrls: ['./game-details.component.scss']
})
export class GameDetailsComponent implements OnInit, OnDestroy {

    gameId: string;
    gameUpdates: Subject<Game> = new Subject();

    pollIntervalId: number;

    constructor(private activatedRoute: ActivatedRoute,
                private notificationService: NotificationService,
                private gameService: GameService) {
    }

    ngOnInit() {
        this.gameId = this.activatedRoute.snapshot.params['gameId'];
        // use web sockets instead of polling
        this.refreshGame();
        this.pollIntervalId = setInterval(this.refreshGame.bind(this), 1000);
    }

    private refreshGame() {
        this.gameService.getGame(this.gameId).subscribe((game: Game) => {
            this.gameUpdates.next(game);
            if (game.winner) {
                clearInterval(this.pollIntervalId);
            }
        });
    }

    takeTurn(move: number): void {
        this.gameService.takeTurn(this.gameId, move).subscribe((game: Game) => this.refreshGame(),
            error => this.notificationService.showMessage('bad move :('));
    }

    ngOnDestroy(): void {
        clearInterval(this.pollIntervalId);
    }

}
