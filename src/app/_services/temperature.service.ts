import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class temperatureService {
  private REST_API_SERVER = 'http://192.168.1.7:8090/temperature/B8:27:EB:B7:E3:4C';

  constructor(private httpClient: HttpClient) { }
  public getsearch() {
    return this.httpClient.get(this.REST_API_SERVER + '/search');
  }

  public getlaststemperature() {
    return this.httpClient.get(this.REST_API_SERVER + '/lasts');
  }
}
