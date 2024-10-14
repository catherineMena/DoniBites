import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadIncomingStockComponent } from './read-incoming-stock.component';

describe('ReadIncomingStockComponent', () => {
  let component: ReadIncomingStockComponent;
  let fixture: ComponentFixture<ReadIncomingStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReadIncomingStockComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReadIncomingStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
