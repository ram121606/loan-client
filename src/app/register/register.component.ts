import { Component } from '@angular/core';
import { FormGroup,FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  hide = true;
  username : string = ''
  password : string = ''

  constructor(private http: HttpClient, private sb: MatSnackBar, private router: Router){}

  login = new FormGroup({
    username : new FormControl('',[Validators.required]),
    password : new FormControl('',[Validators.required, Validators.minLength(8)]),
  })

  onSubmit(){
    // console.log(this.login.controls.username)
    // this.username = document.getElementsByName('username')
    return this.http.post<any>(environment.URL+'register',{'username': this.username, 'password': this.password}).pipe(
      catchError((error: HttpErrorResponse)=>{
        if(error.status == 409){
          // console.log("Conflict")
          this.sb.open("Conflict", "Already registered", {duration:5000})
        }
        return ""
      })
    ).subscribe(resp=>{
      this.sb.open("Success" , "Registration done", {duration:5000})
      console.log(resp)
      this.router.navigate(['/login'])
    })
    
    // return ""?
  }

}
