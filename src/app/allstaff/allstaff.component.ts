import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { } from '@angular/common'
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router'

import * as XLSX from 'xlsx';
import { ApiService } from 'src/services/api.service';

import { FormControl, Validators } from '@angular/forms';


import { Observable } from 'rxjs';



@Component({
  selector: 'app-allstaff',
  templateUrl: './allstaff.component.html',
  styleUrls: ['./allstaff.component.css']
})
export class AllstaffComponent implements OnInit {
  array: any = []
  data: any
  arrayalluser: any = []
  checkfillImage; checkfillcarName; checkfillCarInformation; checkfillairBag; checkfillbody; checkfillcarLife; checkfillcolour; checkfillcompanyName; checkfillengineType; checkfillfrontBrake; checkfillfuelConsumption; checkfillgear; checkfilllongs; checkfillnumberOfSeats; checkfillorigin; checkfilloverallSize; checkfillprice; checkfillseat; checkfillstatus; checkfilltireParameters; checkfilltopSpeed; checkfillwattage; checkfillyearOfManufacture: boolean = false

  formGroup: FormGroup
  @ViewChild('TABLE') TABLE: ElementRef;
  ExportTOExcel() {
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    today.toLocaleDateString();
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'AllUser' + today + '.xlsx');
  }
  constructor(private http: HttpClient, private router: Router,private api:ApiService) { }

  ngOnInit(): void {
    this.api.checkRole()
    this.getstaff()
    this.initForm()
  }
  getstaff() {
    
  this.api.getstaff().subscribe(res=>{
    console.log(res)
       this.data = res

      this.array = this.data.data
      console.log(this.array)
   

      
  })
 
  

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
   
    let headers = new HttpHeaders();
    var currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    var token = currentUser.token; // your token
     headers = headers.set('Access-Control-Allow-Origin', '*').set('Authorization', `Bearer ${token}`);
    console.log(data)
     return this.http.post(this.api.apiuser+`dangkyNhanVien`, data, {headers:headers});
     
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
          window.location.reload()




        }, error => {
          console.log(error)

          
            alert(error.error.message
            );
          
        });



      }

      else alert("Bạn chưa nhập đầy đủ thông tin");

    }



  }
  
 

}
