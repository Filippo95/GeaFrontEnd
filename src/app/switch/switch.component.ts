import { Component, OnInit , OnDestroy} from '@angular/core';
import {User} from '@app/_models';
import {AuthenticationService, UserService} from '@app/_services';
import {first} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {switchService} from '@app/_services/switch.service';
import {graphserie} from '@app/_models/graphserie';
import {temperatureService} from '@app/_services/temperature.service';


@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.less']
})
export class SwitchComponent implements OnInit {
  loading = false;
  users: User[];
  lasts = [];
  options = [];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private swService: switchService
  ) {
    // redirect to login if not logged in
    if (!this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  distinctThings = [];
  newarray = [];
  ngOnInit(): void {
    this.swService.getlights().subscribe((data: any[]) => {
      this.lasts = data;

      for (let i = 0; i < this.lasts.length; i++) {
        this.swService.getGraphData(this.lasts[i].sensor_mac).subscribe((d: any[]) => {

          for (let i = 0; i < d.length - 1; i++) {
            if (d[i].value == 0 && d[i + 1].value == 0) {
              d.splice(i + 1, 1);
            }
            if (d[i].value == 1 && d[i + 1].value == 1) {
              d.splice(i + 1, 1);
            }
          }
          let k = 0;
          console.log('INIZO:');
          console.log(d);
          this.newarray = [];
          while (k < d.length - 1) {

            if (d[k].value == 1 && d[k + 1].value == 0) {
              console.log('ho trovato -_');
              console.log(this.newarray);
              this.newarray = [].concat(d.slice(0, k + 1));
              console.log(this.newarray);
              this.newarray.push({timestamp: d[k].timestamp, value: 0});
              console.log(this.newarray);
              d = this.newarray.concat(d.slice(k + 1));
              console.log(d);
            }
            if (d[k].value == 0 && d[k + 1].value == 1) {
              console.log('ho trovato _-');
              this.newarray = [].concat(d.slice(0, k + 1));
              this.newarray.push({timestamp: d[k + 1].timestamp, value: 1});
              d = this.newarray.concat(d.slice(k + 1));
            }
            console.log(d);


            k++;

          }
          console.log('Fatto');
          console.log(d);
          this.distinctThings[i] = d;
          console.log(this.distinctThings[i].map(item => item.value));
          this.options.push({
            legend: {
              data: this.lasts[i].sensor_mac,
              align: 'left',
            },
            tooltip: {},
            xAxis: {
              data: this.distinctThings[i].map(item => item.timestamp),
              silent: true,
              splitLine: {
                show: true,
              },
            },
            yAxis: {
              type: 'value'
            },
            series: [{
              type: 'line',
              data: this.distinctThings[i].map(item => item.value)
            }],
            animationEasing: 'elasticOut',
          });

        });
        this.swService.getHours(this.lasts[i].sensor_mac).subscribe((l: any ) => {
          this.lasts[i].hourson = l;
        });
      }
    });
  }

}
