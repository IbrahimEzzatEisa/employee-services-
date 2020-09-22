export class Archive {
    ArchiveID: number;
    Title: string;
    Subject: string;
    ArchiveDate: string;
    ArchiveHijriDate: string;
    ArchiveTypeID: number;
    ArchiveTypeName: string;
    ArchiveLevelID: number;
    ArchiveLevelName: string;
    DocNo: string;
    DocDate: string;
    DocHijriDate: string;
    CustomerName: string;
    IDNumber: string;
    Mobile: string
}
export class ArchiveLeve {
    ArchiveLevelID: number;
    ArchiveLevelName: string;
}
export class ArchiveType {
    ArchiveTypeID: number;
    ArchiveTypeName: string
    DepartmentID: number
}
export class ArchiveSearch {
   DepartmentID :number;
   UserID:number;
    Title: string; 
    ArchiveTypeID: number;
    ArchiveLevelID: number;
    DocNo: string;
    CustomerName: string;
    IDNumber: string;
    Mobile: string
}
export class ArchiveSearchResult {
      
     ArchiveID: number ;    
     Title: string ;   
     Subject: string ;    
     ArchiveDate: string ;    
     ArchiveHijriDate: string ;
     ArchiveTypeID: number ;
     UserID: number ;
     IsDeleted: boolean ;
     ArchiveTypeName: string ;
     UserFullName: string ;
     DepartmentName: string ;
     ArchiveLevelID: string ;
     ArchiveLevelName: string ;
     DocNo: string ;
     DocDate: string ;
     DocHijriDate: string ;
     CustomerID: number;
     CustomerName: string 
     DepartmentID: number;
     ParentDeptID: number;
     NationalNo: string ;
     Mobile: string ;
    

}

