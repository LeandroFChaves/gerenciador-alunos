import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
}
