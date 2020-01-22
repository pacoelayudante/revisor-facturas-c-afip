import { Component, OnInit } from '@angular/core';
import { InfoAfipService } from '../info-afip.service';

@Component({
  selector: 'app-agregar-archivo',
  templateUrl: './agregar-archivo.component.html',
  styleUrls: ['./agregar-archivo.component.css']
})
export class AgregarArchivoComponent implements OnInit {
  facturas = [];

  constructor(
    private infoService: InfoAfipService
  ) { }

  ngOnInit() {
    this.facturas = this.infoService.facturasArray;
  }

  onCargarChanges(htmlInput: HTMLInputElement) {
    let archivos = htmlInput.files;
    for (var i = 0; i < archivos.length; i++) {
      this.infoService.cargarArchivo(archivos[i]);
    }
  }
}
