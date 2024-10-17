import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCategorysComponent } from './admin-categorys.component';

describe('AdminCategorysComponent', () => {
  let component: AdminCategorysComponent;
  let fixture: ComponentFixture<AdminCategorysComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminCategorysComponent]
    });
    fixture = TestBed.createComponent(AdminCategorysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
