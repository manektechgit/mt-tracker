using System.Collections.Generic;
using TimeTrackerMt.DataRepository.Model;

namespace TimeTrackerMt.Business.Abstract
{
    public interface IUserMasterBusiness
    {
        AuthenticateResponse AuthenticateUser(AuthenticateRequest authenticateRequest);

        IEnumerable<UserMaster> UserDataTableList(PaginationModel paginationModel);

        string UserAdd(UserMaster User);
        EmailExist IsEmailExist(EmailExist User);
        List<EmailExist> IsMultipleEmailExist(string Emails);
        UserMaster UserUpdate(UserMaster Update);
        UserMaster UpdateUserDetail(UserMaster Update);
        UserMaster InviteUserUpdate(UserMaster Update);
        IEnumerable<DropdownModel> GetUsersList(int CompanyId, int DepartmentId);
        IEnumerable<DropdownModel> GetRolelist();

        IEnumerable<DropdownModel> GetLoginRoleList(int LoginRoleId);

        IEnumerable<UserMaster> GetStatuslist();

        IEnumerable<UserMaster> GetScreenCastlist();

        IEnumerable<DropdownMaster> GetDropdownList(string category);

        IEnumerable<UserMaster> GetReportinglist(int CompanyId);

        UserMaster GetUserDetailById(long userId);

        UserMaster GetUserById(long userId);

        UserMaster GetUserDetailByEmail(string emailId);

        bool ForgetPasswordAndEmail(string EmailId);

        int ResetPassword(UserMaster user);

        int UpdateUserMaster(UserMaster userMaster);

        IEnumerable<UserMaster> GetAllUsers();

        UserMaster ActiveDeactiveUserMaster(UserMaster User);

        string InviteUser(UserMaster User);
        UserMaster InviteTeam(InviteTeam Team);

        string GetUserScreenCastTime(long userId);

        IEnumerable<TimeZoneMaster> GetTimeZonelist();

        DashboardControl GetUserDashboardControl(DashboardControl model);

        string GetUserWorkingHours(UserWorkingHours UserWorkingHoursParameters);
    }
}