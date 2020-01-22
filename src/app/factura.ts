import * as tiposDeComprobantes from './tipos-de-comprobantes.json'
import * as decodificadorDeComprobantes from './campos-de-comprobante-importado.json'

function convertirFecha(fecha:string):Date {
    if (!fecha.trim()) return null;

        let y = +fecha.substr(0,4);
        let m = +fecha.substr(4,2) - 1;
        let d = +fecha.substr(6,2);
        let D = new Date(y,m,d);
        if (D.getFullYear() == y && D.getMonth() == m && D.getDate() == d) return D;
        else {
            console.error("esta fecha no tiene sentido al ser parseada ("+fecha+")");
            return null;
        }
}
function convertirImporte(importe:string):number {
    return (+importe)/100.0;
}
const conversionDeCampos = {
    "fecha":convertirFecha,
    "importeTotalDeLaOperacion":convertirImporte,
    "importeTotalDeConceptosQueNoIntegranElPrecioNetoGravado":convertirImporte,
    "importeNetoGravado":convertirImporte,
    "impuestoLiquidado":convertirImporte,
    "percepcionANoCategorizados":convertirImporte,
    "importeDeOperacionesExentas":convertirImporte,
    "importeDePercepcionesOPagosACuentaDeImpuestosNacionales":convertirImporte,
    "importeDePercepcionDeIngresosBrutos":convertirImporte,
    "importeDePercepcionesPorImpuestosMunicipales":convertirImporte,
    "importeDeImpuestosInternos":convertirImporte,
    "transporte":convertirImporte,
    "fechaDeVencimientoDeCAE":convertirFecha,
    "fechaDeAnulacion":convertirFecha
};

export class Factura {
    idFactura : string;
    fecha : Date;
    totalFacturado : number;
    emisor: string;
    emisorCUIT : number;
    receptor: string;
    receptorCUIT : number;
    puntoDeVenta : number;
    numeroDeFactura : number;
    moneda : string;

    cabeceraDecodificadaIntroduccion = {};

    constructor(idFactura:string) {
        this.idFactura = idFactura;
    }
    actualizarCabecera(cabecera:string) {
        let itemsDeCabecera = cabecera.split('\n');
        //los items de cabecera son varios, el data  y el cada cosa vendida creo, pero solo necesito el primero// itemsDeCabecera.forEach
        let decodificadorDeCabecera = decodificadorDeComprobantes["CABECERA"];
        decodificadorDeCabecera = decodificadorDeCabecera[itemsDeCabecera[0][0]];//el primer digito indica que tipo de elemento de CABECERA es

        let campos = Object.keys(decodificadorDeCabecera);
        let cabezalLectorData = 0;
        for (let i=0; i<campos.length; i++){
            let longitudCampo = decodificadorDeCabecera[ campos[i] ];
            let datoDeCampo = itemsDeCabecera[0].substr(cabezalLectorData,longitudCampo);

            if (conversionDeCampos[campos[i]]) this.cabeceraDecodificadaIntroduccion[campos[i]] = conversionDeCampos[campos[i]](datoDeCampo);
            else this.cabeceraDecodificadaIntroduccion[campos[i]] = datoDeCampo;

            this.idFactura = this.cabeceraDecodificadaIntroduccion["puntoDeVenta"]+this.cabeceraDecodificadaIntroduccion["numeroDeComprobante"];
            this.fecha = this.cabeceraDecodificadaIntroduccion["fecha"];
            this.totalFacturado = this.cabeceraDecodificadaIntroduccion["importeTotalDeLaOperacion"];
            this.receptor = this.cabeceraDecodificadaIntroduccion["denominacionDelComprador"];
            this.receptorCUIT = this.cabeceraDecodificadaIntroduccion["numeroDeIdDelComprador"];
            this.puntoDeVenta = +this.cabeceraDecodificadaIntroduccion["puntoDeVenta"];
            this.numeroDeFactura = +this.cabeceraDecodificadaIntroduccion["numeroDeComprobante"];
            this.moneda = this.cabeceraDecodificadaIntroduccion["codigosDeMoneda"];

            // console.log(campos[i]+"("+longitudCampo+") = "+itemsDeCabecera[0].substr(cabezalLectorData,longitudCampo));
            cabezalLectorData += longitudCampo;
        }
    }

    actualizarDetalle(detalle:string) {
        
      console.log("detalle - \n"+detalle);
    }
}