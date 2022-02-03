using System;
using System.Collections.Generic;
using System.Text;

namespace TimeTrackerMt.DataRepository.Model
{
    public class DynamicMenu
    {
        public int? menu_id { get; set; }
        public int? RoleId { get; set; }
        public string name { get; set; }
        public string Icon { get; set; }
        public string page_name { get; set; }
        public DateTime? CreatedDate { get; set; }
    }
}
