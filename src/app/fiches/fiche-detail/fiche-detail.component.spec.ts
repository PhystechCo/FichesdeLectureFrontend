import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FicheDetailComponent } from './fiche-detail.component';

describe('FicheDetailComponent', () => {
  let component: FicheDetailComponent;
  let fixture: ComponentFixture<FicheDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FicheDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FicheDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
