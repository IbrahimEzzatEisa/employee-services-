export class RealStateArchiveSearch {
    constructor() {
        this.DepartmentID = null;
        this.UserID = null;
        this.Year = null;

        this.ContractRenew= "";
        this.ContractSerial= "";
    
        this.PlannedNo= "";
        this.Classification= "";
      
        this.CustomerName= "";
        this.CustomerNationalNo= "";
    }
    Year :number;
    DepartmentID: number;
    UserID: number;
  
    ContractRenew: string;
    ContractSerial: string;

    Classification: string;
    PlannedNo: string;

    CustomerName: string;
    CustomerNationalNo: string;


}
export class RealStateArchiveSearchResult {
    ArchiveRealStateID: number;
    UserID: number;
    CustomerID: number;
    DepartmentID: number;
    ParentDeptID: number;

    IsDeleted:boolean;
    Subject: string;
    ArchiveRealStateEndDate: string;
    ArchiveRealStateEndHijriDate: string;

    PlannedName: string;
    UserFullName: string;
    CustomerName: string;
    DepartmentName: string;
    AnnualRent: string;
    TotalRent: string;
    RentPeriod: string;


    ContractDate: string;
    ContractHijriDate: string;
    ContractStartDate: string;
    ContractStartHijriDate: string;
    ContractNo: string;
    ContractEndDate: string;
    ContractEndHijriDate: string;


    NationalNo: string;
    Mobile: string;

    PlannedNo: string;
    Classification: string;

    PropertyName:string;
    PropertyCode:string;

}