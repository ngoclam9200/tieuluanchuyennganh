import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ApiService } from 'src/services/api.service';
import { FormGroup } from '@angular/forms';
import { FormControl, Validators , FormArray} from '@angular/forms';
import {} from "jquery";
import { MatDialog,MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { CreatebillComponent } from '../createbill/createbill.component';
import { ScrollingModule } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-turnover',
  templateUrl: './turnover.component.html',
  styleUrls: ['./turnover.component.css']
})
export class TurnoverComponent implements OnInit {

  constructor(private http:HttpClient, private api:ApiService) { }
tongDoanhThu:any
countUser:any
array:any=[]
data:any=[]
countproductsold:any
countbillcancle:any
  ngOnInit(): void {
    this.allturnover()
    this.api.checkRole()
    this.api.checkstaff()
    this.getcountcustommer()
    this.allcountbillcancle()
    this.gettopproduct()
  }
  allturnover()
  {
    let headers = new HttpHeaders();
    var currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    var token = currentUser.token; // your token
     headers = headers.set('Access-Control-Allow-Origin', '*').set('Authorization', `Bearer ${token}`);
     var a={}
     this.http.get(this.api.apibill+`Xemhoadontheotrangthaiadmin/4` , { headers: headers }).subscribe(res => {
      console.log(res)
      this.data=res
      this.data=this.data.data
      console.log(this.data)
     
      var t=0
      for(let i=0 ;i<this.data.length;i++)
      t =t+this.data[i].tongHoaDon
      this.tongDoanhThu=t
      var count=0
      for(let i=0 ;i<this.data.length;i++)
      {
        
        count=count+ this.data[i].chiTietHD.length
      }
      
      this.countproductsold=count
      


    
     
      
 
      
     
  

   });
  }
  allcountbillcancle()
  {
    let headers = new HttpHeaders();
    var currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    var token = currentUser.token; // your token
     headers = headers.set('Access-Control-Allow-Origin', '*').set('Authorization', `Bearer ${token}`);
     var a={}
     this.http.get(this.api.apibill+`Xemhoadontheotrangthaiadmin/5` , { headers: headers }).subscribe(res => {
      console.log(res)
      this.data=res
      this.data=this.data.data
      this.countbillcancle=this.data.length
     
     
      
      
      


    
     
      
 
      
     
  

   });
  }
  getcountcustommer() {
    
    this.api.getcustommer().subscribe(res=>{
      console.log(res)
         this.data = res
  
        this.array = this.data.data
        this.countUser=this.array.length
       
     
  
        
    })
   
    
  
    }
    gettopproduct()
    {
      let headers = new HttpHeaders();
      var currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
      var token = currentUser.token; // your token
       headers = headers.set('Access-Control-Allow-Origin', '*').set('Authorization', `Bearer ${token}`);
       var a={}
       this.http.get(this.api.apiproduct+`topsanphambanchay/6` , { headers: headers }).subscribe(res => {
        
        this.data=res
        this.data=this.data.data
        console.log(this.data)
     
       
       
        
        
        
  
  
      
       
        
   
        
       
    
  
     });

    }
  
  

}
