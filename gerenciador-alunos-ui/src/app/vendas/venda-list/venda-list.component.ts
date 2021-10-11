import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';

import { UtilsService } from '../../core/utils.service';
import { Venda } from '../model/venda';
import { VendasService } from '../vendas.service';

@Component({
  selector: 'app-venda-list',
  templateUrl: './venda-list.component.html',
  styleUrls: ['./venda-list.component.scss']
})
export class VendaListComponent implements OnInit {

  dataSource = new MatTableDataSource<Venda>([]);
  displayedColumns = ['pessoaCliente', 'pessoaVendedor', 'dataVenda', 'valorLiquido', 'acoes'];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private vendasService: VendasService,
    private utilsService: UtilsService
  ) { }

  ngOnInit(): void {
    this.listVendas();
  }

  listVendas(): void {
    this.vendasService.listAll().subscribe((response: any) => {
      this.dataSource.data = response.vendas;
    }, (error) => {
      console.error(error);
    })
  }

  visualizar(venda: Venda, isEditar: boolean): void {
    if (isEditar) {
      const navigationExtras: NavigationExtras = {
        relativeTo: this.route,
        state: { visualizacao: false },
      };

      this.router.navigate(['editar', venda.id], navigationExtras);
    } else {
      const navigationExtras: NavigationExtras = {
        relativeTo: this.route,
        state: { visualizacao: true },
      };

      this.router.navigate(['visualizar', venda.id], navigationExtras);
    }
  }

  excluir(venda: Venda): void {
    this.vendasService.delete(venda.id).subscribe(() => {
      this.dataSource.data = this.utilsService.manipularObjetoGrid(
        this.dataSource.data,
        'id',
        venda.id
      );
    }, (error) => {
        console.error(error);
      }
    );
  }

}
