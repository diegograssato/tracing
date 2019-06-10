import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpWrapperService } from '@app/core/http/http-wrapper.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private _http: HttpWrapperService){

  }

  title = 'app';

   getCurrentTime(){

                 return this._http.get('http://localhost:7627/villains')
                .subscribe((res)=>{

                             console.log(res);
                         });
       }


}
