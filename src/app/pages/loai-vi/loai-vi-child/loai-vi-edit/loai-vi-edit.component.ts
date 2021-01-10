import {Component, Input, OnInit} from '@angular/core';
import {LoaiThongBao} from "../../../../share/model/loai-thong-bao";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Title} from "@angular/platform-browser";
import {ApiService} from "../../../../share/service/api.service";
import {StorageService} from "../../../../share/service/storage.service";
import {ToastrService} from "ngx-toastr";
import {LoaiVi} from "../../../../share/model/loai-vi";

@Component({
  selector: 'app-loai-vi-edit',
  templateUrl: './loai-vi-edit.component.html',
  styleUrls: ['./loai-vi-edit.component.scss']
})
export class LoaiViEditComponent implements OnInit {

  @Input()
  lv: LoaiVi;

  lvFE: FormGroup;
  constructor(
    private activeModal: NgbActiveModal,
    private title: Title,
    private api: ApiService,
    private fb: FormBuilder,
    private store: StorageService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.lvFE = this.fb.group({
      tenVi: new FormControl(this.lv.tenVi,[Validators.required])
    })
  }

  close(): void{
    this.activeModal.dismiss();
  }

  onCreate(){
    if (this.lvFE.valid){
      const lns = {
        id: this.lv.id,
        tenVi: this.lvFE.get('tenVi').value,
      }
      this.api.put('/loai-vi/edit', lns).subscribe(() => {
        this.api.onFilter('create');
        this.toastr.success('Sửa thành công');
        this.activeModal.dismiss();
      },error =>  {
        this.toastr.error('Sửa thất bại');
      })
    }
  }

  get f(){
    return this.lvFE.controls;
  }


}
