import { Injectable } from '@angular/core';
import { END_POINTS } from './globals/global-config';
import { HttpClient } from '@angular/common/http';
import { Drawer } from '../../models';
import { Observable } from 'rxjs';

const API_URL = END_POINTS.Drawers;

@Injectable({
  providedIn: 'root'
})
export class DrawersService {

  constructor(private http: HttpClient) { }

  get(): Observable<Drawer[]> {
    return this.http.get<Drawer[]>(API_URL);
  }


}
