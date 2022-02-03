using System;

namespace TimeTrackerMt.DataRepository.Model
{
    public class UserScreenshot
    {
        public long UserId { get; set; }
        public long ProjectId { get; set; }
        public long TaskId { get; set; }
        public string Image { get; set; }
        public string fileAsBase64 { get; set; }
        public DateTime CreationDate { get; set; }
       
    }
}