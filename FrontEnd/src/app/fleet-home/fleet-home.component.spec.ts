import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FleetHomeComponent } from './fleet-home.component';

describe('FleetHomeComponent', () => {
  let component: FleetHomeComponent;
  let fixture: ComponentFixture<FleetHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FleetHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FleetHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
