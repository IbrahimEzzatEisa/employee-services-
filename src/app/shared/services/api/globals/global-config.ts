
export const BaseURL = "http://api.ezicodes.com";
export const EtaBaseURL = "http://etaservices.taj-it.com";
export const API_URL = BaseURL+'/api/Account';
export const EtaAPI_URL = EtaBaseURL+'/api';


export class END_POINTS {
    // Employee API
    public static default = API_URL + "/Default";
    public static login = API_URL+"/login";
    public static vacationTypes = API_URL+"/GetVacationTypes";
    public static vacationsBalance = API_URL+"/VacationsBalance";
    public static setting = API_URL+"/settings";
    public static user = API_URL+"/Users";
    public static Permissions = API_URL+"/Permissions";
    public static vacApplication = API_URL+"/VacApplication";
    public static alternatives = API_URL+"/GetAlternatives";
    public static departureTypes = API_URL+"/Departure/DepartureTypes";
    public static departure = API_URL+"/Departure";
    public static empShift = API_URL+"/Departure/EmpShift";
    public static legation = API_URL+"/Legation";
    public static OverTime = API_URL+"/OverTime";
    public static getHoursAndTimesForEmp = API_URL+"/Departure/GetHoursAndTimesForEmp";
    public static trainingEmp = API_URL+"/Training/GetEmployees";
    public static employeeInfo = API_URL+"/Training/GetEmployeeInfo";
    public static training = API_URL+"/Training";
    public static cities = API_URL+"/Training/GetCities";
    public static sumMosire =  API_URL+"/GetSumMosire";
    public static emploans =  API_URL+"/GetEmpLoans";
    public static WorkFlowDepartment =  API_URL+"/Users/GetDepartments";
    public static departmentByUser =  API_URL+"/Users/GetUsersByDepartment";
    public static attendance = API_URL +"/Attendance";
    public static fingerPrint = API_URL +"/FingerPrint";
    public static settingsDirectUsersDdl = API_URL + "/Settings/DirectUsersDdl";
    public static outsideddl = API_URL + "/Settings/OutsidesDdl";
    public static departmentManagersUsers = API_URL+"/GetDepartmentManagersUsers"
    public static NotificationsEMP = EtaAPI_URL+"/Notifications"


















    // Eta API
    public static departmentsIDName = EtaAPI_URL+"/LicenseArchive/GetDepartments";
    public static departmentUsersIDName = EtaAPI_URL+"/LicenseArchive/GetDepartmentUsers/";
    public static LicenseArchiveSearchTypes = EtaAPI_URL+"/LicenseArchive/GetArchiveLicenseTypes";
    public static RealStateArchiveSearch = EtaAPI_URL+"/RealStateArchive/Search"
    public static HealthArchiveSearch = EtaAPI_URL+"/HealthArchive/Search"
    public static LicenseArchiveSearch = EtaAPI_URL+"/LicenseArchive/Search"
    
    public static department = EtaAPI_URL+"/Departments";
    public static eidMission = EtaAPI_URL+"/EidMission";
    public static news =  EtaAPI_URL+"/News";
    public static userAgent =  EtaAPI_URL+"/AgentsUsers/GetUserAgent";
    public static myAgentUsers =  EtaAPI_URL+"/AgentsUsers/GetMyAgentsUsers";
    public static agents =  EtaAPI_URL+"/AgentsUsers";
    public static workflow =  EtaAPI_URL+"/WorkFlow/GetWorkFlows";
    public static workflows =  EtaAPI_URL+"/WorkFlow";
    public static WorkFlowTypes =  EtaAPI_URL+"/WorkFlow/GetWorkFlowstypes";
    public static msMachineTypes =  EtaAPI_URL+"/MSMachineTypes";
    public static maintenance =  EtaAPI_URL+"/Maintenance";
    public static maintenancetabel =  EtaAPI_URL+"/Maintenance/GetMaintenance";
    public static docTypes = EtaAPI_URL +"/DocTypes";
    public static getIdNameList = EtaAPI_URL +"/DocTypes/GetIdNameList"
    public static docPriority =EtaAPI_URL+"/DocPriority"
    public static getidNameList =EtaAPI_URL+"/DocPriority/GetIdNameList"
    public static maintenanceSendNotes =EtaAPI_URL+"/Maintenance/SendNote"
    public static systemSettings = EtaAPI_URL+"/SystemSettings"
    public static getTrxInSettings = EtaAPI_URL+"/GetTrxInSettings"
    public static requestsBobx = EtaAPI_URL+"/RequestsBox";
    public static authorities = EtaAPI_URL+"/Authorities"
    public static jobs = EtaAPI_URL+"/Jobs"
    public static maintenanceBox = EtaAPI_URL+"/Maintenance/GetMaintenanceBox"
    public static maintenanceDetails = EtaAPI_URL+"/Maintenance/GetMaintenanceDetails"
    public static SaveDirective = EtaAPI_URL+"/Maintenance/SaveDirective"
    public static Voting = EtaAPI_URL+"/Voting"
    public static VotingFinsih = EtaAPI_URL+"/Voting/Finish"

    public static Archive = EtaAPI_URL+"/Archive"
    public static HealthArchive = EtaAPI_URL+"/HealthArchive"
    public static RealstateArchive = EtaAPI_URL+"/RealStateArchive"
    public static LicenseArchive = EtaAPI_URL+"/LicenseArchive"
    public static LicenseArchiveType = EtaAPI_URL+"/LicenseArchiveTypes"
    
    public static ArchiveTypes = EtaAPI_URL+"/ArchiveTypes"
    public static TrxRequestsBox = EtaAPI_URL+"/TrxRequestsBox"
    public static trainingRequest = EtaAPI_URL+"/TrainingRequest"
    public static Notifications = EtaAPI_URL+"/Notifications"
    public static MouadRequest = EtaAPI_URL+"/MouadRequest"
    public static TrxDetails = EtaAPI_URL+"/TrxDetails"
    public static TrxSearch = EtaAPI_URL+"/TrxSearch"
    public static Drawers = EtaAPI_URL+"/Drawers"
    public static deduction = EtaAPI_URL+"/Deduction"
    public static outsides = EtaAPI_URL+"/Outsides"
    public static trxouradd = EtaAPI_URL+"/TrxOut"
    public static TrxIn = EtaAPI_URL+"/TrxIn"







}


