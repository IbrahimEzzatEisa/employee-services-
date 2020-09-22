export class LicenseArchiveSearch {
    constructor() {
        this.DepartmentID = null;
        this.UserID = null;
        this.TypeID = null;
        this.LicenseRenew= "";
        this.LicensePartition= "";
        this.LicenseSerial= "";
        this.LicenseYear= "";
        this.SakNumber= "";
        this.PlannedNo= "";
        this.PartNumber1= "";
        this.PartNumber2= "";
        this.PartNumber3= "";
        this.PartNumber4= "";
        this.CustomerName= "";
        this.CustomerNationalNo= "";
    }

    DepartmentID: number;
    UserID: number;
    TypeID: number; 
    LicenseRenew: string;
    LicensePartition: string;
    LicenseSerial: string;
    LicenseYear: string;
    SakNumber: string;
    PlannedNo: string;
    PartNumber1: string;
    PartNumber2: string;
    PartNumber3: string;
    PartNumber4: string;
    CustomerName: string;
    CustomerNationalNo: string;

}
export class LicenseArchiveSearchResult {
    ArchiveLicenseID: number;
    ArchiveLicenseTypeID: number;
    UserID: number;
    CustomerID: number;
    DepartmentID: number;
    ParentDeptID: number;

    IsDeleted:boolean;
    Subject: string;
    ArchiveLicenseEndDate: string;
    ArchiveLicenseEndHijriDate: string;

    ArchiveLicenseTypeName: string;
    UserFullName: string;
    CustomerName: string;
    Mobile: string;

    DepartmentName: string;
    LicenseNo: string;

    LicenseDate: string;
    LicenseHijriDate: string;

    SakNumber: string;
    SakSource: string;
    SakDate: string;
    PlannedNo: string;
    PartNumbers: string;
    NationalNo: string;

}