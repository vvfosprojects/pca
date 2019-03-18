import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DacDomandeComponent } from './dac-domande.component';

describe('DacDomandeComponent', () => {
  let component: DacDomandeComponent;
  let fixture: ComponentFixture<DacDomandeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DacDomandeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DacDomandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
