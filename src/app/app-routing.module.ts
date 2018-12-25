import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LoggedInGuard } from './logged-in.guard';
import { HomeComponent } from './home/home.component';
import { GameComponent } from './game/game.component';
import { GameCreateComponent } from './game/game-create/game-create.component';
import { GameDetailsComponent } from './game/game-details/game-details.component';

const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'games', component: GameComponent, canActivate: [LoggedInGuard]},
    {path: 'new-game', component: GameCreateComponent, canActivate: [LoggedInGuard]},
    {path: 'game/:gameId', component: GameDetailsComponent, canActivate: [LoggedInGuard]},
    {path: '**', component: HomeComponent},
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
