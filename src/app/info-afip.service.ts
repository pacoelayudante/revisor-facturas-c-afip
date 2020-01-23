import { Injectable } from '@angular/core';
import * as tiposDeComprobantes from './tipos-de-comprobantes.json'
import { Factura } from './factura';

const regexExtraerIdArchivo = /\d{11}_\d{2}_\d{4}_\d{8}/g;
const regexEsDetalle = /DETALLE/g;
const regexEsCabecera = /CABECERA/g;

@Injectable({
  providedIn: 'root'
})
export class InfoAfipService {
  facturasPorId = { "length": 0 };
  facturasArray = [];
  tiposDeComprobantes: any = (tiposDeComprobantes as any).default;

  constructor() { }

  onLoadArchivo(ev: ProgressEvent, archivo: File) {
    if (ev.loaded) {
      let contenido = <string>(ev.target as FileReader).result;
      console.log("archivo cargado : " + archivo.name);
      let idMatch = archivo.name.match(regexExtraerIdArchivo);
      if (!idMatch || !idMatch.length) {
        console.error("nombre de archivo no tiene id");
        return;
      }
      let id = idMatch[0];
      let esCabecera = archivo.name.match(regexEsCabecera);
      let esDetalle = archivo.name.match(regexEsDetalle);

      let factura : Factura;
      if (this.facturasPorId[id]) factura = this.facturasPorId[id];
      else {
        factura = new Factura(id);
        this.facturasPorId[id] = factura;
        this.facturasPorId["length"]++;        
      }
      if (esCabecera) factura.actualizarCabecera(contenido);
      if (esDetalle) factura.actualizarDetalle(contenido);
      
      this.facturasArray[factura.numeroDeFactura] = factura;
    }
  }

  cargarArchivo(archivo: File) {
    if (!archivo.type.match("text/plain")) return;

    let lector = new FileReader();
    let that = this;
    lector.onloadend = (function (archivo) {
      return function (ev: ProgressEvent) {
        that.onLoadArchivo(ev, archivo);
      };
    })(archivo);
    lector.readAsText(archivo);
  }

}
