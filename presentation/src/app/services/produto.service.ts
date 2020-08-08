import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(private http: HttpClient) { }

  // Busca na api a lista
  getAll(): Observable<any> {
      return this.http.get<any>(environment.ApiUrl + 'api/produtos');
  }

}
