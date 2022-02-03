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
    public class UserProjectsController : ControllerBase
    {
        private ImageHelpers _imageHelpers;
        private IUserProjectsBusiness _userProjectsBusiness;

        public UserProjectsController(IUserProjectsBusiness userProjectsBusiness, ImageHelpers imageHelpers)
        {
            _userProjectsBusiness = userProjectsBusiness;
            _imageHelpers = imageHelpers;
        }

        [HttpGet("GetProjectUsers/{ProjectId}")]
        public Response GetProjectUsers(int ProjectId)
        {
            var users = _userProjectsBusiness.GetProjectUsers(ProjectId);
            Response response = new Response(HttpStatusCode.OK, users, AppConstant.Success);
            return response;
        }

        [HttpGet("DeleteProjectUsers/{Id}")]
        public Response DeleteProjectUsers(int Id)
        {
            var users = _userProjectsBusiness.DeleteProjectUsers(Id);
            Response response = new Response(HttpStatusCode.OK, users, AppConstant.Success);
            return response;
        }

        [AllowAnonymous]
        [HttpPost("InsertProjectWiseUsers")]
        public Response InsertProjectWiseUsers(UserProjects User)
        {
            UserProjects Data = new UserProjects();

          //  var ProjectId = User.ToList()[0].ProjectId;

            //if (ProjectId > 0)
            //{

            //    _userProjectsBusiness.DeleteProjectUsers(ProjectId);
            //}

            //foreach (var r in User)
            //{
                Data.UserId = User.UserId;
                Data.ProjectId = User.ProjectId;
                Data.RoleId = User.RoleId;
                Data.CreatedBy = User.CreatedBy;
            var Messages =  _userProjectsBusiness.InsertProjectWiseUsers(Data);
           // }
           
            Response response = new Response(HttpStatusCode.OK, Messages,AppConstant.Success);
            return response;
        }

        [HttpGet("GetUserProjects/{userId}")]
        public Response GetUserProjects(int userId)
        {
            var users = _userProjectsBusiness.GetUserProjects(userId);
            Response response = new Response(HttpStatusCode.OK, users, AppConstant.Success);
            return response;
        }

        [HttpGet("GetUserProjectswithStatus/{userId}")]
        public Response GetUserProjectswithStatus(int userId)
        {
            var users = _userProjectsBusiness.GetUserProjectswithStatus(userId);
            Response response = new Response(HttpStatusCode.OK, users, AppConstant.Success);
            return response;
        }

        [HttpGet("GetUserProjectTasks/{projectId}")]
        public Response GetUserProjectTasks(long projectId)
        {
            var projectTasks = _userProjectsBusiness.GetUserProjectTask(projectId);
            Response response = new Response(HttpStatusCode.OK, projectTasks, AppConstant.Success);
            return response;
        }

        //[AllowAnonymous]
        //[HttpPost("InsertUserProject")]
        //public Response InsertUserProject([FromBody] IEnumerable<UserProjects> Project)
        //{
        //    UserProjects Data = new UserProjects();

        //    var UserId = Project.ToList()[0].UserId;

        //    if (UserId > 0 )
        //    {

        //        _userProjectsBusiness.DeleteUserProjects(UserId);
        //    }

        //    foreach (var r in Project)
        //    {
        //        Data.UserId = r.UserId;
        //        Data.ProjectId = r.ProjectId;                
        //        Data.CreatedBy = r.CreatedBy;              
        //        _userProjectsBusiness.InsertUserProject(Data);
        //    }

        //     //   var authentication = _userProjectsBusiness.InsertUserProject(Project.FirstOrDefault());
        //    Response response = new Response(HttpStatusCode.OK, AppConstant.Success);
        //    return response;
        //}

    }
}