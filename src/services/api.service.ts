import { Injectable } from '@angular/core';

import {  HttpClient, HttpHeaders, } from '@angular/common/http';
import { } from '@angular/common'
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  array: any = []
  data: any
  tmp:any
  arrayalluser: any = []
  constructor(private http:HttpClient, private router:Router) { }
 
 
  apiabout="https://carshop985.herokuapp.com/api/about/"
  apiuser="https://localhost:44371/api/Users/"
  apicar="https://carshop985.herokuapp.com/api/car/"
  apiproduct="https://localhost:44371/api/SanPham/"
  apiproducttype="https://localhost:44371/api/LoaiSanPham/"
  apicompany="https://carshop985.herokuapp.com/api/company/"
  apischedule="https://carshop985.herokuapp.com/api/schedule/"
  apiorder="https://localhost:44371/api/GioHang/"
  apibill="https://localhost:44371/api/HoaDon/"

  getstaff() {
    
    let headers = new HttpHeaders();
    var currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    var token = currentUser.token; // your token
    console.log(token)
    headers = headers.set('Access-Control-Allow-Origin', '*').set('Authorization', `Bearer ${token}`);
    return this.http.get(this.apiuser+`laydanhsachNhanVien`, { headers: headers })
  }
  getcustommer() {
    
    let headers = new HttpHeaders();
    var currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    var token = currentUser.token; // your token
    console.log(token)
    headers = headers.set('Access-Control-Allow-Origin', '*').set('Authorization', `Bearer ${token}`);
    return this.http.get(this.apiuser+`laydanhsachKhachHang`, { headers: headers })
  }
  checkRole()
  {
    if (localStorage.getItem('currentUser') == null) {
      this.router.navigate(['/signin']);
      return

    }
     if(localStorage.getItem('role')==null)
     {
      this.router.navigate(['/signin']);
      return
     }
     
   

    
  }
  checkstaff()
  {
    if(localStorage.getItem('role')=="staff")
    {
    this.router.navigate(['/notfoundpage']);
   
    }
  }
    checkadmin()
  {
  
    if(localStorage.getItem('role')=="admin")
   
     {//localStorage.setItem('tmp', this.tmp)
     //  localStorage.removeItem('currentUser')
    this.router.navigate(['/notfoundpage']);

     }
  }
  checkuser()
  {
    if(localStorage.getItem('role')=="customer")
     {
      //  localStorage.removeItem('currentUser')
    this.router.navigate(['/notfoundpage']);
   
     }
  }

}
