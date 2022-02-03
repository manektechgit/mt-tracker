using EWebList.API;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Net;
using TimeTrackerMt.Business.Abstract;
using TimeTrackerMt.DataRepository.Model;
using TimeTrackerMt.DataRepository.ViewModel;

namespace TimeTrackerMt.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserScreenLogController : ControllerBase
    {
        #region "Decalration"

        private readonly IUserScreenLogBusiness _userScreenLogBusiness;
        private ImageHelpers _imageHelpers;

        public UserScreenLogController(IUserScreenLogBusiness userScreenLogBusiness, ImageHelpers imageHelpers)
        {
            _userScreenLogBusiness = userScreenLogBusiness;
            _imageHelpers = imageHelpers;
        }

        #endregion "Decalration"

        #region "Get Method"

        //get Method

        #endregion "Get Method"

        #region "Post Method"

        [HttpPost("getUserScreenShots")]
        public Response GetUserScreenShots(UserScreenShotRequestModel userScreenshot)
        {
            var screenShots = _userScreenLogBusiness.GetUserScreenShots(userScreenshot);
            Response response = new Response(HttpStatusCode.OK, screenShots, AppConstant.Success);
            return response;
        }

        [HttpPost("saveScreenshot")]
        public Response SaveScreenshot(UserScreenshot userScreenshot)
        {
            userScreenshot.Image = userScreenshot.UserId.ToString() + "_" + userScreenshot.ProjectId.ToString() + "_" + DateTime.Now.Ticks.ToString() + ".jpg";
            _imageHelpers.SaveImageToDirectory(userScreenshot);
            var user = _userScreenLogBusiness.SaveScreenshot(userScreenshot);
            Response response = new Response(HttpStatusCode.OK, user, AppConstant.Success);
            return response;
        }

        #endregion "Post Method"
    }
}