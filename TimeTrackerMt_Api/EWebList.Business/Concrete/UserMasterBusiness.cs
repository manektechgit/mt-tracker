using System.Collections.Generic;
using TimeTrackerMt.Business.Abstract;
using TimeTrackerMt.Common;
using TimeTrackerMt.DataRepository.Abstract;
using TimeTrackerMt.DataRepository.Model;

namespace TimeTrackerMt.Business.Concrete
{
    public class UserMasterBusiness : IUserMasterBusiness
    {
        private readonly IUserMasterRepository _userMasterRepository;
        private readonly Email _email;

        public UserMasterBusiness(IUserMasterRepository userMasterRepository, Email email)
        {
            _userMasterRepository = userMasterRepository;
            _email = email;
        }

        public AuthenticateResponse AuthenticateUser(AuthenticateRequest authenticateRequest)
        {
            authenticateRequest.Password = CrptographyEngine.Encrypt(authenticateRequest.Password);
            var result = _userMasterRepository.AuthenticateUser(authenticateRequest);
            if (result != null)
            {
                result.Password = CrptographyEngine.Decrypt(result.Password);
            }
            return result;
        }

        public IEnumerable<UserMaster> UserDataTableList(PaginationModel paginationModel)
        {
            return _userMasterRepository.UserDataTableList(paginationModel);
        }

        public string UserAdd(UserMaster User)
        {
            //User.Password = CrptographyEngine.Encrypt(User.Password);
            var result = _userMasterRepository.UserAdd(User);
            _email.SuccessMessage(User);
            return result;
        }
        public EmailExist IsEmailExist(EmailExist User)
        {
            return _userMasterRepository.IsEmailExist(User);
        }
        public List<EmailExist> IsMultipleEmailExist(string Emails)
        {
            return _userMasterRepository.IsMultipleEmailExist(Emails);
        }
        public UserMaster UserUpdate(UserMaster Update)
        {
            Update.Password = CrptographyEngine.Encrypt(Update.Password);
            var result = _userMasterRepository.UserUpdate(Update);

            return result;
        }
        public UserMaster UpdateUserDetail(UserMaster Update)
        {
            if (!string.IsNullOrWhiteSpace(Update.Password))
            {
                Update.Password = CrptographyEngine.Encrypt(Update.Password);
            }
            var result = _userMasterRepository.UpdateUserDetail(Update);

            return result;
        }
        public UserMaster InviteUserUpdate(UserMaster Update)
        {
            Update.Password = CrptographyEngine.Encrypt(Update.Password);
            var result = _userMasterRepository.InviteUserUpdate(Update);

            return result;
        }
        public IEnumerable<DropdownModel> GetUsersList(int CompanyId, int DepartmentId)
        {
            return _userMasterRepository.GetUsersList(CompanyId, DepartmentId);
        }
        public IEnumerable<DropdownModel> GetRolelist()
        {
            return _userMasterRepository.GetRolelist();
        }

        public IEnumerable<DropdownModel> GetLoginRoleList(int LoginRoleId)
        {
            return _userMasterRepository.GetLoginRoleList(LoginRoleId);
        }


        public IEnumerable<UserMaster> GetStatuslist()
        {
            return _userMasterRepository.GetStatuslist();
        }

        public IEnumerable<UserMaster> GetScreenCastlist()
        {
            return _userMasterRepository.GetScreenCastlist();
        }

        public IEnumerable<DropdownMaster> GetDropdownList(string category)
        {
            return _userMasterRepository.GetDropdownList(category);
        }

        public IEnumerable<UserMaster> GetReportinglist(int CompanyId)
        {
            return _userMasterRepository.GetReportinglist(CompanyId);
        }

        public bool ForgetPasswordAndEmail(string EmailId)
        {
            var user = _userMasterRepository.GetUserDetailByEmail(EmailId);
            if (user == null)
            {
                return false;
            }
            //else if (user.IsActive == false)
            //{
            //    return false;
            //}
            else
            {
                _email.ForgetPasswordMail(user);
                return true;
            }
        }

        public UserMaster GetUserDetailByEmail(string emailId)
        {
            return _userMasterRepository.GetUserDetailByEmail(emailId);
        }

        public UserMaster GetUserDetailById(long userId)
        {
            var result = _userMasterRepository.GetUserDetailById(userId);
            if (result != null)
            {
                result.Password = CrptographyEngine.Decrypt(result.Password);
            }
            return result;
        }

        public UserMaster GetUserById(long userId)
        {
            var result = _userMasterRepository.GetUserById(userId);
            return result;
        }

        public int ResetPassword(UserMaster user)
        {
            user.Password = CrptographyEngine.Encrypt(user.Password);
            var result = _userMasterRepository.ResetPassword(user);
            //_email.PasswordChangeSucessMail(userMaster);
            return result;
        }

        public int UpdateUserMaster(UserMaster userMaster)
        {
            userMaster.Password = CrptographyEngine.Encrypt(userMaster.Password);
            return _userMasterRepository.UpdateUserMaster(userMaster);
        }

        public IEnumerable<UserMaster> GetAllUsers()
        {
            return _userMasterRepository.GetAllUsers();
        }

        public UserMaster ActiveDeactiveUserMaster(UserMaster User)
        {

            var result = _userMasterRepository.ActiveDeactiveUserMaster(User);

            return result;
        }

        public string InviteUser(UserMaster User)
        {
            var userId = _userMasterRepository.InviteUser(User);
            if (long.TryParse(userId, out long id))
                _email.InviteUserMail(id, User.Email);

            return userId;
        }

        public UserMaster InviteTeam(InviteTeam Team)
        {
            List<UserMaster> userData = _userMasterRepository.InviteTeam(Team);
            if (Team.Employees != null && Team.Employees.Count > 0)
            {
                foreach (var item in userData)
                {
                    if (item.Email != Team.UserEmail)
                    {
                        _email.InviteUserMail(item.UserId, item.Email);
                    }
                }   
            }

            UserMaster loginUser = new UserMaster();
            loginUser.Email = Team.UserEmail;
            loginUser.Password = Team.Password;
            return loginUser;
        }

        public string GetUserScreenCastTime(long userId)
        {
            return _userMasterRepository.GetUserScreenCastTime(userId);
        }

        public IEnumerable<TimeZoneMaster> GetTimeZonelist()
        {
            return _userMasterRepository.GetTimeZonelist();
        }

        public DashboardControl GetUserDashboardControl(DashboardControl model)
        {
            return _userMasterRepository.GetUserDashboardControl(model);
        }

        public string GetUserWorkingHours(UserWorkingHours UserWorkingHoursParameters)
        {
            return _userMasterRepository.GetUserWorkingHours(UserWorkingHoursParameters);
        }
    }
}