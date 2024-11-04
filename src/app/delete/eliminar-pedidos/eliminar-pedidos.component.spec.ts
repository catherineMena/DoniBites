import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarPedidosComponent } from './eliminar-pedidos.component';

describe('EliminarPedidosComponent', () => {
  let component: EliminarPedidosComponent;
  let fixture: ComponentFixture<EliminarPedidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EliminarPedidosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EliminarPedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
