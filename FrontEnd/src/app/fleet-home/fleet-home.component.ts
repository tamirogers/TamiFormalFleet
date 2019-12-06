import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FleetService } from 'src/app/fleet.service';
import { NgForm } from '@angular/forms';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-fleet-home',
  templateUrl: './fleet-home.component.html',
  styleUrls: ['./fleet-home.component.css']
})
export class FleetHomeComponent implements OnInit {

  public assignmentList: Array<any>;
  public vehicleList: Array<any>;
  public openList: boolean = false;

  public enterListToggle: any = 'View All Active Assignments';


/* export class Happy {
  public name: string;
  public zipCode: number;
  public amIhappy: boolean;
  public happyPeople?: Happy[];
}

constructor(public name: string, public zip: number, public amIhappy: boolean) {
  this.name = name;
  this.zipCode = zip;
  this.amIhappy = amIhappy; 
}
*/

  id: number;
  editMode = false;

  constructor( 
    private store: Store<any>,
    public route: ActivatedRoute,
    public router: Router,
    private fleetService: FleetService
  ) { 
    // fleetService.getVehicleList().subscribe((importVehicleList: any) => this.vehicleList = importVehicleList);
    // fleetService.getAssignmentList().subscribe((importAssignmentList: any) => this.assignmentList = importAssignmentList);

  }

  ngOnInit() {

    this.fleetService.getVehicleList().subscribe((importVehicleList: any) => this.vehicleList = importVehicleList);
    this.fleetService.getAssignmentList().subscribe((importAssignmentList: any) => this.assignmentList = importAssignmentList);

    this.route.paramMap.subscribe(map => {
      // run code to process

  });


    this.route.params
    .subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
      }
    );

  }



  checkOutLocationReload() {
    location.reload();
  }




// for store, the action with a type and payload
  checkChanged(value: boolean): void {
    this.store.dispatch({
      type: 'TOGGLE_PRODUCT_CODE',
      payload: value
    });
  }







  toggleList() {
    this.openList = !this.openList;
    if (this.openList)
      this.enterListToggle = "Close List";
    else
     this.enterListToggle = "View All Active Assignments"; 
  }

 


}
