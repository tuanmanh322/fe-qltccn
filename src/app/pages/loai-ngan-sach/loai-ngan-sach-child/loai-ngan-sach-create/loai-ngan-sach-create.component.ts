import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Title} from "@angular/platform-browser";
import {ApiService} from "../../../../share/service/api.service";
import {StorageService} from "../../../../share/service/storage.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-loai-ngan-sach-create',
  templateUrl: './loai-ngan-sach-create.component.html',
  styleUrls: ['./loai-ngan-sach-create.component.scss']
})
export class LoaiNganSachCreateComponent implements OnInit {

  lnsF: FormGroup;
  constructor(
    private activeModal: NgbActiveModal,
    private title: Title,
    private api: ApiService,
    private fb: FormBuilder,
    private store: StorageService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.lnsF = this.fb.group({
      tenloaingansach: new FormControl('',[Validators.required])
    })
  }

  close(): void{
    this.activeModal.dismiss();
  }

  onCreate(){
    if (this.lnsF.valid){
      const lns = {
        tenloaingansach: this.lnsF.get('tenloaingansach').value,
      }
      this.api.post('/loai-ngan-sach/add', lns).subscribe(() => {
        this.api.onFilter('create');
        this.toastr.success('Thêm thành công');
        this.activeModal.dismiss();
      },error =>  {
        this.toastr.error('Thêm thất bại');
      })
    }
  }

  get f(){
    return this.lnsF.controls;
  }

}
