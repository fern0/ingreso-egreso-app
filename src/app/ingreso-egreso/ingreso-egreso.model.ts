export class IngresoEgresoModel {
    descripcion: string;
    monto: number;
    tipo: ingresoEgreso;
    uid?: string; //opcional al principio no existe

    constructor(obj: DataObj) {
        this.descripcion = (obj && obj.descripcion) || null;
        this.monto = (obj && obj.monto) || null;
        this.tipo = (obj && obj.tipo) || null;
        //this.uid = (obj && obj.uid) || null;
    }
}
interface DataObj {
    descripcion: string;
    monto: number;
    tipo: ingresoEgreso;
    uid?: string;
}

export type ingresoEgreso = 'ingreso' | 'egreso';
