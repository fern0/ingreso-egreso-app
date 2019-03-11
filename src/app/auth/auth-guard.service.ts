import { Injectable } from '@angular/core';
import { CanActivate, CanLoad } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanLoad {
    constructor(public auth: AuthService) {}

    canActivate(): Observable<boolean> {
        return this.auth.isLoggedIn();
    }

    canLoad(): Observable<boolean> {
        return this.auth.isLoggedIn().pipe(
            take(1) //cuantas notificaciones va a recibir antes de cancelar la subscripcion, en este caso toma 1 stream y cancela la subs
        );
    }
}
