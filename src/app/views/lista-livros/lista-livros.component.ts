import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { catchError, debounceTime, distinctUntilChanged, filter, forkJoin, map, mergeMap, of, switchMap, tap, throwError } from 'rxjs';
import { IItem, ILivrosResultado } from 'src/app/models/interfaces';
import { LivroVolumeInfo } from 'src/app/models/livroVolumeInfo';
import { LivroService } from 'src/app/service/livro.service';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent {

  pausa = 300;
  campoBusca = new FormControl();
  mensagemError = "";
  livrosResultado!: ILivrosResultado;

  constructor(private service: LivroService) { }

  livrosEncontrados$ = this.campoBusca.valueChanges.pipe(
    debounceTime(this.pausa),
    filter(valorDigitado => valorDigitado.length >= 3),
    distinctUntilChanged(),
    switchMap(valorDigitado => this.service.buscar(valorDigitado)),
    tap(resultado => this.livrosResultado = resultado),
    map(resultado => this.livrosResultadoParaLivros(resultado.items?? [])),
    catchError(error => {
      console.log('Error',error);
      return throwError(() => new Error(this.mensagemError = 'Ops, ocorreu um erro. Recarregue a aplicação.'))
    })
  )

  private livrosResultadoParaLivros(items: IItem[] ) : LivroVolumeInfo[]{
    return items.map(item => {
      return new LivroVolumeInfo(item)
    })
  }
}