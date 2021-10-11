import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

import { Produto } from '../../produtos/model/produto';
import { ProdutosService } from '../../produtos/produtos.service';
import { ItemVenda } from '../model/venda';

@Component({
  selector: 'app-item-venda-form',
  templateUrl: './item-venda-form.component.html',
  styleUrls: ['./item-venda-form.component.scss'],
})
export class ItemVendaFormComponent implements OnInit {
  formulario: FormGroup = new FormGroup({});
  isVisualizacao: boolean = false;

  selectedProduto: string = '';
  produtos: Produto[] = [];

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ItemVendaFormComponent>,
    private produtosService: ProdutosService
  ) {
    this.listProdutos();
  }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      produto: [null, [Validators.required]],
      quantidade: [null, [Validators.required]],
      desconto: [null],
      valor: [null],
    });
  }

  salvar() {
    if (this.formulario.valid) {
      let itemVenda: ItemVenda = this.formulario.getRawValue() as ItemVenda;

      this.dialogRef.close(itemVenda);
    }
  }

  cancelar() {
    this.dialogRef.close();
  }

  compareWithProduto(produto: Produto, produtoSelecionado: Produto): boolean {
    return (
      produto && produtoSelecionado && produto.id === produtoSelecionado.id
    );
  }

  onProdutoChange(itemVenda: ItemVenda) {
    this.formulario.patchValue({
      valor: itemVenda.valor
    });
  }

  onChangeQuantidade(quantidade: any) {
    let valor = this.formulario.get('produto')?.value.valor;

    this.formulario.patchValue({
      valor: (quantidade.target.value * valor)
    });
  }

  onChangeDesconto(desconto: any) {
    let valor = this.formulario.get('valor')?.value;

    if (valor) {
      this.formulario.patchValue({
        valor: (valor - desconto.target.value)
      });
    }
  }

  private listProdutos() {
    this.produtosService.listAll().subscribe(
      (response: any) => {
        this.produtos = response.produtos;
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
