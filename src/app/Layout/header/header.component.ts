import { Component, OnInit } from '@angular/core';
import { DataService } from '../../Services/data.service';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  searchForm!: FormGroup;

  constructor(
    private _DataService: DataService,
    private _FormBuilder: FormBuilder,
  ) {
    this.searchForm = this._FormBuilder.group({
      search: ['', [Validators.pattern('^[0-9]*$')]]  //  Allow only numbers in the input field
    });

  }

  //  Function to get the value of form control
  get search(): AbstractControl | null {
    return this.searchForm.get("search");
  }

  ngOnInit(): void {

    // observable  for listening any changes on "search" form control
    this.search?.valueChanges.subscribe((val) => {
      if (this.search?.valid && (val != null || val != "")) {
        this.sendData(val);
        this._DataService.isDataChange.next(true);
      }
    })
  }
  sendData(data: number): void {
    this._DataService.setData(data);  // transition data from header component to other components using service
  }

}
