import { Component, OnInit } from '@angular/core';
import {ChiPhiCreateComponent} from "../chi-phi/chi-phi-child/chi-phi-create/chi-phi-create.component";
import {ChiPhiEditComponent} from "../chi-phi/chi-phi-child/chi-phi-edit/chi-phi-edit.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Title} from "@angular/platform-browser";
import {ApiService} from "../../share/service/api.service";
import {NganSachEditComponent} from "./ngan-sach-child/ngan-sach-edit/ngan-sach-edit.component";
import {NganSachCreateComponent} from "./ngan-sach-child/ngan-sach-create/ngan-sach-create.component";

@Component({
  selector: 'app-ngan-sach',
  templateUrl: './ngan-sach.component.html',
  styleUrls: ['./ngan-sach.component.scss']
})
export class NganSachComponent implements OnInit {

  constructor( private ngbModal: NgbModal,
               private title: Title,
               private apiService: ApiService
  ) {
    this.apiService.onLoad().subscribe(() => {
      this.fetch();
    })
  }

  ngOnInit(): void {
    this.title.setTitle('Ngân sách');

  }

  openCreate() : void{
    this.ngbModal.open(NganSachCreateComponent);
  }

  fetch() {
    this.apiService.post('/chi-phi/search', )
  }

  openEdit(ns){
    const modelRef = this.ngbModal.open(NganSachEditComponent);
    modelRef.componentInstance.ns = ns;
  }

}
