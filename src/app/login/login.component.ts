import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  sigupForm: any;
  response: any;
  checkboxvalue :any;
  registration ='';
  constructor(private fb: FormBuilder,
    private http: HttpClient ,
    private router : Router) { }

  ngOnInit(): void {
    this.setSignupForm();
  }

  setSignupForm() {
    this.sigupForm = this.fb.group({
      'fullName': ['',[Validators.required, Validators.minLength(4) , this.onlyAplabet] ],
      'emailId': ['' ,[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$") ]],
      'password': ['',[Validators.required, Validators.pattern("^(?=.*[0-9])"+ "(?=.*[a-z])(?=.*[A-Z])"+ "(?=.*[@#$%^&+=])"+ "(?=\\S+$).{8,20}$") ]],
      'phone': ['',[Validators.required,this.phonelength ,this.onlyNumbers]],
      'company': ['',[Validators.required, Validators.minLength(4)]],
      'checkbox':['',Validators.required],
    })
  }


  signupHit() {
    let body =
    {
      "user_firstname": this.sigupForm.get('fullName').value,
      "user_email": this.sigupForm.get('emailId').value,
      "user_phone": this.sigupForm.get('phone').value,
      "user_password": this.sigupForm.get('password').value,
      "user_lastname": "lastname",
      "user_city": "Hyderabad",
      "user_zipcode": "500072"
    }

    this.http.post<any>('https://snapkaro.com/eazyrooms_staging/api/user_registeration ', body).subscribe(data1 => {

      if (data1 && data1.msg && data1.msg=="Registered Successfully" && data1.status)  {
        this.response = data1;
        this.registration = data1.msg
      }
      if (data1 && data1.msg && data1.msg=="Already Exists" && !data1.status)  {
        this.response = data1;
        this.registration = "User " +data1.msg + " kindly signIn"
      }
    })
  }

  getErrorPhone(){
    return this.sigupForm.get('phone').hasError('required') 
    ?  "you must enter a value"
    : this.sigupForm.get('phone').hasError('onlynumber') 
    ?  "phone number should be only digits"
    : this.sigupForm.get('phone').hasError('length')
    ? "phone should be 10 digits"
    : ""
  }

  getErrorFullName(){
    return this.sigupForm.get('fullName').hasError('required') 
    ?  "you must enter a value"
    : this.sigupForm.get('fullName').hasError('minlength') 
    ?  "name must be atleast 4 letters"
    : this.sigupForm.get('fullName').hasError('onlyalpha')
    ? "enter only alphabets"
    : ""
  }
  getErrorEmail(){
    return this.sigupForm.get('emailId').hasError('required') 
    ?  "you must enter a value"
    : this.sigupForm.get('emailId').hasError('pattern') 
    ?  "enter valid email"
    : ""
  }
  getErrorPassword() {
    return this.sigupForm.get('password').hasError('required')
      ? "you must enter a value"
      : this.sigupForm.get('password').hasError('pattern')
        ? "should contain one number,one upper and lower case character and one special character with length between 8,20"
        : ""
  }
  getErrorcompany(){
    return this.sigupForm.get('company').hasError('required') 
    ?  "you must enter a value"
    : this.sigupForm.get('company').hasError('minlength') 
    ?  "company must be atleast 4 letters"
    : ""
  }

  phonelength(control :AbstractControl): any{
    if(control.value.length !=10){
      return {"length" : true}
    }
  }

  onlyAplabet(control :AbstractControl): any{
    if(/[^a-z\s]/.test(control.value)){
      return {"onlyalpha" : true}
    }
  }
  onlyNumbers(control :AbstractControl): any{
    if(/[^0-9]/.test(control.value)){
      return {"onlynumber" : true}
    }
  }
  
}
