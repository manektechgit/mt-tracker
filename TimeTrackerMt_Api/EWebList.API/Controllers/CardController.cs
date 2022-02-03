using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
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
    public class CardController : ControllerBase
    {
        private ICardBusiness _cardBusiness;

        public CardController(ICardBusiness cardBusiness)
        {
            _cardBusiness = cardBusiness;            
        }

        [HttpPost("InsertCard")]
        public Response InsertCard([FromBody] CardMaster Details)
        {
            var Data = _cardBusiness.InsertCard(Details);
            Response response = new Response(HttpStatusCode.OK, Data, AppConstant.Success);
            return response;
        }

        [HttpPost("CardDataTableList")]
        public Response CardDataTableList([FromBody] PaginationModel paginationModel)
        {
            var result = _cardBusiness.CardDataTableList(paginationModel);
            Response response = new Response(HttpStatusCode.OK, result, AppConstant.Success);
            return response;
        }

        [HttpPost("updateCardDetail")]
        public Response UpdateCardDetail([FromBody] CardMaster Details)
        {
            var user = _cardBusiness.UpdateCardDetail(Details);
            Response response = new Response(HttpStatusCode.OK, user, AppConstant.Success);
            return response;
        }

        [AllowAnonymous]
        [HttpPost("softdeletecard")]
        public Response SoftDeleteCard([FromBody] CardMaster Details)
        {
            var result = _cardBusiness.SoftDeleteCard(Details);
            Response response = new Response(HttpStatusCode.OK, result, AppConstant.Success);
            return response;
        }
    }
}