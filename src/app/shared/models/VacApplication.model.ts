export class VacApplication {
    constructor() {
        this.HasCarval = false;
        this.AddAgentval = false;
        this.cardetailsval = false;
        this.NewBalanceFirst = false;
        this.AddMandortyAgentForVacation = false;
        this.PreventOldVac = false;
        this.IsAlternativeEmp = false;
        this.VacationSMSSend = false;
        this.IsAlternativeinVacFromManager = false;
        this.ActivateAlternativeVacation = false;
        this.VacationForLegated = false;
        this.IsVacationNeedAttach = false;
        this.StopSalary = false;


    }
    
        FromDate?: string ; 
        FromDateH: string; 
        VacationPeriod?: number; 
        ToDate?: string | Date;
        ToDateH?: string  ;
        Notes:string;
        VacationTypeID:string;
        VacationTypeRaisd:string; 
        AlternativeUserID:string;
        HasCarval:boolean;
        cardetailsval:boolean;
        ReplaceType:string;
        AddAgentval:boolean;
        VacationOlddays?:string;
        VacationNewdays?:string ;
        SystemDate:string;
        NewBalanceFirst:boolean;
        AddMandortyAgentForVacation:boolean;
        PreventOldVac:boolean;
        IsAlternativeEmp: boolean;
        IsAlternativeinVacFromManager:boolean;
        ActivateAlternativeVacation: boolean;
        VacationSMSSend: boolean;
        VacationForLegated:boolean;
        IsVacationNeedAttach: boolean;
        VactionGraceperiod:number;
        VactionAttachment:string;
        IsEmp: string;
        MinVacation:number;
        MaxVacation: number;
        ContractDate: string ;
        Birthdate:string ; 
        StopSalary: boolean;
        
}