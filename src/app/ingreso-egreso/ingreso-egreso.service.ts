import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IngresoEgresoModel } from './ingreso-egreso.model';
import { AuthService } from '../auth/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { filter, map } from 'rxjs/operators';
import { SetItemsAction, UnsetItemsAction } from './ingreso-egreso.actions';
import { Subscription } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class IngresoEgresoService {
    ingresoEgresoSubscription: Subscription = new Subscription();
    ingresoEgresoItemSubscription: Subscription = new Subscription();
    constructor(private afDB: AngularFirestore, public auth: AuthService, private store: Store<AppState>) {}

    initIngresoEgresoListener() {
        this.ingresoEgresoSubscription = this.store
            .select('auth')
            .pipe(filter((auth) => auth.user !== null)) //solo pasan los stream que cumplan la condicion del filter, al comiento el user no esta se demora un segudno en llegar la data
            .subscribe((auth) => {
                //este objeto tiene el uid
                this.ingresoEgresoItems(auth.user.uid);
                console.log(auth.user.uid);
            });
    }

    private ingresoEgresoItems(uid: string) {
        ///retorn los items de un uid
        this.ingresoEgresoItemSubscription = this.afDB
            .collection(`${uid}/ingresos-egresos/items`) //path
            //.valueChanges()
            .snapshotChanges() //necesito esto para poder accesder a la ingformacion del payload del objeto
            .pipe(
                map((docData) => {
                    return docData.map((doc) => {
                        return {
                            uid: doc.payload.doc.id,
                            ...doc.payload.doc.data() //agrego el uid al los pares de valores del documento el operador ... hace el trabajo de armar el nuevo objeto
                        };
                    });
                })
            )
            .subscribe((itemsCollection: any[]) => {
                //console.log(itemsCollection); //array de docs del tipo item
                this.store.dispatch(new SetItemsAction(itemsCollection));
            });
    }

    cancelarSubscriptions() {
        this.ingresoEgresoItemSubscription.unsubscribe();
        this.ingresoEgresoSubscription.unsubscribe();
        this.store.dispatch(new UnsetItemsAction());
    }
    crearIngresoEgreso(ingresoEgreso: IngresoEgresoModel): Promise<any> {
        const user = this.auth.getUser();

        return (
            this.afDB
                .doc(`${user.uid}/ingresos-egresos`)
                .collection('items')
                //.add({ ...ingresoEgreso, uid: user.uid }); //no lleva el userid por que lo tengo en el id de la collection seria redundante
                .add({ ...ingresoEgreso })
        );
    }

    eliminarItem(itemId: string) {
        const userId = this.auth.getUser().uid;
        return this.afDB.doc(`${userId}/ingresos-egresos/items/${itemId}`).delete();
    }
}
