export class OverTime {
    constructor() {
        this.Date = "";
        this.DateH = "";
        this.ToDate="";
        this.ToDateH="";
        this.FromDate="";
        this.FromDateH="";
        this.Location="";
        this.Description="";
        this.WorkDaysNotes="";
        this.Notes="";
        this.OutOfDutyGroupNo = 0;
        this.EnclosureCount = 0;
        this.PeriodHours = 0;
        this.PeriodMinits = 0;
        this.HoursRatio = 0;
        this.Totalsvalue = 0;
        this.VacPeriod = 0;
        this.VacHours = 0;
        this.VacMinits = 0;
    }
    OutOfDutyGroupNo: number;
    DateH: string;
    Date: string;
    FromDateH: string;
    FromDate: string;
    ToDateH: string;
    ToDate: string;
    Location: string;
    Description: string;
    WorkDaysNotes: string;
    Notes: string;
    EnclosureCount: number;
    Period: number;
    PeriodHours: number;
    PeriodMinits: number;
    HoursRatio: number;
    UsersValue:UsersValue[];
    Totalsvalue: number;
    VacPeriod: number;
    VacHours: number;
    VacMinits: number
}
type UsersValue ={UserId : number , Total : number};