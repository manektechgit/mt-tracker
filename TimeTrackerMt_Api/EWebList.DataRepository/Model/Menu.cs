using System;
using System.Collections.Generic;
using System.Text;

namespace TimeTrackerMt.DataRepository.Model
{
    public class Menu
    {
        public long id { get; set; }
        public long RoleId { get; set; }
        public string Menuname { get; set; }
        public string RoleName { get; set; }
        public string MenuIcon { get; set; }
        public bool is_active { get; set; }

    }
}
