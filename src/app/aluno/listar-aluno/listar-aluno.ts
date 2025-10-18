import { Component, OnInit } from '@angular/core';
import { Aluno as AlunoService } from '../services/aluno';
import { Aluno as AlunoModel } from '../../shared/models/aluno.model';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NgFor } from '@angular/common';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-listar-aluno',
  imports: [CommonModule, RouterLink, NgFor],
  templateUrl: './listar-aluno.html',
  styleUrl: './listar-aluno.css'
})
export class ListarAluno implements OnInit {
  alunos: AlunoModel[] = [];

  constructor(private alunoService: AlunoService) {}

  ngOnInit(): void {
    this.alunos = this.listarTodos();
  }

  listarTodos(): AlunoModel[] {
   return this.alunoService.listarTodos();
  }

  remover($event: any, aluno: AlunoModel): void 
  {
    $event.preventDefault();
    if(confirm('Deseja realmente remover o Aluno ' + aluno.nome + '?'))
    {
      this.alunoService.remover(aluno.id!);
      this.alunos = this.alunoService.listarTodos();
    }
  }

}
