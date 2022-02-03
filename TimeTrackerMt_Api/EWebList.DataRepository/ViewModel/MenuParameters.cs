using System;
using System.Collections.Generic;
using System.Text;

namespace TimeTrackerMt.DataRepository.ViewModel
{
    public class MenuParameters
    {
        public long RoleId { get; set; }
        public string Menuname { get; set; }
        public string RoleName { get; set; }
        public bool is_active { get; set; }
    }
}
