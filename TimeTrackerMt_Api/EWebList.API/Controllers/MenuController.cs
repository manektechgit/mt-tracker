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
    public class MenuController : ControllerBase
    {
        private IMenuBusiness _menuBusiness;

        public MenuController(IMenuBusiness menuBusiness)
        {
            _menuBusiness = menuBusiness;
        }


        [AllowAnonymous]
        [HttpGet("getRoleslist")]
        public Response GetRolesList()
        {
            var result = _menuBusiness.GetRolesList();
            Response response = new Response(HttpStatusCode.OK, result, AppConstant.Success);
            return response;
        }

        [AllowAnonymous]
        [HttpPost("getMenulist")]
        public Response GetMenuList([FromBody] MenuParameters MenuParameters)
        {
            var result = _menuBusiness.GetMenuList(MenuParameters);
            Response response = new Response(HttpStatusCode.OK, result, AppConstant.Success);
            return response;
        }

        [AllowAnonymous]
        [HttpPost("activedeactivemenu")]
        public Response ActiveDeactiveMenu([FromBody] Menu Detail)
        {
            var result = _menuBusiness.ActiveDeactiveMenu(Detail);
            Response response = new Response(HttpStatusCode.OK, result, AppConstant.Success);
            return response;
        }


    }
}
