import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarArchivoComponent } from './agregar-archivo.component';

describe('AgregarArchivoComponent', () => {
  let component: AgregarArchivoComponent;
  let fixture: ComponentFixture<AgregarArchivoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarArchivoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarArchivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
