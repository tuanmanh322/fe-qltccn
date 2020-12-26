import { Component, OnInit } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Title} from "@angular/platform-browser";
import {ApiService} from "../../share/service/api.service";
import {ChiPhiCreateComponent} from "../chi-phi/chi-phi-child/chi-phi-create/chi-phi-create.component";
import {ChiPhiEditComponent} from "../chi-phi/chi-phi-child/chi-phi-edit/chi-phi-edit.component";
import {ThuNhapEditComponent} from "./thu-nhap-child/thu-nhap-edit/thu-nhap-edit.component";
import {ThuNhapCreateComponent} from "./thu-nhap-child/thu-nhap-create/thu-nhap-create.component";

@Component({
  selector: 'app-thu-nhap',
  templateUrl: './thu-nhap.component.html',
  styleUrls: ['./thu-nhap.component.scss']
})
export class ThuNhapComponent implements OnInit {

  constructor( private ngbModal: NgbModal,
               private title: Title,
               private apiService: ApiService
  ) {
    this.apiService.onLoad().subscribe(() => {
      this.fetch();
    })
  }

  ngOnInit(): void {
    this.title.setTitle('Thu nhập');

  }

  openCreate() : void{
    this.ngbModal.open(ThuNhapCreateComponent);
  }

  fetch() {
    this.apiService.post('/chi-phi/search', )
  }

  openEdit(ns){
    const modelRef = this.ngbModal.open(ThuNhapEditComponent);
    modelRef.componentInstance.ns = ns;
  }

}
