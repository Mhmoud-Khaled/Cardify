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
})
export class HomeComponent implements OnInit {

  users!: IUsersData[]
  page: number = 1  // set defulat start page number
  pageSize!: number
  totalItems!: number

  // control DOM  Loaded after response  recieved where after response
  // comes the data will be loaded to UI and it will true
  isLoaded: boolean = false

  pagination!: string

  constructor(
    private _HttpService: HttpService,
    private _Router: Router,
    private _DataService: DataService,
    private _ToastrService: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.spinner.show()  // start show spinner once the page loads untill  the request gets completed
    this.GetAllUsers()
    this._DataService.getData().subscribe((res: any) => {
      if (res != null && res != '') {  // check if search  bar has some value or not to get user according to value
        this.GetUserById(res)
      } else {
        this.GetAllUsers()  // if the value is null return all users
      }
    })

  }

  GetAllUsers() {
    this.spinner.show();
    let httpEndPoint = HttpEndPoints.user.getAllUsers
    httpEndPoint = httpEndPoint.replace('{page}', String(this.page))

    this._HttpService.Get<IUser>(httpEndPoint).subscribe((response: IUser) => {
      // assigning response data to varaiable
      this.users = response.data;
      this.pageSize = response.per_page
      this.totalItems = response.total
      this.isLoaded = true  // the response is completed  so set the flag as true to show data in DOM
      this._DataService.isDataChange.next(false);  // set  the service variable to false to know there is no value in search bar
      this.spinner.hide();  // stop spinner to show data
    })
  }

  //  get user by id by listening to search bar value
  GetUserById(id: number) {
    this.spinner.show();
    let httpEndPoint = HttpEndPoints.user.getUserById
    httpEndPoint = httpEndPoint.replace('{id}', String(id))
    this._HttpService.GetDataById(id, httpEndPoint).subscribe((res) => {
      this.users = [res.data];
      this.pageSize = 1  //  when we are getting single record make pagesize as 1
      this.totalItems = 1 //  when we are getting single record make pagesize as 1
      this.spinner.hide();
    }, (err: HttpErrorResponse) => {
      this._ToastrService.error('No Data Found')  // show notification  message if no data fetched
      this.users = []  //  assign empty array to clear the data from UI
      this.spinner.hide();
    })
  }

  onPageChange(event: any) {
    this.page = event.pageIndex + 1 // page index starts from zero but our API uses page starts from one that's why +1
    this.GetAllUsers()
  }

  GetCardDetails(id: number) {
    this._Router.navigate([RoutePaths.home.UserDetails.replace(':id', String(id))]) //  navigate to User Details page with parameter Id
  }

}
