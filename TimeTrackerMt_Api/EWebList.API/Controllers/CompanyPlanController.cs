using EWebList.API;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using TimeTrackerMt.Business.Abstract;
using TimeTrackerMt.DataRepository.Model;

namespace TimeTrackerMt.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompanyPlanController : ControllerBase
    {
        private ICompanyPlanBusiness _companyPlanBusiness;

        public CompanyPlanController(ICompanyPlanBusiness companyPlanBusiness)
        {
            _companyPlanBusiness = companyPlanBusiness;
        }

        [HttpGet("GetPlansForCompany")]
        public Response GetPlansForCompany()
        {
            var plans = _companyPlanBusiness.GetPlansForCompany();
            Response response = new Response(HttpStatusCode.OK, plans, AppConstant.Success);
            return response;
        }

        [HttpGet("GetCompanyPlan/{CompanyId}")]
        public Response GetCompanyPlan(int CompanyId)
        {
            var plan = _companyPlanBusiness.GetCompanyPlan(CompanyId);
            Response response = new Response(HttpStatusCode.OK, plan, AppConstant.Success);
            return response;
        }

        [HttpPost("BuyCompanyPlan")]
        public Response BuyCompanyPlan([FromBody] CompanyPlan model)
        {
            var plan = _companyPlanBusiness.InsertCompanyPlan(model);
            Response response = new Response(HttpStatusCode.OK, plan, AppConstant.Success);
            return response;
        }

        [HttpPost("UpdateCompanyPlan")]
        public Response UpdateCompanyPlan([FromBody] CompanyPlan model)
        {
            var plan = _companyPlanBusiness.UpdateCompanyPlan(model);
            Response response = new Response(HttpStatusCode.OK, plan, AppConstant.Success);
            return response;
        }
    }
}
