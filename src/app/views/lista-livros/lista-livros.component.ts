import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, map, switchMap } from 'rxjs';
import { Item } from 'src/app/models/interfaces';
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
  constructor(private service: LivroService) { }

  livrosEncontrados$ = this.campoBusca.valueChanges.pipe(
    debounceTime(this.pausa),
    filter(valorDigitado => valorDigitado.length >= 3),
    distinctUntilChanged(),
    switchMap(valorDigitado => this.service.buscar(valorDigitado)),
    map((items: Item[]) => this.livrosResultadoParaLivros(items))
  )

  private livrosResultadoParaLivros(items: Item[] ) : LivroVolumeInfo[]{
    return items.map(item => {
      return new LivroVolumeInfo(item)
    })
  }
}