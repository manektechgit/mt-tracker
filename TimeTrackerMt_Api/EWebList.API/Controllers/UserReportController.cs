using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using EWebList.API;
using Microsoft.AspNetCore.Authorization;
using TimeTrackerMt.Business.Abstract;
using TimeTrackerMt.DataRepository.Model;
using TimeTrackerMt.DataRepository.ViewModel;

namespace TimeTrackerMt.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserReportController : ControllerBase
    {
        private IUserReportBusiness _userReportBusiness;

        public UserReportController(IUserReportBusiness userReportsBusiness)
        {
            _userReportBusiness = userReportsBusiness;
        }

        [AllowAnonymous]
        [HttpPost("getUserReportsList")]
        public Response getUserReportsList([FromBody] UserReportsParameter UserReportsParameter)
        {
            var result = _userReportBusiness.getUserReportsList(UserReportsParameter);
            Response response = new Response(HttpStatusCode.OK, result, AppConstant.Success);
            return response;
        }

        [AllowAnonymous]
        [HttpPost("GetUserlist")]
        public Response GetUserlist([FromBody] UserReportsParameter UserReportsParameter)
        {
            var result = _userReportBusiness.GetUserlist(UserReportsParameter);
            Response response = new Response(HttpStatusCode.OK, result, AppConstant.Success);
            return response;
        }

        [AllowAnonymous]
        [HttpPost("getUserReportDetail")]
        public Response getUserReportDetail([FromBody] UserReportsParameter UserReportsParameter)
        {
            var result = _userReportBusiness.getUserReportDetail(UserReportsParameter);
            Response response = new Response(HttpStatusCode.OK, result, AppConstant.Success);
            return response;
        }
    }
}
