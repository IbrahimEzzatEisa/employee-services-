export class MaintenanceBox {
    MaintenanceID: number;
    MachineTypeID: number;
    AutherId: number;
    UserName: string;
    Date: string;
    DateH: string;
    MachineTypeName: string;
    MaintenanceDesc: string;
}

export class MaintenanceSearchBox {
    DateFrom : string;
    DateTo : string;
    year : number;
    SerialFrom: number; 
    SerialTo : number;
    statues : number;
    }