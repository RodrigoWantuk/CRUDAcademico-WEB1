import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarAluno } from './listar-aluno';

describe('ListarAluno', () => {
  let component: ListarAluno;
  let fixture: ComponentFixture<ListarAluno>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarAluno]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarAluno);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
