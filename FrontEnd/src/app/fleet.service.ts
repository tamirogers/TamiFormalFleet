import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class FleetService {
  private headers: HttpHeaders;
  private accessPointUrl: string = 'https://localhost:5001/api/cameraassignments';
  private accessPointUrlCamera: string = 'https://localhost:5001/api/camera';
  private accessPointUrlVehicle: string = 'https://localhost:5001/api/vehicle';




  constructor(
    private http: HttpClient, private httpClient: HttpClient
  ) 
  {
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
  }

// GET Calls for Camera & Vehicle
  public getCameraList() {
    return this.http.get(this.accessPointUrlCamera, { headers: this.headers });
  }

  public getVehicleList() {
    return this.http.get(this.accessPointUrlVehicle, { headers: this.headers });
  }


// Calls for Assignments

public getAssignmentList() {
  return this.http.get(this.accessPointUrl, { headers: this.headers });
}

// Passes row id. Gets one record from selected to edit
public getOneAssignment(rowid: number) {
  return this.http.get(`${this.accessPointUrl}/GetOneForEdit/${rowid}`, { headers: this.headers });
}

public FromSearch(payload) {
  return this.http.post(this.accessPointUrl + '/SearchForm', payload, { headers: this.headers });
}

public addAssignment(payload) {
  return this.http.post(this.accessPointUrl, payload, { headers: this.headers });
}

public updateAssignment(payload) {
  return this.http.put(this.accessPointUrl + '/' + payload.Id, payload, { headers: this.headers });
}

public deletAssignment(id: number) {
  return this.http.delete(`${this.accessPointUrl}/${id}`, { headers: this.headers });
}



}
