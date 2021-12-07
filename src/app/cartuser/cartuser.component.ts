import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Router } from '@angular/router';
import { ApiService } from 'src/services/api.service';
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
  constructor(private http: HttpClient, private router: Router, private api:ApiService) { }

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
       for(let i=0; i<this.data.length;i++)
     
       { 
        savemoney += this.data[i].giaTien -this.data[i].giaTien*(this.data[i].giamGia/100)
        totalmoney += this.data[i].giaTien
       
      
        
       }
       this.Tongtien=totalmoney.toString()
      this.moneysave=savemoney.toString()

      // this.iduser = this.data.data._id
      // this.array = this.data.data
      // for (let i = 0; i < this.array.length; i++) {
      //   this.http.get(this.api.apicar+`?getId=`+this.array[i].carId).subscribe(res => {
    
      //     this.data = res
   
      
      //   const today = new Date(this.array[i].time);
      //   today.toString();
      //   var date=today.toString();
      //   date=date.slice(0,21)
      //    this.arraydata.push({ "carName":this.data.data.carName, "Image": this.data.data.Image,"price":this.data.data.price, "time":date,"carId":this.data.data._id})

 
      //   });
       
      // }
     












    });


  }
  currentbooking(id)
  {
  localStorage.setItem('idcar',id)
  this.router.navigate(['/cardetail']);
  }
}
