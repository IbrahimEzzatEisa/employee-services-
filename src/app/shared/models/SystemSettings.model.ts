export class SystemSettings {

  id: number;
  SettingID: number;
  SystemName: string;
  Logo: null;
  Email: null;
  Address: null;
  TrxDefaultUserDirectiveId: number;
  IsNormalSerial: false;
  HostingServer: string;
  DataBase: string;
  UserId: string;
  Password: string;
  PublicFolderPath: null;
  TrxSecertUserDirectiveId: number;
  AgentTrxDefaultUserDirectiveId: number;
  ActivePerVacation: number;
  SendsmsForOut: boolean;
  LitterView: boolean;
  TrxonlineUserid: null;
  MulitDraj: null;
  SendsmsForBoss: boolean;
  EmpSave: boolean;
  LimitedDirection: null;
  DeptIDForEidMissionFinish: null; 
  UserID: string;
  DepartmentID:number;
  ActiveOutOfDutyUser: boolean;
//---------Dealing Settings----------//
  
 TrxToDirectUser: number;
 SMSDirect: string;
 TrxCopyToDirectUser: number;
 StatementsEmpID: number;
 UndoTrxDepartmentId: number;
 TrxInboxBeforeVacation: boolean;
 ActiveUniCode: boolean;
 ActiveSmscitizen: boolean;
 DeleteExpand: boolean;
 ActivStatmentWriting: boolean;
 TransactionOutAdd: boolean;
 Generalization: boolean;
 trxdirectivepull: boolean;
 IsUndoTrxDepartment: boolean;
 ExportTrxFromExp_Imp: boolean;
 IsStartPage: boolean;
 SaveTrxFromExp_Imp: boolean;
 GeneralizationFromManagers: boolean;

//-------------Vacation settings------------//

VacationToUserID: number; 
VacationSearchUser: string;
DeptIDForVacationFinish: number;
VactionGraceperiod: number;
DayesLateVaction: number;
AgentUser: number;
RedirectFromVacLastUser: boolean;
IsAlternativeinVacFromManager: boolean;
IsAlternativeEmp: boolean; 
ActivateAlternativeVacation: boolean;
AddMandortyAgentForVacation: boolean;
VacationSMSSend: boolean;
SendsmsLateVacation: boolean;
IsVacationNeedAttach: boolean; 
SaveinPayrollDecisionNormalVacation: boolean;
PreventOldVac: boolean;
VacationForLegated: boolean;
AgreeLateVacation: boolean;
RefuseLateVacation: boolean;

//------------Permission sandas signment settings---------//

DeptIDForDepartureFinish: number; 
DeptIDForLegationFinish: number;
DepartureDaysCount: number;
DepartureHoursCount: number;
oneDepartureHours: number;
BackDaysDepartureL: number;
UserForAddDepartures: number;
IsAbsenceDeductAttacmentReq: boolean;
CheckActiveDepartureMonthly: boolean;
PreventOldDeparture: boolean;
ActiveDeparturesUser:boolean;
AbsenceDeductAddEdit:boolean;
UserForAddOutOfDuty : number;
//--------------Other settings-----------//

CompanyName: string;
MSDefaultUserDirectiveId: number;
MSDefaultDeptID: number; 
UserSMS: number;
vsDays: number;
changepassword: boolean;
ActiveEditor: boolean;
UseNewFont: boolean;

}


