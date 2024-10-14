import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIncomingStockComponent } from './add-incoming-stock.component';

describe('AddIncomingStockComponent', () => {
  let component: AddIncomingStockComponent;
  let fixture: ComponentFixture<AddIncomingStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddIncomingStockComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddIncomingStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
