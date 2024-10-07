import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RolComponent } from './rol.component'; // Asegúrate de que el nombre del archivo sea correcto

describe('RolComponent', () => {
  let component: RolComponent;
  let fixture: ComponentFixture<RolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RolComponent]  // Usa 'declarations' en lugar de 'imports' para componentes
    })
    .compileComponents();

    fixture = TestBed.createComponent(RolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
