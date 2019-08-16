import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FleetService } from 'src/app/fleet.service';
import { NgForm, FormGroup } from '@angular/forms';
import swal from 'sweetalert2';

@Component({
  selector: 'app-fleet-new',
  templateUrl: './fleet-new.component.html',
  styleUrls: ['./fleet-new.component.css']
})
export class FleetNewComponent implements OnInit {

  @ViewChild('newAssignmentForm') slForm: NgForm;

  public vehicleList: Array<any>;
  public cameraList: Array<any>;

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

  DateCreated = new Date();

  Deleted = 0;

  onSubmit(form: NgForm) {

    const value = form.value;
    const assigmentAdd = form.value;

    var newAssignmentObject = {
      Id: assigmentAdd.Id,
      CameraId: assigmentAdd.CameraId,
      VehicleId: assigmentAdd.VehicleId,
      DateCreated: assigmentAdd.DateCreated,
      Deleted: assigmentAdd.Deleted
    }

    this.fleetService.addAssignment(newAssignmentObject).subscribe
      (data => { });

    swal.fire({
      title: 'Success',
      text: 'You added a new assignment',
      timer: 3000
    }).then(function () { });

    this.router.navigate(['/fleet-home']);

  }



}
