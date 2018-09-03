import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpidComponent } from './spid.component';

describe('SpidComponent', () => {
  let component: SpidComponent;
  let fixture: ComponentFixture<SpidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
