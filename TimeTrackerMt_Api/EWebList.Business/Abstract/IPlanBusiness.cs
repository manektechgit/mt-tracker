using System;
using System.Collections.Generic;
using System.Text;
using TimeTrackerMt.DataRepository.Model;
using TimeTrackerMt.DataRepository.ViewModel;

namespace TimeTrackerMt.Business.Abstract
{
    public interface IPlanBusiness
    {
        IEnumerable<PlanMaster> GetPlanList(PlanPagination PlanPagination);
        PlanMaster AddPlan(PlanMaster Detail);
        PlanMaster UpdatePlan(PlanMaster Detail);
        PlanMaster ActiveDeactivePlan(PlanMaster Detail);
        PlanMaster GetPlanByID(long PlanId);
        PlanMaster CheckAnyPlanDefault();
    }
}
