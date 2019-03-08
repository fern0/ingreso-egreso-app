import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styles: []
})
export class RegisterComponent implements OnInit {
    constructor(public auth: AuthService) {}

    ngOnInit() {}

    onSubmit(data: any) {
        console.log(data);
        this.auth.crearUsuario(data.nombre, data.correo, data.password);
    }
}
