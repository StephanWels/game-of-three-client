import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../login/login.service';
import { Router } from '@angular/router';
import { GameService } from '../game-list/game.service';

@Component({
    selector: 'app-game-create',
    templateUrl: './game-create.component.html',
    styleUrls: ['./game-create.component.scss']
})
export class GameCreateComponent implements OnInit {

    gameCreateFormGroup: FormGroup;

    constructor(private gameService: GameService,
                private router: Router,
                private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.gameCreateFormGroup = this.formBuilder.group({
            name: ['', Validators.required],
            initialValue: []
        });
    }

    createGame() {
        if (this.gameCreateFormGroup.valid) {
            const gameName = this.gameCreateFormGroup.value['name'];
            const initialValue = this.gameCreateFormGroup.value['initialValue'];
            this.gameService.createGame(gameName, initialValue).subscribe(newGame => {
                    this.router.navigate(["/games"]);
                }
            );
        }
    }
}
