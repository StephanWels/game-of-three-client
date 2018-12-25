import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { PlayerService } from '../game/player-list/player.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    loginFormGroup: FormGroup;

    constructor(private loginService: LoginService,
                private playerService: PlayerService,
                private router: Router,
                private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.loginFormGroup = this.formBuilder.group({
            name: ['', Validators.required],
            email: ['', Validators.compose([Validators.required, Validators.email])]
        });
    }

    login() {
        if (this.loginFormGroup.valid) {
            const playerName = this.loginFormGroup.value['name'];
            const email = this.loginFormGroup.value['email'];
            this.playerService.createPlayer(playerName, email).subscribe(player => {
                this.loginService.loginAs(player);
                this.router.navigate(['games']);
            });
        }
    }

}
