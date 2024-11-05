import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarIncomingStockComponent } from './eliminar-incoming-stock.component';

describe('EliminarIncomingStockComponent', () => {
  let component: EliminarIncomingStockComponent;
  let fixture: ComponentFixture<EliminarIncomingStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EliminarIncomingStockComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EliminarIncomingStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
