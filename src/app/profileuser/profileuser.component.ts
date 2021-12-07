import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormControl, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Observable, } from 'rxjs';
import { Router } from '@angular/router';
import { ApiService } from 'src/services/api.service';
import jwt_decode from 'jwt-decode';
@Component({
  selector: 'app-profileuser',
  templateUrl: './profileuser.component.html',
  styleUrls: ['./profileuser.component.css']
})
export class ProfileuserComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router, private api:ApiService) { }
  data: any
  fullName; address; phoneNumber; email: any

  formGroup; formGroupchangepass: FormGroup;

  ngOnInit(): void {
    this.initForm()
    this.currentData()
   
  }
  getDecodedAccessToken(token: string): any {
    try{
        return jwt_decode(token);
    }
    catch(Error){
        return null;
    }
  }
  initForm() {

    this.formGroup = new FormGroup({

      fullName: new FormControl("", [Validators.required]),
      address: new FormControl("", [Validators.required]),
      phoneNumber: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required]),
      oldPassword: new FormControl("", [Validators.required]),
      newPassword: new FormControl("", [Validators.required]),
      confirmpassword: new FormControl("", [Validators.required]),
    });
    this.formGroupchangepass = new FormGroup({


      matKhauHienTai: new FormControl("", [Validators.required]),
      matKhauMoi: new FormControl("", [Validators.required]),
      xacNhanMatKhauMoi: new FormControl("", [Validators.required]),

    });

  }
  currentData() {





    let headers = new HttpHeaders();
    var currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    var token = currentUser.token; // your token
    this.data=jwt_decode(token)
    console.log(this.data)
      this.address = this.data.diaChi
      this.fullName = this.data.tenNguoiDung
      this.phoneNumber = this.data.sDT
      this.email = this.data.email
      this.formGroup = new FormGroup({


        fullName: new FormControl(this.data.tenNguoiDung),
        address: new FormControl(this.data.diaChi),
        phoneNumber: new FormControl(this.data.sDT),
        email: new FormControl(this.data.email),

      })
      console.log(this.formGroup.value)








   


  }
  UpdateUser() {
    this.currentData()

    if (this.formGroup.valid) {
       this.update(this.formGroup.value).subscribe((result) => {
 

        if (result)
 

        window.location.reload();
        alert("Update thành công");

      });

    }

    else alert("Bạn chưa nhập đầy đủ thông tin");



  }
  update(data): Observable<any> {

    let headers = new HttpHeaders();
    var currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    var token = currentUser.token; // your token
     headers = headers.set('Access-Control-Allow-Origin', '*').set('Authorization', `Bearer ${token}`);


    return this.http.put(this.api.apiuser+`user`, data, { headers: headers });
  }
  Changepassword() {
    
   
    if (this.formGroupchangepass.valid) {
      // if(this.formGroupchangepass.controls['matKhauMoi'].value.length<8 || this.formGroupchangepass.controls['xacNhanMatKhauMoi'].value.length<8 )
      // {
      //   alert(" mật khẩu mới tối thiểu 8 kí tự");
      // }
    
      if(this.formGroupchangepass.controls['matKhauMoi'].value!=this.formGroupchangepass.controls['xacNhanMatKhauMoi'].value)
    {
      alert(" Newpassword and confirm new pasword not match");
      return
    }
       this.changepw(this.formGroupchangepass.value).subscribe((result) => {
 

        if (result)
 

        window.location.reload();
        alert(" thành công");

       },error =>{
         console.log(error.error.message)
         
        if(error.error.message=="Mật khẩu mới tối thiểu 8 ký tự")
        alert("Mật khẩu mới tối thiểu 8 ký tự")
        if(error.error.message=="Mật khẩu hiện tại không đúng!")
        alert("Mật khẩu hiện tại không đúng!")
      }
      );

    }

    else alert("Bạn chưa nhập đầy đủ thông tin");


  }
  changepw(data): Observable<any> {

    let headers = new HttpHeaders();
    var currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    var token = currentUser.token; // your token
     headers = headers.set('Access-Control-Allow-Origin', '*').set('Authorization', `Bearer ${token}`);


    return this.http.post(this.api.apiuser+`doimatkhau`, data, { headers: headers });
  }








}
