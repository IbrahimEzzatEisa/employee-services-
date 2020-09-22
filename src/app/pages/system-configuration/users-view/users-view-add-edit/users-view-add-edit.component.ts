import { Component, OnInit, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User, Pergroup, Department } from 'src/app/shared/models';
import { UsersService } from 'src/app/shared/services/api/users.service';
import { SwalService, ChangeThemeService } from 'src/app/shared/services';
import { DropdownListComponent, GregorianHijriCalendarComponent } from 'src/app/shared/components';
import { NgForm } from '@angular/forms';

interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}
@Component({
  selector: 'app-users-view-add-edit',
  templateUrl: './users-view-add-edit.component.html',
  styleUrls: ['./users-view-add-edit.component.scss']
})


export class UsersViewAddEditComponent implements OnInit {
  @ViewChild('UserImg', { static: false }) UserImg: ElementRef;

  @ViewChild('ImageMarking', { static: true }) ImageMarking: ElementRef;

  @ViewChild('ImageSignature', { static: true }) ImageSignature: ElementRef;

  @ViewChild('ImageNoSignature', { static: true }) ImageNoSignature: ElementRef;

  @ViewChild('PerGroupID', { static: true }) PerGroupID: DropdownListComponent;
  @ViewChild('PerGroupID', { static: true }) DepartmentID: DropdownListComponent;
  @ViewChild('Date', { static: true }) Date: GregorianHijriCalendarComponent;
  @ViewChild('form', { static: true }) form: NgForm;
  //main object
  user: User;
  //dropdownPerGroup
  PerGroupList: Pergroup[] = [];
  PerGroupItem: Pergroup = new Pergroup();
  busyLoadingPerGroup: boolean = false;
  //dropdown
  DepartmentList: Department[] = [];
  DepartmentItem = new Department();
  busyLoadingDepartment: boolean = false;

  isAdd: boolean;
  formSubmitted: boolean = false;

  isBusy: boolean = false;

  isAdmin : boolean= false;

  constructor(private route: ActivatedRoute,
    private usersService: UsersService,
    private renderer2: Renderer2,
    private swalService: SwalService,
    private changeThemeService: ChangeThemeService, ) { }

  ngOnInit() {
    if(JSON.parse(localStorage.getItem('User')).Username === "admin") this.isAdmin = false;
    else this.isAdmin = true;
    
    this.changeThemeService.changeColor()
    this.user = new User();
    this.getDropDown();
    if (this.route.snapshot.queryParams.isAdd === 'true' || this.route.snapshot.routeConfig.path === 'Add') {
      this.isAdd = true;

    } else {
      this.user.UserID = this.route.snapshot.params.id;
      this.getUser(this.user.UserID)
      this.isAdd = false
    }


  }

  getUser(id) {
    this.usersService.get(id).subscribe(res => {
      this.user = res[0]

      this.user.UserID = id
      if (this.user.ActiveToDate === null) {
        this.user.ActiveToDate = ""
      }
      this.changebackground(this.UserImg, 'UserImageURL')
      this.changebackground(this.ImageSignature, 'UserImageSignatureURL')
      this.changebackground(this.ImageMarking, 'UserImageMarkingURL')
      this.changebackground(this.ImageNoSignature, 'UserImageNoSignatureURL')


    })
  }

  save(...args: boolean[]) {
    this.formSubmitted = true;
    let a;
    args.map(item => {
      if (item === true) {
        a = true
        this.swalService.NotifierError('قم بادخال الحقول المطلوبه');
      }
    })
    if (a) return
    if (this.isAdd) {
      this.isBusy = true
      this.usersService.post(this.user).subscribe(res => {
        this.isBusy = false
        this.swalService.Notifier('تم  الحفظ بنجاح');
        this.formSubmitted = false;
        this.reset();
      }, err => {
        this.isBusy = false
        let errorMessage = err.message || 'حدث خطأ قي استلام البيانات';
        this.swalService.NotifierError(errorMessage)
      })
    } else {
      this.isBusy = true
      this.usersService.put(this.user).subscribe(res => {
        this.isBusy = false;
        this.swalService.Notifier('تم  الحفظ بنجاح');
        this.formSubmitted = false;
        this.reset();
      }, err => {
        this.isBusy = false;
        let errorMessage = err.message || 'حدث خطأ قي استلام البيانات';
        this.swalService.NotifierError(errorMessage)
      })

    }
  }


  onFileChanged(event: HTMLInputEvent, prop: string) {
    const file = event.target.files[0];
    let el = event.target.parentNode as HTMLElement;
    this.renderer2.removeClass(el, 'user-image')
    this.renderer2.removeClass(el, 'signature-image')

    let reader = new FileReader();

    reader.readAsDataURL(file)
    reader.onload = () => {
      this.user[prop] = reader.result as string;
      // this.user[prop] = result.split('base64,')[1] ;
      this.renderer2.setStyle(el,
        'background-image', `url(${reader.result ? reader.result : this.user[prop]})`)
      this.renderer2.setStyle(el, 'background-size', 'cover')
      this.renderer2.setStyle(el, 'background-position', 'center')
      this.renderer2.setStyle(el, 'border', '3px solid black')
      // el.childNodes.item(1).remove();

    }

  }

  getDropDown() {
    this.getpergroup();
    this.getDepartment();
  }
  getpergroup() {
    this.busyLoadingPerGroup = true
    this.usersService.GetPergroups().subscribe(res => {
      this.PerGroupList = res;
      this.busyLoadingPerGroup = false;
    })
  }
  SelectPerGroup(pergroup: Pergroup) {
    this.PerGroupItem = Object.assign({}, pergroup)
    this.user.PerGroupID = this.PerGroupItem.PerGroupID
  }
  getDepartment() {
    this.busyLoadingDepartment = true
    this.usersService.GetDepartments().subscribe(res => {
      this.DepartmentList = res;
      this.busyLoadingDepartment = false;
    })
  }
  SelectDepartment(department: Department) {
    this.DepartmentItem = Object.assign({}, department)
    this.user.DepartmentID = this.DepartmentItem.DepartmentID
  }
  selectActiveToDate(DateH) {
    this.user.ActiveToDate = DateH.greg
  }
  changebackground(el: ElementRef, prop: string, isclear?: boolean, clsProp?: string) {
    if (isclear) {
      if (prop == 'UserImageURL') {
        this.renderer2.setStyle(el, 'background-image', `url('../../../../../assets/images/user-image.png')`)
        this.user[clsProp] = "Deleted"
        return
      } else {
        this.renderer2.addClass(el, 'signature-image')
        this.user[clsProp] = "Deleted"
        return
      }
    }
    if (this.user[prop] === null) return
    this.renderer2.setStyle(el.nativeElement,
      'background-image', `url('${this.user[prop]}')`);
    this.renderer2.setStyle(el.nativeElement, 'background-size', 'cover')
    this.renderer2.setStyle(el.nativeElement, 'background-position', 'center')
    this.renderer2.setStyle(el.nativeElement, 'border', '3px solid black')
    // this.renderer2.removeChild(el.nativeElement, 'p')
    this.renderer2.removeClass(el.nativeElement, 'user-image')
    this.renderer2.removeClass(el.nativeElement, 'signature-image')
  }

  reset(){
    this.user = new User();
    this.Date.reset();
    this.PerGroupID.reset();
    this.DepartmentID.reset();
    this.form.reset();
  }


}
