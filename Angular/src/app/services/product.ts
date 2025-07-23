import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:3001';

  constructor(private http: HttpClient) { }

  getTodosOsProdutos(): Observable<any[]> {
    const pelucias$ = this.http.get<any[]>(`${this.apiUrl}/produtos/pelucias`);
    const tcg$ = this.http.get<any[]>(`${this.apiUrl}/produtos/tcg`);

    return forkJoin([pelucias$, tcg$]).pipe(
      map(([pelucias, tcg]) => [...pelucias, ...tcg])
    );
  }

  // ADICIONE ESTE MÉTODO QUE ESTAVA FALTANDO
  getProdutoPorId(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/produtos/${id}`);
  }
}