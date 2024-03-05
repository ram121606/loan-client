import { Component, OnInit } from '@angular/core';
import { MyServiceService } from '../service/my-service.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  serviceData : any 
  username : string = ''
  admin : boolean = false
  ticketId : string = ''
  status: string = ''
  data : any
  details : boolean = true

  userDashboard = new FormGroup({
    ticketId: new FormControl('',[Validators.required])
  })
  

  constructor(private service: MyServiceService, private route: ActivatedRoute, private http: HttpClient){}
  ngOnInit() {
    this.route.params.subscribe(params=>{
      if(params['role'] == 'admin'){
        this.admin = true
      }
    })
    this.fetchData()
    this.username = this.service.getData()
  }

  fetchData(){
    return this.http.get<any>(environment.URL+"details").subscribe(resp=>{
      this.data = resp
    }) 
  }

  onSubmit(){
    return this.http.get<any>(environment.URL+"status/"+this.ticketId).subscribe(resp=>
      this.status = resp['status']
    )
  }

  accept(ticketId: string){
    this.details = false
    return this.http.patch<any>(environment.URL+'loanDetails',{'ticketId': ticketId,'status': 'Success'}).subscribe()
  }

  reject(ticketId: string){
    this.details = false
    return this.http.patch<any>(environment.URL+'loanDetails',{'ticketId': ticketId ,'status': 'Failure'}).subscribe()
  }

}
