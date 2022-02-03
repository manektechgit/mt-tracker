// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  apiUrl: 'http://localhost:41347/api/',
  screenshotPath: 'http://localhost:41347/user_screenshot/',
  // apiUrl: 'http://50.21.182.225/mttracker/mttrackerapi/api/',
  // screenshotPath: 'http://50.21.182.225/mttracker/mttrackerapi/user_screenshot/',
  CustomJsPath: '/assets/js/custom.js',
  exePath: '/assets/mt-tracker.exe',
  exePathMAC: '/assets/mt-tracker.zip'
  // exePath: 'http://50.21.182.225/mttracker/mttrackerapi/user_screenshot/mt-tracket.exe'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
