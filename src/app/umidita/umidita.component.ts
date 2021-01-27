import { Component, OnInit } from '@angular/core';
import {User} from '@app/_models';
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '@app/_services';

import {UmiditaService} from '@app/_services/umidita.service';
import {graphserie} from '@app/_models/graphserie';

@Component({
  selector: 'app-umidita',
  templateUrl: './umidita.component.html',
  styleUrls: ['./umidita.component.less']
})
export class UmiditaComponent implements OnInit {
  loading = false;
  users: User[];
  temperatures = [];
  lasts = [];

  datar = [];
  gserie: graphserie;


  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private tempService: UmiditaService
  ) {
    // redirect to login if not logged in
    if (!this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }
  options = [];

  distinctThings = [];
  ngOnInit(): void {
    this.tempService.getlaststemperature().subscribe((data: any[]) => {
      this.lasts = data;
    });
    this.tempService.getsearch().subscribe((data: any[]) => {
      console.log(data);
      this.temperatures = data;
      this.distinctThings = this.temperatures.filter(
        (thing, i, arr) => arr.findIndex(t => t.sensor_mac === thing.sensor_mac) === i
      );
      console.log(this.distinctThings);
      for (let i = 0; i < this.distinctThings.length; i++) {
        this.gserie = new graphserie();
        this.gserie.name = this.distinctThings[i].sensor_mac;
        this.gserie.type = 'line';
        this.gserie.data = this.temperatures.filter(item => item.sensor_mac === this.distinctThings[i].sensor_mac).map(item => item.value);
        this.datar.push(this.gserie);
        console.log(this.gserie);
        this.options.push(  {
          legend: {
            data: this.distinctThings.map(item => item.sensor_mac)[i],
            align: 'left',
          },
          tooltip: {},
          xAxis: {
            data: this.temperatures.filter(item => item.sensor_mac === this.distinctThings[i].sensor_mac).map(item => item.timestamp),
            silent: true,
            splitLine: {
              show: true,
            },
          },
          yAxis: {
            type : 'value'
          },
          series: this.datar[i],
          animationEasing: 'elasticOut',
        });
      }

    });



  }
}
