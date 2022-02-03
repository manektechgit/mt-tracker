using System;

namespace TimeTrackerMt.API.EasyPostModals
{
    public class LinnWorkResponse
    {
        public Boolean IsError { get; set; }
        public string ErrorMessage { get; set; }
    }

    public class EasyPostAuth : LinnWorkResponse
    {
        public string AuthorizationToken { get; set; }
    }
}