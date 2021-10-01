import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, first, tap } from 'rxjs/operators';

import { environment } from './../../environments/environment';
import { Aluno, AlunoInput } from './model/aluno';

@Injectable({
  providedIn: 'root'
})
export class AlunosService {

  constructor(
    private http: HttpClient
  ) { }

  listAll() {
    return this.http.get<Aluno[]>(`${environment.URL_API}/alunos`)
    .pipe(
      first(),
      // delay(5000),
      tap((data : any) => {
        console.log(data);
      })
    );
  }

  getById(id: number) {
    return this.http.get<Aluno>(`${environment.URL_API}/alunos/${id}`)
    .pipe(
      first(),
      tap((data : any) => {
        console.log(data);
      })
    );
  }

  create(aluno: AlunoInput) {
    const headers = new HttpHeaders().append('Content-Type', 'application/json');

    return this.http.post(`${environment.URL_API}/alunos`, JSON.stringify(aluno), { headers });
  }

  update(id: number, aluno: AlunoInput) {
    const headers = new HttpHeaders().append('Content-Type', 'application/json');

    return this.http.put(`${environment.URL_API}/alunos/${id}`, JSON.stringify(aluno), { headers });
  }

  delete(id: number) {
    return this.http.delete(`${environment.URL_API}/alunos/${id}`);
  }
}
