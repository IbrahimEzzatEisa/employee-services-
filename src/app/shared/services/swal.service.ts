import { Injectable } from '@angular/core';

import Swal, { SweetAlertResult } from 'sweetalert2';

@Injectable({
    providedIn: 'root'
})
export class SwalService {

    public showRemoveConfirmation(elementName?): Promise<SweetAlertResult> {
        elementName? elementName = `"${elementName}"` : elementName = "";

        return new Promise((resolve, reject)=>{
            Swal.fire({
                title: 'هل انت متأكد؟',
                text: `حذف العنصر ${elementName}!`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'نعم, احذف!',
                cancelButtonText: 'إلغاء'
              }).then((result) => {
                resolve(result)
              });
        })
    }
    Notifier(title :string){
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: title,
            showConfirmButton: false,
            timer: 1500
          })
    }
    watched(title :string){
        Swal.fire({
            position: 'center',
            icon: 'info',
            title: title,
            showConfirmButton: false,
            timer: 1500
          })
    }
    confirm(text :string){
        Swal.fire({
            icon: 'success',
            position: 'center',
            title: 'للعلم',
            html: text,
            // footer: '<a href>Why do I have this issue?</a>'
          })
    }
    NotifierError(text :string){
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'خطاء ...',
            text:text,
            showConfirmButton: false,
            timer: 1500
          })
    }
    NotifierEvent(title: string ,text :string){
        Swal.fire({
            position: 'bottom-end',
            title: title,
            text:text,
            showConfirmButton: true,
            allowOutsideClick : false,
            confirmButtonText:'استلام',
            // background:'#e0fbfc',
            showClass: {
                popup: 'animated bounceIn fast'
              },
              hideClass: {
                popup: 'animated fadeOutLeft slow'
              }
          })
    }
    // public NavigateConfirmation(): Promise<SweetAlertResult> {
    //     return new Promise((resolve, reject)=>{
    //         Swal({
    //             title: 'هل تريد الحفظ',
    //             text: ` حفظ التغيرات !`,
    //             type: 'warning',
    //             showCancelButton: true,
    //             confirmButtonClass: "swal-confirm",
    //             cancelButtonClass: "swal-cancel",
    //             confirmButtonText: 'الانتقال دون الحفظ',
    //             cancelButtonText:  'البقاء لحفظ التغيرات'
    //           }).then((result) => {
    //             resolve(result)
    //           });
    //     })
    // }
    // public showConfirmation(params: {
    //     title?: string, 
    //     message: string
    // }): Promise<SweetAlertResult> {
    //     params.title = params.title || 'هل انت متأكد؟';
    //     return new Promise((resolve, reject)=>{
    //         Swal({
    //             title: params.title,
    //             text: params.message,
    //             type: 'warning',
    //             showCancelButton: true,
    //             confirmButtonClass: "swal-confirm",
    //             cancelButtonClass: "swal-cancel",
    //             confirmButtonText: 'نعم!',
    //             cancelButtonText:  'إلغاء'
    //           }).then((result) => {
    //             resolve(result)
    //           });
    //     })
    // }
    // public showError(title: string | null, message: string | null) {
    //     Swal({
    //         title: title,
    //         text: message,
    //         type: 'error'
    //     })
    // }

}