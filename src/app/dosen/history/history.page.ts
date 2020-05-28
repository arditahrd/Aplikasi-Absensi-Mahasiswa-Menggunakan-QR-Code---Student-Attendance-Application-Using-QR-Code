import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase'
import { snapshotToArray } from 'src/app/firebase';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {

  constructor(
    private str: Storage,
  ) {
    this.fetchData()
   }

  db
  dataAbsen

  async fetchData(){
    await this.getUID()

    this.db =  await firebase.database().ref(`absen_dosen/`+this.uid).on('value', async val => {
      this.dataAbsen = snapshotToArray(val)
    })
  }

  uid
  async getUID(){
    await this.str.get('uid').then(res => {
      this.uid = res
    })
  }

  ngOnInit() {
  }


}
