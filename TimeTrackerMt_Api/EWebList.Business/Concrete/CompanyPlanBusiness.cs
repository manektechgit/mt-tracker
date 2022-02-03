using System;
using System.Collections.Generic;
using System.Text;
using TimeTrackerMt.Business.Abstract;
using TimeTrackerMt.DataRepository.Abstract;
using TimeTrackerMt.DataRepository.Model;

namespace TimeTrackerMt.Business.Concrete
{
    public class CompanyPlanBusiness : ICompanyPlanBusiness
    {
        private readonly ICompanyPlanRepository _companyPlanRepository;
        public CompanyPlanBusiness(ICompanyPlanRepository userReportsRepository)
        {
            _companyPlanRepository = userReportsRepository;
        }

        public CompanyPlan GetCompanyPlan(long companyId)
        {
            return _companyPlanRepository.GetCompanyPlan(companyId);
        }

        //public IEnumerable<CompanyPlan> GetCompanyPlans(long companyId)
        //{
        //    return _companyPlanRepository.GetCompanyPlans(companyId);
        //}

        public IEnumerable<PlanMaster> GetPlansForCompany()
        {
            return _companyPlanRepository.GetPlansForCompany();
        }

        public int InsertCompanyPlan(CompanyPlan model)
        {
            return _companyPlanRepository.InsertCompanyPlan(model);
        }

        public CompanyPlan UpdateCompanyPlan(CompanyPlan model)
        {
            return _companyPlanRepository.UpdateCompanyPlan(model);
        }
    }
}
