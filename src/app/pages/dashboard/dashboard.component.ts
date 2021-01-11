import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {Title} from "@angular/platform-browser";
import {ApiService} from "../../share/service/api.service";
import {StorageService} from "../../share/service/storage.service";
import {Subscription} from "rxjs";
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {BaseChartDirective, Color, Label} from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ViUserComponent} from "../vi/vi-user/vi-user.component";
import {ViModel} from "../../share/model/vi.model";
import {LoaiNganSach} from "../../share/model/loai-ngan-sach";

@Component({
  selector: "app-dashboard",
  templateUrl: "dashboard.component.html"
})
export class DashboardComponent implements OnInit {
  @ViewChild('clicktag') clickTag: ElementRef<HTMLElement>;
  clickedElement: Subscription = new Subscription();
  listDataMonth = [];

  tabShow = 1;
  lineChartData: ChartDataSets[] = [
    {
      data: [],
      label: 'Chi tiêu'
    },
  ];
  lineChartLabels: Label[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
        },
        {
          id: 'y-axis-1',
          position: 'right',
          gridLines: {
            color: 'rgba(255,0,0,0.3)',
          },
          ticks: {
            fontColor: 'red',
          }
        }
      ]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'LineAnno'
          }
        },
      ],
    },
  };

  lineChartDataTN: ChartDataSets[] = [
    {
      data: [],
      label: 'Thu nhập'
    },
  ];
  lineChartLabelTNs: Label[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  lineChartOptionTNs: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
        },
        {
          id: 'y-axis-1',
          position: 'right',
          gridLines: {
            color: 'rgba(255,0,0,0.3)',
          },
          ticks: {
            fontColor: 'red',
          }
        }
      ]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'LineAnno'
          }
        },
      ],
    },
  };

  listDataChiTieuFinal =[];
  lineChartDataCTANDNS: ChartDataSets[] = [
    {
      data: [],
      label: 'Chi tiêu'
    },
  ];
  lineChartLabelCTANDNSs: Label[] = [];
  lineChartOptionCTANDNSs: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
        },
        {
          id: 'y-axis-1',
          position: 'right',
          gridLines: {
            color: 'rgba(255,0,0,0.3)',
          },
          ticks: {
            fontColor: 'red',
          }
        }
      ]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'LineAnno'
          }
        },
      ],
    },
  };
  date = new Date();

  yearPos = 2021;
  yearTN= 2021;
  viModel: ViModel;
  listDataTN = [];
  loaiNS: LoaiNganSach[];
  totalDay = 0;

  startMonth = 1;
  startYear = 2021;
  startIdLNS = 1;
  constructor(
    private title: Title,
    private api: ApiService,
    private store: StorageService,
    private ngbModal: NgbModal
  ) {
    this.api.onLoad().subscribe(()=>{
      this.getVi(this.tabShow);
    });
  }

  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };

  public pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)'
      ,'rgba(77,151,27,0.3)','rgba(236,77,15,0.3)','rgba(255,11,48,0.99)'
      ,'rgb(255,3,220)','rgb(255,255,255)','rgba(166,255,0,0.98)'
      ,'rgba(123,95,62,0.56)','rgb(116,195,203)','rgb(177,35,220)'],
    },
  ];

  public bubbleChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      xAxes: [
        {
          ticks: {
            min: 0,
            max: 30,
          }
        }
      ],
      yAxes: [
        {
          ticks: {
            min: 0,
            max: 30,
          }
        }
      ]
    }
  };

  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };


  ngOnInit() {
    this.title.setTitle('Bảng điều khiển');
    this.totalDay = this.api.totalDayInMonth(this.startYear,this.startMonth);
    for (let i = 1; i<= this.totalDay; i++){
      this.lineChartLabelCTANDNSs.push(''+ i);
    }
    this.fetchData(this.yearPos);
    this.getVi(this.tabShow);
    this.getThuNhap(this.yearTN);
    this.api.get('/loai-ngan-sach/all-by').subscribe(res=> {
      this.loaiNS = res;
      this.startIdLNS = this.loaiNS[0].id;
      this.getThuNhapAndNs(this.startMonth,this.startYear, this.startIdLNS);
    })
  }
  getVi(tab: number){
    this.api.get('/vi/detail/' + this.tabShow).subscribe(v =>{
      this.viModel = v;
    })
  }

  getThuNhap(yearTN: number): void{
    this.api.get('/thu-nhap/year/' + yearTN).subscribe(res => {
      this.listDataTN = res;
      this.lineChartDataTN.forEach(ite => {
        ite.data = this.listDataTN;
      })
    });
  }

  async fetchData(yearY: number) {
    var nganSach = {
      data: [],
      label: 'Ngân sách'
    }
    this.api.get('/chi-phi/year/' + yearY).subscribe(res => {
      this.listDataMonth = res;
      this.lineChartData.forEach(ite => {
        ite.data = this.listDataMonth;
      })
      this.api.get('/ngan-sach/year/' + yearY).subscribe(res => {
        nganSach.data = res;
        this.lineChartData.push(nganSach);
      })
    });
  }

  getTab(tab: number) {
    this.tabShow = tab;
    this.getVi(tab);
  }

  openWallet(): void {
    const modalRf  =  this.ngbModal.open(ViUserComponent);
    modalRf.componentInstance.tab = this.tabShow;
    modalRf.componentInstance.viModel = this.viModel;
  }

  onChangeYear(event) {
    this.lineChartData.forEach(it =>{
      it.data.length = 0;
      it.data = [];
    });
    this.lineChartData.splice(1, 1);
    var year = parseInt(event.target.value);
    this.fetchData(year);
  }

  onChangeYearTN(event) {
    this.lineChartDataTN.forEach(it =>{
      it.data.length = 0;
      it.data = [];
    });
    this.yearTN = parseInt(event.target.value);
    this.getThuNhap(this.yearTN);
  }

  getThuNhapAndNs(month: number, year: number, idlns: number){
    var nganSach = {
      data: [],
      label: 'Ngân sách'
    }
    this.totalDay = this.api.totalDayInMonth(this.startYear,this.startMonth);
    this.lineChartDataCTANDNS.forEach(it =>{
      it.data.length = 0;
      it.data = [];
    });
    this.lineChartDataCTANDNS.splice(1, 1);
    this.fetchLabelDays(this.totalDay);
    this.api.get('/chi-phi/show/' + month + '/' + year ).subscribe(res=>{
      this.listDataChiTieuFinal = res;
      this.lineChartDataCTANDNS[0].data  = res;
      this.api.get('/ngan-sach/show/' + month + '/' + year).subscribe(res => {
        nganSach.data = res;
        this.lineChartDataCTANDNS.push(nganSach);
      })
    })
  }

  onChangeMonthLoaiNS(event) {
    this.startMonth = parseInt(event.target.value);
    this.getThuNhapAndNs(this.startMonth,this.startYear, this.startIdLNS);
  }

  onChangeYearLoaiNS(event) {
    this.startYear = parseInt(event.target.value);
    this.getThuNhapAndNs(this.startMonth,this.startYear,  this.startIdLNS);
  }

  fetchLabelDays(totalDay: number){
    this.lineChartLabelCTANDNSs = [];
    for (let i = 1; i<= totalDay; i++){
      this.lineChartLabelCTANDNSs.push('Ngày '+ i);
    }
  }
  lineChartColors: Color[] = [
    { // grey
      backgroundColor: 'rgba(152,208,17,0.75)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(216,252,2,0.89)',
      borderColor: 'rgb(255,255,255)',
      pointBackgroundColor: 'rgb(24,54,125)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // red
      backgroundColor: 'rgba(208,13,13,0.83)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];

  lineChartColorsTN: Color[] = [
    { // dark grey
      backgroundColor: 'rgba(216,252,2,0.89)',
      borderColor: 'rgb(255,255,255)',
      pointBackgroundColor: 'rgb(24,54,125)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // red
      backgroundColor: 'rgba(208,13,13,0.83)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  lineChartColorsTNFinal: Color[] = [
    { // dark grey
      backgroundColor: 'rgba(255,0,181,0.89)',
      borderColor: 'rgb(255,255,255)',
      pointBackgroundColor: 'rgb(24,54,125)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // red
      backgroundColor: 'rgba(208,13,13,0.83)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];


  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';
  public lineChartTypeSEC: ChartType = 'line';
  public barChartType: ChartType = 'bar';
  public lineChartPlugins = [pluginAnnotations];

  @ViewChild(BaseChartDirective, {static: true}) chart: BaseChartDirective;

  private generateNumber(i: number): number {
    return Math.floor((Math.random() * (i < 2 ? 100 : 1000)) + 1);
  }

  // events
  public chartClicked({event, active}: { event: MouseEvent, active: {}[] }): void {
    // console.log(event, active);
  }

  public chartHovered({event, active}: { event: MouseEvent, active: {}[] }): void {
    // console.log(event, active);
  }

  public hideOne(): void {
    const isHidden = this.chart.isDatasetHidden(1);
    this.chart.hideDataset(1, !isHidden);
  }


  changeColor(): void {
    this.lineChartColors[2].borderColor = 'green';
    this.lineChartColors[2].backgroundColor = `rgba(0, 255, 0, 0.3)`;
  }

  changeLabel(): void {
    this.lineChartLabels[2] = ['1st Line', '2nd Line'];
  }

}
