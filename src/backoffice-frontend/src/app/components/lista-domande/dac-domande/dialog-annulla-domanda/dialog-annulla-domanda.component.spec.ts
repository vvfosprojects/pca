import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAnnullaDomandaComponent } from './dialog-annulla-domanda.component';

describe('DialogAnnullaDomandaComponent', () => {
  let component: DialogAnnullaDomandaComponent;
  let fixture: ComponentFixture<DialogAnnullaDomandaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAnnullaDomandaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAnnullaDomandaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
