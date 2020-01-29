import { Component, OnInit, NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { InfoAfipService } from '../info-afip.service';
import { Factura } from '../factura';

@NgModule({
  imports: [CommonModule]
})
@Component({
  selector: 'app-lista-de-facturas',
  templateUrl: './lista-de-facturas.component.html',
  styleUrls: ['./lista-de-facturas.component.css']
})

export class ListaDeFacturasComponent implements OnInit {
  anoActual: number;
  facturasAgrupadas: Factura[][][];
  mesHover: Factura[];
  cuitMarcado: CuitMarcado = new CuitMarcado();

  constructor(
    private infoService: InfoAfipService
  ) { }

  ngOnInit() {
    this.facturasAgrupadas = this.infoService.facturasAgrupadas;
    this.anoActual = this.infoService.anoActual;
  }

  onReceptorClick(cuitTocado: number, evento: Event) {
    if (evento) evento.stopPropagation();
    if (this.cuitMarcado.visible && this.cuitMarcado.cuit === cuitTocado) this.cuitMarcado.visible = false;
    else if (! cuitTocado){
      this.cuitMarcado.visible = false;
    }
    else{
      this.cuitMarcado = new CuitMarcado(cuitTocado,this.facturasAgrupadas);
    }
  }
  onPointerEnterMes(queMes: Factura[]) {
    this.mesHover = queMes;
    if(this.cuitMarcado.mesesFacturados.includes( this.mesHover))console.log("si´ps");
  }
  onPointerLeaveMes(queMes: Factura[]) {
    if (this.mesHover === queMes) this.mesHover = null;
  }

  mesDeFactura(factura: Factura) {
    return factura.fecha.toLocaleDateString(undefined, { month: 'short' }).toUpperCase().replace('.', '');
  }

  mesesFiltrados(queAno: number) {
    return this.facturasAgrupadas[queAno] ?
      this.facturasAgrupadas[queAno].filter(e => e && e.length > 0) : [];
  }
  mesesFiltradosPorArray(queAno: Factura[][]) {
    return queAno.filter(e => e && e.length > 0);
  }

  totalImporteAnual(queAno: Factura[][]) {
    let total = 0;
    queAno.forEach(cadaMes => {
      if (cadaMes) total += this.totalImporteMensual(cadaMes);
    });
    return total;
  }
  totalImporteMensual(queMes: Factura[]) {
    let total = 0;
    queMes.forEach(mes => {
      if (mes && mes.totalFacturadoPesos) total += mes.totalFacturadoPesos;
    })
    return total;
  }

  impactoMensual(queAno: Factura[][], mesIndex: number) {
    return this.totalImporteMensual(queAno[mesIndex]) / this.totalImporteAnual(queAno);
  }

}

class CuitMarcado {
  cuit: number;
  nombre: string;
  importeTotal:number;
  importesMensuales: number[];
  mesesFacturados: Factura[][] = [];
  importeMensualMaximo: number;
  visible: boolean = false;

  constructor(cuitTocado?: number, facturasAgrupadas?: Factura[][][]) {
    if(!cuitTocado || !facturasAgrupadas) return;
    this.visible = true;
    this.cuit = cuitTocado;
    this.importeTotal = 0;
    this.importeMensualMaximo = 0;
    this.importesMensuales = [];
    facturasAgrupadas.forEach(ano => {
      ano.forEach(mes => {
        let totalMensual = 0;
        mes.forEach(factura => {
          if (factura.receptorCUIT === this.cuit) {
            if (!this.nombre) this.nombre = factura.receptor;
            totalMensual += factura.totalFacturadoPesos;
            this.importeTotal += factura.totalFacturadoPesos;
          }
        });
        if(totalMensual){
          this.importeMensualMaximo = Math.max(this.importeMensualMaximo, totalMensual);
          this.importesMensuales.push(totalMensual);
          this.mesesFacturados.push(mes);
        }
      });
    });
  }
}