using System;
using System.Collections.Generic;
using System.Text;

namespace TimeTrackerMt.DataRepository.Model
{
  public  class UserReportsParameter
    {
        public long UserId { get; set; }
        public long UId { get; set; }
        public long CompanyId { get; set; }
        public long RoleId { get; set; }
        public long ProjectId { get; set; }
        public string fromDate { get; set; }
        public string toDate { get; set; }

        public string selectedUserId { get; set; }
        public string selectedProjectId { get; set; }


    }
}
