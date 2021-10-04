import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';

import { UtilsService } from '../../core/utils.service';
import { Produto } from '../model/produto';
import { ProdutosService } from '../../produtos/produtos.service';

@Component({
  selector: 'app-produto-list',
  templateUrl: './produto-list.component.html',
  styleUrls: ['./produto-list.component.scss']
})
export class ProdutoListComponent implements OnInit {

  dataSource = new MatTableDataSource<Produto>([]);
  displayedColumns = ['nome', 'valor', 'estoque', 'situacao', 'acoes'];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private produtosService: ProdutosService,
    private utilsService: UtilsService
  ) { }

  ngOnInit(): void {
    this.listProdutos();
  }

  listProdutos(): void {
    this.produtosService.listAll().subscribe((response: any) => {
      this.dataSource.data = response.produtos;
    }, (error) => {
      console.error(error);
    })
  }

  visualizar(produto: Produto, isEditar: boolean): void {
    if (isEditar) {
      const navigationExtras: NavigationExtras = {
        relativeTo: this.route,
        state: { visualizacao: false },
      };

      this.router.navigate(['editar', produto.id], navigationExtras);
    } else {
      const navigationExtras: NavigationExtras = {
        relativeTo: this.route,
        state: { visualizacao: true },
      };

      this.router.navigate(['visualizar', produto.id], navigationExtras);
    }
  }

  excluir(produto: Produto): void {
    this.produtosService.delete(produto.id).subscribe(() => {
      this.dataSource.data = this.utilsService.manipularObjetoGrid(
        this.dataSource.data,
        'id',
        produto.id
      );
    }, (error) => {
        console.error(error);
      }
    );
  }

}
