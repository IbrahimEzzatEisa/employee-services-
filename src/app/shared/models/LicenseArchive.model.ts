export class LicenseArchive {

    ArchiveLicenseID: number;
    UserID: number;
    ArchiveLicenseTypeID: number;

    Subject: string;

    ArchiveLicenseEndDate: string;
    ArchiveLicenseEndHijriDate: string;

    SakNumber: string;
    SakDate: string;
    SakSource: string;

    PlannedNo: string;

    PartNumber1: string;
    PartNumber2: string;
    PartNumber3: string;
    PartNumber4: string;


    LicenseRenew: string;
    LicensePartition: string;
    LicenseSerial: string;
    LicenseYear: string;


    LicenseDate: string;
    LicenseHijriDate: string;

    CustomerName: string;
    IDNumber: string;
    Mobile: string;
}


export class LicenseArchiveType {
    ArchiveLicenseTypeID: number;
    ArchiveLicenseTypeName: string
    DepartmentID: number;
}

