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
  cuitMarcado: number;
  mesHover: Factura[];
  cuitMarcadoNombre: string;
  cuitMarcadoImporteMensual: number[];
  cuitMarcadoImporteTotal: number;
  cuitMarcadoMaximoMensual: number;

  constructor(
    private infoService: InfoAfipService
  ) { }

  ngOnInit() {
    this.facturasAgrupadas = this.infoService.facturasAgrupadas;
    this.anoActual = this.infoService.anoActual;
  }

  onReceptorClick(cuitTocado: number, evento: Event) {
    if (evento) evento.stopPropagation();
    if (this.cuitMarcado === cuitTocado) this.cuitMarcado = 0;
    else {
      this.cuitMarcado = cuitTocado;
      if (this.cuitMarcado) {
        this.cuitMarcadoImporteTotal = 0;
        this.cuitMarcadoMaximoMensual = 0;
        this.cuitMarcadoImporteMensual = [];
        this.facturasAgrupadas.forEach(ano => {
          ano.forEach(mes => {
            mes.forEach(factura => {
              if (factura.receptorCUIT === this.cuitMarcado) {
                this.cuitMarcadoNombre = factura.receptor;
                this.cuitMarcadoImporteMensual.push(factura.totalFacturadoPesos);
                this.cuitMarcadoImporteTotal += factura.totalFacturadoPesos;
                this.cuitMarcadoMaximoMensual = Math.max(this.cuitMarcadoMaximoMensual,factura.totalFacturadoPesos);
              }
            });
          });
        });
      }
    }
  }
  onPointerEnterMes(queMes: Factura[]) {
    this.mesHover = queMes;
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
