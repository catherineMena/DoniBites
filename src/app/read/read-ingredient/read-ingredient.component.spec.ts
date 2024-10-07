import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadIngredientComponent } from './read-ingredient.component';

describe('ReadIngredientComponent', () => {
  let component: ReadIngredientComponent;
  let fixture: ComponentFixture<ReadIngredientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReadIngredientComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReadIngredientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
