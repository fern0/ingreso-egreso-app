import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import * as firebase from 'firebase';
import { map } from 'rxjs/operators';
import { User } from './user.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { ActivarLoadingAction, DesactivarLoadingAction } from '../shared/ui.actions';
import { SetUserAction, UnsetUserAction } from './auth.actions';
import { Subscription } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private userSubscription: Subscription = new Subscription(); //para prevenir el unsuscribe de algo que no es de tipo subscription
    private user: User;
    constructor(
        private afAuth: AngularFireAuth,
        private router: Router,
        private afDB: AngularFirestore,
        private store: Store<AppState>
    ) {}

    initAuthListener() {
        this.afAuth.authState.subscribe((fbUser: firebase.User) => {
            if (fbUser) {
                this.userSubscription = this.afDB
                    .doc(`${fbUser.uid}/usuario`)
                    .valueChanges()
                    .subscribe((userDocObj: any) => {
                        const newUser = new User(userDocObj);
                        this.store.dispatch(new SetUserAction(newUser));
                        //console.log(newUser);
                        this.user = newUser;
                    });
            } else {
                this.user = null;
                this.store.dispatch(new UnsetUserAction());
                this.userSubscription.unsubscribe(); //prevenir creaar un monton de observables que estn pendiente de cosas que no nos interesan
            }
        });
    }
    crearUsuario(nombre: string, email: string, password: string) {
        //hace rel dispatch de laccion isLoading
        this.store.dispatch(new ActivarLoadingAction());

        this.afAuth.auth
            .createUserWithEmailAndPassword(email, password)
            .then((resp) => {
                //creo el usuario en firestore collection
                const user: User = {
                    uid: resp.user.uid,
                    nombre: nombre,
                    email: resp.user.email
                };
                //enviar este objeto a firebase
                this.afDB
                    .doc(`${user.uid}/usuario`)
                    .set(user)
                    .then(() => {
                        this.store.dispatch(new DesactivarLoadingAction());
                        this.router.navigate([ '/' ]);
                    })
                    .catch((error) => {
                        this.store.dispatch(new DesactivarLoadingAction());
                        Swal.fire({
                            title: 'Error al crear el usuario!',
                            text: error.message,
                            type: 'error',
                            confirmButtonText: 'Cerrar'
                        });
                    });
            })
            .catch((error) => {
                this.store.dispatch(new DesactivarLoadingAction());
                Swal.fire({
                    title: 'Error al registrarse!',
                    text: error.message,
                    type: 'error',
                    confirmButtonText: 'Cerrar'
                });
            });
    }
    login(email: string, password: string) {
        this.store.dispatch(new ActivarLoadingAction());
        this.afAuth.auth
            .signInWithEmailAndPassword(email, password)
            .then((resp) => {
                this.store.dispatch(new DesactivarLoadingAction());
                this.router.navigate([ '/' ]);
            })
            .catch((error) => {
                this.store.dispatch(new DesactivarLoadingAction());
                Swal.fire({
                    title: 'Error en el login!',
                    text: error.message,
                    type: 'error',
                    confirmButtonText: 'Cerrar'
                });
            });
    }

    logout() {
        this.afAuth.auth.signOut();
        this.store.dispatch(new UnsetUserAction());
        this.router.navigate([ '/login' ]);
    }

    isLoggedIn() {
        return this.afAuth.authState.pipe(
            map((fbUser) => {
                if (fbUser === null) {
                    this.router.navigate([ '/login' ]);
                }
                return fbUser !== null;
            })
        ); //true o false
    }

    getUser() {
        return { ...this.user };
    }
}
