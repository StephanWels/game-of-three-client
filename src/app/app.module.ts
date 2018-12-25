import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { GameListComponent } from './game/game-list/game-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
    MatButtonModule,
    MatCardModule, MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatSelectModule, MatSnackBarModule
} from '@angular/material';
import { HomeComponent } from './home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginService } from './login/login.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GameComponent } from './game/game.component';
import { PlayerListComponent } from './game/player-list/player-list.component';
import { GameService } from './game/game-list/game.service';
import { PlayerService } from './game/player-list/player.service';
import { GameCreateComponent } from './game/game-create/game-create.component';
import { HttpClientModule } from '@angular/common/http';
import { GameDetailsComponent } from './game/game-details/game-details.component';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        GameListComponent,
        HomeComponent,
        GameComponent,
        PlayerListComponent,
        GameCreateComponent,
        GameDetailsComponent,
    ],
    imports: [
        MatInputModule,
        MatButtonModule,
        MatFormFieldModule,
        MatSelectModule,
        MatIconModule,
        MatCardModule,
        MatListModule,
        MatDividerModule,
        MatSnackBarModule,
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        NgbModule.forRoot()
    ],
    providers: [
        LoginService,
        GameService,
        PlayerService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
