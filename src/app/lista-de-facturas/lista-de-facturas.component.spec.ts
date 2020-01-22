import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaDeFacturasComponent } from './lista-de-facturas.component';

describe('ListaDeFacturasComponent', () => {
  let component: ListaDeFacturasComponent;
  let fixture: ComponentFixture<ListaDeFacturasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaDeFacturasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaDeFacturasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
