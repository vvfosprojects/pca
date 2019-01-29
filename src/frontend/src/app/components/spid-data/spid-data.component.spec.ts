import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpidDataComponent } from './spid-data.component';

describe('SpidDataComponent', () => {
  let component: SpidDataComponent;
  let fixture: ComponentFixture<SpidDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpidDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpidDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
