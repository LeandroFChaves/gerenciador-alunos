import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { Produto, ProdutoInput } from '../model/produto';
import { ProdutosService } from '../produtos.service';

@Component({
  selector: 'app-produto-form',
  templateUrl: './produto-form.component.html',
  styleUrls: ['./produto-form.component.scss']
})
export class ProdutoFormComponent implements OnInit {
  private idProduto: number | undefined;

  formulario: FormGroup = new FormGroup({});
  isVisualizacao: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private produtosService: ProdutosService
  ) {
    const produto = this.router.getCurrentNavigation()?.extras.state;

    if (produto) {
      this.isVisualizacao = produto.visualizacao;
    }
  }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.maxLength(250)]],
      valor: [null, [Validators.required, Validators.maxLength(11)]],
      estoque: [null],
      descricao: [null],
      situacao: [null, [Validators.required]],
    });

    this.route.params
      .pipe(
        map((params: any) => params.id),
        switchMap((id: number) => {
          if (id) {
            this.idProduto = id;
            return this.produtosService.getById(id);
          }

          return EMPTY;
        })
      )
      .subscribe((produto: Produto) => {
        this.updateForm(produto);
      });
  }

  salvar(): void {
    if (this.formulario.valid) {
      let produto: ProdutoInput = this.formulario.getRawValue() as ProdutoInput;

      if (this.idProduto) {
        this.produtosService.update(this.idProduto, produto).subscribe(
          (data: any) => {
            this.router.navigate(['produtos']);
          },
          (error) => {
            console.error(error);
          }
        );
      } else {
        this.produtosService.create(produto).subscribe(
          (data: any) => {
            this.router.navigate(['produtos']);
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
    this.router.navigate(['produtos']);
  }

  private updateForm(produto: Produto): void {
    this.isVisualizacao ? this.formulario.disable() : false;

    this.formulario.patchValue({
      nome: produto.nome,
      valor: produto.valor,
      estoque: produto.estoque,
      descricao: produto.descricao,
      situacao: produto.situacao
    });
  }

}
