import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarOutgoingComponent } from './agregar-outgoings.component';

describe('AgregarOutgoingsComponent', () => {
  let component: AgregarOutgoingComponent;
  let fixture: ComponentFixture<AgregarOutgoingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarOutgoingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarOutgoingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
