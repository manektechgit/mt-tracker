using System;
using System.Collections.Generic;
using System.Text;
using TimeTrackerMt.DataRepository.Model;

namespace TimeTrackerMt.DataRepository.Abstract
{
    public interface ICompanyPlanRepository
    {
        IEnumerable<PlanMaster> GetPlansForCompany();
        //IEnumerable<CompanyPlan> GetCompanyPlans(long companyId);
        CompanyPlan GetCompanyPlan(long companyId);
        int InsertCompanyPlan(CompanyPlan model);
        CompanyPlan UpdateCompanyPlan(CompanyPlan model);
    }
}
