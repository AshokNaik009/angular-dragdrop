import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';


import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
// import {CdkDrag} from '@angular/cdk/drag-drop';
import {DragDropModule } from   '@angular/cdk/drag-drop';

import { ApiService } from "../service/apiservice";


@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    DragDropModule
    
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent
  
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
