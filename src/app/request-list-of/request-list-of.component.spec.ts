import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestListOfComponent } from './request-list-of.component';

describe('RequestListOfComponent', () => {
  let component: RequestListOfComponent;
  let fixture: ComponentFixture<RequestListOfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestListOfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestListOfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
