import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { delay, first, tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Pessoa, PessoaInput } from './model/pessoa';

@Injectable({
  providedIn: 'root'
})
export class PessoasService {

  constructor(
    private http: HttpClient
  ) { }

  listAll() {
    return this.http.get<Pessoa[]>(`${environment.URL_API}/pessoas`)
    .pipe(
      first(),
      // delay(5000),
      tap((data : any) => {
        console.log(data);
      })
    );
  }

  getById(id: number) {
    return this.http.get<Pessoa>(`${environment.URL_API}/pessoas/${id}`)
    .pipe(
      first(),
      tap((data : any) => {
        console.log(data);
      })
    );
  }

  getMaxRa() {
    return this.http.get<string>(`${environment.URL_API}/pessoas/operacoes/max-numero-ra`);
  }

  create(pessoa: PessoaInput) {
    const headers = new HttpHeaders().append('Content-Type', 'application/json');

    return this.http.post(`${environment.URL_API}/pessoas`, JSON.stringify(pessoa), { headers });
  }

  update(id: number, pessoa: PessoaInput) {
    const headers = new HttpHeaders().append('Content-Type', 'application/json');

    return this.http.put(`${environment.URL_API}/pessoas/${id}`, JSON.stringify(pessoa), { headers });
  }

  delete(id: number) {
    return this.http.delete(`${environment.URL_API}/pessoas/${id}`);
  }

  consultarCEP(cep: string) {
    // Nova variável "cep" somente com dígitos.
    cep = cep.replace(/\D/g, '');

    // Verifica se campo cep possui valor informado.
    if (cep !== '') {
      // Expressão regular para validar o CEP.
      const validacep = /^[0-9]{8}$/;

      // Valida o formato do CEP.
      if (validacep.test(cep)) {
        return this.http.get(`//viacep.com.br/ws/${cep}/json`);
      }
    }

    return of({});
  }
}
