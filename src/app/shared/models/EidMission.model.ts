export class EidMission {
    DateH: string;
    Date:string;
    TypeId: number;
    empList: EmpList[]
}

type EmpList = {
    UserId: string,
    UserName: string,
    EidMissionIntervalId: string,
    IntervalName: string,
    EmpWork: string,
    Compensation: string
}