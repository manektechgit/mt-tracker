using EWebList.API;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using TimeTrackerMt.Business.Abstract;
using TimeTrackerMt.Common;
using TimeTrackerMt.DataRepository.Model;

namespace TimeTrackerMt.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        #region "Declarations & Constructors"

        private ImageHelpers _imageHelpers;
        private IUserMasterBusiness _userMasterBusiness;
        
        public UserController(IUserMasterBusiness userMasterBusiness, ImageHelpers imageHelpers)
        {
            _userMasterBusiness = userMasterBusiness;
            _imageHelpers = imageHelpers;
        }

        #endregion "Declarations & Constructors"

        [AllowAnonymous]
        [HttpPost("authenticateuser")]
        public Response AuthenticateUser([FromBody] AuthenticateRequest authenticateRequest)
        {
            var authentication = _userMasterBusiness.AuthenticateUser(authenticateRequest);
            Response response = new Response(HttpStatusCode.OK, authentication, AppConstant.Success);
            return response;
        }

        [HttpPost("UserDataTableList")]
        public Response UserDataTableList([FromBody] PaginationModel paginationModel)
        {
            var result = _userMasterBusiness.UserDataTableList(paginationModel);
            //result.Password = CrptographyEngine.Decrypt(result.Password);

            for (var i = 0; i < result.ToList().Count; i++)
            {
                if (result.ToList()[i].Password != null)
                {///var Pass = AdminManager.GetBatchGrantTableData(result.ToList()[i].Password);
                    result.ToList()[i].Password = CrptographyEngine.Decrypt(result.ToList()[i].Password);
                    //result = result.ToList()[].Password
                }
            }

            Response response = new Response(HttpStatusCode.OK, result, AppConstant.Success);
            return response;
        }

        [AllowAnonymous]
        [HttpPost("useradd")]
        public Response UserAdd([FromBody] UserMaster User)
        {
            var authentication = _userMasterBusiness.UserAdd(User);
            Response response = new Response(HttpStatusCode.OK, authentication, AppConstant.Success);
            return response;
        }

        [AllowAnonymous]
        [HttpPost("userinvite")]
        public Response UserInvite([FromBody] UserMaster User)
        {
            var authentication = _userMasterBusiness.InviteUser(User);
            Response response = new Response(HttpStatusCode.OK, authentication, AppConstant.Success);
            return response;
        }

        [AllowAnonymous]
        [HttpPost("inviteteam")]
        public Response InviteTeam([FromBody] InviteTeam Team)
        {
            Team.Password = CrptographyEngine.Encrypt(Team.Password);
            UserMaster authentication = _userMasterBusiness.InviteTeam(Team);
            authentication.Password = CrptographyEngine.Decrypt(Team.Password);
            Response response = new Response(HttpStatusCode.OK, authentication, AppConstant.Success);
            return response;
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("IsEmailExist")]
        public Response IsEmailExist([FromBody] EmailExist User)
        {
            var result = _userMasterBusiness.IsEmailExist(User);
            Response response = new Response(HttpStatusCode.OK, result, AppConstant.Success);

            return response;
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("IsMultipleEmailExist")]
        public Response IsMultipleEmailExist(string Emails)
        {
            var result = _userMasterBusiness.IsMultipleEmailExist(Emails);
            Response response = new Response(HttpStatusCode.OK, result, AppConstant.Success);

            return response;
        }

        [AllowAnonymous]
        [HttpPost("UserUpdate")]
        public Response UserUpdate([FromBody] UserMaster Update)
        {
            var authentication = _userMasterBusiness.UserUpdate(Update);
            Response response = new Response(HttpStatusCode.OK, authentication, AppConstant.Success);
            return response;
        }

        [AllowAnonymous]
        [HttpPost("UpdateUserDetail")]
        public Response UpdateUserDetail([FromBody] UserMaster Update)
        {
            var authentication = _userMasterBusiness.UpdateUserDetail(Update);
            Response response = new Response(HttpStatusCode.OK, authentication, AppConstant.Success);
            return response;
        }

        [AllowAnonymous]
        [HttpPost("InviteUserUpdate")]
        public Response InviteUserUpdate([FromBody] UserMaster Update)
        {
            var authentication = _userMasterBusiness.InviteUserUpdate(Update);
            Response response = new Response(HttpStatusCode.OK, authentication, AppConstant.Success);
            return response;
        }

        [HttpGet("GetUserList")]
        public Response GetUsersList(int CompanyId, int DepartmentId)
        {
            var users = _userMasterBusiness.GetUsersList(CompanyId, DepartmentId);
            Response response = new Response(HttpStatusCode.OK, users, AppConstant.Success);
            return response;
        }

        [AllowAnonymous]
        [HttpGet("getRolelist")]
        public Response GetRolelist()
        {
            var result = _userMasterBusiness.GetRolelist();
            Response response = new Response(HttpStatusCode.OK, result, AppConstant.Success);
            return response;
        }

        [AllowAnonymous]
        [HttpGet("getLoginRoleList/{LoginRoleId}")]
        public Response GetLoginRoleList(int LoginRoleId)
        {
            var result = _userMasterBusiness.GetLoginRoleList(LoginRoleId);
            Response response = new Response(HttpStatusCode.OK, result, AppConstant.Success);
            return response;
        }

        [AllowAnonymous]
        [HttpGet("getStatuslist")]
        public Response GetStatuslist()
        {
            var result = _userMasterBusiness.GetStatuslist();
            Response response = new Response(HttpStatusCode.OK, result, AppConstant.Success);
            return response;
        }

        [AllowAnonymous]
        [HttpGet("getReportinglist/{CompanyId}")]
        public Response GetReportinglist(int CompanyId)
        {
            var result = _userMasterBusiness.GetReportinglist(CompanyId);
            Response response = new Response(HttpStatusCode.OK, result, AppConstant.Success);
            return response;
        }

        [AllowAnonymous]
        [HttpGet("getScreenCastlist")]
        public Response GetScreenCastlist()
        {
            var result = _userMasterBusiness.GetScreenCastlist();
            Response response = new Response(HttpStatusCode.OK, result, AppConstant.Success);
            return response;
        }

        [AllowAnonymous]
        [HttpGet("getDropdownList")]
        public Response GetDropdownList(string category)
        {
            var result = _userMasterBusiness.GetDropdownList(category);
            Response response = new Response(HttpStatusCode.OK, result, AppConstant.Success);
            return response;
        }

        #region "Get Methods"

        [AllowAnonymous]
        [HttpGet("forgetpassword/{email}")]
        public Response ForgetPassword(string email)
        {
            var users = _userMasterBusiness.ForgetPasswordAndEmail(email);
            Response response = new Response(HttpStatusCode.OK, users, AppConstant.Success);
            return response;
        }

        [HttpGet("getuserdetailbyid/{userId}")]
        public Response GetUserDetailById(long userId)
        {
            var users = _userMasterBusiness.GetUserDetailById(userId);
            Response response = new Response(HttpStatusCode.OK, users, AppConstant.Success);
            return response;
        }

        [AllowAnonymous]
        [HttpGet("getuserbyid/{userId}")]
        public Response GetUserById(long userId)
        {
            var users = _userMasterBusiness.GetUserById(userId);
            Response response = new Response(HttpStatusCode.OK, users, AppConstant.Success);
            return response;
        }

        [AllowAnonymous]
        [HttpGet("getuserdetailforresetpassword/{userId}")]
        public Response GetUserDetailForResetPassword(long userId)
        {
            var users = _userMasterBusiness.GetUserDetailById(userId);
            if (users != null)
            {
                users.Password = "";
            }
            Response response = new Response(HttpStatusCode.OK, users, AppConstant.Success);
            return response;
        }

        [AllowAnonymous]
        [HttpPost("resetPassword")]
        public Response ResetPassword([FromBody] UserMaster user)
        {
            var Data = _userMasterBusiness.ResetPassword(user);
            Response response = new Response(HttpStatusCode.OK, Data, AppConstant.Success);
            return response;
        }

        [AllowAnonymous]
        [HttpGet("getusers")]
        public Response GetUsers()
        {
            var users = _userMasterBusiness.GetAllUsers();
            Response response = new Response(HttpStatusCode.OK, users, AppConstant.Success);
            return response;
        }

        [HttpGet("getUserScreenCastTime/{userId}")]
        public Response GetUserScreenCastTime(long userId)
        {
            var castTime = _userMasterBusiness.GetUserScreenCastTime(userId);
            Response response = new Response(HttpStatusCode.OK, castTime, AppConstant.Success);
            return response;
        }

        #endregion "Get Methods"

        #region "Post Methods"

        [HttpPost("updateusermaster")]
        public Response UpdateUserMaster([FromBody] UserMaster userMaster)
        {
            var user = _userMasterBusiness.UpdateUserMaster(userMaster);
            Response response = new Response(HttpStatusCode.OK, user, AppConstant.Success);
            return response;
        }


        [AllowAnonymous]
        [HttpPost("activedeactiveusermaster")]
        public Response ActiveDeactiveUserMaster([FromBody] UserMaster User)
        {
            var user = _userMasterBusiness.ActiveDeactiveUserMaster(User);
            Response response = new Response(HttpStatusCode.OK, user, AppConstant.Success);
            return response;
        }

        [HttpPost("GetUserDashboardControl")]
        public Response GetUserDashboardControl([FromBody] DashboardControl model)
        {
            var result = _userMasterBusiness.GetUserDashboardControl(model);
            Response response = new Response(HttpStatusCode.OK, result, AppConstant.Success);
            return response;
        }

        #endregion "Post Methods"

        [AllowAnonymous]
        [HttpGet("getTimeZonelist")]
        public Response GetTimeZonelist()
        {
            var result = _userMasterBusiness.GetTimeZonelist();
            Response response = new Response(HttpStatusCode.OK, result, AppConstant.Success);
            return response;
        }

        [AllowAnonymous]
        [HttpPost("getUserWorkingHours")]
        public Response GetUserWorkingHours([FromBody] UserWorkingHours UserWorkingHoursParameters)
        {
            var result = _userMasterBusiness.GetUserWorkingHours(UserWorkingHoursParameters);
            Response response = new Response(HttpStatusCode.OK, result, AppConstant.Success);
            return response;
        }
    }
}