import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { Item, LivrosResultado } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class LivroService {
  private readonly API = 'https://www.googleapis.com/books/v1/volumes';
  constructor(private http: HttpClient) { }

  buscar(valorDigitado: string) : Observable<Item[]>{
    const params = new HttpParams().append('q', valorDigitado);
    return this.http.get<LivrosResultado>(this.API, {params}).pipe(
      tap((retornoAPI)=> console.log('Fluxo do tap',retornoAPI)),
      map( resultado => resultado.items),
      tap( resultado2 => console.log('Fluxo apos o map', resultado2))
    )
  }
}
