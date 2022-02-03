using TimeTrackerMt.Business.Abstract;
using TimeTrackerMt.DataRepository.Model;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using EWebList.API;

namespace TimeTrackerMt.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmailSubscriptionController : ControllerBase
    {
        #region "Declarations & Constructors"

        private readonly IEmailSubscriptionBusiness _emailSubscriptionBusiness;

        public EmailSubscriptionController(IEmailSubscriptionBusiness emailSubscriptionBusiness)
        {
            _emailSubscriptionBusiness = emailSubscriptionBusiness;
        }

        #endregion "Declarations & Constructors"

        #region "Get Methods"

        [HttpGet("insertemailsubscription/{emailId}")]
        public Response InsertEmailSubscription(string emailId)
        {
            var result = _emailSubscriptionBusiness.InsertEmailSubscription(emailId);
            Response response = new Response(HttpStatusCode.OK, result, AppConstant.Success);
            return response;
        }

        #endregion "Get Methods"

        #region "Post Methods"

        //Post Methods

        #endregion "Post Methods"
    }
}