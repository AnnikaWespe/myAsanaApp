import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LearnComponent } from '../pages/learn/learn.component';
import { AsanaService } from '../pages/learn/asana/asana.service';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

export const firebaseConfig = {
    apiKey: "AIzaSyD-Fazjxk0pTxtfuI855vAMpoXHody2Q1Y",
    authDomain: "asana-cd888.firebaseapp.com",
    databaseURL: "https://asana-cd888.firebaseio.com",
    projectId: "asana-cd888",
    storageBucket: "asana-cd888.appspot.com",
    messagingSenderId: "1051646527788"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LearnComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LearnComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AsanaService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
