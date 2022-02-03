using System;
using System.Collections.Generic;

namespace TimeTrackerMt.DataRepository.Model
{
    public class UserMaster
    {

		public long UserId { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }

		public string FirstName { get; set; }

		public string LastName { get; set; }

		public string Password { get; set; }

		public int? DepartmentId { get; set; }
		public string DepartmentName { get; set; }
		public string DepartmentIds { get; set; }
		public List<string> DepartmentList { get; set; }

		public string Gender { get; set; }

		public int? RoleId { get; set; }
		public int? ProjectRoleId { get; set; }

		public string RoleName { get; set; }
		public short? StatusId { get; set; }

		public string Status { get; set; }

		public string Name { get; set; }
		public long? ReportingTo { get; set; }
		public string ReportingPerson { get; set; }
		public long? ProjectId { get; set; }
		public List<string> ProjectList { get; set; }
		public string ProjectIds { get; set; }

		public long? CompanyId { get; set; }
		public string CompanyName { get; set; }
		public long? CreatedBy { get; set; }

		public DateTime? CreatedDate { get; set; }

		public long? UpdatedBy { get; set; }

		public DateTime? UpdatedDate { get; set; }
		public int? recordsTotal { get; set; }

		public bool IsActive { get; set; }

		public int? LoginRoleId { get; set; }

		public int? LoginDepartmentId { get; set; }

		public string AvailableUser { get; set; }

		public short? ScreenCastId { get; set; }
		public int TimeZoneId { get; set; }
		public string TimeZone { get; set; }

	}
}