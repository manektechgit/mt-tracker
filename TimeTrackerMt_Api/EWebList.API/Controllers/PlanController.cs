using System.Net;
using EWebList.API;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TimeTrackerMt.Business.Abstract;
using TimeTrackerMt.DataRepository.Model;
using TimeTrackerMt.DataRepository.ViewModel;

namespace TimeTrackerMt.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlanController : ControllerBase
    {
        private IPlanBusiness _PlanBusiness;

        public PlanController(IPlanBusiness PlanBusiness)
        {
            _PlanBusiness = PlanBusiness;
        }

        [AllowAnonymous]
        [HttpPost("getplanlist")]
        public Response GetPlanlist([FromBody] PlanPagination PlanPagination)
        {
            var result = _PlanBusiness.GetPlanList(PlanPagination);
            Response response = new Response(HttpStatusCode.OK, result, AppConstant.Success);
            return response;
        }

        [AllowAnonymous]
        [HttpPost("addPlan")]
        public Response AddPlan([FromBody] PlanMaster Detail)
        {
            var authentication = _PlanBusiness.AddPlan(Detail);
            Response response = new Response(HttpStatusCode.OK, authentication, AppConstant.Success);
            return response;
        }

        [AllowAnonymous]
        [HttpPost("updatePlan")]
        public Response UpdatePlan([FromBody] PlanMaster Detail)
        {
            var authentication = _PlanBusiness.UpdatePlan(Detail);
            Response response = new Response(HttpStatusCode.OK, authentication, AppConstant.Success);
            return response;
        }

        [AllowAnonymous]
        [HttpPost("activedeactivePlan")]
        public Response ActiveDeactivePlan([FromBody] PlanMaster Detail)
        {
            var result = _PlanBusiness.ActiveDeactivePlan(Detail);
            Response response = new Response(HttpStatusCode.OK, result, AppConstant.Success);
            return response;
        }

        [AllowAnonymous]
        [HttpGet("getPlanByID/{planId}")]
        public Response GetPlanByID(long PlanId)
        {
            var result = _PlanBusiness.GetPlanByID(PlanId);
            Response response = new Response(HttpStatusCode.OK, result, AppConstant.Success);
            return response;
        }

        [AllowAnonymous]
        [HttpGet("checkAnyPlanDefault")]
        public Response CheckAnyPlanDefault()
        {
            var result = _PlanBusiness.CheckAnyPlanDefault();
            Response response = new Response(HttpStatusCode.OK, result, AppConstant.Success);
            return response;
        }

    }
}