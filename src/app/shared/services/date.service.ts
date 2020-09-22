import { Injectable } from "@angular/core";

declare var $: any;

interface UmmulquraDate {
    _year: string;
    _month: string;
    _day: string;
}



@Injectable({
    providedIn: "root"
})
export class DateService {

    // public fromHijriToGregorian(gregorienDate) {
    // }

    public fromGregorianToUmmulqura(gregorienDate: Date): UmmulquraDate {
        gregorienDate = new Date(gregorienDate);
        let calendar = $.calendars.instance("gregorian");
        let calendarDate = calendar.parseDate('yyyy/mm/dd', 
        gregorienDate.getFullYear() + '/' + (gregorienDate.getMonth()+1) + '/' + gregorienDate.getDate());
        calendar = $.calendars.instance("ummalqura");
        return calendar.fromJD(calendarDate.toJD());
    }
    public fromGregorianToUmmulquraString(gregorienDate: Date): string {
        const hijriDate = this.fromGregorianToUmmulqura(gregorienDate)
        return `${hijriDate._year}/${hijriDate._month}/${hijriDate._day}`;
    }
    public getCurrentHijriYear(): string {
        return this.fromGregorianToUmmulqura(new Date())._year;
    }
    public fromGregorianToGregorianString(gregorienDate: Date): string {
        gregorienDate = new Date(gregorienDate);
        return `${gregorienDate.getFullYear()}/${gregorienDate.getMonth()+1}/${gregorienDate.getDate()}`;
    }
    public dateSubtractionByDay(gregorienDate: Date, day: number): { Date: string, DateH: string } {
        const date = new Date();
        date.setDate(gregorienDate.getDate() - day)
        gregorienDate = new Date(date);
        return {
            Date: `${this.fromGregorianToGregorianString(date)}`,
            DateH: `${this.fromGregorianToUmmulquraString(date)}`
        }
    }
    public dateAdditionByDay(gregorienDate: Date, day: number): { Date: string, DateH: string } {
        const date = new Date();
        date.setDate(gregorienDate.getDate() + day - 1)
        gregorienDate = new Date(date);
        return {
            Date: `${this.fromGregorianToGregorianString(date)}`, 
            DateH: `${this.fromGregorianToUmmulquraString(date)}`
        }
    }
    public getCurrentDate(): { Date: string, DateH: string } {
        const date = new Date();
        return {
            Date: `${this.fromGregorianToGregorianString(date)}`,
            DateH: `${this.fromGregorianToUmmulquraString(date)}`
        }
    }

}