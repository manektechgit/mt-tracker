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
    public class ReportSummeryController : ControllerBase
    {
        private IReportSummeryBusiness _reportSummeryBusiness;

        public ReportSummeryController(IReportSummeryBusiness reportSummeryBusiness)
        {
            _reportSummeryBusiness = reportSummeryBusiness;
        }

        [AllowAnonymous]
        [HttpPost("GetReportSummeryList")]
        public Response GetReportSummeryList([FromBody] ReportSummery ReportSummery)
        {
            var result = _reportSummeryBusiness.GetReportSummeryList(ReportSummery);
            Response response = new Response(HttpStatusCode.OK, result, AppConstant.Success);
            return response;
        }
        
        [AllowAnonymous]
        [HttpPost("getSummeryDatelist")]
        public Response GetDatelist([FromBody] ReportSummery ReportsParameters)
        {
            var result = _reportSummeryBusiness.GetDateList(ReportsParameters);
            Response response = new Response(HttpStatusCode.OK, result, AppConstant.Success);
            return response;
        }

        
    }
}