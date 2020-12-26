import { Component, OnInit } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Title} from "@angular/platform-browser";
import {ApiService} from "../../share/service/api.service";
import {ChiPhiCreateComponent} from "./chi-phi-child/chi-phi-create/chi-phi-create.component";
import {ChiPhiEditComponent} from "./chi-phi-child/chi-phi-edit/chi-phi-edit.component";

@Component({
  selector: 'app-chi-phi',
  templateUrl: './chi-phi.component.html',
  styleUrls: ['./chi-phi.component.scss']
})
export class ChiPhiComponent implements OnInit {

  constructor(
    private ngbModal: NgbModal,
    private title: Title,
    private apiService: ApiService
  ) {
    this.apiService.onLoad().subscribe(() => {
      this.fetch();
    })
  }

  ngOnInit(): void {
    this.title.setTitle('Chi phí');

  }

  openCreate() : void{
    this.ngbModal.open(ChiPhiCreateComponent);
  }

  fetch() {
    this.apiService.post('/chi-phi/search', )
  }

  openEdit(cp){
   const modelRef = this.ngbModal.open(ChiPhiEditComponent);
   modelRef.componentInstance.cp = cp;
  }

}
