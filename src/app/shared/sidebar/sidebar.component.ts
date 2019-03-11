import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { User } from '../../auth/user.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgresoService } from '../../ingreso-egreso/ingreso-egreso.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styles: []
})
export class SidebarComponent implements OnInit, OnDestroy {
    user: User;
    subscription: Subscription = new Subscription();
    constructor(
        public auth: AuthService,
        private store: Store<AppState>,
        public IngresoEgresoSrv: IngresoEgresoService
    ) {}

    ngOnInit() {
        this.subscription = this.store.select('auth').subscribe((response) => {
            this.user = response.user;
        });
    }

    logout() {
        console.log('logout...');
        this.IngresoEgresoSrv.cancelarSubscriptions();
        this.auth.logout();
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
