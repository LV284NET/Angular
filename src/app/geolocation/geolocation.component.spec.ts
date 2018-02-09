import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeolocatuionComponent } from './geolocatuion.component';

describe('GeolocatuionComponent', () => {
  let component: GeolocatuionComponent;
  let fixture: ComponentFixture<GeolocatuionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeolocatuionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeolocatuionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
