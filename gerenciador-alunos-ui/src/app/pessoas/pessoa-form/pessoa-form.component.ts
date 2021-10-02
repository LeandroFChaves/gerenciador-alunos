import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

import { PessoasService } from '../pessoas.service';
import { Pessoa, PessoaInput } from '../model/pessoa';

@Component({
  selector: 'app-pessoa-form',
  templateUrl: './pessoa-form.component.html',
  styleUrls: ['./pessoa-form.component.scss']
})
export class PessoaFormComponent implements OnInit {

  private idPessoa: number | undefined;

  formulario: FormGroup = new FormGroup({});
  isVisualizacao: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private alunosService: PessoasService
  ) {
    const pessoa = this.router.getCurrentNavigation()?.extras.state;

    if (pessoa) {
      this.isVisualizacao = pessoa.visualizacao;
    }
  }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      nome: [
        null,
        [
          Validators.required,
          Validators.maxLength(300)
        ],
      ],
      situacao: [
        null,
        [
          Validators.required,
          Validators.maxLength(50)
        ]
      ]
    });

    this.route.params
    .pipe(
      map((params: any) => params.id),
      switchMap((id: number) => {
        if (id) {
          this.idPessoa = id;
          return this.alunosService.getById(id);
        }

        return EMPTY;
      })
    )
    .subscribe((pessoa: Pessoa) => {
      this.updateForm(pessoa);
    });
  }

  salvar(): void {
    if (this.formulario.valid) {
      let pessoa: PessoaInput = this.formulario.getRawValue() as PessoaInput;

      if (this.idPessoa) {
        this.alunosService.update(this.idPessoa, pessoa).subscribe((data: any) => {
          this.router.navigate(['pessoas']);
        }, (error) => {
          console.error(error);
        });
      } else {
        this.alunosService.create(pessoa).subscribe((data: any) => {
          this.router.navigate(['pessoas']);
        }, (error) => {
          console.error(error);
        });
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
    this.router.navigate(['pessoas']);
  }

  private updateForm(pessoa: Pessoa): void {
    this.isVisualizacao ? this.formulario.disable() : false;

    this.formulario.patchValue({
      nome: pessoa.nome,
      situacao: pessoa.situacao
    });
  }

}