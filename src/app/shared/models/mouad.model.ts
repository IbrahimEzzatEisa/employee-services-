export class Mouad {
  Date: string;
  DateH: string;
  MouadId: number;
  Notes: string;
  UserID: number;
  UserName: string;
}

export class MouadRequest {
  constructor() {
    this.Notes = "";
  }
  Id: number;
  Date: string;
  DateH: string;
  UserID: number;
  Notes: string;
  Details: MouadDetail[];
}
type MouadDetail = {
  Id: number;
  Name: string;
  Quantity: number;
  Notes: string;
};

export class MouadEdit extends MouadRequest {
  Directives: Directives[];
  AutherName: string;
}

export class Directives {
  Id: number;
  Date: string;
  DateH: string;
  FromUserID: number;
  FromUserName: string;
  ToUserID: number;
  ToUserName: string;
  Statements: string;
}
export class MouadRequestBox {
  constructor() {
    this.DateFrom = '';
    this.DateTo = '';
  }
  DateFrom: string;
  DateTo: string;
  year: number;
  SerialFrom: number;
  SerialTo: number;
  // statues : null
}
