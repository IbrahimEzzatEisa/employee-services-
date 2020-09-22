export class Deduction {
    

      constructor(){
            this.VacationID = 0;
      }
        VacationID: number;
        Year: number;
        VacationPeriod: number;
        Notes: string;
        VacationTypeID: number;
        FileName: string;
        VacDays: Idays[];

}
      interface  Idays {
            date: string;
            dateH: string;
            note: string;
          
      }
      

