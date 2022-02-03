using System;
using System.Collections.Generic;
using System.Text;

namespace TimeTrackerMt.DataRepository.Model
{
	public class AttandanceLog
	{
		public long Id { get; set; }
        public string Name { get; set; }
        public long? UserId { get; set; }

		public long? ProjectId { get; set; }
		public long? TaskId { get; set; }
        public long? CompanyId { get; set; }

        public string selectedProjectId { get; set; }
        public string selectedUserId { get; set; }
        public string ProjectName { get; set; }
        public string TaskName { get; set; }
        public string Minutes { get; set; }
        public string? InTime { get; set; }

		public string? OutTime { get; set; }

		public bool? InOutFlage { get; set; }
		public string fromDate { get; set; }
		public string toDate { get; set; }
        public string TotalWorkingHours { get; set; }
        public long ImageCount { get; set; }
        public DateTime Date { get; set; }
	}
}
