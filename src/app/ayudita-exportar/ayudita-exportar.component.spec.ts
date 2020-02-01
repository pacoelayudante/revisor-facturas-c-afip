import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AyuditaExportarComponent } from './ayudita-exportar.component';

describe('AyuditaExportarComponent', () => {
  let component: AyuditaExportarComponent;
  let fixture: ComponentFixture<AyuditaExportarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AyuditaExportarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AyuditaExportarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
