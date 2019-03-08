import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import * as firebase from 'firebase';
import { map } from 'rxjs/operators';
import { User } from './user.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private afAuth: AngularFireAuth, private router: Router, private afDB: AngularFirestore) {}

    initAuthListener() {
        this.afAuth.authState.subscribe((fbUser: firebase.User) => {
            console.log(fbUser);
        });
    }
    crearUsuario(nombre: string, email: string, password: string) {
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
                        this.router.navigate([ '/' ]);
                    })
                    .catch((error) => {
                        Swal.fire({
                            title: 'Error al crear el usuario!',
                            text: error.message,
                            type: 'error',
                            confirmButtonText: 'Cerrar'
                        });
                    });
            })
            .catch((error) => {
                Swal.fire({
                    title: 'Error al registrarse!',
                    text: error.message,
                    type: 'error',
                    confirmButtonText: 'Cerrar'
                });
            });
    }
    login(email: string, password: string) {
        this.afAuth.auth
            .signInWithEmailAndPassword(email, password)
            .then((resp) => {
                this.router.navigate([ '/' ]);
            })
            .catch((error) => {
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
}
