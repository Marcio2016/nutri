import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { DicasPage } from '../pages/dicas/dicas';
import { CadastrarPage } from '../pages/cadastrar/cadastrar';

//Imports do Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';

const firebaseAuth =  {
    apiKey: "AIzaSyCQTtW4yS7tfLg295OS0pM9XSezRcHP8N0",
    authDomain: "nutri-74f48.firebaseapp.com",
    databaseURL: "https://nutri-74f48.firebaseio.com",
    projectId: "nutri-74f48",
    storageBucket: "nutri-74f48.appspot.com",
    messagingSenderId: "171663151601",
    appId: "1:171663151601:web:4d75b353a8cb58c192b450",
    measurementId: "G-EGLHMZXS8J"
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    DicasPage,
    CadastrarPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireAuthModule,
    AngularFireModule.initializeApp(firebaseAuth)

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    DicasPage,
    CadastrarPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
