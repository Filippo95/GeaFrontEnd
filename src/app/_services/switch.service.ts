import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class switchService {
  private REST_API_SERVER = 'http://192.168.1.7:8090/switch/B8:27:EB:B7:E3:4C';

  constructor(private httpClient: HttpClient) { }
  public getsearch() {
    return this.httpClient.get(this.REST_API_SERVER + '/search');
  }

  public getlights() {
    return this.httpClient.get(this.REST_API_SERVER + '/getLights');
  }

  public getGraphData( SensorMac) {
    const now: Date = new Date();
    // Create an array with the current month, day and time

    // Create an array with the current hour, minute and second
    const datai = String(now.getUTCFullYear()) + '-'
    + ( '0' + (now.getMonth() + 1 )).slice(-2) + '-'
    + ('0' + (now.getDate())).slice(-2)
    + 'T'
    + '00:00:00.000'
    + 'Z';
    const dataf = String(now.getUTCFullYear()) + '-'
    + ( '0' + (now.getMonth() + 1 )).slice(-2) + '-'
    + ('0' + (now.getDate())).slice(-2)
    + 'T'
    + ('0' + (now.getUTCHours())).slice(-2) + ':'
    + ('0' + (now.getUTCMinutes())).slice(-2) + ':'
    + String(now.getUTCSeconds()) + '.'
    + String(now.getUTCMilliseconds())
    + 'Z';
    console.log(
      String(now.getUTCFullYear()) + '-'
      + ( '0' + (now.getMonth() + 1 )).slice(-2) + '-'
      + ('0' + (now.getDate())).slice(-2)
      + 'T'
      + ('0' + (now.getUTCHours())).slice(-2) + ':'
      + ('0' + (now.getUTCMinutes())).slice(-2) + ':'
      + String(now.getUTCSeconds()) + '.'
      + String(now.getUTCMilliseconds())
      + 'Z');
    // return this.httpClient.get(this.REST_API_SERVER + '/' + SensorMac + '/getGraphData/2020-08-26T11:00:00.000Z/2020-08-28T21:59:59.999Z');
    console.log(this.REST_API_SERVER
      + '/'
      + SensorMac
      + '/getGraphData/'
      + datai
      + '/'
      + dataf);
    return this.httpClient.get(this.REST_API_SERVER
    + '/'
    + SensorMac
      + '/getGraphData/'
      + datai
      + '/'
      + dataf

    );
  }
  public getHours( SensorMac) {
    const now: Date = new Date();
    // Create an array with the current month, day and time

    // Create an array with the current hour, minute and second
    const datai = String(now.getUTCFullYear()) + '-'
      + ( '0' + (now.getMonth() + 1 )).slice(-2) + '-'
      + ('0' + (now.getDate())).slice(-2)
      + 'T'
      + '00:00:00.000'
      + 'Z';
    const dataf = String(now.getUTCFullYear()) + '-'
      + ( '0' + (now.getMonth() + 1 )).slice(-2) + '-'
      + ('0' + (now.getDate())).slice(-2)
      + 'T'
      + ('0' + (now.getUTCHours())).slice(-2) + ':'
      + ('0' + (now.getUTCMinutes())).slice(-2) + ':'
      + String(now.getUTCSeconds()) + '.'
      + String(now.getUTCMilliseconds())
      + 'Z';
    console.log(
      String(now.getUTCFullYear()) + '-'
      + ( '0' + (now.getMonth() + 1 )).slice(-2) + '-'
      + ('0' + (now.getDate())).slice(-2)
      + 'T'
      + ('0' + (now.getUTCHours())).slice(-2) + ':'
      + ('0' + (now.getUTCMinutes())).slice(-2) + ':'
      + String(now.getUTCSeconds()) + '.'
      + String(now.getUTCMilliseconds())
      + 'Z');
    // return this.httpClient.get(this.REST_API_SERVER + '/' + SensorMac + '/getGraphData/2020-08-26T11:00:00.000Z/2020-08-28T21:59:59.999Z');
    console.log(this.REST_API_SERVER
      + '/'
      + SensorMac
      + '/getGraphData/'
      + datai
      + '/'
      + dataf);
    return this.httpClient.get(this.REST_API_SERVER
      + '/'
      + SensorMac
      + '/getHours/'
      + datai
      + '/'
      + dataf

    );
  }
}
