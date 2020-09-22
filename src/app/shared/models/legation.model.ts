export class Legation {

    constructor() {
        this.RequestDate = "";
        this.RequestDateH = "";
        this.AttachmentCount = null;
        this.RequestType = "Legation";
        this.LegationTime = null;
        this.DateFrom = "";
        this.DateFromH = "";
        this.DateTo = "";
        this.DateToH = "";
        this.LegationType = "";
        this.OutSideName = "";
        this.Mission = "";
        this.WalkLine = "";
        this.ApprovedBy = "";
        this.LegationOutType = "";
        this.Notes = "";
        this.LegationUsersIDs = null;
    }

    RequestDate: string;
    RequestDateH: string;
    AttachmentCount: number;
    RequestType: string;
    LegationTime: number;
    DateFrom: string;
    DateFromH: string;
    DateTo: string;
    DateToH: string;
    LegationType: string;
    OutSideName: string;
    Mission: string;
    WalkLine: string;
    ApprovedBy: string;
    LegationOutType: string;
    Notes: string;
    LegationUsersIDs: number[];
}