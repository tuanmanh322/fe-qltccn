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
import {ViModel} from "../../../../share/model/vi.model";

@Component({
  selector: 'app-chi-phi-edit',
  templateUrl: './chi-phi-edit.component.html',
  styleUrls: ['./chi-phi-edit.component.scss']
})
export class ChiPhiEditComponent implements OnInit {
  @Input()
  cp: ChiPhi;

  @Input()
  money: any;
  chiPhiE: FormGroup;
  userPro: UserProfileModel;
  listLNS: LoaiNganSach[];

  moneyNS = 0;
  lnsM: LoaiNganSach;
  isMax = false;
  viModel: ViModel;
  soTien = '';
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
    this.api.get('/vi/detail/1').subscribe(res => {
      this.viModel = res;
    })
    this.userPro = this.store.getProfileJson();
    this.chiPhiE = this.fb.group({
      idLoaiNganSach: new FormControl(this.cp.idLoaiNganSach,[Validators.required]),
      loaitien: new FormControl(this.cp.loaitien,[Validators.required]),
      mota: new FormControl(this.cp.mota,[Validators.required]),
      sotien: new FormControl(this.cp.sotien,[Validators.required]),
      ngaytao: new FormControl(this.cp.ngaytao,[Validators.required]),
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
        ngaytao: this.chiPhiE.get('ngaytao').value
      };
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

  getMoneyEd(event) {
    let moneyAdd = parseInt(event.target.value) + this.money;
    let moneyInWallet = parseInt(this.viModel.money);
    this.soTien = this.api.DocTienBangChu(event.target.value);
    if (moneyAdd > moneyInWallet) {
      this.toastr.warning('Số tiền chi tiêu đã vượt quá lượng tiền trong ví');
      this.isMax = true;
    } else {
      this.isMax = false;
    }

    this.api.get('/ngan-sach/lns/' + this.chiPhiE.get('idLoaiNganSach').value).subscribe(res=>{
      this.moneyNS = res;
      this.lnsM = this.listLNS.filter(lns => lns.id === this.chiPhiE.get('idLoaiNganSach').value)[0];
      let percent =  (moneyAdd / this.moneyNS) * 100;
      if (percent > this.lnsM.hanMuc){
        this.toastr.warning('Bạn đã vượt quá hạn mức cho phép!');
      }
    })
  }
}
