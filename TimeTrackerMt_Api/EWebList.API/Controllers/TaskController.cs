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
    public class TaskController : ControllerBase
    {
        private IProjectTaskBusiness _taskBusiness;

        public TaskController(IProjectTaskBusiness taskBusiness)
        {
            _taskBusiness = taskBusiness;            
        }

        [AllowAnonymous]
        [HttpPost("InsertTask")]
        public Response InsertTask([FromBody] ProjectTask Details)
        {
            var Data = _taskBusiness.InsertTask(Details);
            Response response = new Response(HttpStatusCode.OK, Data, AppConstant.Success);
            return response;
        }

        [HttpPost("TaskDataTableList")]
        public Response TaskDataTableList([FromBody] PaginationModel paginationModel)
        {
            var result = _taskBusiness.TaskDataTableList(paginationModel);
            Response response = new Response(HttpStatusCode.OK, result, AppConstant.Success);
            return response;
        }

        [HttpPost("updateTaskDetail")]
        public Response UpdateTaskDetail([FromBody] ProjectTask Details)
        {
            var user = _taskBusiness.UpdateTaskDetail(Details);
            Response response = new Response(HttpStatusCode.OK, user, AppConstant.Success);
            return response;
        }

        [AllowAnonymous]
        [HttpPost("softdeletetask")]
        public Response SoftDeleteTask([FromBody] ProjectTask Details)
        {
            var result = _taskBusiness.SoftDeleteTask(Details);
            Response response = new Response(HttpStatusCode.OK, result, AppConstant.Success);
            return response;
        }
    }
}