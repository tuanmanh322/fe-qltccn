import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Title} from "@angular/platform-browser";
import {ApiService} from "../../../../share/service/api.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {StorageService} from "../../../../share/service/storage.service";
import {ToastrService} from "ngx-toastr";
import {UserProfileModel} from "../../../../share/model/user-profile.model";
import {ChiPhi} from "../../../../share/model/chi-phi";
import {LoaiNganSach} from "../../../../share/model/loai-ngan-sach";

@Component({
  selector: 'app-chi-phi-edit',
  templateUrl: './chi-phi-edit.component.html',
  styleUrls: ['./chi-phi-edit.component.scss']
})
export class ChiPhiEditComponent implements OnInit {
  @Input()
  cp: ChiPhi;

  chiPhiE: FormGroup;
  userPro: UserProfileModel;
  listLNS: LoaiNganSach[];
  constructor(
    private activeModal: NgbActiveModal,
    private title: Title,
    private api: ApiService,
    private fb: FormBuilder,
    private store: StorageService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.api.get('/loai-ngan-sach/all').subscribe(res=> {
      this.listLNS = res;
    })
    this.userPro = this.store.getProfileJson();
    this.chiPhiE = this.fb.group({
      idLoaiNganSach: new FormControl(this.cp.idLoaiNganSach,[Validators.required]),
      loaitien: new FormControl(this.cp.loaitien,[Validators.required]),
      mota: new FormControl(this.cp.mota,[Validators.required]),
      sotien: new FormControl(this.cp.sotien,[Validators.required]),
    })
  }

  close(): void{
    this.activeModal.dismiss();
  }

  onCreate(){
    if (this.chiPhiE.valid){
      const cp = {
        id: this.cp.id,
        idLoaiNganSach: this.chiPhiE.get('idLoaiNganSach').value,
        loaitien: this.chiPhiE.get('loaitien').value,
        mota: this.chiPhiE.get('mota').value,
        sotien: this.chiPhiE.get('sotien').value,
      }
      this.api.put('/chi-phi/edit', cp).subscribe(() => {
        this.api.onFilter('create');
        this.toastr.success('Sửa thành công');
        this.activeModal.dismiss();
      },error =>  {
        this.toastr.error('Sửa thất bại');
      })
    }
  }

  get f(){
    return this.chiPhiE.controls;
  }
}
