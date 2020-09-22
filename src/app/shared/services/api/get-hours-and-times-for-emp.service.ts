import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { END_POINTS } from './globals/global-config';
import { HoursAndTimesForEmp} from '../../models';
import { DateService } from '../date.service';
const API_URL = END_POINTS.getHoursAndTimesForEmp;


@Injectable({
  providedIn: 'root'
})


export class GetHoursAndTimesForEmpService {

  constructor(private http: HttpClient , 
   
    ) { }
      

  gethoursAndTimeForEmp(date : string ): Observable<HoursAndTimesForEmp[]> {
    return this.http.get<HoursAndTimesForEmp[]>(API_URL,  {params: { 
      DepartureDateH: date
    } });


  }
}
