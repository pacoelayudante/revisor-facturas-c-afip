import { Component, OnInit } from '@angular/core';
import { InfoAfipService } from '../info-afip.service';

const facturasNum:number[] = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19];
const patronFacturaDePrueba:string = "209_11_0001_%8_CABECERA.txt";
const pathArchivos:string = "../../assets/facturas-de-ejemplo/";

@Component({
  selector: 'app-ayudita-exportar',
  templateUrl: './ayudita-exportar.component.html',
  styleUrls: ['./ayudita-exportar.component.css']
})
export class AyuditaExportarComponent implements OnInit {
  facturas = [];

  constructor(
    private infoService: InfoAfipService
    ) { }

  ngOnInit() {
    this.facturas = this.infoService.facturasArray;
  }

  cargarFacturasDePrueba() {
    facturasNum.forEach(num=>{
      const nombreArchivo = pathArchivos + patronFacturaDePrueba.replace("%8",num.toString().padStart(8,"0"));
      this.infoService.cargarArchivoDeURL(nombreArchivo);
    });
  }
}
