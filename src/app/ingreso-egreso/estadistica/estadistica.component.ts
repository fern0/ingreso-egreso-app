import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgresoModel } from '../ingreso-egreso.model';
import { Label, MultiDataSet } from 'ng2-charts';
import { ChartType } from 'chart.js';

@Component({
    selector: 'app-estadistica',
    templateUrl: './estadistica.component.html',
    styles: []
})
export class EstadisticaComponent implements OnInit {
    totalIngresos: number;
    totalEgresos: number;
    cantidadDeIngresos: number;
    cantidadDeEgresos: number;

    subscription: Subscription = new Subscription();

    public doughnutChartLabels: Label[] = [ 'Ingresos', 'Egresos' ];
    public doughnutChartData: number[] = [];
    public doughnutChartType: ChartType = 'doughnut';

    constructor(private store: Store<AppState>) {}

    ngOnInit() {
        this.subscription = this.store.select('ingresoEgreso').subscribe((ingresoEgreso) => {
            this.contarIngresoEgreso(ingresoEgreso.items);
        });
    }

    contarIngresoEgreso(items: IngresoEgresoModel[]) {
        this.totalIngresos = 0;
        this.totalEgresos = 0;

        this.cantidadDeEgresos = 0;
        this.cantidadDeIngresos = 0;

        items.forEach((item) => {
            if (item.tipo === 'ingreso') {
                this.cantidadDeIngresos++;
                this.totalIngresos += item.monto;
            } else {
                this.cantidadDeEgresos++;
                this.totalEgresos += item.monto;
            }
        });
        this.doughnutChartData = [ this.totalIngresos, this.totalEgresos ];
    }
}
