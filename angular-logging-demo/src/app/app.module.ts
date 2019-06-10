import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { AppComponent } from './app.component';
import { GlobalErrorHandler } from '@app/core/global-error-handler/global-error-handler.service';


import { HttpWrapperService } from '@app/core/http/http-wrapper.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule,HttpModule],
  providers: [HttpModule,
                HttpClient,
                HttpClientModule,
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
