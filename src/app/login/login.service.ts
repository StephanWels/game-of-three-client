import { Injectable } from '@angular/core';
import { Player } from '../game/player-list/player.model';
import { Observable, ReplaySubject, Subject } from 'rxjs';

@Injectable()
export class LoginService {

    private static PLAYER_NAME_STORAGE_KEY = 'player_name';
    private static PLAYER_ID_STORAGE_KEY = 'player_id';

    private _loginUpdates: Subject<string> = new ReplaySubject(1);

    constructor() {
        this._loginUpdates.next(this.getCurrentPlayerName());
    }

    public getCurrentPlayerName(): string {
        return localStorage.getItem(LoginService.PLAYER_NAME_STORAGE_KEY);
    }

    public getCurrentPlayerId(): string {
        return localStorage.getItem(LoginService.PLAYER_ID_STORAGE_KEY);
    }

    public loginAs(player: Player): void {
        localStorage.setItem(LoginService.PLAYER_NAME_STORAGE_KEY, player.name);
        localStorage.setItem(LoginService.PLAYER_ID_STORAGE_KEY, player.id);
        this._loginUpdates.next(player.name);
    }

    public loginUpdates(): Observable<string> {
        return this._loginUpdates.asObservable();
    }

    public logout() {
        localStorage.removeItem(LoginService.PLAYER_NAME_STORAGE_KEY);
        localStorage.removeItem(LoginService.PLAYER_ID_STORAGE_KEY);
        this._loginUpdates.next(null);
    }
}
