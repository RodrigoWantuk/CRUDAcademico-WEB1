import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

import { Aluno as AlunoService } from '../services/aluno';
import { Aluno as AlunoModel } from '../../shared/models/aluno.model';

@Component({
  selector: 'app-cadastrar-editar-aluno',
  imports: [FormsModule, CommonModule, RouterLink, NgIf],
  templateUrl: './cadastrar-editar-aluno.html',
  styleUrls: ['./cadastrar-editar-aluno.css']
})
export class CadastrarEditarAluno implements OnInit {
  @ViewChild('formAluno') formAluno!: NgForm;

  aluno: AlunoModel = new AlunoModel();
  editar: boolean = false;

  erroCpfPersonalizado: string | null = null;
  erroEmailPersonalizado: string | null = null;

  constructor(
    private alunoService: AlunoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.params['id'];
    if (idParam !== undefined && idParam !== null && idParam !== '') {
      const id = +idParam;
      const res = this.alunoService.buscarPorId(id);
      if (res !== undefined) {
        this.aluno = { ...res };
        this.editar = true;
        if (this.aluno.dataNascimento) {
          const d = new Date(this.aluno.dataNascimento);
          if (!isNaN(d.getTime())) {
            const yyyy = d.getFullYear();
            const mm = String(d.getMonth() + 1).padStart(2, '0');
            const dd = String(d.getDate()).padStart(2, '0');
            this.aluno.dataNascimento = `${yyyy}-${mm}-${dd}`;
          }
        }
      } else {
        throw new Error('Aluno não encontrado. Id = ' + id);
      }
    }
  }

  limparErroCpf(): void {
    this.erroCpfPersonalizado = null;
  }

  limparErroEmail(): void {
    this.erroEmailPersonalizado = null;
  }

  formatarCpf(): void {
    if (!this.aluno.cpf) return;
    const apenasDigitos = this.aluno.cpf.replace(/\D/g, '');
    if (apenasDigitos.length === 11) {
      this.aluno.cpf = apenasDigitos.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
      this.erroCpfPersonalizado = null;
    } else {
      this.erroCpfPersonalizado = 'CPF deve conter 11 dígitos.';
    }
  }

  validarCpfAntesSalvar(): boolean {
    const raw = (this.aluno.cpf || '').replace(/\D/g, '');
    if (!/^\d{11}$/.test(raw)) {
      this.erroCpfPersonalizado = 'CPF inválido. Informe 11 dígitos.';
      return false;
    }
    this.erroCpfPersonalizado = null;
    return true;
  }

  validarEmailAntesSalvar(): boolean {
    const email = (this.aluno.email || '').trim();
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!re.test(email)) {
      this.erroEmailPersonalizado = 'E-mail em formato inválido.';
      return false;
    }
    this.erroEmailPersonalizado = null;
    return true;
  }

  salvar(): void {
    if (!this.formAluno || !this.formAluno.form.valid) {
      this.formAluno?.form.markAllAsTouched();
      return;
    }

    if (!this.validarCpfAntesSalvar()) return;
    if (!this.validarEmailAntesSalvar()) return;

    const rawCpf = (this.aluno.cpf || '').replace(/\D/g, '');
    this.aluno.cpf = rawCpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');

    const payload: AlunoModel = {
      id: this.editar ? this.aluno.id : undefined,
      nome: this.aluno.nome ? this.aluno.nome.trim() : '',
      cpf: this.aluno.cpf,
      email: this.aluno.email ? this.aluno.email.trim() : '',
      dataNascimento: this.aluno.dataNascimento ? this.aluno.dataNascimento : ''
    };

    if (this.editar && payload.id !== undefined) {
      this.alunoService.atualizar(payload);
    } else {
      const novo: Omit<AlunoModel, 'id'> = {
        nome: payload.nome,
        cpf: payload.cpf,
        email: payload.email,
        dataNascimento: payload.dataNascimento
      };
      this.alunoService.inserir(novo);
    }

    this.router.navigate(['/alunos']);
  }

  cancelar(): void {
    this.router.navigate(['/alunos']);
  }
}
