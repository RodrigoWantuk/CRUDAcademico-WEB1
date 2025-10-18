import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

import { Curso as CursoService } from '../services/curso';
import { Curso as CursoModel } from '../../shared/models/curso.model';

@Component({
  selector: 'app-cadastrar-editar-curso',
  imports: [FormsModule, CommonModule, RouterLink, NgIf],
  templateUrl: './cadastrar-editar-curso.html',
  styleUrls: ['./cadastrar-editar-curso.css']
})
export class CadastrarEditarCurso implements OnInit {
  @ViewChild('formCurso') formCurso!: NgForm;

  curso: CursoModel = new CursoModel();
  editar: boolean = false;
  erroLinkPersonalizado: string | null = null;

  constructor(
    private cursoService: CursoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.params['id'];
    if (idParam !== undefined && idParam !== null && idParam !== '') {
      const id = +idParam;
      const res = this.cursoService.buscarPorId(id);
      if (res !== undefined) {
        this.curso = { ...res };
        this.editar = true;
      } else {
        throw new Error('Curso não encontrado. Id = ' + id);
      }
    }
  }

  limparErroLink(): void {
    this.erroLinkPersonalizado = null;
  }

  validarLinkAntesSalvar(): boolean {
    if (!this.curso.link) {
      this.erroLinkPersonalizado = null;
      return true; // link opcional
    }
    const valor = (this.curso.link || '').trim();
    // aceita http(s)://... ou www... ou dominio simples com TLD
    const re = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/.*)?$/;
    if (!re.test(valor)) {
      this.erroLinkPersonalizado = 'Link inválido. Informe um endereço válido.';
      return false;
    }
    this.erroLinkPersonalizado = null;
    return true;
  }

  salvar(): void {
    if (!this.formCurso || !this.formCurso.form.valid) {
      this.formCurso?.form.markAllAsTouched();
      return;
    }

    if (!this.validarLinkAntesSalvar()) return;

    const payload: CursoModel = {
      id: this.editar ? this.curso.id : undefined,
      nome: this.curso.nome ? this.curso.nome.trim() : '',
      link: this.curso.link ? this.curso.link.trim() : ''
    };

    if (this.editar && payload.id !== undefined) {
      this.cursoService.atualizar(payload);
    } else {
      const novo: Omit<CursoModel, 'id'> = {
        nome: payload.nome,
        link: payload.link
      };
      this.cursoService.inserir(novo);
    }

    this.router.navigate(['/cursos']);
  }

  cancelar(): void {
    this.router.navigate(['/cursos']);
  }
}
