import { Injectable } from '@angular/core';
import * as tiposDeComprobantes from './tipos-de-comprobantes.json'
import { Factura } from './factura';

const regexExtraerIdArchivo = /\d{1,11}_\d{1,2}_\d{1,4}_\d{1,8}/g;
const regexEsDetalle = /DETALLE/g;
const regexEsCabecera = /CABECERA/g;

@Injectable({
  providedIn: 'root'
})
export class InfoAfipService {
  facturasPorId = { "length": 0 };
  facturasArray: Factura[] = [];
  anoActual : number;
  facturasAgrupadas: Factura[][][] = [];// por año y por mes
  tiposDeComprobantes: any = (tiposDeComprobantes as any).default;

  constructor() { 
    this.anoActual = new Date().getFullYear();
  }

  //esto tendria que convertirse en algo que tome una lista de buffer
  onLoadArchivo(ev: ProgressEvent, archivo: File) {
    if (ev.loaded) {
      let contenido = <string>(ev.target as FileReader).result;
      // console.log("archivo cargado : " + archivo.name);
      let idMatch = archivo.name.match(regexExtraerIdArchivo);
      if (!idMatch || !idMatch.length) {
        console.error("nombre de archivo no tiene id");
        return;
      }
      let id = idMatch[0];
      let esCabecera = archivo.name.match(regexEsCabecera);
      let esDetalle = archivo.name.match(regexEsDetalle);

      let factura: Factura;
      if (this.facturasPorId[id]) factura = this.facturasPorId[id];
      else {
        factura = new Factura(id);
        this.facturasPorId[id] = factura;
        this.facturasPorId["length"]++;
      }
      if (esCabecera) factura.actualizarCabecera(contenido);
      if (esDetalle) factura.actualizarDetalle(contenido);

      if (factura.numeroDeFactura) this.facturasArray[factura.numeroDeFactura] = factura;
      if (factura.fecha) {
        let anoInvertido = this.anoActual- factura.fecha.getFullYear();
        let mesInvertido = 11 - factura.fecha.getMonth();
        if (! this.facturasAgrupadas[anoInvertido]) {// iniciar array de año, con meses vacios y todo
          this.facturasAgrupadas[anoInvertido] = [];
          this.facturasAgrupadas[anoInvertido]["cantMesesPreviosConData"] = 0;
          for(let m=0; m<12; m++) this.facturasAgrupadas[anoInvertido][m] = [];
        }
        if(! this.facturasAgrupadas[anoInvertido][mesInvertido].includes(factura)) {
          this.facturasAgrupadas[anoInvertido][mesInvertido].push( factura);
          this.facturasAgrupadas[anoInvertido][mesInvertido].sort((a,b)=>a.fecha.getTime()-b.fecha.getTime());
        }
      }

      // for(let i=1; i<this.facturasAgrupadas.length; i++) {//el primero seguro es cero
      //   this.facturasAgrupadas[i]["cantMesesPreviosConData"] = this.facturasAgrupadas[i-1].filter(e=>e.length).length;
      // }
    }
  }

  cargarArchivo(archivo: File) {
    if (!archivo.type.match("text/plain")) return;

    let lector = new FileReader();
    let that = this;
    // aca se puede hacer un buffer de archivos para leer
    lector.onloadend = (function (archivo) {
      return function (ev: ProgressEvent) {
        that.onLoadArchivo(ev, archivo);
      };
    })(archivo);
    lector.readAsText(archivo);
  }

}
