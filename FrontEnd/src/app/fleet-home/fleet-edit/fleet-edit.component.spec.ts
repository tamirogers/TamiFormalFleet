import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FleetEditComponent } from './fleet-edit.component';

describe('FleetEditComponent', () => {
  let component: FleetEditComponent;
  let fixture: ComponentFixture<FleetEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FleetEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FleetEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
