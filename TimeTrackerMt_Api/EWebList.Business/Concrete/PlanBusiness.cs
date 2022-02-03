using System;
using System.Collections.Generic;
using System.Text;
using TimeTrackerMt.Business.Abstract;
using TimeTrackerMt.DataRepository.Abstract;
using TimeTrackerMt.DataRepository.Model;
using TimeTrackerMt.DataRepository.ViewModel;

namespace TimeTrackerMt.Business.Concrete
{
    public class PlanBusiness : IPlanBusiness
    {
        private readonly IPlanRepository _PlanRepository;

        public PlanBusiness(IPlanRepository PlanRepository)
        {
            _PlanRepository = PlanRepository;
        }
        public IEnumerable<PlanMaster> GetPlanList(PlanPagination PlanPagination)
        {
            return _PlanRepository.GetPlanlist(PlanPagination);
        }

        public PlanMaster AddPlan(PlanMaster Detail)
        {

            var result = _PlanRepository.AddPlan(Detail);

            return result;
        }

        public PlanMaster UpdatePlan(PlanMaster Detail)
        {

            var result = _PlanRepository.UpdatePlan(Detail);

            return result;
        }
        public PlanMaster ActiveDeactivePlan(PlanMaster Detail)
        {

            var result = _PlanRepository.ActiveDeactivePlan(Detail);

            return result;
        }

        public PlanMaster GetPlanByID(long PlanId)
        {

            var result = _PlanRepository.GetPlanByID(PlanId);

            return result;
        }

        public PlanMaster CheckAnyPlanDefault()
        {
            var result = _PlanRepository.CheckAnyPlanDefault();
            return result;
        }
    }
}
