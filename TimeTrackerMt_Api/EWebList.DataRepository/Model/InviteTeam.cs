using System;
using System.Collections.Generic;

namespace TimeTrackerMt.DataRepository.Model
{
    public class InviteTeam
    {
        public string UserName { get; set; }
        public string UserEmail { get; set; }
        public string Password { get; set; }
        public string CompanyName { get; set; }
        public string NumberOfEmployees { get; set; }
        public string TimeZoneId { get; set; }
        public List<Employee> Employees { get; set; }
    }

    public class Employee
    {
        public string email { get; set; }
        public string name { get; set; }
        public int role { get; set; }
    }
}