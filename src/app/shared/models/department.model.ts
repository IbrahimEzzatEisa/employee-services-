export class Department {
  ID: number;
    
    constructor() {
        
    }
    DepartmentID: number;
    DepartmentName: string ;
    ParentID?: number;
    ParentName?:String;  
    IsDeleted: boolean;
    VacationOrder?: number;
    AllowArchive: boolean;
    DeparturePermissionCount?: number;
}

