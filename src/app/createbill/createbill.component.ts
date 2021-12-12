import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray,FormControl, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { data } from 'jquery';
import { ApiService } from 'src/services/api.service';
@Component({
  selector: 'app-createbill',
  templateUrl: './createbill.component.html',
  styleUrls: ['./createbill.component.css']
})
export class CreatebillComponent implements OnInit {
formGroup: FormGroup
array:any=[]
tmp:any=[]
arr:any
formArray:FormArray
  constructor( private http: HttpClient, private api:ApiService) { }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      danhSachDat: new FormArray(this.array,[Validators.required]),
      diaChiGiaoHang: new FormControl("", [Validators.required]),
      sdtNguoiNhan: new FormControl("", [Validators.required]),
      thanhToanOnline: new FormControl(false, [Validators.required]),
    });
    this.formArray=new FormArray(this.array)
  }
  createbill()
  {
    let headers = new HttpHeaders();
    var currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    var token = currentUser.token; // your token
     headers = headers.set('Access-Control-Allow-Origin', '*').set('Authorization', `Bearer ${token}`);



    this.http.get(this.api.apiorder+`xemgiohang`, { headers: headers }).subscribe(res => {
     
      this.tmp=res
      this.tmp=this.tmp.data[0]
      console.log(this.tmp)
    
      for(let i=0 ;i<this.tmp.length;i++)
      { 
        var a={sanPhamId: this.tmp[i].sanPhamId, soLuongDat:this.tmp[i].soLuongTrongGio}
        this.array.push(a)

      }
      
    
    });
      console.log(this.array)
     this.formArray.setValue(this.array)

      console.log(this.formGroup.controls['sdtNguoiNhan'].value)
       this.formGroup = new FormGroup({
         danhSachDat: new FormControl(this.formArray.controls),
      
        diaChiGiaoHang: new FormControl(this.formGroup.controls['diaChiGiaoHang'].value, [Validators.required]),
        sdtNguoiNhan: new FormControl(this.formGroup.controls['sdtNguoiNhan'].value, [Validators.required]),
        thanhToanOnline: new FormControl(false, [Validators.required]),
       
      });
 
      console.log(this.formGroup.value)
     
      // var currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
      // var token = currentUser.token; // your token
      //  headers = headers.set('Access-Control-Allow-Origin', '*').set('Authorization', `Bearer ${token}`);
       if (this.formGroup.valid)
       {
        this.http.post(this.api.apibill+`taohoadon` ,this.formGroup.value, { headers: headers }).subscribe(res => {
          console.log(res)
          this.tmp=res
          alert(this.tmp.message)
          
         
      
    
       });
       }
       else 
       alert("ádasdsad")
      



  }

}
