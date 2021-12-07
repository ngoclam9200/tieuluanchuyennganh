import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { } from '@angular/common'

import { Router } from '@angular/router'
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { ApiService } from 'src/services/api.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-listproduct',
  templateUrl: './listproduct.component.html',
  styleUrls: ['./listproduct.component.css'],
})
export class ListproductComponent implements OnInit {
  array: any = []
  data: any
  dataproducttype: any
  arrayproducttype: any = []
  formGroupSearch: FormGroup
  arraycomparecar: any = []
  isLogin: boolean
  idcar: any
  arrayid: any = []
  arraybooking:any=[]
  constructor(private http: HttpClient, private router: Router, private formBuider: FormBuilder, private api:ApiService) { }

  ngOnInit(): void {
    if (localStorage.getItem('currentUser') == null) this.isLogin = false
    else this.isLogin = true
    this.getproduct()
   
    this.getlistproducttype()
    this.formGroupSearch = this.formBuider.group(
      {
        textSearch: new FormControl("", [Validators.required]),
      }
    )
  }
 
  getproduct() {






    let headers = new HttpHeaders();
    var currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    var token = currentUser.token; // your token
 


    this.http.get(this.api.apiproduct+`laydanhsachSP`, { headers: headers }).subscribe(res => {
      console.log(res)
    this.data = res

      this.array = this.data.data
      
 


    });



  }
  getlistproducttype() {
    let headers = new HttpHeaders();
    var currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    var token = currentUser.token; // your token




    this.http.get(this.api.apiproducttype+`laydanhsachLoaiSP`, { headers: headers }).subscribe(res => {
       this.dataproducttype = res

      this.arrayproducttype= this.dataproducttype.data
 




    });



  }
  currentproduct(id) {
 
    localStorage.setItem('idproduct', id)
    this.router.navigate(['/productdetail']);

  }
  searchproduct() {
    let headers = new HttpHeaders();
    var currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    var token = currentUser.token; // your token
 


    this.http.get(this.api.apiproduct+`timkiemsanphamtheoten/`+ this.formGroupSearch.controls['textSearch'].value, { headers: headers }).subscribe(res => {
      console.log(res)
    this.data = res

      this.array = this.data.data
      
 


    });
    
   
  }
  searchproductbyid(id) {
    localStorage.setItem('idproducttype', id)
    localStorage.setItem('isproducttype', 'true')
    localStorage.setItem('isproduct', 'false')
    this.router.navigate(['/searchproduct']);
  }




  booking(idcar, namecar) {
    var exitst = false
    localStorage.setItem('idcar', idcar)
    localStorage.setItem('namecar', namecar)
    let headers = new HttpHeaders();
    var currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    var token = currentUser.token; // your token
 
    headers = headers.set('Access-Control-Allow-Origin', '*').set('Authorization', `Bearer ${token}`);



    this.http.get(this.api.apischedule+`user`, { headers: headers }).subscribe(res => {

      this.data = res

      this.arraybooking = this.data.data
       for (let i = 0; i < this.arraybooking.length; i++) {
        if (idcar == this.arraybooking[i].carId) {
          exitst = true
          break

        }


   }
       if (this.arraybooking.length == 4) {
        Swal.fire({
          title: 'You can only book 4 cars',
          text: "Are you want to go your booking",
          icon: 'warning',
          showCancelButton: true,
          width: 500,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',

          confirmButtonText: 'Yes,going it!'
        }).then((result) => {
          if (result.isConfirmed) {


            this.router.navigate(['/listbookinguser']);


          }
          else return


        })

      }
     else if (exitst == true) {
        
        Swal.fire({
          title: 'you booked this car',
          text: "Are you want to go your booking",
          icon: 'warning',
          showCancelButton: true,
          width: 500,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',

          confirmButtonText: 'Yes,going it!'
        }).then((result) => {
          if (result.isConfirmed) {


            this.router.navigate(['/listbookinguser']);


          }
          else return


        })

      }

       else this.router.navigate(['/scheduleuser']);

    });


  }
}
