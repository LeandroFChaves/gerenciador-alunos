import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

import { AlunosService } from '../alunos.service';
import { Aluno, AlunoInput } from '../model/aluno';

@Component({
  selector: 'app-aluno-form',
  templateUrl: './aluno-form.component.html',
  styleUrls: ['./aluno-form.component.scss']
})
export class AlunoFormComponent implements OnInit {

  private idAluno: number | undefined;

  formulario: FormGroup = new FormGroup({});
  isVisualizacao: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private alunosService: AlunosService
  ) {
    const aluno = this.router.getCurrentNavigation()?.extras.state;

    if (aluno) {
      this.isVisualizacao = aluno.visualizacao;
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
          this.idAluno = id;
          return this.alunosService.getById(id);
        }

        return EMPTY;
      })
    )
    .subscribe((aluno: Aluno) => {
      this.updateForm(aluno);
    });
  }

  salvar(): void {
    if (this.formulario.valid) {
      let aluno: AlunoInput = this.formulario.getRawValue() as AlunoInput;

      if (this.idAluno) {
        this.alunosService.update(this.idAluno, aluno).subscribe((data: any) => {
          this.router.navigate(['alunos']);
        }, (error) => {
          console.error(error);
        });
      } else {
        this.alunosService.create(aluno).subscribe((data: any) => {
          this.router.navigate(['alunos']);
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
    this.router.navigate(['alunos']);
  }

  private updateForm(aluno: Aluno): void {
    this.isVisualizacao ? this.formulario.disable() : false;

    this.formulario.patchValue({
      nome: aluno.nome,
      situacao: aluno.situacao
    });
  }

}
