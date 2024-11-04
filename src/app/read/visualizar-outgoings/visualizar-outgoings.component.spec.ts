import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarOutgoingsComponent } from './visualizar-outgoings.component';

describe('VisualizarOutgoingsComponent', () => {
  let component: VisualizarOutgoingsComponent;
  let fixture: ComponentFixture<VisualizarOutgoingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisualizarOutgoingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VisualizarOutgoingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
