using System;
using System.Collections.Generic;
using System.Text;

namespace TimeTrackerMt.DataRepository.Model
{
    public class Reports
    {
        public long Id { get; set; }

        public long UserId { get; set; }
        public long UId { get; set; }
        public string AttandanceDate { get; set; }

        public string WorkingHours { get; set; }

        public long ProjectId { get; set; }
        public long RoleId { get; set; }

        public string FirstName { get; set; }

        public string Name { get; set; }
        public string fromDate { get; set; }
        public string toDate { get; set; }

        public string Total { get; set; }


    }

}
