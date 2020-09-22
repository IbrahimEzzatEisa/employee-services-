import { Injectable } from '@angular/core';
import { Deduction } from '../../models';
import { END_POINTS } from './globals/global-config';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


const API_URL = END_POINTS.deduction;
@Injectable({
  providedIn: 'root'
})
export class DeductionService {

  constructor(private http: HttpClient) { }

  create(model: Deduction): Observable<Deduction> {
    return this.http.post<Deduction>(API_URL, model);
  }
  postFile (fileToUpload: File) {
    const endPoint = ' http://employeeservices.taj-it.com/api/UploadFile' 
     const formData: FormData = new FormData();
     formData.append('files' , fileToUpload)
     return this.http.post(endPoint , formData);
  }
}
