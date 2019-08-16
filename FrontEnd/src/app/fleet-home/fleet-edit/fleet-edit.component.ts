import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FleetService } from 'src/app/fleet.service';
import { NgForm } from '@angular/forms';




@Component({
  selector: 'app-fleet-edit',
  templateUrl: './fleet-edit.component.html',
  styleUrls: ['./fleet-edit.component.css']
})
export class FleetEditComponent implements OnInit {

  @ViewChild('editAssignmentForm') slForm: NgForm;

  public editOneAssignment: Array<any>;
  public cameraList: Array<any>;
  public vehicleList: Array<any>;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fleetService: FleetService
  ) { 

    fleetService.getCameraList().subscribe((importCameraList: any) => this.cameraList = importCameraList);
    fleetService.getVehicleList().subscribe((importVehicleList: any) => this.vehicleList = importVehicleList);

  }

  ngOnInit() {

    const id = +this.route.snapshot.paramMap.get('id');

    this.fleetService.getOneAssignment(id).subscribe((importOne: any) => this.editOneAssignment = [importOne]);
  }



  DateCreated = new Date();
  Deleted = 0;


  onSubmit(form: NgForm) {

    const value = form.value;
    const assigmentUpdate = form.value;

    var updateAssignmentObject = {
      Id: assigmentUpdate.Id,
      CameraId: assigmentUpdate.CameraId,
      VehicleId: assigmentUpdate.VehicleId,
      DateCreated: assigmentUpdate.DateCreated,
      Deleted: assigmentUpdate.Deleted
    }

    this.fleetService.updateAssignment(updateAssignmentObject).subscribe
    (data => { });

  
    console.log('updated ' + updateAssignmentObject);
    

  /*   swal({
      title: 'Success',
      text: 'Student Checked In',
      timer: 3000
    }).then(function () { }); */

    this.router.navigate(['/fleet-home']);

  }


}
