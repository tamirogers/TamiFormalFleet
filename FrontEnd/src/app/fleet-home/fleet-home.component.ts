import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FleetService } from 'src/app/fleet.service';
import { NgForm } from '@angular/forms';

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

  id: number;
  editMode = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fleetService: FleetService
  ) { 
    fleetService.getAssignmentList().subscribe((importAssignmentList: any) => this.assignmentList = importAssignmentList);
    fleetService.getVehicleList().subscribe((importVehicleList: any) => this.vehicleList = importVehicleList);
  }

  ngOnInit() {

    this.route.params
    .subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
      }
    );
  }

  toggleList() {
    this.openList = !this.openList;
    if (this.openList)
      this.enterListToggle = "Close List";
    else
      this.enterListToggle = "View All Active Assignments";
  }

}
