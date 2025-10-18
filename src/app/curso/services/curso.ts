import { Injectable } from '@angular/core';
import { Curso as CursoModel } from '../../shared/models/curso.model';

const LS_CHAVE_CURSOS = 'RW-WEB1-CURSOS';

@Injectable({
  providedIn: 'root'
})
export class Curso {
  private cursos: CursoModel[] = [];

  constructor() {
    this.carregarDados();
  }

  private carregarDados(): void {
    try {
      const dadosSalvos = localStorage.getItem(LS_CHAVE_CURSOS);
      this.cursos = dadosSalvos ? JSON.parse(dadosSalvos) : [];
      if (!Array.isArray(this.cursos)) this.cursos = [];
    } catch (e) {
      console.error('Erro ao carregar lista de cursos do localStorage:', e);
      this.cursos = [];
    }
  }

  private persistirDados(): void {
    try {
      localStorage.setItem(LS_CHAVE_CURSOS, JSON.stringify(this.cursos));
    } catch (e) {
      console.error('Erro ao salvar lista de cursos no localStorage:', e);
    }
  }

  private gerarId(): number {
    if (!this.cursos || this.cursos.length === 0) return 1;
    const maxId = this.cursos.reduce((max, p) => (p.id && p.id > max ? p.id : max), 0);
    return maxId + 1;
  }

  listarTodos(): CursoModel[] {
    return this.cursos.map(c => ({ ...c }));
  }

  inserir(novoCurso: Omit<CursoModel, 'id'>): void {
    const cursoComID: CursoModel = {
      id: this.gerarId(),
      ...novoCurso
    };
    this.cursos.push(cursoComID);
    this.persistirDados();
  }

  buscarPorId(id: number): CursoModel | undefined {
    const found = this.cursos.find(curso => curso.id === id);
    return found ? { ...found } : undefined;
  }

  atualizar(cursoAtualizado: CursoModel): void {
    const index = this.cursos.findIndex(p => p.id === cursoAtualizado.id);
    if (index !== -1) {
      this.cursos[index] = { ...cursoAtualizado };
      this.persistirDados();
    }
  }

  remover(id: number): void {
    this.cursos = this.cursos.filter(curso => curso.id !== id);
    this.persistirDados();
  }
}
