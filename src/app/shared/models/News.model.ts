export class News{

  NewsID: number;
  NewsTitle: string;
  NewsDate: string;
  DewsDescription: string;
  Active: boolean;
  IsDeleted: boolean;
  FromDate?: string ; 
  FromDateH: string; 
  ToDate?: string | Date;
  ToDateH?: string  ;

}
