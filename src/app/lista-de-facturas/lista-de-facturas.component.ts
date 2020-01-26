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
  cuitMarcado: string;

  constructor(
    private infoService: InfoAfipService
  ) { }

  ngOnInit() {
    this.facturasAgrupadas = this.infoService.facturasAgrupadas;
    this.anoActual = this.infoService.anoActual;
  }

  onReceptorClick(cuitTocado: string) {
    if(this.cuitMarcado === cuitTocado) this.cuitMarcado = '';
    else this.cuitMarcado = cuitTocado;
  }

  mesDeFactura(factura: Factura) {
    return factura.fecha.toLocaleDateString(undefined, { month: 'short' }).toUpperCase().replace('.', '');
  }

  mesesFiltrados(queAno: number) {
    return this.facturasAgrupadas[queAno] ?
      this.facturasAgrupadas[queAno].filter(e => e && e.length > 0) : [];
  }

}
