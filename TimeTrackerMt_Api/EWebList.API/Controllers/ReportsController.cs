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
    public class ReportsController : ControllerBase
    {
        private IReportsBusiness _reportsBusiness;

        public ReportsController(IReportsBusiness reportsBusiness)
        {
            _reportsBusiness = reportsBusiness;
        }

        //[AllowAnonymous]
        //[HttpGet("getReportsList")]
        //public Response GetReportsList()
        //{
        //    var result = _reportsBusiness.GetReportsList();
        //    Response response = new Response(HttpStatusCode.OK, result, AppConstant.Success);
        //    return response;
        //}
        //[AllowAnonymous]
        //[HttpPost("getReportsList/{UserId}")]
        //public Response GetReportsList(int UserId,string fromDate, string toDate)
        //{
         // var result = _reportsBusiness.GetReportsList(UserId, fromDate, toDate);
        //    Response response = new Response(HttpStatusCode.OK, result, AppConstant.Success);
        //    return response;
        //}


        [AllowAnonymous]
        [HttpPost("getReportsList")]
        public Response GetReportsList([FromBody] ReportsParameters ReportsParameters)
        {
            var result = _reportsBusiness.GetReportsList(ReportsParameters);
            Response response = new Response(HttpStatusCode.OK, result, AppConstant.Success);
            return response;
        }

        //[AllowAnonymous]
        //[HttpGet("getUserlist")]
        //public Response GetUserlist()
        //{
        //    var result = _reportsBusiness.GetUserList();
        //    Response response = new Response(HttpStatusCode.OK, result, AppConstant.Success);
        //    return response;
        //}

        [AllowAnonymous]
        [HttpPost("getUserlist")]
        public Response GetUserlist([FromBody] ReportsParameters ReportsParameters)
        {
            var result = _reportsBusiness.GetUserList(ReportsParameters);
            Response response = new Response(HttpStatusCode.OK, result, AppConstant.Success);
            return response;
        }

        [AllowAnonymous]
        [HttpPost("getProjectlist")]
        public Response GetProjectlist([FromBody] ReportsParameters ReportsParameters)
        {
            var result = _reportsBusiness.GetProjectlist(ReportsParameters);
            Response response = new Response(HttpStatusCode.OK, result, AppConstant.Success);
            return response;
        }


        //[AllowAnonymous]
        //[HttpGet("getDatelist")]
        //public Response GetDatelist()
        //{
        //    var result = _reportsBusiness.GetDateList();
        //    Response response = new Response(HttpStatusCode.OK, result, AppConstant.Success);
        //    return response;
        //}


        [AllowAnonymous]
        [HttpPost("getDatelist")]
        public Response GetDatelist([FromBody] ReportsParameters ReportsParameters)
        {
            var result = _reportsBusiness.GetDateList(ReportsParameters);
            Response response = new Response(HttpStatusCode.OK, result, AppConstant.Success);
            return response;
        }

    }
}
