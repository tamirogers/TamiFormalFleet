import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FleetService } from 'src/app/fleet.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-fleet-search',
  templateUrl: './fleet-search.component.html',
  styleUrls: ['./fleet-search.component.css']
})
export class FleetSearchComponent implements OnInit {

  @ViewChild('searchForm', {static: false}) slForm: NgForm;
  public vehicleList: Array<any>;
  public cameraList: Array<any>;
  public recordsFromSearch: Array<any>;
  searchVehicleId;
  searchCameraId;
  

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fleetService: FleetService
  ) {
    fleetService.getVehicleList().subscribe((importVehicleList: any) => this.vehicleList = importVehicleList);
    fleetService.getCameraList().subscribe((importCameraList: any) => this.cameraList = importCameraList);
  }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {

    const value = form.value;
    const searchAdd = form.value;

    var searchObject = {
      searchVehicleId: searchAdd.searchVehicleId,
      searchCameraId: searchAdd.searchCameraId
    }

    this.fleetService.FromSearch(searchObject).subscribe((importOne: any) => this.recordsFromSearch = importOne);


  }


}
