import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailRoleComponent } from './detail-role.component';

describe('DetailRoleComponent', () => {
  let component: DetailRoleComponent;
  let fixture: ComponentFixture<DetailRoleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailRoleComponent]
    });
    fixture = TestBed.createComponent(DetailRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
