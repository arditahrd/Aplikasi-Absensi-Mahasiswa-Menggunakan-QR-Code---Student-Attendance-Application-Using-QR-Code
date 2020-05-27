import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase'
import { snapshotToArray } from 'src/app/firebase';


@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {

  constructor() {
    this.fetchData()
   }

  db
  dataAbsen

  async fetchData(){
    this.db =  await firebase.database().ref(`absen_mhs/3311801022/if214`).on('value', async val => {
      this.dataAbsen = snapshotToArray(val)
    })
  }

  ngOnInit() {
  }

}
