import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-kyc',
  templateUrl: './kyc.component.html',
  styleUrls: ['./kyc.component.css']
})
export class KYCComponent implements OnInit{

  aadhar : string = '';
  phone : number | undefined
  username : string = ''
  serviceData : any
  id : string = ''

  constructor(private http: HttpClient, private route: ActivatedRoute, private loc: Location){}
  ngOnInit(){
    this.route.params.subscribe(params=>{
      this.username = params['username']
    })
  }

  kyc = new FormGroup({
    aadhar : new FormControl(['',Validators.required]),
    phone : new FormControl('',[Validators.required]),
  })


  onSubmit(){
    console.log(this.username)
    return this.http.post<any>(environment.URL+'kyc',{
      'aadhar': this.aadhar,
      'phone': this.phone,
      'username': this.username
    }).subscribe(resp=>{
      this.id = resp['id']
    })

  }

  back(){
    this.loc.back()
  }
  

}
