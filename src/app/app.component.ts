import { Component } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import * as firebase from 'firebase';
import {Storage} from '@ionic/storage'
import { firebaseConfig } from './firebase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Keluar',
      url: '/login',
      icon: 'log-out'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage,
    private nav: NavController,
    private route:Router
    ) {
    firebase.initializeApp(firebaseConfig);
    
  }

    seleksi(){
      this.storage.get('akses').then(hasil=>{
        if(hasil=='Dosen'){
          this.route.navigate(['/dosen'])
        }else{
          this.route.navigate(['/mhs'])
        }
      })
    }

    logout(){
      this.storage.clear()
      this.route.navigate(['/login'])
    }

    initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
