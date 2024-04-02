import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { UserDetailsComponent } from './user-details/user-details.component';

import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { PaginationService } from '../Services/pagination.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SpinnerComponent } from '../Layout/spinner/spinner.component';
import { LayoutModule } from '../Layout/layout.module';



@NgModule({
  declarations: [
    HomeComponent,
    UserDetailsComponent,
    // SpinnerComponent
  ],
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    LayoutModule
  ],
  providers: [{ provide: MatPaginatorIntl, useClass: PaginationService }],
})
export class UsersModule { }
