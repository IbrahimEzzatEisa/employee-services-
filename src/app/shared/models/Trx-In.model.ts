export class TrxIn {
  constructor() {

  }
  NationaNo: string = '';
  Mobile: string = '';
  CustomerName: string = '';
  TrxDate: string = null;
  Subject: string = '';
  AttachmentsNo: string = '';
  TrxDeliveryTypeID: number = null;
  DocTypeID: number = null;
  DocNo: string = '';
  ToID: number = null;
  DocPeriorityID: number = null;
  RelatedTrxID: number = null;
  FromID: number = null;
  DocDate: string = null;
  Notes: string = '';
  DrajID: number = null;
  Generalize: boolean;
  GenerailzationClass: number = null
  CopyToAllDepartments: boolean;
  DepartmentsIdForCopies: number[] = [];
}

export class TrxInbox {
  TrxID: number;
  Subject: string;
  TrxTypeID: number;
  TrxSerial: number;
  DocPeriorityID: number;
  DocNo: string;
  DocHijriDate: string;
  TrxHijriDate: string;
  FromName: string;
  ToName: string;
  AttachmentsNo: string;
  RelatedTrxID: number;
  TypeName: string;
  StatusName: string;
}
