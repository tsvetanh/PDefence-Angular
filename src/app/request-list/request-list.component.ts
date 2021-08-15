import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from "../model/user";
import {UserService} from "../user/user.service";
import {RequestService} from "../request/request.service";
import {Request} from "../model/request"
import {Router} from "@angular/router";
import {ChartComponent} from "ng-apexcharts";

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexNonAxisChartSeries | any;
  chart: ApexChart | any;
  responsive: ApexResponsive[] | any;
  labels: any;
};

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.css']
})
export class RequestListComponent implements OnInit {

  // @ts-ignore
  requests: Request[];
  noMore: boolean = false;
  page: number = 1;
  // @ts-ignore
  data: number[] = [];
  //@ts-ignore
  @ViewChild("chart") chart: ChartComponent;
  // @ts-ignore
  public chartOptions: Partial<ChartOptions>;

  constructor(private requestService: RequestService,
              private userService: UserService,
              private router: Router) {
  }

  cancel(id: string): void {
    this.requestService.cancelRequest(id).subscribe(
      (data) => {
        this.ngOnInit();
      },
      err => {
        console.log(err);
      });
  }

  process(id: string) {
    this.requestService.processRequest(id).subscribe(
      (data) => {
        this.ngOnInit();
      },
      err => {
        console.log(err);
      });
  }

  activate(id: string) {
    this.requestService.activate(id).subscribe(
      (data) => {
        this.ngOnInit();
      },
      err => {
        console.log(err);
      });
  }

  nextPage(last: Request) {
    this.requestService.nextPage(last).subscribe(
      (data) => {
        if (data.length > 0) {
          this.requests = data;
          this.noMore = false;
          this.page++;
        } else {
          this.noMore = true;
        }
      },
      err => console.log(err));
  }

  prevPage(first: Request) {
    this.requestService.prevPage(first).subscribe(
      (data) => {
        if (data.length > 0) {
          this.requests = data;
          this.noMore = false;
          this.page--;
        } else {
          this.noMore = true;
        }
      },
      err => console.log(err));
  }

  ngOnInit() {
    if (!this.userService.isLogged || !this.userService.admin) {
      this.router.navigate(['/']);
      return;
    }
    this.page = 1;
    this.requestService.getAllCurrentRequests().subscribe(data => {
      // @ts-ignore
      this.requests = data;
    });
    this.requestService.getStatusCounts().subscribe(data => {
      this.data = data;
      console.log(this.data)
      this.chartOptions = {
        series: this.data,
        chart: {
          width: 380,
          type: "donut",
        },
        labels: ["Active", "Done", "Cancelled"],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: "bottom"
              }
            }
          }
        ]
      };
    })

  }


}
