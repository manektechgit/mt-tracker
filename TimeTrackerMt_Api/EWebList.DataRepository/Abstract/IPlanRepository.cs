using System;
using System.Collections.Generic;
using System.Text;
using TimeTrackerMt.DataRepository.Model;
using TimeTrackerMt.DataRepository.ViewModel;

namespace TimeTrackerMt.DataRepository.Abstract
{
    public interface IPlanRepository
    {

        IEnumerable<PlanMaster> GetPlanlist(PlanPagination PlanPagination);
        PlanMaster AddPlan(PlanMaster Detail);
        PlanMaster UpdatePlan(PlanMaster Detail);
        PlanMaster ActiveDeactivePlan(PlanMaster Detail);
        PlanMaster GetPlanByID(long PlanId);

        PlanMaster CheckAnyPlanDefault();
    }
}
