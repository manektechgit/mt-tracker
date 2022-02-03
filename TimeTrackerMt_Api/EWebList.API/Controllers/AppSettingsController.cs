using EWebList.API;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using TimeTrackerMt.Business.Abstract;
using TimeTrackerMt.DataRepository.Model;
using TimeTrackerMt.DataRepository.ViewModel;

namespace TimeTrackerMt.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AppSettingsController : ControllerBase
    {
        private IAppSettingsBusiness _appSettingsBusiness;

        public AppSettingsController(IAppSettingsBusiness appSettingsBusiness)
        {
            _appSettingsBusiness = appSettingsBusiness;
        }

        //[AllowAnonymous]
        //[HttpGet("getAppSettingslist/{companyId}")]
        //public Response GetAppSettingsList(int companyId)
        //{
        //    var result = _appSettingsBusiness.GetAppSettingsList(companyId);
        //    Response response = new Response(HttpStatusCode.OK, result, AppConstant.Success);
        //    return response;
        //}

        [AllowAnonymous]
        [HttpPost("getAppSettingslist")]
        public Response GetAppSettingsList([FromBody] AppSettingsPagination AppSettingsPagination)
        {
            var result = _appSettingsBusiness.GetAppSettingsList(AppSettingsPagination);
            Response response = new Response(HttpStatusCode.OK, result, AppConstant.Success);
            return response;
        }

        [AllowAnonymous]
        [HttpPost("updateAppSettings")]
        public Response UpdateAppSettings([FromBody] AppSettings Detail)
        {
            var authentication = _appSettingsBusiness.UpdateAppSettings(Detail);
            Response response = new Response(HttpStatusCode.OK, authentication, AppConstant.Success);
            return response;
        }

        [AllowAnonymous]
        [HttpPost("appSettingsType")]
        public Response AppSettingsType([FromBody] AppSettings Detail)
        {
            var authentication = _appSettingsBusiness.AppSettingsType(Detail);
            Response response = new Response(HttpStatusCode.OK, authentication, AppConstant.Success);
            return response;
        }

        [HttpGet("appSettingsbykey/{Parameterkey}/{companyId}")]
        public Response AppSettingsByKey(string Parameterkey, int companyId)
        {
            var result = _appSettingsBusiness.AppSettingsByKey(Parameterkey, companyId);
            Response response = new Response(HttpStatusCode.OK, result, AppConstant.Success);
            return response;
        }
    }
}