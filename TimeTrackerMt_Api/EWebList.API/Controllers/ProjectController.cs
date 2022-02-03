using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using EWebList.API;
using EWebList.DataRepository.ViewModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TimeTrackerMt.Business.Abstract;
using TimeTrackerMt.DataRepository.Model;

namespace TimeTrackerMt.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectController : ControllerBase
    {
        private IProjectBusiness _projectBusiness;

        public ProjectController(IProjectBusiness projectBusiness)
        {
            _projectBusiness = projectBusiness;            
        }

        [AllowAnonymous]
        [HttpGet("getProjectlist")]
        public Response GetDropDownList()
        {
            var result = _projectBusiness.GetProjectlist();
            Response response = new Response(HttpStatusCode.OK, result, AppConstant.Success);
            return response;
        }

        [AllowAnonymous]
        [HttpGet("getProjectListByUser")]
        public Response GetProjectListByUser(int UserId)
        {
            var result = _projectBusiness.GetProjectlistByUser(UserId);
            Response response = new Response(HttpStatusCode.OK, result, AppConstant.Success);
            return response;
        }

        [AllowAnonymous]
        [HttpPost("InsertProject")]
        public Response InsertProject([FromBody] Project Details)
        {
            var Data = _projectBusiness.InsertProject(Details);
            Response response = new Response(HttpStatusCode.OK, Data, AppConstant.Success);
            return response;
        }

        [HttpPost("ProjectDataTableList")]
        public Response ProjectDataTableList([FromBody]PaginationModel paginationModel)
        {
            var result = _projectBusiness.ProjectDataTableList(paginationModel);
            Response response = new Response(HttpStatusCode.OK, result, AppConstant.Success);
            return response;
        }

        [HttpGet("getProjectDetailById/{projectId}")]
        public Response GetProjectDetailById(long projectId)
        {
            var users = _projectBusiness.GetProjectDetailById(projectId);
            Response response = new Response(HttpStatusCode.OK, users, AppConstant.Success);
            return response;
        }


        [HttpPost("updateProjectDetail")]
        public Response UpdateProjectDetail([FromBody] Project Details)
        {
            //processImageUpload(userMaster);
            var user = _projectBusiness.UpdateProjectDetail(Details);
            Response response = new Response(HttpStatusCode.OK, user, AppConstant.Success);
            return response;
        }

        [AllowAnonymous]
        [HttpGet("GetProjectDropDownList")]
        public Response GetProjectDropDownList(int CompanyId , int DepartmentId)
        {
            var result = _projectBusiness.GetProjectDropDownList(CompanyId, DepartmentId);
            Response response = new Response(HttpStatusCode.OK, result, AppConstant.Success);
            return response;
        }

        [AllowAnonymous]
        [HttpGet("GetProjectDropDownListByUserId")]
        public Response GetProjectDropDownListByUserId(int UserId)
        {
            var result = _projectBusiness.GetProjectDropDownListByUserId(UserId);
            Response response = new Response(HttpStatusCode.OK, result, AppConstant.Success);
            return response;
        }
        [AllowAnonymous]
        [HttpGet("GetProjectsByCompanyAndDepartment")]
        public Response GetProjectsByCompanyAndDepartment(int CompanyId, string DepartmentList)
        {
            var result = _projectBusiness.GetProjectsByCompanyAndDepartment(CompanyId, DepartmentList);
            Response response = new Response(HttpStatusCode.OK, result, AppConstant.Success);
            return response;
        }

        [AllowAnonymous]
        [HttpPost("softdeleteproject")]
        public Response SoftDeleteProject([FromBody] Project Details)
        {
            var result = _projectBusiness.SoftDeleteProject(Details);
            Response response = new Response(HttpStatusCode.OK, result, AppConstant.Success);
            return response;
        }
    }
}