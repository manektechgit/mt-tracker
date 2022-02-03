using EWebList.API;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TimeTrackerMt.API.EasyPostModals;

namespace TimeTrackerMt.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EasyPostController : ControllerBase
    {
        [AllowAnonymous]
        [HttpPost("addeasypostuser")]
        public EasyPostAuth AddEasyPostUser([FromBody] AddNewUser addNewUser)
        {
            EasyPostAuth response = new EasyPostAuth();
            response.AuthorizationToken = "db71a0f2-2e9c-4379-8b69-008555aafdc5";
            response.ErrorMessage = "";
            response.IsError = false;
            Logger.Info(addNewUser);
            return response;
        }
    }
}