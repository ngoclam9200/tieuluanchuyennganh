import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray,FormControl, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
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
array:any=[]
tmp:any=[]
arr:any
formArray:FormArray
  constructor( private http: HttpClient, private api:ApiService, private dialog : MatDialogRef<CreatebillComponent>) { }

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
           this.formGroup = new FormGroup({
         danhSachDat: new FormControl(this.formArray.controls),
      
        diaChiGiaoHang: new FormControl(this.formGroup.controls['diaChiGiaoHang'].value, [Validators.required]),
        sdtNguoiNhan: new FormControl(this.formGroup.controls['sdtNguoiNhan'].value, [Validators.required]),
        thanhToanOnline: new FormControl(false, [Validators.required]),
       
      });
      
      if (this.formGroup.valid)
      {
        Swal.fire({
          title: 'Are you sure?',
          text: "Create bill!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes,create bill!'
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
    //   console.log(this.array)
    //  this.formArray.setValue(this.array)

    //   console.log(this.formGroup.controls['sdtNguoiNhan'].value)
    //    this.formGroup = new FormGroup({
    //      danhSachDat: new FormControl(this.formArray.controls),
      
    //     diaChiGiaoHang: new FormControl(this.formGroup.controls['diaChiGiaoHang'].value, [Validators.required]),
    //     sdtNguoiNhan: new FormControl(this.formGroup.controls['sdtNguoiNhan'].value, [Validators.required]),
    //     thanhToanOnline: new FormControl(false, [Validators.required]),
       
    //   });
 
    //   console.log(this.formGroup.value)
     
      // var currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
      // var token = currentUser.token; // your token
      //  headers = headers.set('Access-Control-Allow-Origin', '*').set('Authorization', `Bearer ${token}`);
      
      



  }
  close()
{
  this.dialog.close()
}

}
