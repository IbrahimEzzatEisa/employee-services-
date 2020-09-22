import { Injectable } from '@angular/core'

@Injectable({
    providedIn: 'root'
})
export class LocalHelperService {

    paginateArrayOfObjects(arr: any[], pageSize: number): object[] {
        if (arr) {
            let result: object[] = [];
            for (let i = 0; i < arr.length; i = i + pageSize) {
                result.push(arr.slice(i, i + pageSize));
            }
            return result;
        }
    }

}