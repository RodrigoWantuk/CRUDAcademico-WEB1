import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NgFor } from '@angular/common';

import { Curso as CursoService } from '../services/curso';
import { Curso as CursoModel } from '../../shared/models/curso.model';

@Component({
  selector: 'app-listar-curso',
  imports: [CommonModule, RouterLink, NgFor],
  templateUrl: './listar-curso.html',
  styleUrls: ['./listar-curso.css']
})
export class ListarCurso implements OnInit {
  cursos: CursoModel[] = [];

  constructor(private cursoService: CursoService) {}

  ngOnInit(): void {
    this.cursos = this.listarTodos();
  }

  listarTodos(): CursoModel[] {
    return this.cursoService.listarTodos();
  }

  remover($event: any, curso: CursoModel): void {
    $event.preventDefault();
    if (confirm('Deseja realmente remover o Curso ' + curso.nome + '?')) {
      this.cursoService.remover(curso.id!);
      this.cursos = this.cursoService.listarTodos();
    }
  }
}
