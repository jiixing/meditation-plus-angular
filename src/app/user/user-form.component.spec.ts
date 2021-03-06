import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UserFormComponent } from './user-form.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { Component, OnInit, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';


@Component({
  template: `
    <user-form [model]="model"></user-form>`
})

class TestHostComponent implements OnInit {
  model: any;

  public ngOnInit() {
    this.model = {
      description: 'model-description',
      local: {
        email: 'email@example.com'
      },
      notifications: {
        meditation: true,
        message: true,
        question: true,
        livestream: true,
        testimonial: true
      }
    };
  };
}

describe('UserFormComponent', () => {
  let testHost: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        UserFormComponent,
        TestHostComponent,
      ],
      imports: [
        MaterialModule,
        NoopAnimationsModule,
        FormsModule,
      ],

    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    testHost = fixture.componentInstance;
    fixture.detectChanges();
    el = fixture.debugElement.query(By.css('user-form'));
  });

  it('should be created', () => {
    expect(el).toBeTruthy();
  });
});
