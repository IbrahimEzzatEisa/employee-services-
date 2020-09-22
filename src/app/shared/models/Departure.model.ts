export class Departure {

    DepartureDate: string ;
	DepartureDateH: string; 
	EmpShiftStart: string;
	EmpShiftEnd: string;
	PermissionStartTime: string;
	PermissionEndTime: string;
	Notes: string;
	DepartureTypeID: string;
	DepartureDateTo?: string | Date;
	DepartureDateToH: string ;
	Reason: string;
	Days: string;
	OneDepartureHours: number;
	CheckActiveDepartureMonthly: boolean;
}