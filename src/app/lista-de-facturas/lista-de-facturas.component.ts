import { Component, OnInit, NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { InfoAfipService } from '../info-afip.service';
import { Factura } from './factura';

@NgModule({
  imports:[CommonModule]
})
@Component({
  selector: 'app-lista-de-facturas',
  templateUrl: './lista-de-facturas.component.html',
  styleUrls: ['./lista-de-facturas.component.css']
})
export class ListaDeFacturasComponent implements OnInit {
  facturas = [];
  caca2 = [,,,];

  constructor(
    private infoService: InfoAfipService
  ) { }

  ngOnInit() {
    this.facturas = this.infoService.facturasArray;
  }

  facturasOrdenadas(){
    return this.facturas.filter(fac => fac);
  }

  mesDeFactura(factura:Factura){
    return "bla";
  }

  onCargarChanges(htmlInput:HTMLInputElement) {
    let archivos = htmlInput.files;
    for(var i=0; i<archivos.length; i++) {
      this.infoService.cargarArchivo( archivos[i] );
    }
  }

}
