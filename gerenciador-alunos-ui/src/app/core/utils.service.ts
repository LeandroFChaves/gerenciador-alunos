import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  manipularObjetoGrid(
    array: Array<any>,
    atributo: string,
    valor: any,
    objeto: any = null
  ): Array<any> {
    let i = array.length;

    while (i--) {
      if (
        array[i] &&
        array[i].hasOwnProperty(atributo) &&
        arguments.length > 2 &&
        array[i][atributo] === valor
      ) {
        if (objeto) {
          array[i] = objeto;
        } else {
          array.splice(i, 1);
        }
      }
    }

    return array;
  }
}
