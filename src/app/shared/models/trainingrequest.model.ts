export class TrainingRequest{
    
        TrID: number;
        TrDate: string;
        TrHijriDate: string;
        Notes: string;
        Programs: Iprogram[]
   
      }


      interface Iprogram {
        CourseName: string;
        CourseDate: string;
        CourseHijriDate: string;
        Place: string;

      }




    