using TimeTrackerMt.Business.Abstract;
using TimeTrackerMt.DataRepository.Model;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using EWebList.API;
using Microsoft.AspNetCore.Authorization;
using TimeTrackerMt.DataRepository.ViewModel;

namespace TimeTrackerMt.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentController : ControllerBase
    {
        #region "Declarations & Constructors"D:\Shiv\TimeTrackerMt_Api\EWebList.API\Controllers\DepartmentController.cs

        private readonly IDepartmentBusiness _departmentBusiness;

        public DepartmentController(IDepartmentBusiness departmentBusiness)
        {
            _departmentBusiness = departmentBusiness;
        }

        #endregion "Declarations & Constructors"

        #region "Get Methods"
        [AllowAnonymous]
        [HttpGet("getDepartmentlist/{CompanyId}")]
        public Response GetDepartmentList(int CompanyId)
        {
            var result = _departmentBusiness.GetDepartmentList(CompanyId);
            Response response = new Response(HttpStatusCode.OK, result, AppConstant.Success);
            return response;
        }

        [AllowAnonymous]
        [HttpPost("getDepartmentpaginationDatalist")]
        public Response GetDepartmentpaginationDatalist([FromBody] DepartmentPagination DepartmentPagination)
        {
            var result = _departmentBusiness.GetDepartmentpaginationDatalist(DepartmentPagination);
            Response response = new Response(HttpStatusCode.OK, result, AppConstant.Success);
            return response;
        }


        [AllowAnonymous]
        [HttpPost("addDepartment")]
        public Response AddDepartment([FromBody] Department Detail)
        {
            var authentication = _departmentBusiness.AddDepartment(Detail);
            Response response = new Response(HttpStatusCode.OK, authentication, AppConstant.Success);
            return response;
        }

        [AllowAnonymous]
        [HttpPost("updateDepartment")]
        public Response UpdateDepartment([FromBody] Department Detail)
        {
            var authentication = _departmentBusiness.UpdateDepartment(Detail);
            Response response = new Response(HttpStatusCode.OK, authentication, AppConstant.Success);
            return response;
        }


        [AllowAnonymous]
        [HttpPost("softdeletedepartment")]
        public Response SoftDeleteDepartment([FromBody] Department Detail)
        {
            var result = _departmentBusiness.SoftDeleteDepartment(Detail);
            Response response = new Response(HttpStatusCode.OK, result, AppConstant.Success);
            return response;
        }


        #endregion "Get Methods"
    }
}