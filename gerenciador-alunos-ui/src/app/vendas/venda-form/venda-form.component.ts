import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ValidationErrors,
} from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { ItemVenda, Venda, VendaInput } from '../model/venda';
import { Pessoa } from './../../pessoas/model/pessoa';
import { VendasService } from '../vendas.service';
import { PessoasService } from './../../pessoas/pessoas.service';
import { MatDialog } from '@angular/material/dialog';
import { ItemVendaFormComponent } from '../item-venda-form/item-venda-form.component';

@Component({
  selector: 'app-venda-form',
  templateUrl: './venda-form.component.html',
  styleUrls: ['./venda-form.component.scss'],
})
export class VendaFormComponent implements OnInit {
  private idVenda: number | undefined;

  dataSourceItensVenda = new MatTableDataSource<ItemVenda>([]);
  displayedColumns = ['produto', 'quantidade', 'desconto', 'valor', 'acoes'];

  formulario: FormGroup = new FormGroup({});
  isVisualizacao: boolean = false;
  pessoas: Pessoa[] = [];

  selectedItemVenda: number | undefined;
  selectedCliente: Pessoa | undefined;
  selectedVendedor: Pessoa | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private dialogItemVenda: MatDialog,
    private vendasService: VendasService,
    private pessoasService: PessoasService
  ) {
    const venda = this.router.getCurrentNavigation()?.extras.state;

    if (venda) {
      this.isVisualizacao = venda.visualizacao;
    }

    this.listPessoas();
  }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      pessoaCliente: [null, [Validators.required]],
      pessoaVendedor: [null, [Validators.required]],
      dataVenda: [null],
      desconto: [null],
      valorBruto: [null],
      valorLiquido: [null],
      formaPagamento: [null, [Validators.required]],
      observacao: [null],
    });

    this.route.params
      .pipe(
        map((params: any) => params.id),
        switchMap((id: number) => {
          if (id) {
            this.idVenda = id;
            return this.vendasService.getById(id);
          }

          return EMPTY;
        })
      )
      .subscribe((venda: Venda) => {
        this.updateForm(venda);
      });
  }

  salvar(): void {
    if (this.formulario.valid) {
      let venda: VendaInput = this.formulario.getRawValue() as VendaInput;

      if (this.dataSourceItensVenda.data.length > 0) {
        venda.itensVenda = this.dataSourceItensVenda.data;
      }

      console.log(venda);

      if (this.idVenda) {
        this.vendasService.update(this.idVenda, venda).subscribe(
          (data: any) => {
            this.router.navigate(['vendas']);
          },
          (error) => {
            console.error(error);
          }
        );
      } else {
        this.vendasService.create(venda).subscribe(
          (data: any) => {
            this.router.navigate(['vendas']);
          },
          (error) => {
            console.error(error);
          }
        );
      }
    }
  }

  hasError(campo: string): ValidationErrors | null | undefined {
    if (this.formulario && this.formulario.get(campo)) {
      return this.formulario.get(campo)?.errors;
    }

    return null;
  }

  verificarValidacoesForm(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach((campo) => {
      const controle = formGroup.get(campo);

      if (controle) {
        controle.markAsDirty();

        if (controle instanceof FormGroup) {
          this.verificarValidacoesForm(controle);
        }
      }
    });
  }

  cancelar(): void {
    this.formulario.reset();
    this.router.navigate(['vendas']);
  }

  novoItemVenda(): void {
    const dialogRef = this.dialogItemVenda.open(ItemVendaFormComponent, {
      // width: '250px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result: ItemVenda) => {
      if (result) {
        let valorLiquido = this.formulario.get('valorLiquido')?.value;
        let valorBruto = this.formulario.get('valorBruto')?.value;

        this.formulario.patchValue({
          valorBruto: (valorBruto + result.valor),
          valorLiquido: (valorLiquido + result.valor)
        });

        this.addItemVendaGrid(result);
      }
    });
  }

  addItemVendaGrid(itemVenda: ItemVenda): void {
    this.dataSourceItensVenda.data.push(itemVenda);
    this.dataSourceItensVenda.connect().next(this.dataSourceItensVenda.data);
  }

  selectItemVenda(itemVenda: ItemVenda): void {
    this.selectedItemVenda = itemVenda?.id;
  }

  excluir(itemVenda: ItemVenda): void {}

  compareWithCliente(pessoa: Pessoa, pessoaSelecionada: Pessoa): boolean {
    return pessoa && pessoaSelecionada && pessoa.id === pessoaSelecionada.id;
  }

  compareWithVendedor(pessoa: Pessoa, pessoaSelecionada: Pessoa): boolean {
    return pessoa && pessoaSelecionada && pessoa.id === pessoaSelecionada.id;
  }

  onChangeDesconto(desconto: any) {
    let valorLiquido = this.formulario.get('valorLiquido')?.value;

    if (valorLiquido) {
      this.formulario.patchValue({
        valorLiquido: (valorLiquido - desconto.target.value)
      });
    }
  }

  private listPessoas() {
    this.pessoasService.listAll().subscribe(
      (response: any) => {
        this.pessoas = response.pessoas;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  private updateForm(venda: Venda): void {
    this.isVisualizacao ? this.formulario.disable() : false;

    //this.selectedCliente = venda.pessoaCliente;
    //this.selectedVendedor = venda.pessoaVendedor;

    this.formulario.patchValue({
      pessoaCliente: venda.pessoaCliente,
      pessoaVendedor: venda.pessoaVendedor,
      dataVenda: venda.dataVenda,
      valorBruto: venda.valorBruto,
      valorLiquido: venda.valorLiquido,
      observacao: venda.observacao
    });

    venda.itensVenda.forEach(item => {
      this.addItemVendaGrid(item);
    });
  }
}
