import { BrowserModule } from '@angular/platform-browser';
// import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ListaDeFacturasComponent } from './lista-de-facturas/lista-de-facturas.component';
import { AgregarArchivoComponent } from './agregar-archivo/agregar-archivo.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AyuditaExportarComponent } from './ayudita-exportar/ayudita-exportar.component';


@NgModule({
  declarations: [
    AppComponent,
    ListaDeFacturasComponent,
    AgregarArchivoComponent,
    AyuditaExportarComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
