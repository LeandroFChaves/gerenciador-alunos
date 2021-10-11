import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Venda, VendaInput } from './model/venda';

@Injectable({
  providedIn: 'root',
})
export class VendasService {
  constructor(private http: HttpClient) {}

  listAll() {
    return this.http.get<Venda[]>(`${environment.URL_API}/vendas`)
    .pipe(
      first(),
      // delay(5000),
      tap((data : any) => {
        console.log(data);
      })
    );
  }

  getById(id: number) {
    return this.http.get<Venda>(`${environment.URL_API}/vendas/${id}`)
    .pipe(
      first(),
      tap((data : any) => {
        console.log(data);
      })
    );
  }

  create(venda: VendaInput) {
    const headers = new HttpHeaders().append('Content-Type', 'application/json');

    return this.http.post(`${environment.URL_API}/vendas`, JSON.stringify(venda), { headers });
  }

  update(id: number, venda: VendaInput) {
    const headers = new HttpHeaders().append('Content-Type', 'application/json');

    return this.http.put(`${environment.URL_API}/vendas/${id}`, JSON.stringify(venda), { headers });
  }

  delete(id: number) {
    return this.http.delete(`${environment.URL_API}/vendas/${id}`);
  }
}
