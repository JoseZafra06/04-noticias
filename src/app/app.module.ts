import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//Plugins::
    //https://ionicframework.com/docs/angular/storage
      import { Storage } from '@ionic/storage';
    //para In App Browser; lanzamiento en la web
      import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
    //para compartir en redes
    import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';


//Pa realizar peticion a un servidor
import {HttpClientModule} from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage-angular';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule,
            IonicModule.forRoot(),
            AppRoutingModule ,
            HttpClientModule,
            IonicStorageModule.forRoot()],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    InAppBrowser,
    SocialSharing
    ],
  bootstrap: [AppComponent],
})
export class AppModule {}
