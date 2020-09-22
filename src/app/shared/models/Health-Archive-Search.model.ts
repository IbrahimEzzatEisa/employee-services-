export class HealthArchiveSearch {
    constructor() {
        this.DepartmentID = null;
        this.UserID = null;
        this.LicenseNumber= "";
        this.Activity= "";
        this.CustomerName= "";
        this.CustomerNationalNo= "";
    }

    DepartmentID: number;
    UserID: number;
    LicenseNumber: string;
    Activity: string;
    CustomerName: string;
    CustomerNationalNo: string;


}
export class HealthArchiveSearchResult {
    
    ArchiveHealthID: number;
    UserID: number;
    CustomerID: number;
    DepartmentID: number;
    ParentDeptID: number;

    IsDeleted:boolean;

    Details: string;
    LicenseNo: string;
    IssueHijriDate: string;
    ExpirationHijriDate: string;
    ShopName: string;
    Activity: string;
    ShopAddress: string;

    ArchiveHealthEndDate: string;
    ArchiveHealthEndHijriDate: string;

    UserFullName: string;
    DepartmentName: string;
    CustomerName: string;
    NationalNo: string;
    Mobile: string;

}