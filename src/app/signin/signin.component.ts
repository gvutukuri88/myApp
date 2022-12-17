import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  signInForm: any;
  response: any;
  registration='';
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.setForm();
  }

  setForm() {
    this.signInForm = this.fb.group({
      'emailId': ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      'password': ['', [Validators.required, Validators.pattern("^(?=.*[0-9])"+ "(?=.*[a-z])(?=.*[A-Z])"+ "(?=.*[@#$%^&+=])"+ "(?=\\S+$).{8,20}$")]],
      'checkbox': ['',],
    })
  }

  signinHit() {
    let body =
    {
      "user_email": this.signInForm.get('emailId').value,
      "user_password": this.signInForm.get('password').value,

    }



    this.http.post<any>('https://snapkaro.com/eazyrooms_staging/api/userlogin', body).subscribe(data1 => {

      if (data1 && data1.msg && data1.msg == "User found" && data1.status) {
        this.response = data1;
        sessionStorage.setItem("userDetails",JSON.stringify(data1.user_data[0]) )
        this.router.navigate(['/dashboard']);
      }
      if (data1 && data1.msg && !data1.status)  {
        this.response = data1;
        this.registration =data1.msg 
      }
    })
  }

  getErrorEmail() {
    return this.signInForm.get('emailId').hasError('required')
      ? "you must enter a value"
      : this.signInForm.get('emailId').hasError('pattern')
        ? "enter valid email"
        : ""
  }
  getErrorPassword() {
    return this.signInForm.get('password').hasError('required')
      ? "you must enter a value"
      : this.signInForm.get('password').hasError('pattern')
        ? "should contain one number,one upper and lower case character and one special character with length between 8,20"
        : ""
  }

}
