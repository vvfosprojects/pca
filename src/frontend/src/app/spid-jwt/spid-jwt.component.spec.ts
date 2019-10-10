import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpidJwtComponent } from './spid-jwt.component';

describe('SpidJwtComponent', () => {
  let component: SpidJwtComponent;
  let fixture: ComponentFixture<SpidJwtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpidJwtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpidJwtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
