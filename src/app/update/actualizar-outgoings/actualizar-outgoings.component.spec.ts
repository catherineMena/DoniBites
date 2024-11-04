import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarOutgoingsComponent } from './actualizar-outgoings.component';

describe('ActualizarOutgoingsComponent', () => {
  let component: ActualizarOutgoingsComponent;
  let fixture: ComponentFixture<ActualizarOutgoingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActualizarOutgoingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActualizarOutgoingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
