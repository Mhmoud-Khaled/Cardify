import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { IUser, IUserDetails, IUsersData } from '../../Models/i-users';
import { HttpService } from '../../Services/http.service';
import { HttpEndPoints } from '../../Settings/HttpEndPoints';
import { RoutePaths } from '../../Settings/RoutePaths';
import { DataService } from '../../Services/data.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {

  users!: IUsersData[]
  page: number = 1
  pageSize!: number
  totalItems!: number
  isLoaded: boolean = false
  pagination!: string

  isDataFound: boolean = true


  constructor(
    private _HttpService: HttpService,
    private _Router: Router,
    private _DataService: DataService,
    private _ToastrService: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.spinner.show()
    this.GetAllUsers()
    this._DataService.getData().subscribe((res: any) => {
      if (res != null && res != '') {
        this.GetUserById(res)
      } else {
        this.GetAllUsers()
      }
    })

  }

  GetAllUsers() {
    this.spinner.show();
    let httpEndPoint = HttpEndPoints.user.getAllUsers
    httpEndPoint = httpEndPoint.replace('{page}', String(this.page))

    this._HttpService.Get<IUser>(httpEndPoint).subscribe((response: IUser) => {
      this.users = response.data;
      this.pageSize = response.per_page
      this.totalItems = response.total
      this.isLoaded = true
      this._DataService.isDataChange.next(false);
      this.spinner.hide();
    })
  }

  GetUserById(id: number) {
    this.spinner.show();
    let httpEndPoint = HttpEndPoints.user.getUserById
    httpEndPoint = httpEndPoint.replace('{id}', String(id))
    const cachedData = this._HttpService.GetDataById(id, httpEndPoint).subscribe((res) => {
      this.users = [res.data];
      this.pageSize = 1
      this.totalItems = 1
      this.spinner.hide();
    }, (err: HttpErrorResponse) => {
      this._ToastrService.error('No Data Found')
      this.users = []
      this.spinner.hide();
    })
  }

  onPageChange(event: any) {
    this.page = event.pageIndex + 1
    this.GetAllUsers()
  }

  GetCardDetails(id: number) {
    this._Router.navigate([RoutePaths.home.UserDetails.replace(':id', String(id))])
  }

}
