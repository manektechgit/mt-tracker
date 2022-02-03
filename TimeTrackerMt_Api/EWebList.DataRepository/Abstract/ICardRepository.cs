using System;
using System.Collections.Generic;
using System.Text;
using TimeTrackerMt.DataRepository.Model;

namespace TimeTrackerMt.DataRepository.Abstract
{
  public interface ICardRepository
    {
        CardMaster InsertCard(CardMaster Details);

        IEnumerable<CardMaster> CardDataTableList(PaginationModel paginationModel);

        int UpdateCardDetail(CardMaster Details);

        CardMaster SoftDeleteCard(CardMaster Details);
    }
}
