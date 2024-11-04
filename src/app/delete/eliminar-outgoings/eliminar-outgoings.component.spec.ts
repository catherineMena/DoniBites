import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarOutgoingsComponent } from './eliminar-outgoings.component';

describe('EliminarOutgoingsComponent', () => {
  let component: EliminarOutgoingsComponent;
  let fixture: ComponentFixture<EliminarOutgoingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EliminarOutgoingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EliminarOutgoingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
