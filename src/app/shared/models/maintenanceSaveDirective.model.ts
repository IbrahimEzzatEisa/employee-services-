export class SaveDirective {
    constructor() {
        this.Recieved = false;
}
MaintenanceID: number;
FromUserID: number;
ToUserID: number;
Statements: string;
Recieved: boolean;
Finished: boolean;
DirectiveDate: string;
DirectiveDateH: string;
}