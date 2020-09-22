import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

export class AppConfig
{
//Your properties here
  readonly production: boolean;
  readonly name: string;

  readonly apiBaseUrl: string;

}
/**
 * Global variable containing actual config to use. Initialised via ajax call
 */
export let APP_CONFIG: AppConfig;


@Injectable({
  providedIn: 'root'
})
export class ConfigService {


  constructor(private http: HttpClient)
  {
  }

   load()
  {
    return new Promise((resolve, reject) => {

      // let confName = environment.name + '.json';
      this.http.get('/assets/config/' + 'config.json').subscribe(res =>{
        console.log(res);
      })
      

    });
  }
}