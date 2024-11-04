import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarOutgoingsComponent } from './agregar-outgoings.component';

describe('AgregarOutgoingsComponent', () => {
  let component: AgregarOutgoingsComponent;
  let fixture: ComponentFixture<AgregarOutgoingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarOutgoingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgregarOutgoingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
