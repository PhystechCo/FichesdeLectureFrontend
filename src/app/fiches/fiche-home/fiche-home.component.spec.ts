import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FicheHomeComponent } from './fiche-home.component';

describe('FicheHomeComponent', () => {
  let component: FicheHomeComponent;
  let fixture: ComponentFixture<FicheHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FicheHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FicheHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
