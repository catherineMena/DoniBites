import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarFacturaComponent } from './visualizar-factura.component';

describe('VisualizarFacturaComponent', () => {
  let component: VisualizarFacturaComponent;
  let fixture: ComponentFixture<VisualizarFacturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisualizarFacturaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VisualizarFacturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
