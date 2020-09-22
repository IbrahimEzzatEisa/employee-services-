export class TrxSearch {
    constructor() {
        this.DateFrom = null;
        this.DateTo = null;
        this.TrxTypeID = null;
        this.FromName = "";
        this.ToName = "";
        this.TrxSerialFrom = null;
        this.TrxSerialTo = null;
        this.Subject = "";
    }
    DateFrom: string;
    DateTo: string;
    TrxTypeID: number;
    FromName: string;
    ToName: string;
    TrxSerialFrom: number;
    TrxSerialTo: number;
    Subject: string;
}
export class TrxSearchResult {
    TrxID: number;
    TrxTypeID: number;
    Serial: number;
    Subject: string;
    TrxDate: string;
    TrxHijriDate: string;
    AttachmentsNo: string;
    TypeName: string;
    FromUserID: number;
    ToUserID: number;
    FromId: number;
    FromName: string;
    ToId: number;
    ToName: string;
    StatusName: string;
    StatusColor: string;
}