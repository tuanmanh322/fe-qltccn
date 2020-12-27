import { Component, OnInit } from "@angular/core";

declare interface RouteInfo {
  path: string;
  title: string;
  rtlTitle: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  {
    path: "dashboard",
    title: "Dashboard",
    rtlTitle: "لوحة القيادة",
    icon: "icon-chart-pie-36",
    class: ""
  },
  // {
  //   path: "icons",
  //   title: "Icons",
  //   rtlTitle: "الرموز",
  //   icon: "icon-atom",
  //   class: ""
  // },
  // {
  //   path: "maps",
  //   title: "Maps",
  //   rtlTitle: "خرائط",
  //   icon: "icon-pin",
  //   class: "" },


  // {
  //   path: "typography",
  //   title: "User Profile",
  //   rtlTitle: "ملف تعريفي للمستخدم",
  //   icon: "icon-single-02",
  //   class: ""
  // },
  {
    path: "thu-nhap",
    title: "Thu nhập",
    rtlTitle: "Thu nhập",
    icon: "icon-coins",
    class: ""
  },
  {
    path: "chi-phi",
    title: "Chi phí",
    rtlTitle: "Chi phí",
    icon: "icon-cart",
    class: ""
  },
  {
    path: "ngan-sach",
    title: "Ngân sách",
    rtlTitle: "Ngân sách",
    icon: "icon-bank",
    class: ""
  },

  {
    path: "loai-ngan-sach",
    title: "Loại ngân sách",
    rtlTitle: "Loại Ngân sách",
    icon: "icon-money-coins",
    class: ""
  },
  {
    path: "loai-thong-bao",
    title: "Loại thông báo",
    rtlTitle: "Loại thông báo",
    icon: "icon-wifi",
    class: ""
  }
  // {
  //   path: "/rtl",
  //   title: "RTL Support",
  //   rtlTitle: "ار تي ال",
  //   icon: "icon-world",
  //   class: ""
  // }
];

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"]
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() {}

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
    if (window.innerWidth > 991) {
      return false;
    }
    return true;
  }
}
