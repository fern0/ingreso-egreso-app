import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
//import { LoginComponent } from './auth/login/login.component';
//import { RegisterComponent } from './auth/register/register.component';
//import { DashboardComponent } from './dashboard/dashboard.component';
//import { IngresoEgresoComponent } from './ingreso-egreso/ingreso-egreso.component';
//import { EstadisticaComponent } from './ingreso-egreso/estadistica/estadistica.component';
//import { DetalleComponent } from './ingreso-egreso/detalle/detalle.component';
//import { FooterComponent } from './shared/footer/footer.component';
//import { NavbarComponent } from './shared/navbar/navbar.component';
//import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { AppRoutingModule } from './app-routing.module';
//import { ReactiveFormsModule } from '@angular/forms';

//Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
//import { AngularFireAuthModule } from '@angular/fire/auth';

//ENVIRONMENTS
import { environment } from '../environments/environment';

//NGRX
import { StoreModule } from '@ngrx/store';
import { appReducers } from './app.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
//import { OrdenIngresoEgresoPipe } from './ingreso-egreso/orden-ingreso-egreso.pipe';

//Grafico
//import { ChartsModule } from 'ng2-charts';

//Modulos personalizados
import { AuthModule } from './auth/auth.module';
//import { SharedModule } from './shared/shared.module';
//import { IngresoEgresoModule } from './ingreso-egreso/ingreso-egreso.module';

@NgModule({
    declarations: [
        AppComponent
        //   LoginComponent,
        //   RegisterComponent,
        //DashboardComponent,
        //IngresoEgresoComponent,
        //EstadisticaComponent,
        //DetalleComponent,
        //FooterComponent,
        // NavbarComponent,
        // SidebarComponent,
        //OrdenIngresoEgresoPipe
    ],
    imports: [
        BrowserModule,
        AuthModule,
        // SharedModule,
        AppRoutingModule,
        //IngresoEgresoModule,
        //FormsModule,
        //ReactiveFormsModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        // AngularFireAuthModule,
        //ChartsModule,
        StoreModule.forRoot(appReducers),
        StoreDevtoolsModule.instrument({
            maxAge: 30,
            logOnly: environment.production
        })
    ],
    providers: [],
    bootstrap: [ AppComponent ]
})
export class AppModule {}
