using System;

namespace TimeTrackerMt.DataRepository.Model
{
    public class EmailSubscription
    {
        public int? Id { get; set; }

        public string Email { get; set; }

        public DateTime? CreatedDate { get; set; }

        public bool? IsActive { get; set; }
    }
}