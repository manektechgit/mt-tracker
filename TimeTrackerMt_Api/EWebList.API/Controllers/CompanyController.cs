using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using EWebList.API;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TimeTrackerMt.Business.Abstract;
using TimeTrackerMt.DataRepository.Model;
using TimeTrackerMt.DataRepository.ViewModel;

namespace TimeTrackerMt.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompanyController : ControllerBase
    {
        private ICompanyBusiness _companyBusiness;

        public CompanyController(ICompanyBusiness companyBusiness)
        {
            _companyBusiness = companyBusiness;
        }

        [AllowAnonymous]
        [HttpGet("getCompanylist")]
        public Response GetCompanyList()
        {
            var result = _companyBusiness.GetCompanyList();
            Response response = new Response(HttpStatusCode.OK, result, AppConstant.Success);
            return response;
        }


        [AllowAnonymous]
        [HttpPost("getCompanypaginationDatalist")]
        public Response GetCompanypaginationDatalist([FromBody] CompanyPagination CompanyPagination)
        {
            var result = _companyBusiness.GetCompanypaginationDatalist(CompanyPagination);
            Response response = new Response(HttpStatusCode.OK, result, AppConstant.Success);
            return response;
        }

        //[AllowAnonymous]
        //[HttpGet("getCompanydropdown")]
        //public Response getCompanydropdown()
        //{
        //    var result = _companyBusiness.getCompanydropdown();
        //    Response response = new Response(HttpStatusCode.OK, result, AppConstant.Success);
        //    return response;
        //}

        [AllowAnonymous]
        [HttpPost("addCompany")]
        public Response AddCompany([FromBody] Company Detail)
        {
            var authentication = _companyBusiness.AddCompany(Detail);
            Response response = new Response(HttpStatusCode.OK, authentication, AppConstant.Success);
            return response;
        }

        [AllowAnonymous]
        [HttpPost("UpdateCompany")]
        public Response UpdateCompany([FromBody] Company Detail)
        {
            var authentication = _companyBusiness.UpdateCompany(Detail);
            Response response = new Response(HttpStatusCode.OK, authentication, AppConstant.Success);
            return response;
        }

        [AllowAnonymous]
        [HttpPost("activedeactiveCompany")]
        public Response ActiveDeactiveCompany([FromBody] Company Detail)
        {
            var result = _companyBusiness.ActiveDeactiveCompany(Detail);
            Response response = new Response(HttpStatusCode.OK, result, AppConstant.Success);
            return response;
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("IsCompanyExist")]
        public Response IsCompanyExist(string CompanyName)
        {
            var result = _companyBusiness.IsCompanyExist(CompanyName);
            Response response = new Response(HttpStatusCode.OK, result, AppConstant.Success);

            return response;
        }

    }
}