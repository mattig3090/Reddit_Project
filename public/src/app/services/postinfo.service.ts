import { Injectable } from '@angular/core';
//import * as firebase from 'firebase/app';


@Injectable({
  providedIn: 'root'
})
export class PostinfoService {
  currentpost = null;

  constructor() { }

  getInfo() {
    return this.currentpost;
  }
  setInfo(info) {
    this.currentpost = info;
  }
}
