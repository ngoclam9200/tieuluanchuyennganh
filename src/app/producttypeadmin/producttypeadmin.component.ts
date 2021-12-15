import { Component, OnInit} from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { } from '@angular/common'

import { Router } from '@angular/router'
import { FormControl, FormsModule, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Observable, } from 'rxjs';
import Swal from 'sweetalert2';
import { ApiService } from 'src/services/api.service';
import { MatDialog,MatDialogConfig } from '@angular/material/dialog';
import { ImagecomponentComponent } from '../imagecomponent/imagecomponent.component';
@Component({
  selector: 'app-producttypeadmin',
  templateUrl: './producttypeadmin.component.html',
  styleUrls: ['./producttypeadmin.component.css']
})

export class ProducttypeadminComponent implements OnInit {
  data: any
  array: any = []
  selectedFile: File;
  imagePreview: any = null;
  linkimage: String
  formGroup: FormGroup;
  onFileSelected(event) {
    this.selectedFile = event.target.files[0]

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
     };
    reader.readAsDataURL(this.selectedFile);
  }
  constructor(private http: HttpClient, private router: Router, private api:ApiService, private dialog:MatDialog) { }

  ngOnInit(): void {
    this.api.checkRole()
    this.api.checkstaff()
      this.getproducttype()
      this.initForm()
    
    
  }
  cancle() {
    window.location.reload()
  }

  initForm() {

    this.formGroup = new FormGroup({
      tenLoaiSP: new FormControl("", [Validators.required]),
      hinhAnh: new FormControl("", [Validators.required]),

    });

  }
  getproducttype() {
    let headers = new HttpHeaders();
    var currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    var token = currentUser.token; // your token
   



    this.http.get(this.api.apiproducttype+`laydanhsachLoaiSP`, { headers: headers }).subscribe(res => {
     
      this.data = res

      this.array = this.data.data
 




    });



  }


  create(data): Observable<any> {
    let headers = new HttpHeaders();
    var currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    var token = currentUser.token; // your token
     headers = headers.set('Access-Control-Allow-Origin', '*').set('Authorization', `Bearer ${token}`);
    return this.http.post(this.api.apiproducttype+`themloaiSp`, data, { headers: headers });
  }
  createProducttype() {




const tenLoaiSP=this.formGroup.controls['tenLoaiSP'].value
    console.log(tenLoaiSP)
    if (this.imagePreview != null) {
      this.formGroup.setValue({
        hinhAnh: this.imagePreview,
        tenLoaiSP: tenLoaiSP
        
      });
    }
    console.log(this.formGroup.value)
     if (this.formGroup.valid) {
      Swal.fire({
        title: 'Are you sure?',
        text: " Create new product type",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes,create it!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.create(this.formGroup.value).subscribe((result) => {

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
    }

  }
  deleteproducttype(id) {



    let headers = new HttpHeaders();
    var currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    var token = currentUser.token; // your token
    headers = headers.set('Access-Control-Allow-Origin', '*').set('Authorization', `Bearer ${token}`);
 
    Swal.fire({
      title: 'Are you sure?',
      text: "Delete this product type",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes,delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.delete(this.api.apiproducttype+`deleteLoaiSP/` + id, { headers: headers }).subscribe(res => {
 
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
  openimage(image)
  {
    
    localStorage.setItem('image',image)
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width='600px';
    // dialogConfig.height='800px';
    dialogConfig.maxHeight='1000px'
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    
      

    this.dialog.open(ImagecomponentComponent, dialogConfig);

  
      
   
   


  
  }

}
