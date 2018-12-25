import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from './login/login.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    loggedInAs: Observable<string>;

    constructor(private loginService: LoginService,
                private router: Router) {
    }

    ngOnInit(): void {
        this.loggedInAs = this.loginService.loginUpdates();
    }

    logout() {
        this.loginService.logout();
        this.router.navigate(['/']);
    }
}
