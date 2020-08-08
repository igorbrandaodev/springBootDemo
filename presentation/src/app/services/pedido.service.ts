import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Carrinho } from '../models/carrinho';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  constructor(private http: HttpClient) { }

  // Busca todos
  getAll(): Observable<any> {
    return this.http.get<any>(environment.ApiUrl + 'api/historicos');
  }

  // Deleta 
  delete(id: string): Observable<any> {
    return this.http.delete<any>(environment.ApiUrl + 'api/historico/'+id);
  }

  // Cria
  create(carrinho: Carrinho): Observable<any> {
    debugger
    return this.http.post<any>(environment.ApiUrl + 'api/historico', carrinho);
  }
}
