import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

import { Pessoa } from '../model/pessoa';
import { PessoasService } from '../pessoas.service';
import { UtilsService } from '../../core/utils.service';

@Component({
  selector: 'app-pessoa-list',
  templateUrl: './pessoa-list.component.html',
  styleUrls: ['./pessoa-list.component.scss']
})
export class PessoaListComponent implements OnInit {

  dataSource = new MatTableDataSource<Pessoa>([]);
  displayedColumns = ['nome', 'email', 'telefone1', 'telefone2', 'situacao', 'acoes'];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private pessoasService: PessoasService,
    private utilsService: UtilsService
  ) {
    this.listPessoas();
  }

  ngOnInit(): void {
  }

  listPessoas(): void {
    this.pessoasService.listAll().subscribe((response: any) => {
      this.dataSource.data = response.pessoas;
    }, (error) => {
      console.error(error);
    })
  }

  visualizar(pessoa: Pessoa, isEditar: boolean): void {
    if (isEditar) {
      const navigationExtras: NavigationExtras = {
        relativeTo: this.route,
        state: { visualizacao: false },
      };

      this.router.navigate(['editar', pessoa.id], navigationExtras);
    } else {
      const navigationExtras: NavigationExtras = {
        relativeTo: this.route,
        state: { visualizacao: true },
      };

      this.router.navigate(['visualizar', pessoa.id], navigationExtras);
    }
  }

  excluir(pessoa: Pessoa): void {
    this.pessoasService.delete(pessoa.id).subscribe(() => {
      this.dataSource.data = this.utilsService.manipularObjetoGrid(
        this.dataSource.data,
        'id',
        pessoa.id
      );
    }, (error) => {
        console.error(error);
      }
    );
  }

}
