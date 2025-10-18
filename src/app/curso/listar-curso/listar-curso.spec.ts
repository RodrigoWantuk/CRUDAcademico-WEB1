import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarCurso } from './listar-curso';

describe('ListarCurso', () => {
  let component: ListarCurso;
  let fixture: ComponentFixture<ListarCurso>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarCurso]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarCurso);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
