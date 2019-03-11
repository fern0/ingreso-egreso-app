import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ingresoEgreso, IngresoEgresoModel } from './ingreso-egreso.model';
import { Subscription } from 'rxjs';
import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';
import { IngresoEgresoService } from './ingreso-egreso.service';
import Swal from 'sweetalert2';
import { DesactivarLoadingAction, ActivarLoadingAction } from '../shared/ui.actions';
@Component({
    selector: 'app-ingreso-egreso',
    templateUrl: './ingreso-egreso.component.html',
    styles: []
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {
    fomularioIngreso: FormGroup;
    tipo: ingresoEgreso = 'ingreso';
    subscriptionLoading: Subscription = new Subscription();
    cargando: boolean;

    constructor(private store: Store<AppState>, public ingresoEgresoSrv: IngresoEgresoService) {}

    ngOnInit() {
        this.fomularioIngreso = new FormGroup({
            descripcion: new FormControl('', Validators.required),
            monto: new FormControl(0, [ Validators.required, Validators.min(0) ])
        });

        this.subscriptionLoading = this.store.select('ui').subscribe((ui) => {
            this.cargando = ui.isLoading;
        });
    }

    creaIngresoEgreso() {
        this.store.dispatch(new ActivarLoadingAction());

        const ingresoEgreso = new IngresoEgresoModel({ ...this.fomularioIngreso.value, tipo: this.tipo });

        this.ingresoEgresoSrv
            .crearIngresoEgreso(ingresoEgreso)
            .then((response) => {
                this.store.dispatch(new DesactivarLoadingAction());
                Swal.fire({
                    title: 'Nuevo ingreso/egreso!',
                    text: 'Grabación exitosa',
                    type: 'success',
                    confirmButtonText: 'Cerrar'
                });
                this.fomularioIngreso.reset({
                    monto: 0
                });
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

        console.log(ingresoEgreso);
    }

    ngOnDestroy() {
        this.subscriptionLoading.unsubscribe();
    }
}
