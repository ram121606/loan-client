import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

interface data{
  username : string,
  id : string
}

@Injectable({
  providedIn: 'root'
})


export class MyServiceService {
  username: string = ''

  setData(username: string){
    this.username = username
  }

  getData(){
    return this.username
  }


}
