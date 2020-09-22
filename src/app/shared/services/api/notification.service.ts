import { Injectable } from '@angular/core';
import { EtaBaseURL, END_POINTS, BaseURL } from './globals/global-config';
import { BehaviorSubject, Observable, Subscriber } from 'rxjs';
import { HttpClient } from '@angular/common/http';

interface Notifications{
  Message : string;
  Url : string;
}
const URL_Eta = EtaBaseURL
const URL_Emp = BaseURL
const EtaAPI_URL = END_POINTS.Notifications;


@Injectable({
  providedIn: 'root'
})

export class NotificationService {

  source: EventSource = new EventSource(`${URL_Eta}/api/Chat`);
  sourceEmp: EventSource = new EventSource(`${URL_Emp}/api/Chat`);
  myData: any;

  constructor(private http: HttpClient
    ){}

  listen(): Observable<any> {
    return new Observable(Subscriber => {
      // this.source.addEventListener('eeventName', function(e){
      //   Subscriber.next(e)
      // })
      this.source.onmessage=function(e){
        Subscriber.next(e)
      }
    })
  }
  listenEmp(): Observable<any> {
    return new Observable(Subscriber => {
      // this.source.addEventListener('eeventName', function(e){
      //   Subscriber.next(e)
      // })
      this.sourceEmp.onmessage=function(e){
        Subscriber.next(e)
      }
    })
  }

  get(): Observable<Notifications[]> {
    return this.http.get<Notifications[]>(EtaAPI_URL);
  }

}