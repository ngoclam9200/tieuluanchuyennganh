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
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css']
})
export class BillComponent implements OnInit {
data:any=[]
nobill=true
  constructor(private http:HttpClient, private api:ApiService) { }


  ngOnInit(): void {
    this.currentData()
  }

  currentData() {





    let headers = new HttpHeaders();
    var currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    var token = currentUser.token; // your token
     headers = headers.set('Access-Control-Allow-Origin', '*').set('Authorization', `Bearer ${token}`);



    this.http.get(this.api.apibill+`danhsachhoadonNguoiDung`, { headers: headers }).subscribe(res => {
       this.data = res
       this.data=this.data.data
     
       console.log(this.data)
      
       if(this.data,length==0) this.nobill=true
       else 
       {this.nobill=false
      
      
       }













    });


  }
  deletebill(id)
  {
    let headers = new HttpHeaders();
    var currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    var token = currentUser.token; // your token
     headers = headers.set('Access-Control-Allow-Origin', '*').set('Authorization', `Bearer ${token}`);
     this.http.put(this.api.apibill+`nguoidunghuydonhang/` + id, { headers: headers }).subscribe(res => {
      console.log(res)
      
     
  

   });
  }
}
