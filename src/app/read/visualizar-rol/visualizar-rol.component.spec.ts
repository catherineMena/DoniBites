import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VisualizarRolComponent } from './visualizar-rol.component';

describe('VisualizarRolComponent', () => {
  let component: VisualizarRolComponent;
  let fixture: ComponentFixture<VisualizarRolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VisualizarRolComponent]  // Cambiado de imports a declarations
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisualizarRolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
