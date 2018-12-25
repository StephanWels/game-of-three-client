import { Injectable } from '@angular/core';
import { Game } from './game.model';
import { LoginService } from '../../login/login.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class GameService {

    constructor(private loginService: LoginService,
                private httpClient: HttpClient) {
    }

    public listGames(): Observable<Game[]> {
        return this.httpClient.get<Game[]>(`${environment.serviceBaseUrl}/games`);
    }

    createGame(name: String, initialValue?: number): Observable<Game> {
        const requestBody = {
            name: name,
            initialValue: initialValue
        };
        return this.httpClient.post<Game>(`${environment.serviceBaseUrl}/games`, requestBody);
    }

    joinGame(gameId: string, auto: boolean): Observable<Game> {
        const requestBody = {
            playerName: this.loginService.getCurrentPlayerName(),
            playerId: this.loginService.getCurrentPlayerId(),
            isAutomaticTurns: auto
        };
        return this.httpClient.put<Game>(`${environment.serviceBaseUrl}/games/${gameId}/players`, requestBody);
    }

    getGame(gameId: string): Observable<Game> {
        return this.httpClient.get<Game>(`${environment.serviceBaseUrl}/games/${gameId}`);
    }

    takeTurn(gameId: string, move: number): Observable<Game> {
        const requestBody = {
            move: move,
            player: {
                id: this.loginService.getCurrentPlayerId(),
                name: this.loginService.getCurrentPlayerName()
            }
        };
        return this.httpClient.put<Game>(`${environment.serviceBaseUrl}/games/${gameId}/turns`, requestBody);
    }
}
