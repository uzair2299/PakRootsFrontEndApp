import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyChatComponent } from './my-chat.component';

describe('MyChatComponent', () => {
  let component: MyChatComponent;
  let fixture: ComponentFixture<MyChatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyChatComponent]
    });
    fixture = TestBed.createComponent(MyChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
