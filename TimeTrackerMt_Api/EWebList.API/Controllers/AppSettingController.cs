
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
    public class AppSettingController : ControllerBase
    {
        private IAppSettingBusiness _appSettingBusiness;

        public AppSettingController(IAppSettingBusiness appSettingBusiness)
        {
            _appSettingBusiness = appSettingBusiness;
        }

        //[AllowAnonymous]
        //[HttpGet("getAppSettinglist")]
        //public Response GetAppSettingList()
        //{
        //    var result = _appSettingBusiness.GetAppSettingList();
        //    Response response = new Response(HttpStatusCode.OK, result, AppConstant.Success);
        //    return response;
        //}

        [AllowAnonymous]
        [HttpPost("getAppSettinglist")]
        public Response GetAppSettingList([FromBody] AppSettingPagination AppSettingPagination)
        {
            var result = _appSettingBusiness.GetAppSettingList(AppSettingPagination);
            Response response = new Response(HttpStatusCode.OK, result, AppConstant.Success);
            return response;
        }

        [AllowAnonymous]
        [HttpPost("addAppSetting")]
        public Response AddAppSetting([FromBody] AppSetting Detail)
        {
            var authentication = _appSettingBusiness.AddAppSetting(Detail);
            Response response = new Response(HttpStatusCode.OK, authentication, AppConstant.Success);
            return response;
        }

        [AllowAnonymous]
        [HttpPost("updateAppSetting")]
        public Response UpdateAppSetting([FromBody] AppSetting Detail)
        {
            var authentication = _appSettingBusiness.UpdateAppSetting(Detail);
            Response response = new Response(HttpStatusCode.OK, authentication, AppConstant.Success);
            return response;
        }


        [AllowAnonymous]
        [HttpPost("appSettingCategory")]
        public Response AppSettingCategory([FromBody] AppSetting Detail)
        {
            var authentication = _appSettingBusiness.AppSettingCategory(Detail);
            Response response = new Response(HttpStatusCode.OK, authentication, AppConstant.Success);
            return response;
        }


    }
}
