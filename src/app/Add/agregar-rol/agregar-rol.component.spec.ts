import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarRolComponent } from './agregar-rol.component'; // Asegúrate de que la ruta sea correcta

describe('AgregarRolComponent', () => {
  let component: AgregarRolComponent;
  let fixture: ComponentFixture<AgregarRolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgregarRolComponent]  // Usa 'declarations' en lugar de 'imports'
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarRolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
