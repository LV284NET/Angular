import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlablacarComponent } from './blablacar.component';

describe('BlablacarComponent', () => {
  let component: BlablacarComponent;
  let fixture: ComponentFixture<BlablacarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlablacarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlablacarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
