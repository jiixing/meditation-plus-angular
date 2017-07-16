import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppointmentComponent } from './appointment.component';
import { AppState } from '../app.service';
import { MaterialModule } from '../shared/material.module';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from '../user/user.service';
import { FakeUserService } from '../user/testing/fake-user.service';
import { AppointmentService } from './appointment.service';
import { FakeAppointmentService } from './testing/fake-appointment.service';
import { AvatarDirective } from '../profile/avatar.directive';
import { By } from '@angular/platform-browser';
import * as moment from 'moment-timezone';
import { TestHelper } from '../../testing/test.helper';

fdescribe('AppointmentComponent', () => {
  let component: AppointmentComponent;
  let fixture: ComponentFixture<AppointmentComponent>;
  let mockAppointmentService: FakeAppointmentService;
  let mockUserService: FakeUserService;

  function mockCurrentUser(user_id) {
    spyOn(mockUserService, 'getUserId').and.returnValue(user_id);
  }

  function createMockAppointment(user_id = null, time_offset = 100) {
    const currentDay = moment.tz('America/Toronto').weekday();
    const currentHour = parseInt(moment.tz('America/Toronto').format('HHmm'), 10);
    return {
      '_id': '111',
      'updatedAt': '2017-07-16T00:34:40.945Z',
      'createdAt': '2017-06-05T03:06:21.684Z',
      'weekDay': currentDay,
      'hour': currentHour + time_offset, // add one hour
      'user': {
        '_id': user_id,
        'name': 'kelly',
        'username': 'kelly'
      }
    };
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        RouterTestingModule,
      ],
      declarations: [
        AppointmentComponent,
        AvatarDirective
      ],
      providers: [
        AppState,
        {provide: UserService, useClass: FakeUserService},
        {provide: AppointmentService, useClass: FakeAppointmentService}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentComponent);
    component = fixture.componentInstance;

    component.getLocalTimezone = () => {
      return 'America/Toronto';
    };
    // stub installIntervalTimer so component can stabilize for testing
    // spyOn(component, 'installIntervalTimer').and.returnValue(null);
    component.installIntervalTimer = () => { };

    mockAppointmentService = fixture.debugElement.injector.get<any>(AppointmentService);
    mockUserService = fixture.debugElement.injector.get<any>(UserService);
    fixture.detectChanges();  // call ngInit

  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should not display countdown initially', () => {
    expect(
      fixture.debugElement.query(By.css('.countdown'))
    ).toBeNull();
  });


  // test admin looking at other user appointment

  // test other user looking at other appointment

  /*
   it('should not display countdown for past appointment', (done) => {
   // const currentDay = moment.tz('America/Toronto').weekday();
   // const currentHour = parseInt(moment.tz('America/Toronto').format('HHmm'), 10);

   const user_id = 3;
   mockCurrentUser(user_id);
   expect(component.getUserId()).toBe(user_id);

   const mockAppointment = createMockAppointment(user_id);
   const appointmentObservable = TestHelper.fakeResponse({appointments: [mockAppointment]});
   spyOn(mockAppointmentService, 'getAll').and.returnValue(appointmentObservable);

   // call ngOninit and wait until all promise resolve
   TestHelper.advance(fixture).then(() => {
   expect(
   fixture.debugElement.query(By.css('.countdown'))
   ).toBeNull();
   done();
   });
   });
   */


  it('should display countdown', (done) => {
    // const currentDay = moment.tz('America/Toronto').weekday();
    // const currentHour = parseInt(moment.tz('America/Toronto').format('HHmm'), 10);

    const user_id = 3;
    mockCurrentUser(user_id);
    expect(component.getUserId()).toBe(user_id);

    const mockAppointment = createMockAppointment(user_id);
    const appointmentObservable = TestHelper.fakeResponse({appointments: [mockAppointment]});
    spyOn(mockAppointmentService, 'getAll').and.returnValue(appointmentObservable);
    component.loadAppointments();

    // wait until all promise resolve
    TestHelper.advance(fixture).then(() => {
      expect(
        fixture.debugElement.query(By.css('.countdown'))
      ).toBeTruthy();
      done();
    });

    // inject test appointment, in getAll()

    // inject test user, hook getUserId

    // expect (current user)
    // extracgt this test

    // expect nextappointment[]?
    // extract this test


  });



});

