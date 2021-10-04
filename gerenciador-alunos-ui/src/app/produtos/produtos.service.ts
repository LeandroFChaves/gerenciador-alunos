import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Produto, ProdutoInput } from '../produtos/model/produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  constructor(
    private http: HttpClient
  ) { }

  listAll() {
    return this.http.get<Produto[]>(`${environment.URL_API}/produtos`)
    .pipe(
      first(),
      // delay(5000),
      tap((data : any) => {
        console.log(data);
      })
    );
  }

  getById(id: number) {
    return this.http.get<Produto>(`${environment.URL_API}/produtos/${id}`)
    .pipe(
      first(),
      tap((data : any) => {
        console.log(data);
      })
    );
  }

  create(produto: ProdutoInput) {
    const headers = new HttpHeaders().append('Content-Type', 'application/json');

    return this.http.post(`${environment.URL_API}/produtos`, JSON.stringify(produto), { headers });
  }

  update(id: number, produto: ProdutoInput) {
    const headers = new HttpHeaders().append('Content-Type', 'application/json');

    return this.http.put(`${environment.URL_API}/produtos/${id}`, JSON.stringify(produto), { headers });
  }

  delete(id: number) {
    return this.http.delete(`${environment.URL_API}/produtos/${id}`);
  }

}
