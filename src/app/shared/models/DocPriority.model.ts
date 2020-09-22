export class DocPriority {
    
    constructor() {
        this.Color = null
    }
    ID:number;
    Name: string;
    NoDays:number;
    Color:string;
    IsDeleted:Boolean;
    TrxInboxes: [] ;
       
}

// DocType {
//     ID (integer),
//     Name (string),
//     NoDays (number),
//     Color (string),
//     IsDeleted (boolean),
//     TrxInboxes (Array[TrxInbox], optional)
//     }
