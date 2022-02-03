
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

namespace TimeTrackerMt.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DynamicMenuController : ControllerBase
    {
        private IDynamicMenuBusiness _dynamicMenuBusiness;

        public DynamicMenuController(IDynamicMenuBusiness dynamicMenuBusiness)
        {
            _dynamicMenuBusiness = dynamicMenuBusiness;
        }

        [AllowAnonymous]
        [HttpPost("getDynamicMenulist")]
        public Response GetDynamicMenuList([FromBody] DynamicMenu DynamicMenu)
        {
            var result = _dynamicMenuBusiness.GetDynamicMenuList(DynamicMenu);
            Response response = new Response(HttpStatusCode.OK, result, AppConstant.Success);
            return response;
        }
    }
}
