import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarFacturaComponent } from './agregar-factura.component';

describe('AgregarFacturaComponent', () => {
  let component: AgregarFacturaComponent;
  let fixture: ComponentFixture<AgregarFacturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgregarFacturaComponent] // Cambiar imports a declarations
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarFacturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
