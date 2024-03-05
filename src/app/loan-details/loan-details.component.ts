import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';


@Component({
  selector: 'app-loan-details',
  templateUrl: './loan-details.component.html',
  styleUrls: ['./loan-details.component.css']
})
export class LoanDetailsComponent {

  goldType : number = 0
  weight : number = 0
  place : string = ''
  jewellers : string = ''
  name : string = ''
  accNo : number = 0
  ifsc : string = ''
  bank : string = ''
  branch : string = ''
  accType : string = ''
  kycNo : string = ''
  ticketId : string = ''

  loan = new FormGroup({
    kycNo : new FormControl('',[Validators.required]),
    goldType : new FormControl('',[Validators.required]),
    weight : new FormControl('',[Validators.required]),
    place : new FormControl('',[Validators.required]),
    jewellers : new FormControl('',[Validators.required]),
    name : new FormControl('',[Validators.required]),
    accNo : new FormControl('',[Validators.required]),
    accType : new FormControl('',[Validators.required]),
    ifsc : new FormControl('',[Validators.required]),
    bank : new FormControl('',[Validators.required]),
    branch : new FormControl('',[Validators.required])
  })

  constructor(private http: HttpClient, private loc: Location){}

  onSubmit(){
    return this.http.post<any>(environment.URL+'loanDetails',{
      'name': this.name,
      'kycId': this.kycNo,
      'weight': this.weight,
      'accNo': this.accNo,
      'ifsc': this.ifsc,
      'bank': this.bank
    }).subscribe(resp=>{
      this.ticketId = resp['ticketId']
    })
  }

  back(){
    this.loc.back()
  }

}
