import { Component } from '@angular/core';
// import { AuthService } from '@auth0/auth0-angular';
import { FormGroup,FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MyServiceService } from '../service/my-service.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  hide = true;
  username : string = ''
  password : string = ''
  id : string = ''

  constructor(private http: HttpClient, private sb: MatSnackBar, private service: MyServiceService, private router: Router, private loc: Location){}

  login = new FormGroup({
    username : new FormControl('',[Validators.required]),
    password : new FormControl('',[Validators.required, Validators.minLength(8)]),
  })

  onSubmit(){
    // console.log(this.login.controls.username)
    // this.username = document.getElementsByName('username')
    return this.http.post<any>(environment.URL+'login',{'username': this.username, 'password': this.password}).pipe(
      catchError((error)=>{
        if(error.status == 404){
          this.sb.open("Login", "User not found", {duration: 5000})
        }
        return ""
      })
    ).subscribe(resp=>{
      this.sb.open("Login", "Success", {duration: 5000})
      this.id = resp['id']
      // this.service.setId(this.id)
      this.service.setData(this.username)
      this.router.navigate(['/dashboard','user'])
    })
    
    // return ""?
  }

  back(){
    this.loc.back()
  }
}
