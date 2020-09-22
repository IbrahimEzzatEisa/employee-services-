export class LegationSearch {
    constructor() {
        this.LegationID = 0;
    }
    LegationID: number;
    IsSearchByNumber: boolean = null;
    FromDate: string = '';
    ToDate: string = '';
    dllDepartmentId: number = 0;
    FromNumber: number = null;
    ToNumber: number = null;
}
export class VacationSearch {
    constructor() {
        this.VacationId = 0;
    }
    VacationId: number;
    IsSearchByNumber: number = null;
    FromDate: string='';
    ToDate: string = '';
    dllDepartmentId: number = 0;
    FromNumber: number = null;
    ToNumber: number = null;
}
export class PermissionSearch {
    constructor() {
        this.DepartureId = 0;
    }
    DepartureId: number;
    IsSearchByNumber: number = null;
    FromDate: string='';
    ToDate: string = '';
    dllDepartmentId: number = 0;
    FromNumber: number = null;
    ToNumber: number = null;
}
export class OutOfDutySearch {
    constructor() {
        this.OverTimeId = 0;
    }
    OverTimeId: number;
    IsSearchByNumber: number = null;
    FromDate: string='';
    ToDate: string = '';
    dllDepartmentId: number = 0;
    FromNumber: number = null;
    ToNumber: number = null;

}
export class trainingCourseSearch {
    constructor() {
        this.TrainingId = 0;
    }
    TrainingId: number;
    IsSearchByNumber: number = null;
    FromDate: string='';
    ToDate: string = '';
    dllDepartmentId: number = 0;
    FromNumber: number = null;
    ToNumber: number = null;
}