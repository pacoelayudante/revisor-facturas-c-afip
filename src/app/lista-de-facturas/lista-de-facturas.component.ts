import { Component, OnInit, NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { InfoAfipService } from '../info-afip.service';
import { Factura } from '../factura';

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

  constructor(
    private infoService: InfoAfipService
  ) { }

  ngOnInit() {
    this.facturas = this.infoService.facturasArray;
  }

  facturasOrdenadas(){
    if (this.facturas.length===0) return this.facturas;
    let ordenadas = this.facturas.filter(fac => fac);
    let mesesFaltantes : {fecha:Date}[] = [];
    let ultimoMesRegistrado : Date;
    for (let i=0; i<ordenadas.length; i++) {
      if ( ! ultimoMesRegistrado ) {
        ultimoMesRegistrado = ordenadas[i].fecha;
        continue;
      }
      // if (ordenadas[i].fecha.getMonth() - ultimoMesRegistrado.getMonth() > 1) {
      while(ordenadas[i].fecha.getMonth()-ultimoMesRegistrado.getMonth() > 1) {
        let nuevoMesFaltante = new Date(ultimoMesRegistrado);
        nuevoMesFaltante.setDate(1);
        nuevoMesFaltante.setMonth(nuevoMesFaltante.getMonth()+1);
        // console.log(ordenadas[i].fecha.toLocaleDateString()+" // "+ultimoMesRegistrado.toLocaleDateString()+ " >> "+nuevoMesFaltante.toLocaleDateString());
        mesesFaltantes.push({fecha:nuevoMesFaltante});
        ultimoMesRegistrado = nuevoMesFaltante;
      }
      ultimoMesRegistrado = ordenadas[i].fecha;
    }
    mesesFaltantes.forEach(faltante=>ordenadas.push(faltante));
    ordenadas.sort((a,b)=>a.fecha-b.fecha);

    return ordenadas;
  }

  mesDeFactura(factura:Factura){
    return factura.fecha.toLocaleDateString(undefined,{month:'short'}).toUpperCase().replace('.','');
  }

  onCargarChanges(htmlInput:HTMLInputElement) {
    let archivos = htmlInput.files;
    for(var i=0; i<archivos.length; i++) {
      this.infoService.cargarArchivo( archivos[i] );
    }
  }

}
