namespace TimeTrackerMt.DataRepository.Model
{
    public class AuthenticateResponse
    {
        public long UserId { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int DepartmentId { get; set; }
        public string Gender { get; set; }
        public int RoleId { get; set; }
        public int StatusId { get; set; }
        public string JwtToken { get; set; }
        public long CompanyId { get; set; }
        public long ReportingTo { get; set; }
        public long CreatedBy { get; set; }
    }
}