import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppState } from '../../app.reducer';
import { Store } from '@ngrx/store';
import { User } from '../../auth/user.model';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styles: []
})
export class NavbarComponent implements OnInit, OnDestroy {
    user: User;
    subscription: Subscription = new Subscription();
    constructor(private store: Store<AppState>) {}

    ngOnInit() {
        this.subscription = this.store.select('auth').subscribe((response) => {
            this.user = response.user;
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
