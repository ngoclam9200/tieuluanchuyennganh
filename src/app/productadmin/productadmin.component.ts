import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { } from '@angular/common'

import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Observable, } from 'rxjs';
import Swal from 'sweetalert2';
import { ApiService } from 'src/services/api.service';
import * as XLSX from 'xlsx';

import { Router } from '@angular/router';
@Component({
  selector: 'app-productadmin',
  templateUrl: './productadmin.component.html',
  styleUrls: ['./productadmin.component.css']
})
export class ProductadminComponent implements OnInit {
  data: any
  public array: any = []
  a: any
  public arraycar = []
  idcar: any

  newimage: boolean = false
  isSearch: boolean = false
  novalue: boolean = false
  Image; carName; CarInformation; airBag; body; carLife; colour; companyName; engineType; frontBrake; fuelConsumption; gear; longs; numberOfSeats; origin; overallSize; price; seat; status; tireParameters; topSpeed; wattage; yearOfManufacture: any
  imagePreview: any = null;
  checkfillhinhAnh; checkfillgiaTien; checkfillmoTa; checkfillsoLuongConLai; checkfilltenSP; checkfillloaiSanPhamId; checkfillgiamGia;
  arrayproducttype: any = []
  selectedFile: File;
  onFileSelected(event) {
    this.selectedFile = event.target.files[0]

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
      console.log(this.imagePreview)
     };
    reader.readAsDataURL(this.selectedFile);
  }
  formGroupProduct: FormGroup
  formGroupSearch: FormGroup
  constructor(private http: HttpClient, private formBuilder: FormBuilder, private api:ApiService, private router:Router) { }

  ngOnInit(): void {
    this.api.checkRole()

    this.api.checkstaff()
    this.getproduct()
    this.getproducttype()


     this.formGroupProduct = this.formBuilder.group({
      tenSP: new FormControl("", [Validators.required]),
      hinhAnh: new FormControl("", [Validators.required]),
      giaTien: new FormControl("", [Validators.required]),
      giamGia: new FormControl("", [Validators.required]),
      moTa: new FormControl("", [Validators.required]),
      soLuongConLai: new FormControl("", [Validators.required]),
      loaiSanPhamId: new FormControl("", [Validators.required]),
   


    });
    this.formGroupSearch = this.formBuilder.group({
      search: new FormControl("", [Validators.required]),
    })
  

  }
  getproducttype() {
    let headers = new HttpHeaders();
    var currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    var token = currentUser.token; // your token
 


    this.http.get(this.api.apiproducttype+`laydanhsachLoaiSP`, { headers: headers }).subscribe(res => {
       this.data = res

      this.arrayproducttype = this.data.data
      console.log(this.arrayproducttype)
      
 




    });



  }


  async getproduct() {
    this.isSearch = false
    this.novalue = false
    let headers = new HttpHeaders();
 
    



    this.http.get(this.api.apiproduct+`laydanhsachSP`, { headers: headers }).subscribe(res => {
       this.data = res

      this.array = this.data.data
      console.log(this.array)
 




    });
    

  }

  create(data): Observable<any> {
    let headers = new HttpHeaders();
    var currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    var token = currentUser.token; // your token
     headers = headers.set('Access-Control-Allow-Origin', '*').set('Authorization', `Bearer ${token}`);
   
    return this.http.post(this.api.apiproduct+`themSP`, data, { headers: headers });
     
     
    
  }
  Createproduct() {




 
    if (this.imagePreview != null) {
      this.formGroupProduct.controls['hinhAnh'].setValue(this.imagePreview)

    }
 
    if (this.formGroupProduct.valid) {
      Swal.fire({
        title: 'Are you sure?',
        text: "Create new product",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes,create it!'
      }).then((result) => {
        if (result.isConfirmed) {
          console.log(this.formGroupProduct.value)
          this.create(this.formGroupProduct.value).subscribe((result) => {

            if (result) {
              Swal.fire(
                'Success!',
                '',
                'success'
    
              )
              setTimeout(() => {
            window.location.reload()
          }, 2000);
 
            }
           
          }, error=>{
           
        
            
             
           Swal.fire(
             'Fail',
             error.error.message,
             'error'
           )
             
            
           

          }); 
         
          
        }



      })
   





    }

    else {
      Swal.fire({
        icon: 'error',
        title: 'Empty field....',
        text: 'Please fill in this form ',

      })
      this.Checkfill()

    }

  }
  Checkfill() {
    if (this.formGroupProduct.get('tenSP')?.value == "") this.checkfilltenSP = true
    if (this.formGroupProduct.get('moTa')?.value == "") this.checkfillmoTa = true
    if (this.formGroupProduct.get('hinhAnh')?.value == "") this.checkfillhinhAnh = true
    if (this.formGroupProduct.get('soLuongConLai')?.value == "") this.checkfillsoLuongConLai = true
    if (this.formGroupProduct.get('loaiSanPhamId')?.value == "") this.checkfillloaiSanPhamId = true
    if (this.formGroupProduct.get('giaTien')?.value == "") this.checkfillgiaTien = true

    if (this.formGroupProduct.get('giamGia')?.value == "") this.checkfillgiamGia = true
    


  }
  deleteproduct(id) {



    let headers = new HttpHeaders();
    var currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    var token = currentUser.token; // your token
    headers = headers.set('Access-Control-Allow-Origin', '*').set('Authorization', `Bearer ${token}`);
 
    Swal.fire({
      title: 'Are you sure?',
      text: "Delete this product",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes,delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.delete(this.api.apiproduct+`deleteSP/` + id, { headers: headers }).subscribe(res => {
 
        });
        Swal.fire(
          'Success!',
          '',
          'success'

        )
        setTimeout(() => {
          window.location.reload()
        }, 2000);
      }


    })






  }

  currentcar(id) {


     this.idcar = id
     let headers = new HttpHeaders();
 



    this.http.get(this.api.apiproduct+`laySanPhamById/` + id, { headers: headers }).subscribe(res => {

      this.data = res
      console.log(this.data)
    
     
      this.formGroupProduct = this.formBuilder.group({
       
        tenSP: new FormControl(this.data.data.tenSP, [Validators.required]),
        hinhAnh: new FormControl(this.data.data.hinhAnh, [Validators.required]),
        giaTien: new FormControl(this.data.data.giaTien, [Validators.required]),
        giamGia: new FormControl(this.data.data.giamGia, [Validators.required]),
        moTa: new FormControl(this.data.data.moTa, [Validators.required]),
        soLuongConLai: new FormControl(this.data.data.soLuongConLai, [Validators.required]),
        loaiSanPhamId: new FormControl(this.data.data.loaiSanPhamId, [Validators.required]),
        sanPhamId: new FormControl(this.data.data.sanPhamId, [Validators.required]),
     


      });
      this.Image = this.data.data.hinhAnh

 
    });



  }
  Updateproduct() {
    if (this.imagePreview != null) {
      this.formGroupProduct.controls['hinhAnh'].setValue(this.imagePreview)

    }
     if (this.formGroupProduct.valid) {
      Swal.fire({
        title: 'Are you sure?',
        text: "Update product information",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes,update it!'
      }).then((result) => {
        if (result.isConfirmed) {
         
          this.update(this.formGroupProduct.value).subscribe((result) => {
 

            if (result)
            {
              Swal.fire(
                'Success!',
                '',
                'success'
    
              )
                setTimeout(() => {
                  window.location.reload()
                }, 3000);
            }
              





          }, error => {
            console.log(error)
  
            
             
              Swal.fire(
                'Fail!',
                error.error.message,
                'error'
                
      
              )
            
          });

         
        
        }

      })

    }

    else {
      Swal.fire({
        icon: 'error',
        title: 'Empty field....',
        text: 'Please fill in this form ',

      })
      this.Checkfill()

    }





  }
  update(data): Observable<any> {



    let headers = new HttpHeaders();
    var currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    var token = currentUser.token; // your token
    headers = headers.set('Access-Control-Allow-Origin', '*').set('Authorization', `Bearer ${token}`);
     return this.http.put(this.api.apiproduct+`suaSP` , data, { headers: headers });
  }
  changenewimage() {
    console.log(this.imagePreview)
 
  
   
      this.newimage = true

    
    console.log(this.newimage)
  }
  searchCar() {
    if (this.formGroupSearch.valid) {
      let headers = new HttpHeaders();
      var currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
      var token = currentUser.token; // your token
 


      this.http.get(this.api.apiproduct+`timkiemsanphamtheoten/` + this.formGroupSearch.controls['search'].value, { headers: headers }).subscribe(res => {

        this.data = res

        this.array = this.data.data
        if (this.array.length == 0) this.novalue = true
        //else this.novalue=false
        this.isSearch = true


      });



    }
  }



  download() {





    this.http.get(this.api.apicar+`all`).subscribe(res => {
       this.data = res

      this.array = this.data.data
      var templateToExcel: any = [["Name Car", "Company Name", "colour", "Car life", "Origin",
        "body", "Number of seat", "year of manufacture", "longs", "Overall size", "fuel", "Top speed",
        "air bag", "seat", "engine type", "tire parametter", "frontbrake", "wattage", "gear", "status", "price", "Car information "]]
      for (let i = 0; i < this.array.length; i++) {

        templateToExcel.push([this.array[i].carName, this.array[i].companyName, this.array[i].colour, this.array[i].carLife, this.array[i].origin,
        this.array[i].body, this.array[i].numberOfSeats, this.array[i].yearOfManufacture, this.array[i].longs, this.array[i].overallSize, this.array[i].fuelConsumption, this.array[i].topSpeed,
        this.array[i].airBag, this.array[i].seat, this.array[i].engineType, this.array[i].tireParameters, this.array[i].frontBrake, this.array[i].wattage, this.array[i].gear, this.array[i].status, this.array[i].price, this.array[i].CarInformation])



      }
       this.exportTemplateAsExcel(templateToExcel)






    });
  }

  exportTemplateAsExcel(templateToExcel) {
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(templateToExcel);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, "All product" + ".xlsx");
  }
  cancleupdate() {
    window.location.reload()
  }
}
