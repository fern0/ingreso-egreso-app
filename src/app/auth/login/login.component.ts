import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: []
})
export class LoginComponent implements OnInit, OnDestroy {
    cargando: boolean;
    subscription: Subscription;
    constructor(public auth: AuthService, private store: Store<AppState>) {}

    ngOnInit() {
        this.subscription = this.store.select('ui').subscribe((ui) => {
            this.cargando = ui.isLoading;
        });
    }

    login(data: any) {
        this.auth.login(data.correo, data.password);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
