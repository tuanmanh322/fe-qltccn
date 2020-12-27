import {Pipe, PipeTransform} from "@angular/core";

@Pipe({name: 'formatDateV2'})
export class FormatDateV2Pipe implements PipeTransform{
  transform(value: any, ...args): any {
    var mnths = {
        Jan: "01",
        Feb: "02",
        Mar: "03",
        Apr: "04",
        May: "05",
        Jun: "06",
        Jul: "07",
        Aug: "08",
        Sep: "09",
        Oct: "10",
        Nov: "11",
        Dec: "12"
      },
      date = value.split(" ");

    return [mnths[date[1]], date[2], date[5], date[3]].join("-");
  }
}
