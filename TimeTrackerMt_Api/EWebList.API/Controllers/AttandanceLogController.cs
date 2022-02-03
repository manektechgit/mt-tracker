using EWebList.API;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using TimeTrackerMt.Business.Abstract;
using TimeTrackerMt.DataRepository.Model;

namespace TimeTrackerMt.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AttandanceLogController : ControllerBase
    {
        private ImageHelpers _imageHelpers;
        private IAttandanceLogBusiness _attandanceLogBusiness;

        public AttandanceLogController(IAttandanceLogBusiness attandanceLogBusiness, ImageHelpers imageHelpers)
        {
            _attandanceLogBusiness = attandanceLogBusiness;
            _imageHelpers = imageHelpers;
        }

        [HttpPost("GetUserActivityLogs")]
        public Response GetUserActivityLogs([FromBody] AttandanceLog model)
        {
            if (model.fromDate == "")
            {
                model.fromDate = null;
                model.toDate = null;
            }
            var users = _attandanceLogBusiness.GetUserActivityLogs(model);
            Response response = new Response(HttpStatusCode.OK, users, AppConstant.Success);
            return response;
        }

        [HttpPost("InsertStartTimeLog")]
        public Response InsertStartTimeLog([FromBody] AttandanceLog model)
        {
            var result = _attandanceLogBusiness.InsertStartTimeLog(model);
            Response response = new Response(HttpStatusCode.OK, result, AppConstant.Success);
            return response;
        }

        [HttpGet("GetLogDetails")]
        public Response GetStatuslist()
        {
            var result = _attandanceLogBusiness.GetLogDetails();
            Response response = new Response(HttpStatusCode.OK, result, AppConstant.Success);
            return response;
        }

        [HttpPost("InsertEndTimeLog")]
        public Response InsertEndTimeLog([FromBody] AttandanceLog model)
        {
            var authentication = _attandanceLogBusiness.InsertEndTimeLog(model);
            Response response = new Response(HttpStatusCode.OK, authentication, AppConstant.Success);
            return response;
        }

        [HttpPost("AddStartTime")]
        public Response AddStartTime([FromBody] AttandanceLog model)
        {
            var authentication = _attandanceLogBusiness.AddStartTime(model);
            Response response = new Response(HttpStatusCode.OK, authentication, AppConstant.Success);
            return response;
        }

        [HttpGet("GetWorkingHours")]
        public Response GetWorkingHours(int UserId, int CompanyId, string Date)
        {
            var result = _attandanceLogBusiness.GetWorkingHours(CompanyId, UserId, Date);
            Response response = new Response(HttpStatusCode.OK, result, AppConstant.Success);
            return response;
        }

        [HttpPost("OfflinneSync")]
        public Response OfflinneSync([FromBody] AttandanceLog model)
        {
            var authentication = _attandanceLogBusiness.OfflinneSync(model);
            Response response = new Response(HttpStatusCode.OK, authentication, AppConstant.Success);
            return response;
        }
    }
}