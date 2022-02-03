using System;
using System.Collections.Generic;
using System.Text;

namespace TimeTrackerMt.DataRepository.Model
{
    public class DashboardControl
    {
        public long UserId { get; set; }        
        public long CompanyId { get; set; }
        public long RoleId { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }

        public string Name { get; set; }
        public string Total { get; set; }
        public string UnProductive { get; set; }
    }

    public class UserWorkingHours
    {
        public long UserId { get; set; }
        public int FilterType { get; set; }
        public string fromDate { get; set; }
        public string toDate { get; set; }
        public int IsMostWorkingHR { get; set; }    
        public int IsDetailHourReport { get; set; }
    }
}
