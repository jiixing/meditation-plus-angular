import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionComponent } from './question.component';
import { UserService } from '../user/user.service';
import { FakeUserService } from '../user/testing/fake-user.service';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { QuestionService } from './question.service';
import { FakeQuestionService } from './testing/fake-question.service';
import { MockComponent } from '../../testing/mock-component';
import { MaterialModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';

describe('QuestionComponent', () => {
  let component: QuestionComponent;
  let fixture: ComponentFixture<QuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        NoopAnimationsModule
      ],
      declarations: [
        QuestionComponent,
        MockComponent({selector: 'emoji-select'}),
        MockComponent({selector: 'question-suggestions', inputs: ['currentSearch']}),
        MockComponent({selector: 'question-list-entry', inputs: ['question', 'isAdmin']}),

      ],
      providers: [
        {provide: QuestionService, useClass: FakeQuestionService},
        {provide: UserService, useClass: FakeUserService}
      ]

    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', (done) => {
    expect(component).toBeTruthy();
    // check ngInit can stabilize
    fixture.whenStable().then(() => {
      done();
    });
  });

});
