import {Pipe, PipeTransform} from "@angular/core";


@Pipe({name: 'vndTransfer'})
export class MoneyTranferPipe  implements PipeTransform{
  transform(value: any, ...args): any {
    var money = parseInt(value);
    return money.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
  }
}
