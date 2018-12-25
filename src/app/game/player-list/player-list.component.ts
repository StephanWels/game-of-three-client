import { Component, OnDestroy, OnInit } from '@angular/core';
import { Player } from './player.model';
import { PlayerService } from './player.service';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-player-list',
    templateUrl: './player-list.component.html',
    styleUrls: ['./player-list.component.scss']
})
export class PlayerListComponent implements OnInit, OnDestroy {

    players: Subject<Player[]> = new Subject();
    pollIntervalId: number;

    constructor(private playerService: PlayerService) {
    }

    ngOnInit() {
        this.refreshPlayerList();
        this.pollIntervalId = setInterval(this.refreshPlayerList.bind(this), 1000);
    }

    private refreshPlayerList() {
        // use web sockets instead of polling
        this.playerService.listPlayers().subscribe((players: Player[]) => this.players.next(players));
    }

    ngOnDestroy(): void {
        clearInterval(this.pollIntervalId);
    }

}
