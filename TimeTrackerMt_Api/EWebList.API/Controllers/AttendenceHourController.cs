using EWebList.API;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Net;
using TimeTrackerMt.Business.Abstract;
using TimeTrackerMt.DataRepository.Model;
using TimeTrackerMt.DataRepository.ViewModel;

namespace TimeTrackerMt.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AttendenceHourController : ControllerBase
    {
        private IAttendenceHourBusiness _attendenceHourBusiness;

        public AttendenceHourController(IAttendenceHourBusiness attendenceHourBusiness)
        {
            _attendenceHourBusiness = attendenceHourBusiness;
        }

        [AllowAnonymous]
        [HttpPost("getAttendenceHourlist")]
        public Response GetAttendenceHourList([FromBody] AttendenceHourPagination AttendenceHourPagination)
        {
            var result = _attendenceHourBusiness.GetAttendenceHourList(AttendenceHourPagination);
            Response response = new Response(HttpStatusCode.OK, result, AppConstant.Success);
            return response;
        }


        [AllowAnonymous]
        [HttpPost("addAttendenceHour")]
        public Response AddAttendenceHour([FromBody] AttendenceHour Detail)
        {
            Detail.StartDate = Detail.StartDate.Value.AddDays(1);
            if (Detail.EndDate != null)
            {
                Detail.EndDate = Detail.EndDate.Value.AddDays(1);
            }
            else
            {
                Detail.EndDate = null;
            }
            //private DateTime today = DateTime.Now.AddHours(7);
            var authentication = _attendenceHourBusiness.AddAttendenceHour(Detail);
            Response response = new Response(HttpStatusCode.OK, authentication, AppConstant.Success);
            return response;
        }

        [AllowAnonymous]
        [HttpPost("updateAttendenceHour")]
        public Response UpdateAttendenceHour([FromBody] AttendenceHour Detail)
        {
            Detail.StartDate = Detail.StartDate.Value.AddDays(1);
            if (Detail.EndDate != null)
            {
                Detail.EndDate = Detail.EndDate.Value.AddDays(1);
            }
            else
            {
                Detail.EndDate = null;
            }
            var authentication = _attendenceHourBusiness.UpdateAttendenceHour(Detail);
            Response response = new Response(HttpStatusCode.OK, authentication, AppConstant.Success);
            return response;
        }

        [AllowAnonymous]
        [HttpPost("activedeactiveAttendencehour")]
        public Response ActiveDeactiveAttendenceHour([FromBody] AttendenceHour Detail)
        {
            var result = _attendenceHourBusiness.ActiveDeactiveAttendenceHour(Detail);
            Response response = new Response(HttpStatusCode.OK, result, AppConstant.Success);
            return response;
        }

    }
}
