import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { environment } from 'src/environments/environment';


interface data{
  email: string,
  password: string
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent{

  hide : boolean = true
  email : string = ''
  password : string = ''

  constructor(private http: HttpClient, private sb: MatSnackBar, private router: Router){}

  admin = new FormGroup({
    email : new FormControl('',[Validators.required, Validators.email]),
    password : new FormControl('',[Validators.required, Validators.minLength(8)])
  })

  onSubmit(){
    return this.http.post<data>(environment.URL+'admin',{'email': this.email, 'password': this.password}).pipe(
      catchError((error)=>{
        if(error.status == 404){
          this.sb.open('Admin', 'Login Failed', {duration: 5000})
        }
        return ""
      })
      ).subscribe(resp=>{
        this.sb.open('Admin', 'Login Success', {duration: 5000})
        console.log(resp)
        this.router.navigate(['/dashboard','admin'])
      })
  }


}
