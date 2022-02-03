using System;
using System.Collections.Generic;
using System.Text;

namespace TimeTrackerMt.DataRepository.Model
{
   public class UserProjects
    {
        public int Id { get; set; }
        public int? UserId { get; set; }
        public bool ErrorToBeReturned { get; set; }
        public string UserName { get; set; }
        public int? RoleId { get; set; }
        public string RoleName { get; set; }
        public int? ProjectId { get; set; }
        public int? CreatedBy { get; set; }
        public string ProjectName { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
    }
}
