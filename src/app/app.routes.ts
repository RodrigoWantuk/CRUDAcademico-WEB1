import { Routes } from '@angular/router';
import { ListarAluno } from './aluno/listar-aluno/listar-aluno';
import { CadastrarEditarAluno } from './aluno/cadastrar-editar-aluno/cadastrar-editar-aluno';
import { ListarCurso } from './curso/listar-curso/listar-curso';
import { CadastrarEditarCurso } from './curso/cadastrar-editar-curso/cadastrar-editar-curso';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'alunos/listar',
        pathMatch: 'full' 
    },
    {
        path: 'alunos',
        redirectTo: 'alunos/listar'
    },
    {
        path: 'alunos/listar',
        component: ListarAluno
    },
    {
        path: 'alunos/cadastrar',
        component: CadastrarEditarAluno
    },
    {
        path: 'alunos/editar/:id',
        component: CadastrarEditarAluno
    },
    {
        path: 'cursos',
        redirectTo: 'cursos/listar'
    },
    {
        path: 'cursos/listar',
        component: ListarCurso
    },
    {
        path: 'cursos/cadastrar',
        component: CadastrarEditarCurso
    },
    {
        path: 'cursos/editar/:id',
        component: CadastrarEditarCurso
    }
];
