import { Component, OnInit, ElementRef, OnDestroy } from "@angular/core";
import { ROUTES } from "../sidebar/sidebar.component";
import { Location } from "@angular/common";
import { Router } from "@angular/router";
import {NgbModal, ModalDismissReasons, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {AuthService} from "../../share/service/auth.service";
import {UserProfileModel} from "../../share/model/user-profile.model";
import {StorageService} from "../../share/service/storage.service";
import {ApiService} from "../../share/service/api.service";
import {ThongBaoModel} from "../../share/model/thong-bao.model";
import {Observable} from "rxjs";
import {FormControl} from "@angular/forms";
import {debounceTime, distinctUntilChanged, map, startWith} from "rxjs/operators";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit, OnDestroy {
  private listTitles: any[];
  location: Location;
  mobile_menu_visible: any = 0;
  private toggleButton: any;
  private sidebarVisible: boolean;

  public isCollapsed = true;

  closeResult: string;
  userPro : UserProfileModel;
  thongBao: ThongBaoModel[];
  count = 0;

  filterOptions: Observable<String[]>;
  myControl = new FormControl();
  options: string[] = ['Bảng điều khiển', 'Thu nhập', 'Chi tiêu','Ngân sách','Loại ngân sách','Trang cá nhân'];
  constructor(
    location: Location,
    private element: ElementRef,
    private router: Router,
    private modalService: NgbModal,
    private auth: AuthService,
    private stora: StorageService,
    private api:ApiService
  ) {
    this.location = location;
    this.sidebarVisible = false;
  }
  // function that adds color white/transparent to the navbar on resize (this is for the collapse)
   updateColor = () => {
   var navbar = document.getElementsByClassName('navbar')[0];
     if (window.innerWidth < 993 && !this.isCollapsed) {
       navbar.classList.add('bg-white');
       navbar.classList.remove('navbar-transparent');
     } else {
       navbar.classList.remove('bg-white');
       navbar.classList.add('navbar-transparent');
     }
   };
  ngOnInit() {
    this.userPro = this.stora.getProfileJson();
    window.addEventListener("resize", this.updateColor);
    this.listTitles = ROUTES.filter(listTitle => listTitle);
    const navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName("navbar-toggler")[0];
    this.router.events.subscribe(event => {
      this.sidebarClose();
      var $layer: any = document.getElementsByClassName("close-layer")[0];
      if ($layer) {
        $layer.remove();
        this.mobile_menu_visible = 0;
      }
    });
    this.fetchNoti();

    setInterval(() => {
      this.fetchNoti();
    }, 10000);

    this.filterOptions = this.myControl.valueChanges
      .pipe(
        distinctUntilChanged(),
        debounceTime(400),
        map((value: string) => this._filter(value))
      );
  }
  private _filter(value: string): string[] {
    if (value !== '' && value.length >0){
      const filterValue = value.toLowerCase();
      return this.options.filter(option => option.toLowerCase().includes(filterValue));
    }
  }

  moveToOption(noti: string){
    switch (noti) {
      case 'Bảng điều khiển':
        this.router.navigate(['qltccn/dashboard']);
        break;
      case 'Thu nhập':
        this.router.navigate(['qltccn/thu-nhap']);
        break;
      case 'Chi tiêu':
        this.router.navigate(['qltccn/chi-phi']);
        break;
      case 'Ngân sách':
        this.router.navigate(['qltccn/ngan-sach']);
        break;
      case 'Loại ngân sách':
        this.router.navigate(['qltccn/loai-ngan-sach']);
        break;
      case 'Trang cá nhân':
        this.router.navigate(['qltccn/user']);
        break;
    }
    this.myControl.reset();
  }

  checkClick(){
    this.api.get('/thong-bao/update').subscribe(() =>{
      this.fetchNoti();
    })


  }
  logout(){
    this.auth.logOut();
    this.router.navigate(['login']);
  }
  fetchNoti(){
    this.api.get('/thong-bao/all').subscribe(res =>{
        this.thongBao = res;
        let thongBa = this.thongBao.filter((th) =>{
          return !th.trangthai;
        });
        this.count = thongBa.length;
    })
  }

  moveToChiTieu() {
    this.router.navigate(['qltccn/chi-phi']);
  }
  collapse() {
    this.isCollapsed = !this.isCollapsed;
    const navbar = document.getElementsByTagName("nav")[0];
    if (!this.isCollapsed) {
      navbar.classList.remove("navbar-transparent");
      navbar.classList.add("bg-white");
    } else {
      navbar.classList.add("navbar-transparent");
      navbar.classList.remove("bg-white");
    }
  }

  sidebarOpen() {
    const toggleButton = this.toggleButton;
    const mainPanel = <HTMLElement>(
      document.getElementsByClassName("main-panel")[0]
    );
    const html = document.getElementsByTagName("html")[0];
    if (window.innerWidth < 991) {
      mainPanel.style.position = "fixed";
    }

    setTimeout(function() {
      toggleButton.classList.add("toggled");
    }, 500);

    html.classList.add("nav-open");

    this.sidebarVisible = true;
  }
  sidebarClose() {
    const html = document.getElementsByTagName("html")[0];
    this.toggleButton.classList.remove("toggled");
    const mainPanel = <HTMLElement>(
      document.getElementsByClassName("main-panel")[0]
    );

    if (window.innerWidth < 991) {
      setTimeout(function() {
        mainPanel.style.position = "";
      }, 500);
    }
    this.sidebarVisible = false;
    html.classList.remove("nav-open");
  }
  sidebarToggle() {
    // const toggleButton = this.toggleButton;
    // const html = document.getElementsByTagName('html')[0];
    var $toggle = document.getElementsByClassName("navbar-toggler")[0];

    if (this.sidebarVisible === false) {
      this.sidebarOpen();
    } else {
      this.sidebarClose();
    }
    const html = document.getElementsByTagName("html")[0];

    if (this.mobile_menu_visible == 1) {
      // $('html').removeClass('nav-open');
      html.classList.remove("nav-open");
      if ($layer) {
        $layer.remove();
      }
      setTimeout(function() {
        $toggle.classList.remove("toggled");
      }, 400);

      this.mobile_menu_visible = 0;
    } else {
      setTimeout(function() {
        $toggle.classList.add("toggled");
      }, 430);

      var $layer = document.createElement("div");
      $layer.setAttribute("class", "close-layer");

      if (html.querySelectorAll(".main-panel")) {
        document.getElementsByClassName("main-panel")[0].appendChild($layer);
      } else if (html.classList.contains("off-canvas-sidebar")) {
        document
          .getElementsByClassName("wrapper-full-page")[0]
          .appendChild($layer);
      }

      setTimeout(function() {
        $layer.classList.add("visible");
      }, 100);

      $layer.onclick = function() {
        //asign a function
        html.classList.remove("nav-open");
        this.mobile_menu_visible = 0;
        $layer.classList.remove("visible");
        setTimeout(function() {
          $layer.remove();
          $toggle.classList.remove("toggled");
        }, 400);
      }.bind(this);

      html.classList.add("nav-open");
      this.mobile_menu_visible = 1;
    }
  }

  getTitle() {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee.charAt(0) === "#") {
      titlee = titlee.slice(1);
    }

    for (var item = 0; item < this.listTitles.length; item++) {
      if (this.listTitles[item].path === titlee) {
        return this.listTitles[item].title;
      }
    }
    return 'Xin chào ' + this.userPro.tenkhachhang;
  }

  open(content) {
    this.modalService.open(content, {windowClass: 'modal-search'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  ngOnDestroy(){
     window.removeEventListener("resize", this.updateColor);
  }
}
