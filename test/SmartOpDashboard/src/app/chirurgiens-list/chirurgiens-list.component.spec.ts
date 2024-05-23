import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChirurgiensListComponent } from './chirurgiens-list.component';

describe('ChirurgiensListComponent', () => {
  let component: ChirurgiensListComponent;
  let fixture: ComponentFixture<ChirurgiensListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChirurgiensListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChirurgiensListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
