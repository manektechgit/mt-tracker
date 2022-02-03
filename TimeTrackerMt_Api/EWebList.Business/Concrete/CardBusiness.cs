using System;
using System.Collections.Generic;
using System.Text;
using TimeTrackerMt.Business.Abstract;
using TimeTrackerMt.DataRepository.Abstract;
using TimeTrackerMt.DataRepository.Model;

namespace TimeTrackerMt.Business.Concrete
{
  public  class CardBusiness: ICardBusiness
    {
        private readonly ICardRepository _cardRepository;

        public CardBusiness(ICardRepository cardRepository)
        {
            _cardRepository = cardRepository;
        }

        public CardMaster InsertCard(CardMaster Details)
        {

            var result = _cardRepository.InsertCard(Details);

            return result;
        }

        public IEnumerable<CardMaster> CardDataTableList(PaginationModel paginationModel)
        {
            return _cardRepository.CardDataTableList(paginationModel);
        }

        public int UpdateCardDetail(CardMaster Details)
        {

            return _cardRepository.UpdateCardDetail(Details);
        }

        public CardMaster SoftDeleteCard(CardMaster Details)
        {

            var result = _cardRepository.SoftDeleteCard(Details);

            return result;
        }
    }
}
