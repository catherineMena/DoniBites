import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarIncomingStockComponent } from './actualizar-incoming-stock.component';

describe('ActualizarIncomingStockComponent', () => {
  let component: ActualizarIncomingStockComponent;
  let fixture: ComponentFixture<ActualizarIncomingStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActualizarIncomingStockComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActualizarIncomingStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
