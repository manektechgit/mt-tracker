import { environment } from 'src/environments/environment';

export const AppSecurity = {
  currentLoginUser: 'c_l_u',
  rememberMe: '_r_m',
  selectedProjects: '_s_p',
  selectedProjectTasks: '_s_p_t',
  currentUserRegisterInfo: 'c_i_r_i',
};
export const AddEditModes = {
  default: 'default',
  insert: 'insert',
  edit: 'edit'
};
export const AppJsPath = {
  customJs: environment.CustomJsPath
};
export const AppSetting = {
  appTitle: 'Mt'
};
export const AppMessages = {
  // A
  ACCOUNT_DEACTIVATED: 'Login failed ! Your account has been deactivated !',
  APPSETTING_ADD: 'AppSetting Added Successfully!',
  APPSETTING_UPDATE: 'AppSetting Updated Successfully!',
  APP_UPDATE: 'AppSettings Updated Successfully!',
  ATTENDENCEHOUR_ADD: 'Attendencehour Added Successfully!',
  ATTENDENCEHOUR_UPDATE: 'Attendencehour Updated Successfully!',
  // Contact Us
  CONTACT_US_MESSAGE: 'Message Send Successfully !',
  COMPANY_ADDED: 'Company Added Successfully !',
  COMPANY_UPDATED: 'Company Updated Successfully !',
  COMPANY_ACCOUNT_DEACTIVATED: 'Login failed ! Your Company account has been deactivated !',
  COMPANY_EXISTS: 'Company name already exists !',
  // E
  EMAIL_NOTEXISTS: 'Your account is not active or this email does not exists !',
  EMAIL_SUBSRIPTION_SUCESSFULL: 'You subscription was Successfull !',
  // F
  FORGET_MAIL_SEND: 'A mail containing password reset link has been sent.',

  // L
  LOGIN_FAILED: 'Login failed. Check username or password !',
  LOGIN_SUCCESS: 'Login Successful !',

  // P
  PROFILE_UPDATED: 'You profile has been updated !',
  PASSWORD_RESET_SUCCESS: 'Your password has been resetted successfully !',
  PAYMENT_SUCCESS: 'Your payment processed successfully !',
  PAYMENT_FAIL: 'Payment Failed !',
  PROJECT_DELETE: 'Project Deleted Successfully !',
  PROJECT_SAVE: 'Project Saved Successfully !',
  PROJECT_UPDATED: 'Project updated Successfully !',

  // T
  TASK_DELETE: 'Task Deleted Successfully !',
  TASK_SAVE: 'Task Saved Successfully !',
  TASK_UPDATED: 'Task updated Successfully !',

  // C
  CARD_DELETE: 'Card Deleted Successfully !',
  CARD_SAVE: 'Card Saved Successfully !',
  CARD_UPDATED: 'Card updated Successfully !',

  // S
  SOME_THING_WENT_WRONG: 'Something went wrong !',
  SITE_CREATED: 'Site created successfully !',
  SITE_UPDATED: 'Site updated successfully !',
  SITE_DELETED: 'Site deleted successfully !',
  SAVE_SUCCESS: 'Saved successfully !',
  SETTING_UPDATED: 'Setting updated successfully !',

  // U
  USER_UPDATED: 'Updated Successfully !',
  USER_ADD: 'User added successfully !',
  NUMBER_USER: 'You cannot add more users ! To add more users contact provider !',
  Company_ADD: 'Company Added Successfully !',
  Company_Updated: 'Company Updated Successfully !',
  Menu_Updated: 'Menu Updated Successfully !',
  Department_Updated: 'Department updated !',
  Department_Deleted: 'Department Deleted Successfully !',
  DEPT_ADD: 'Department added successfully !',
  DEPT_UPDATE: 'Department updated successfully !',
  Menu_UPDATED: 'Menu updated successfully !',
  USER_ACCOUNT_DEACTIVATED: 'Login failed ! Your User account has been deactivated !',
  USER_DELETE: 'User Deleted Successfully !',
  USER_EXIST: 'User Already Exist !',
  DEPARTMENT_EXISTS: 'Department name already exists !',

  OFFLINE: 'You are offline ! Check your internet connection',
  ONLINE: 'Back online',
  ENABLESCREENRECORDING: 'Please enable screen recording ! From system preference and enable screen recording for mt-tracker',
  Plan_ADD: 'Plan Added Successfully !',
  Plan_Updated: 'Plan Updated Successfully !',
  PLAN_EXISTS: 'Plan name already exists !',
};
export const Gender = [
  {
    name: 'Male',
    value: 'M'
  },
  {
    name: 'Female',
    value: 'F'
  }
]
