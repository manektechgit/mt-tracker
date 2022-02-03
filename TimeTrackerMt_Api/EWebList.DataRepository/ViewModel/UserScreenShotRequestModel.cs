using System;

namespace TimeTrackerMt.DataRepository.ViewModel
{
    public class UserScreenShotRequestModel
    {
        public long UserId { get; set; }
        public long ProjectId { get; set; }
        public string fromtime { get; set; }
        public string totime { get; set; }
        public DateTime SDate { get; set; }
    }
}