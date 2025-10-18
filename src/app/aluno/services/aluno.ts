import { Injectable } from '@angular/core';
import { Aluno as AlunoModel } from '../../shared/models/aluno.model';

const LS_CHAVE_ALUNOS = 'RW-WEB1-ALUNOS';

@Injectable({
  providedIn: 'root'
})
export class Aluno {
  private alunos: AlunoModel[] = [];

  constructor() {
    this.carregarDados();
  }

  private carregarDados(): void {
    try {
      const dadosSalvos = localStorage.getItem(LS_CHAVE_ALUNOS);
      this.alunos = dadosSalvos ? JSON.parse(dadosSalvos) : [];
      if (!Array.isArray(this.alunos)) this.alunos = [];
    } catch (e) {
      console.error('Erro ao carregar lista de alunos do localStorage:', e);
      this.alunos = [];
    }
  }

  private persistirDados(): void {
    try {
      localStorage.setItem(LS_CHAVE_ALUNOS, JSON.stringify(this.alunos));
    } catch (e) {
      console.error('Erro ao salvar lista de alunos no localStorage:', e);
    }
  }

  private gerarId(): number {
    if (!this.alunos || this.alunos.length === 0) return 1;
    const maxId = this.alunos.reduce((max, p) => (p.id && p.id > max ? p.id : max), 0);
    return maxId + 1;
  }

  listarTodos(): AlunoModel[] {
    // Retorna cópia para evitar mutações externas.
    return this.alunos.map(a => ({ ...a }));
  }

  inserir(novoAluno: Omit<AlunoModel, 'id'>): void {
    const alunoComID: AlunoModel = {
      id: this.gerarId(),
      ...novoAluno
    };
    this.alunos.push(alunoComID);
    this.persistirDados();
  }

  buscarPorId(id: number): AlunoModel | undefined {
    const found = this.alunos.find(aluno => aluno.id === id);
    return found ? { ...found } : undefined;
  }

  atualizar(alunoAtualizado: AlunoModel): void {
    const index = this.alunos.findIndex(p => p.id === alunoAtualizado.id);
    if (index !== -1) {
      // garantir cópia imutável
      this.alunos[index] = { ...alunoAtualizado };
      this.persistirDados();
    }
  }

  remover(id: number): void {
    this.alunos = this.alunos.filter(aluno => aluno.id !== id);
    this.persistirDados();
  }
}
