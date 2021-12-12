import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MatDialog, MatDialogModule,} from '@angular/material/dialog'


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';



import { RouterModule } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { LayoutComponent } from './layout/layout.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactusComponent } from './contactus/contactus.component';
import { ProfileuserComponent } from './profileuser/profileuser.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { LayoutadminComponent } from './layoutadmin/layoutadmin.component';
import { AllstaffComponent } from './allstaff/allstaff.component';

import { ListproductComponent } from './listproduct/listproduct.component';
import { ProductdetailComponent } from './productdetail/productdetail.component';
import { ProductadminComponent } from './productadmin/productadmin.component';
import { ProducttypeadminComponent } from './producttypeadmin/producttypeadmin.component';
import { ListproducttypeComponent } from './listproducttype/listproducttype.component';
import { SearchproductComponent } from './searchproduct/searchproduct.component';

import { OrderadminComponent } from './orderadmin/orderadmin.component';
import { ScheduleuserComponent } from './scheduleuser/scheduleuser.component';
import { StatisticsComponent } from './statistics/statistics.component';
import {CartuserComponent } from './cartuser/cartuser.component';
import { NotfoundpageComponent } from './notfoundpage/notfoundpage.component';
import { AllcustommerComponent } from './allcustommer/allcustommer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreatebillComponent } from './createbill/createbill.component';
import { BillComponent } from './bill/bill.component';


@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    LayoutComponent,
    SignupComponent,
    HomeComponent,
    AboutusComponent,
    ContactusComponent,
    ProfileuserComponent,
    ResetpasswordComponent,
    LayoutadminComponent,
    AllstaffComponent,
    CreatebillComponent,

    ListproductComponent,
    ProductdetailComponent,
    ProductadminComponent,
    ProducttypeadminComponent,
    ListproducttypeComponent,
    SearchproductComponent,
   
    OrderadminComponent,
    ScheduleuserComponent,
    StatisticsComponent,
    CartuserComponent,
    NotfoundpageComponent,
    AllcustommerComponent,
    BillComponent,


  ],
  imports: [
    BrowserModule,
    
    AppRoutingModule,
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    
    
    ReactiveFormsModule,
    
    RouterModule.forRoot([
      { path: 'signin', component: SigninComponent },

      { path: 'signup', component: SignupComponent },
      { path: '', component: HomeComponent },
      { path: 'home', component: HomeComponent },
      { path: 'aboutus', component: AboutusComponent },
     
      { path: 'allstaff', component: AllstaffComponent },
      { path: 'allcustommer', component: AllcustommerComponent },
      { path: 'productadmin', component: ProductadminComponent },
      { path: 'producttypeadmin', component: ProducttypeadminComponent },
      { path: 'listproducttype', component: ListproducttypeComponent },
      { path: 'contactus', component: ContactusComponent },
      { path: 'profileuser', component: ProfileuserComponent },
      { path: 'layoutadmin', component: LayoutadminComponent },
      { path: 'resetpassword', component: ResetpasswordComponent },
      { path: 'searchproduct', component: SearchproductComponent },
      { path: 'cartuser', component: CartuserComponent },
      { path: 'listproduct', component: ListproductComponent },
      { path: 'productdetail', component: ProductdetailComponent },
      
      { path: 'orderadmin', component: OrderadminComponent },
      { path: 'scheduleuser', component: ScheduleuserComponent },
      { path: 'statistics', component: StatisticsComponent },
      { path: 'layout', component: LayoutComponent },
      {path:'notfoundpage', component:NotfoundpageComponent},
      {path:'bill', component:BillComponent},

    ]),
    
    BrowserAnimationsModule


  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
