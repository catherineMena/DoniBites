import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomingStockComponent } from './incoming-stock.component';

describe('IncomingStockComponent', () => {
  let component: IncomingStockComponent;
  let fixture: ComponentFixture<IncomingStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncomingStockComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IncomingStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
