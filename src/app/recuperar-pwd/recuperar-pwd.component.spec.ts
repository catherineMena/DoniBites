import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecuperarPwdComponent } from './recuperar-pwd.component';

describe('RecuperarPwdComponent', () => {
  let component: RecuperarPwdComponent;
  let fixture: ComponentFixture<RecuperarPwdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecuperarPwdComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecuperarPwdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
