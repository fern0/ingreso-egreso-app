import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: []
})
export class LoginComponent implements OnInit {
    constructor(public auth: AuthService) {}

    ngOnInit() {}

    login(data: any) {
        this.auth.login(data.correo, data.password);
    }
}
