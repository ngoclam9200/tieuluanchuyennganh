import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray,FormControl, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { data } from 'jquery';
import { ApiService } from 'src/services/api.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-createbill',
  templateUrl: './createbill.component.html',
  styleUrls: ['./createbill.component.css']
})
export class CreatebillComponent implements OnInit {
formGroup: FormGroup
formGroupcheckout: FormGroup
formGroupPayPal: FormGroup
array:any=[]
arraycheckout:any=[]
arrayPayPal:any=[]
tmp:any=[]
arr:any
formArray:FormArray
formArrayPayPal:FormArray
formArraycheckout:FormArray
diaChi:any
sDT:any
data:any=[]
checkthanhtoan=true
  constructor( private http: HttpClient, private api:ApiService, private dialog : MatDialogRef<CreatebillComponent>, private router: Router) { }

  ngOnInit(): void {
    this.getrole()
    this.api.checkadmin()
    this.thanhtoan()
   

    this.formGroup = new FormGroup({
      danhSachDat: new FormArray(this.array,[Validators.required]),
      diaChiGiaoHang: new FormControl("", [Validators.required]),
      sdtNguoiNhan: new FormControl("", [Validators.required]),
      thanhToanOnline: new FormControl(false, [Validators.required]),
    });
    this.formArray=new FormArray(this.array)
    this.formGroupcheckout = new FormGroup({
      danhSachDat: new FormArray(this.arraycheckout,[Validators.required]),
      diaChiGiaoHang: new FormControl("", [Validators.required]),
      sdtNguoiNhan: new FormControl("", [Validators.required]),
      paymentId: new FormControl("", [Validators.required]),
      payerID: new FormControl("", [Validators.required]),
    });
    this.formArraycheckout=new FormArray(this.arraycheckout)
    this.formGroupPayPal = new FormGroup({
      danhSachDat: new FormArray(this.arrayPayPal,[Validators.required]),

      urlRedirect: new FormControl("https://webdogiadung.netlify.app/cartuser", [Validators.required]),
    });
    this.formArrayPayPal=new FormArray(this.arrayPayPal)
    this.currentphoneaddress()
  }
  currentphoneaddress() {





    let headers = new HttpHeaders();
    var currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    var token = currentUser.token; // your token
    headers = headers.set('Access-Control-Allow-Origin', '*').set('Authorization', `Bearer ${token}`);
    this.http.get(this.api.apiuser+`xemthongtinnguoidung`, { headers: headers }).subscribe(res=>{
          this.data = res
  
        this.data = this.data.data
    
       this.diaChi = this.data[0].diaChi
      
      this.sDT = this.data[0].sDT
       this.formGroup.controls['sdtNguoiNhan'].setValue(this.data[0].sDT)
      this.formGroup.controls['diaChiGiaoHang'].setValue(this.data[0].diaChi)
      
     
      
  
    });
 
   
    
    
      








   


  }
  getrole()
  {
    
    var str=this.constructor.name
    str=str.toLowerCase()
    var a=str.search('component')
    str=str.slice(0,a)
    if(localStorage.getItem('role')=="admin" || localStorage.getItem('role')=="staff") localStorage.setItem('currentpage2',str)
    else
    localStorage.setItem('currentpage1',str)
  }
  createbill()
  {
    let headers = new HttpHeaders();
    var currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    var token = currentUser.token; // your token
     headers = headers.set('Access-Control-Allow-Origin', '*').set('Authorization', `Bearer ${token}`);
     const sdt=this.formGroup.controls['sdtNguoiNhan'].value;
     const diaChiGiaoHang=this.formGroup.controls['diaChiGiaoHang'].value;
     var number = "0123456789"
     var checksdt = function (string) {
      for (let i = 0; i < string.length; i++) {
        if (number.indexOf(string[i]) == -1) {
          return true
        }
      }
      return false;
    }
    var specialChars = "<>@!#$%^&*()_+[]{}?:;|'\"\\~`-="

    var checkaddress = function (string) {
      for (let i = 0; i < specialChars.length; i++) {
        if (string.indexOf(specialChars[i]) > -1) {
          return true
        }
      }
      return false;
    }


    if (checkaddress(diaChiGiaoHang) == true) {

      return alert('Address không hợp lệ');
    }


    if (checksdt(sdt) == true) {

      return alert('Phone number receiver không hợp lệ');
    }



    this.http.get(this.api.apiorder+`xemgiohang`, { headers: headers }).subscribe(res => {
     
      this.tmp=res
      this.tmp=this.tmp.data[0]
       
    
      for(let i=0 ;i<this.tmp.length;i++)
      { 
        var a={sanPhamId: this.tmp[i].sanPhamId, soLuongDat:this.tmp[i].soLuongTrongGio}
        this.array.push(a)

      }
           this.formGroup = new FormGroup({
         danhSachDat: new FormControl(this.formArray.controls),
      
        diaChiGiaoHang: new FormControl(this.formGroup.controls['diaChiGiaoHang'].value, [Validators.required]),
        sdtNguoiNhan: new FormControl(this.formGroup.controls['sdtNguoiNhan'].value, [Validators.required]),
        thanhToanOnline: new FormControl(false, [Validators.required]),
       
      });
      
      if (this.formGroup.valid)
      {
        Swal.fire({
          title: 'Xác nhận?',
          text: "Tạo hóa đơn!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'đồng ý',
          cancelButtonText: 'hủy',
        }).then((result) => {
          if (result.isConfirmed) {
            this.http.post(this.api.apibill+`taohoadon` ,this.formGroup.value, { headers: headers }).subscribe(res => {
           
              this.tmp=res
            
              
             
          
        
           });
           setTimeout(() => {
             window.location.reload()
           }, 3000);
           
            Swal.fire(
              'Success!',
              '',
              'success'
              
    
            )
          
           
          }
    
    
        })
    

        
      
      }
      else 
      alert("Please fill the form")
    
    });
      this.formArray.setValue(this.array)

        this.formGroup = new FormGroup({
         danhSachDat: new FormControl(this.formArray.controls),
      
        diaChiGiaoHang: new FormControl(this.formGroup.controls['diaChiGiaoHang'].value, [Validators.required]),
        sdtNguoiNhan: new FormControl(this.formGroup.controls['sdtNguoiNhan'].value, [Validators.required]),
        thanhToanOnline: new FormControl(false, [Validators.required]),
       
      });
 
      
      var currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
      var token = currentUser.token; // your token
       headers = headers.set('Access-Control-Allow-Origin', '*').set('Authorization', `Bearer ${token}`);
      
      



  }
  
  createbillpaypal()
  {
    let headers = new HttpHeaders();
    var currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    var token = currentUser.token; // your token
     headers = headers.set('Access-Control-Allow-Origin', '*').set('Authorization', `Bearer ${token}`);
     const sdt=this.formGroup.controls['sdtNguoiNhan'].value;
     const diaChiGiaoHang=this.formGroup.controls['diaChiGiaoHang'].value;
     var number = "0123456789"
     var checksdt = function (string) {
      for (let i = 0; i < string.length; i++) {
        if (number.indexOf(string[i]) == -1) {
          return true
        }
      }
      return false;
    }
    var specialChars = "<>@!#$%^&*()_+[]{}?:;|'\"\\~`-="

    var checkaddress = function (string) {
      for (let i = 0; i < specialChars.length; i++) {
        if (string.indexOf(specialChars[i]) > -1) {
          return true
        }
      }
      return false;
    }


    if (checkaddress(diaChiGiaoHang) == true) {

      return alert('Address không hợp lệ');
    }
    else localStorage.setItem("diaChiGiaoHang",diaChiGiaoHang)


    if (checksdt(sdt) == true) {

      return alert('Phone number receiver không hợp lệ');
    }
    else localStorage.setItem("sdt",sdt)


    this.http.get(this.api.apiorder+`xemgiohang`, { headers: headers }).subscribe(res => {
     
      this.tmp=res
      this.tmp=this.tmp.data[0]
       
    
      for(let i=0 ;i<this.tmp.length;i++)
      { 
        var a={sanPhamId: this.tmp[i].sanPhamId, soLuongDat:this.tmp[i].soLuongTrongGio}
        this.arrayPayPal.push(a)

      }
           this.formGroupPayPal = new FormGroup({
         danhSachDat: new FormControl(this.formArrayPayPal.controls),
      
      
         urlRedirect: new FormControl("https://webdogiadung.netlify.app/cartuser", [Validators.required]),
       
      });
      console.log(this.formGroupPayPal.value)
      if (this.formGroupPayPal.valid)
      {
        
            this.http.post(this.api.apibill+`ThanhToanPayPal` ,this.formGroupPayPal.value, { headers: headers }).subscribe(res => {
           
              console.log(res)
              this.tmp=res
              this.tmp=this.tmp.data
              console.log(this.tmp)
              this.close()
              this.router.navigate(['/listproduct']);
              window.open(this.tmp)
            
              
             
          
        
           });
          
    
    
        
    

        
      
      }
      
    
    });
  
 

      
      



  }
  close()
{
  this.dialog.close()
}
thanhtoan()
{
  if(localStorage.getItem('paypal')=='true')
  this.checkthanhtoan=true
  else this.checkthanhtoan=false
}
}
