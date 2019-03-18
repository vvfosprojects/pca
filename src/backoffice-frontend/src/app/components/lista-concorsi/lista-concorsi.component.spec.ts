import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaConcorsiComponent } from './lista-concorsi.component';

describe('ListaConcorsiComponent', () => {
  let component: ListaConcorsiComponent;
  let fixture: ComponentFixture<ListaConcorsiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaConcorsiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaConcorsiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
