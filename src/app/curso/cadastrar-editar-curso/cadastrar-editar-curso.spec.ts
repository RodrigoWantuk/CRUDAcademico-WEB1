import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarEditarCurso } from './cadastrar-editar-curso';

describe('CadastrarEditarCurso', () => {
  let component: CadastrarEditarCurso;
  let fixture: ComponentFixture<CadastrarEditarCurso>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastrarEditarCurso]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastrarEditarCurso);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
