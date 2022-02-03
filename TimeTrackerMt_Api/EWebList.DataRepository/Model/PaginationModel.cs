using System;
using System.Collections.Generic;
using System.Text;

namespace TimeTrackerMt.DataRepository.Model
{
   public class PaginationModel
    {
        public int DisplayLength { get; set; }
        public int DisplayStart { get; set; }
        public string Search { get; set; }
        public string SortCol { get; set; }
        public string SortDir { get; set; }
        public int CompanyId { get; set; }
        public int DepartmentId { get; set; }
        public int RoleId { get; set; }
        public bool IsDelete { get; set; }

        public int? LoginRoleId { get; set; }

        public int UserId { get; set; }

        public int CreatedBy { get; set; }

        public int ProjectId { get; set; }
        public string TimeZone { get; set; }

    }
}
