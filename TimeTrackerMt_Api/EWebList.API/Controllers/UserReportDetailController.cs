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
    public class UserReportDetailController : ControllerBase
    {
        private IUserReportDetailBusiness _userReportDetailBusiness;

        public UserReportDetailController(IUserReportDetailBusiness userReportDetailBusiness)
        {
            _userReportDetailBusiness = userReportDetailBusiness;
        }

        [AllowAnonymous]
        [HttpPost("getUserReportDetail")]
        public Response getUserReportDetail([FromBody] UserReportsParameter UserReportsParameter)
        {
            var result = _userReportDetailBusiness.getUserReportDetail(UserReportsParameter);
            Response response = new Response(HttpStatusCode.OK, result, AppConstant.Success);
            return response;
        }
    }
}