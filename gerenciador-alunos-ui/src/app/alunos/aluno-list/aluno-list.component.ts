import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

import { Aluno } from '../model/aluno';
import { AlunosService } from '../alunos.service';
import { UtilsService } from '../../core/utils.service';

@Component({
  selector: 'app-aluno-list',
  templateUrl: './aluno-list.component.html',
  styleUrls: ['./aluno-list.component.scss']
})
export class AlunoListComponent implements OnInit {

  dataSource = new MatTableDataSource<Aluno>([]);
  displayedColumns = ['nome', 'situacao', 'acoes'];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private alunosService: AlunosService,
    private utilsService: UtilsService
  ) {
    this.listAlunos();
  }

  ngOnInit(): void {
  }

  listAlunos(): void {
    this.alunosService.listAll().subscribe((response: any) => {
      this.dataSource.data = response.alunos;
    }, (error) => {
      console.error(error);
    })
  }

  visualizar(aluno: Aluno, isEditar: boolean): void {
    if (isEditar) {
      const navigationExtras: NavigationExtras = {
        relativeTo: this.route,
        state: { visualizacao: false },
      };

      this.router.navigate(['editar', aluno.id], navigationExtras);
    } else {
      const navigationExtras: NavigationExtras = {
        relativeTo: this.route,
        state: { visualizacao: true },
      };

      this.router.navigate(['visualizar', aluno.id], navigationExtras);
    }
  }

  excluir(aluno: Aluno): void {
    this.alunosService.delete(aluno.id).subscribe(() => {
      this.dataSource.data = this.utilsService.manipularObjetoGrid(
        this.dataSource.data,
        'id',
        aluno.id
      );
    }, (error) => {
        console.error(error);
      }
    );
  }

}
