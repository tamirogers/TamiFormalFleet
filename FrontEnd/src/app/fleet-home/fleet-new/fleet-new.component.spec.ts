import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FleetNewComponent } from './fleet-new.component';

describe('FleetNewComponent', () => {
  let component: FleetNewComponent;
  let fixture: ComponentFixture<FleetNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FleetNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FleetNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
