using System;
using System.Collections.Generic;

namespace TimeTrackerMt.DataRepository.Model
{
    public class TimeZoneMaster
	{
		public long TimeZoneId { get; set; }
        public string value { get; set; }
        public string abbr { get; set; }
        public string offset { get; set; }
        public string text { get; set; }
	}
}