import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../ingreso-egreso.service';
import { DesactivarLoadingAction, ActivarLoadingAction } from '../../shared/ui.actions';
import Swal from 'sweetalert2';
import { IngresoEgresoModel } from '../ingreso-egreso.model';
import * as fromIngresoEgreso from '../ingreso-egreso.reducer';
@Component({
    selector: 'app-detalle',
    templateUrl: './detalle.component.html',
    styles: []
})
export class DetalleComponent implements OnInit, OnDestroy {
    items;
    subscription: Subscription = new Subscription();

    constructor(
        private store: Store<fromIngresoEgreso.IngresoEgresoAppState>,
        public ingresoEgresoSrv: IngresoEgresoService
    ) {}

    ngOnInit() {
        this.subscription = this.store.select('ingresoEgreso').subscribe((ingresoEgreso) => {
            this.items = ingresoEgreso.items;
        });
    }

    borrarItem(item: IngresoEgresoModel) {
        console.log(item.uid);
        this.store.dispatch(new ActivarLoadingAction());

        this.ingresoEgresoSrv
            .eliminarItem(item.uid)
            .then(() => {
                this.store.dispatch(new DesactivarLoadingAction());

                Swal.fire({
                    title: 'Item elimiado!',
                    text: 'Eliminado el ' + item.descripcion,
                    type: 'success',
                    confirmButtonText: 'Cerrar'
                });
            })
            .catch((error) => {
                console.log(error);
                this.store.dispatch(new DesactivarLoadingAction());
                Swal.fire({
                    title: 'Error al eliminar item!',
                    text: error.message,
                    type: 'error',
                    confirmButtonText: 'Cerrar'
                });
            });
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
