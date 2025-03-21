import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { IItem, ILivrosResultado } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class LivroService {
  private readonly API = 'https://www.googleapis.com/books/v1/volumes';
  constructor(private http: HttpClient) { }

  buscar(valorDigitado: string) : Observable<ILivrosResultado>{
    const params = new HttpParams().append('q', valorDigitado);
    return this.http.get<ILivrosResultado>(this.API, {params});
  }
}
