using System;
using System.Collections.Generic;
using System.Text;
using TimeTrackerMt.DataRepository.Model;

namespace TimeTrackerMt.Business.Abstract
{
   public interface ICardBusiness
    {
        CardMaster InsertCard(CardMaster Details);

        IEnumerable<CardMaster> CardDataTableList(PaginationModel paginationModel);

        int UpdateCardDetail(CardMaster Details);

        CardMaster SoftDeleteCard(CardMaster Detail);
    }
}
