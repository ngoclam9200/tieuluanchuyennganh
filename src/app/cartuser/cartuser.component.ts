import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ApiService } from 'src/services/api.service';
import { FormGroup } from '@angular/forms';
import { FormControl, Validators , FormArray} from '@angular/forms';
import {} from "jquery";
import { MatDialog,MatDialogConfig } from '@angular/material/dialog';
import { CreatebillComponent } from '../createbill/createbill.component';


@Component({
  selector: 'app-cartuser',
  templateUrl: './cartuser.component.html',
  styleUrls: ['./cartuser.component.css']
})

export class CartuserComponent implements OnInit {
  array: any = []
  data; iduser: any
  arraydata: any = []
  soLuongSP:any
  Tongtien:any
  moneysave:any
  formGroup: FormGroup;
  noproduct=true
  constructor(private http: HttpClient, private router: Router, private api:ApiService, private dialog : MatDialog) { }

  ngOnInit(): void {
    this.currentData()
  }
  currentData() {





    let headers = new HttpHeaders();
    var currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    var token = currentUser.token; // your token
     headers = headers.set('Access-Control-Allow-Origin', '*').set('Authorization', `Bearer ${token}`);



    this.http.get(this.api.apiorder+`xemgiohang`, { headers: headers }).subscribe(res => {
       this.data = res
       this.data=this.data.data
       this.data=this.data[0]
       console.log(this.data)
       this.soLuongSP=this.data.length
       var totalmoney=0
       var savemoney=0
       if(this.data.length==0) this.noproduct=true
       else 
       {this.noproduct=false
       for(let i=0; i<this.data.length;i++)
     
       { 
        savemoney += this.data[i].giaTien -this.data[i].giaTien*(this.data[i].giamGia/100)
        totalmoney += this.data[i].giaTien
       
      
        
       }
       this.Tongtien=totalmoney
      this.moneysave=savemoney
       }













    });


  }
 
  deleteproduct (id)
  {
    let headers = new HttpHeaders();
    var currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    var token = currentUser.token; // your token
     headers = headers.set('Access-Control-Allow-Origin', '*').set('Authorization', `Bearer ${token}`);
     Swal.fire({
      title: 'Are you sure?',
      text: "Remove  product in cart",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes,remove it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.delete(this.api.apiorder+`xoasanphamtronggiohang/` + id, { headers: headers }).subscribe(res => {
          console.log(res)
          this.Tongtien=0
          this.moneysave=0
          
         
      
    
       });
        Swal.fire(
          'Success!',
          '',
          'success'
          

        )
        setTimeout(() => {
          window.location.reload()
        }, 3000);
      
       
      }


    })

     

  }
  taohoadon()
  {
    
    
   

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width='600px';
    
      

    this.dialog.open(CreatebillComponent, dialogConfig);
      


  
  }
}
