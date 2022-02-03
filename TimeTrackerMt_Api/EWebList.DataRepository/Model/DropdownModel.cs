using System;
using System.Collections.Generic;
using System.Text;

namespace TimeTrackerMt.DataRepository.Model
{
    public class DropdownModel
    {
        public int UserId { get; set; }
        public string UserName { get; set; }
        public int RoleId { get; set; }
        public int LoginRoleId { get; set; }
        public string RoleName { get; set; }
    }
}
