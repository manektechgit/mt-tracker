using Dapper;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using TimeTrackerMt.DataRepository.Abstract;
using TimeTrackerMt.DataRepository.Model;

namespace TimeTrackerMt.DataRepository.Concrete
{
    public class CompanyPlanRepository : ICompanyPlanRepository
    {
        private readonly IGeneralGenericFunction _generalGenericFunction;

        public CompanyPlanRepository(IConfiguration configuration, IGeneralGenericFunction generalGenericFunction)
        {
            _configuration = configuration;
            _generalGenericFunction = generalGenericFunction;
        }

        public IConfiguration _configuration { get; }

        public IEnumerable<PlanMaster> GetPlansForCompany()
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                var result = SqlMapper.Query<PlanMaster>(con, "GetPlansForCompany", null, commandType: CommandType.StoredProcedure);
                return result;
            }
        }

        public CompanyPlan GetCompanyPlan(long companyId)
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@CompanyId", companyId);

                var result = SqlMapper.Query<CompanyPlan>(con, "GetCompanyPlan", param: parameters, commandType: CommandType.StoredProcedure).FirstOrDefault();
                return result;
            }
        }

        //public IEnumerable<CompanyPlan> GetCompanyPlans(long companyId)
        //{
        //    throw new NotImplementedException();
        //}

        public int InsertCompanyPlan(CompanyPlan model)
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                if (!string.IsNullOrEmpty(model.PayType))
                {
                    if (model.PayType.ToLower() == "annually")
                        model.ExpiryDate = DateTime.Now.AddMonths(12);
                    else
                        model.ExpiryDate = DateTime.Now.AddMonths(1);
                }

                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@CompanyId", model.CompanyId);
                parameters.Add("@PlanId", model.PlanId);
                parameters.Add("@NoOfUsers", model.NoOfUsers);
                parameters.Add("@PayType", model.PayType);
                parameters.Add("@TotalAmount", model.TotalAmount);
                parameters.Add("@Expirydate", model.ExpiryDate);
                parameters.Add("@PaymentId", model.PaymentId);
                parameters.Add("@Createdby", model.CreatedBy);

                var result = SqlMapper.Query<int>(con, "InsertCompanyPlan", param: parameters, commandType: CommandType.StoredProcedure).FirstOrDefault();
                return result;
            }
        }

        public CompanyPlan UpdateCompanyPlan(CompanyPlan model)
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                if (!string.IsNullOrEmpty(model.PayType))
                {
                    if (model.PayType.ToLower() == "annually")
                        model.ExpiryDate = DateTime.Now.AddMonths(12);
                    else
                        model.ExpiryDate = DateTime.Now.AddMonths(1);
                }

                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@CompanyPlanId", model.CompanyPlanId);
                parameters.Add("@CompanyId", model.CompanyId);
                parameters.Add("@PlanId", model.PlanId);
                parameters.Add("@NoOfUsers", model.NoOfUsers);
                parameters.Add("@PayType", model.PayType);
                parameters.Add("@TotalAmount", model.TotalAmount);
                parameters.Add("@Expirydate", model.ExpiryDate);
                parameters.Add("@PaymentId", model.PaymentId);
                parameters.Add("@ModifiedBy", model.ModifiedBy);

                var CompanyPlanData = SqlMapper.Query<CompanyPlan>(con, "UpdateCompanyPlan", param: parameters, commandType: CommandType.StoredProcedure).FirstOrDefault();

                if (CompanyPlanData == null) return null;

                return CompanyPlanData;
            }
        }
    }
}
