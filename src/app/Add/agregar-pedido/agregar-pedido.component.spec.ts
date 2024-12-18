import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarPedidoComponent } from './agregar-pedido.component';

describe('AgregarPedidoComponent', () => {
  let component: AgregarPedidoComponent;
  let fixture: ComponentFixture<AgregarPedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarPedidoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
