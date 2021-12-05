import { Component, OnInit } from '@angular/core';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { FormControl, Validators } from '@angular/forms';

import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

import { Router } from '@angular/router';
import { ApiService } from 'src/services/api.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  formGroup: FormGroup;
  constructor(private http: HttpClient,
    private router: Router, private api:ApiService) { }

  ngOnInit(): void {
    this.initForm()
  }
  initForm() {

    this.formGroup = new FormGroup({
      email: new FormControl("", [Validators.required]),
      tenDangNhap: new FormControl("", [Validators.required]),
      tenNguoiDung: new FormControl("", [Validators.required]),
      diaChi: new FormControl("", [Validators.required]),
      sDT: new FormControl("", [Validators.required]),
      matKhau: new FormControl("", [Validators.required]),
      xacNhanMatKhau: new FormControl("", [Validators.required])
    });

  }
  register(data): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 
        'Access-Control-Allow-Origin':'*',
        
      })
    };
    // let headers = new HttpHeaders();
    // headers = headers.set('Access-Control-Allow-Origin', '*').set('Content-Type', 'application/json')
    console.log(data)
     return this.http.post(this.api.apiuser+`dangky`, data, httpOptions);
     
  }
  registerProces() {



    const password = this.formGroup.controls['matKhau'].value;
    
    const confirmPassword = this.formGroup.controls['xacNhanMatKhau'].value;


    if (password != confirmPassword || password == "" || confirmPassword == "") {
      alert("Password not match");
      return;
    }


    else {
      if (this.formGroup.valid) {
        this.register(this.formGroup.value).subscribe((result) => {

          if (result)
           alert("Đăng kí thành công");
          this.router.navigate(['/signin']);




        }, error => {

          if (error.error != "Dang ky that bai") {
            alert("Emailhoặc user name này đã được đăng kí rồi !!");
          }
        });



      }

      else alert("Bạn chưa nhập đầy đủ thông tin");

    }



  }

}
