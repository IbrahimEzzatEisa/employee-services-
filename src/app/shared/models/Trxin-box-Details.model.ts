class InboxDetails {

}
export class TrxinboxDetails implements InboxDetails {
    TrxID: number;
    lastDirectivestatues: number;
    TrxTypeID: number;
    TrxHijriDate: string;
    FromName: string;
    ToName: string;
    DocNo: string;
    DocHijriDate: string;
    Name: string;
    Statment: string;
    Notes: string;
    TypeName: string;
    CustomerName: string;
    Mobile: number;
    NationalNo: number;
    Subject: string;
    Serial: number;
    AttachmentsNo: string;
    DirectiveID: number;
    TrxDirctives: TrxDirctive[];
    TrxAttachments: TrxAttachment[];
    TrxStatements: TrxStatement[];
    TrxCopies: TrxCopie[];
}

export class TrxDirctive {
    TrxID: number;
    DirectiveDateH: string;
    FromUserName: string;
    ToUserName: string;
    Statment: string;
    Statements: string;
    LitterFile: string;
}
export class TrxStatement {
    TrxID: number;
    DirectiveDateH: string;
    FromUserName: string;
    ToUserName: string;
    FromDepartment: string;
    ToDepartment: string;
    Statment: string;
    Statements: string;
}
export class TrxAttachment {
    TrxID: number;
    AttachmentName: string;
    DirectiveDateH: string;
    UserName: string;
    DepartmentName: string;
    AttachmentFile: string;
}
type TrxCopie = { DepartmentName: String }

export class TrxinboxDetailsPost {
    /**
     *
     */
    constructor() {
        this.Statements = `نص التوجيه`;
        this.FolderID = 0;
    }
    DirectiveID = 0;
    TrxID: Number;
    FromUserID = 0;
    ToUserID: number;
    TrxStatusID: number;
    Statements: String;
    DirectiveDate = null;
    IsReaded = false;
    Recieved = false;
    ExpandDays = 0;
    LitterFile: File;
    PCName = null;
    FromDepID = 0;
    ToDepID = 0;
    FolderID: Number;


}