interface IDirective {
  DirectiveDateH: string;
  FromUserName: string;
  ToUserName: string;
  ToDepartmentName: string;
  FromDepartmentName: string;
  TrainingTrxStatusName: string;
}

export class VacationDetail {
  RequestID: number;
  DirectiveID: number;
  // UserFullName
  AuthorName: string;
  FromDateH: string;
  ToDateH: string;
  Period: string;
  AlternativeUserName: string;
  TypeName: string;
  RequestStatusName: string;
  DepartmentName: string;
  ToUserName: string;
}

export class PermissionDetail {
  RequestID: number;
  AuthorName: string;
  FromDateH: string;
  ToDateH: string;
  ToTime: string;
  FromTime: string;
  Period: string;
  Reason: string;
  TypeName: string;
  RequestStatusName: string;
  DepartmentName: string;
  Days: number;
  ToUserName: string;
}

export class LegationDetail {
  RequestID: number;
  DirectiveDateH: string;
  FromDateH: string;
  RequestStatusName: string;
  Mission: string;
  LegationType: string;
  OutsideName: string;
  WalkLine: string;
  ToDateH: string;
  LegationTrainingStatusName: string;
  Period: number;
  ToUserName: string;
}

export class OutOfDutyDetail {
  /**
   *
   */
  constructor() {
    this.UsersNames = [];
  }
  RequestType: string;
  RequestID: number;
  DirectiveDateH: string;
  FromDateH: string;
  UsersNames: string[];
  HoursRatio: number;
  Period: number;
  ToDateH: string;
  Description: string;
  ToUserName: string;
}
export class trainingCourseDetail {
  RequestID: number;
  DirectiveDateH: string;
  FromDateH: string;
  TransportAllow: number;
  LegationType: string;
  ProgramName: string;
  ReferTo: string;
  CityId: string;
  Tickets: number;
  ToDateH: string;
  TrainingTrxStatusName: string;
  SumTrainingDays: number;
  SumDays: number;
  Total: number;
  ToUserName: string;
}
export class RequestsDetails {
  RequestID: number;
  DirectiveDateH: string;
  FromDateH: string;
  TransportAllow: number;
  LegationType: string;
  Program: string;
  ReferTo: string;
  CityId: string;
  Tickets: number;
  ToDateH: string;
  RequestStatusName: string;
  SumTrainingDays: number;
  SumDays: number;
  Total: number;
  ToUserName: string;
}

export class FeastDetails {
  /**
   *
   */
  constructor() {
    this.RequestUsers = [];
  }
  RequestID: number;
  DirectiveDateH: string;
  FromDateH: string;
  ToDateH: string;
  CityId: string;
  LegationType: string;
  TransportAllow: number;
  ProgramName: string;
  RequestUsers: any[];
}

export class DecideDetails {
  TypeName: string;
  RequestID: number;
  VacPeriod: number;
  AuthorName: string;
  Statements: string;
  RequestStatusName: string;
  AttachmentPath: string;
  VacationTypeName: string;
  PayrollRequestID: number;
  PayrollRequestDateH: string;
}
