import {NgModule} from "@angular/core";
import {MoneyTranferPipe} from "./money-tranfer.pipe";
import {FormatDateV2Pipe} from "./format-date-v2.pipe";
import {FormatLocalDatePipe} from "./format-local-date.pipe";

@NgModule({
  declarations: [MoneyTranferPipe,FormatDateV2Pipe,FormatLocalDatePipe],
  exports: [MoneyTranferPipe, FormatDateV2Pipe,FormatLocalDatePipe]
})
export class PipeModule {

}
