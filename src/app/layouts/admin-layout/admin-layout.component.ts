import {Component, OnInit} from "@angular/core";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {NotificationAlwaysComponent} from "../../pages/notification-always/notification-always.component";
import {ApiService} from "../../share/service/api.service";
import {interval, Subscription, TimeInterval} from "rxjs";

@Component({
  selector: "app-admin-layout",
  templateUrl: "./admin-layout.component.html",
  styleUrls: ["./admin-layout.component.scss"]
})
export class AdminLayoutComponent implements OnInit {
  public sidebarColor: string = "red";
  subscription: Subscription;
  public interval = interval(60000 * 60 * 8);
  checkA = false;
  constructor(
    private ngbModal: NgbModal,
    private api: ApiService
  ) {
    this.api.watchNoti().subscribe(() => {
      this.check();
    })
  }

  changeSidebarColor(color) {
    var sidebar = document.getElementsByClassName('sidebar')[0];
    var mainPanel = document.getElementsByClassName('main-panel')[0];

    this.sidebarColor = color;

    if (sidebar != undefined) {
      sidebar.setAttribute('data', color);
    }
    if (mainPanel != undefined) {
      mainPanel.setAttribute('data', color);
    }
  }

  changeDashboardColor(color) {
    var body = document.getElementsByTagName('body')[0];
    if (body && color === 'white-content') {
      body.classList.add(color);
    } else if (body.classList.contains('white-content')) {
      body.classList.remove('white-content');
    }
  }

  ngOnInit() {
    let timeOpen = 60000 * 60 * 8;
    this.checkLock();
    setInterval(() => {
      this.check();
    }, 60000);

    // autoAdd notification
    setInterval(() => {
      this.check();
      if (this.checkA === false){
        this.addNoti();
      }
    }, 60000 * 5);
  }

  addNoti() {
    let a = Math.floor(Math.random() * 8);
    let title = '';
    switch (a) {
      case 0:
      case 1:
         title = 'Hãy cho chúng tôi biết bạn đã chi tiêu những gì trong ngày hôm nay';
        break;
      case 2:
      case 3:
        title = 'Bạn thật là tiết kiệm khi không tiêu gì trong ngày hôm nay!';
        break;
      case 4:
      case 5:
         title = 'Cập nhật thêm chi tiêu hàng ngày nào!';
        break;
      case 6:
      case 7:
        title = 'Bạn đã mua gì trong ngày hôm nay , hãy cho tôi biết!';
        break;
    }

    const noti ={
      idloaithongbao: 1,
      mota: 'Thông báo về thu chi hàng ngày!',
      noidung: title
    }
    this.api.post('/thong-bao/add', noti).subscribe(() => {

    })

  }

  check(): void{
    this.api.get('/chi-phi/check-day').subscribe(res => {
      this.checkA =res;
      if (res){
        this.subscription.unsubscribe();
      }else {
        this.checkLock();
      }
    })
  }

   checkLock(){
    this.subscription =  this.interval.subscribe(() => {
      this.ngbModal.open(NotificationAlwaysComponent);
    })
  }
}
