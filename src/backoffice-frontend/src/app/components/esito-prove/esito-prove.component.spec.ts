import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EsitoProveComponent } from './esito-prove.component';

describe('EsitoProveComponent', () => {
  let component: EsitoProveComponent;
  let fixture: ComponentFixture<EsitoProveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EsitoProveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EsitoProveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
