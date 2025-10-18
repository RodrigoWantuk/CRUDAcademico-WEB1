import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarEditarAluno } from './cadastrar-editar-aluno';

describe('CadastrarEditarAluno', () => {
  let component: CadastrarEditarAluno;
  let fixture: ComponentFixture<CadastrarEditarAluno>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastrarEditarAluno]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastrarEditarAluno);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
