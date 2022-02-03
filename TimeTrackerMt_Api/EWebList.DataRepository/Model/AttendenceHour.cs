using System;
using System.Collections.Generic;
using System.Text;

namespace TimeTrackerMt.DataRepository.Model
{
    public class AttendenceHour
    {
        public int? Id { get; set; }
        public int? CompanyId { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public int? FullDayHours { get; set; }
        public int? HalfDayHours { get; set; }
        public int? recordsTotal { get; set; }
        public string CompanyName { get; set; }
        public bool IsActive { get; set; }

        public string stringStartDate { get; set; }
        public string stringEndDate { get; set; }
    }
}
