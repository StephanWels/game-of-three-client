import { Injectable } from '@angular/core';
import { Player } from './player.model';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Game } from '../game-list/game.model';
import { Observable } from 'rxjs';

@Injectable()
export class PlayerService {

    constructor(private httpClient: HttpClient) {
    }

    public listPlayers(): Observable<Player[]> {
        return this.httpClient.get<Player[]>(`${environment.serviceBaseUrl}/players`);
    }

    createPlayer(name: String, email: String): Observable<Player> {
        const requestBody = {
            name: name,
            email: email
        };
        return this.httpClient.post<Player>(`${environment.serviceBaseUrl}/players`, requestBody);
    }
}
