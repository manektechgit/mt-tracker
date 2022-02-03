using Dapper;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using TimeTrackerMt.DataRepository.Abstract;
using TimeTrackerMt.DataRepository.Constants;
using TimeTrackerMt.DataRepository.Model;
using TimeTrackerMt.DataRepository.ViewModel;

namespace TimeTrackerMt.DataRepository.Concrete
{
    public class PlanRepository : IPlanRepository
    {

        private readonly IGeneralGenericFunction _generalGenericFunction;
        public IConfiguration _configuration { get; }
        public PlanRepository(IGeneralGenericFunction generalGenericFunction, IConfiguration configuration)
        {
            _generalGenericFunction = generalGenericFunction;
            _configuration = configuration;
        }

        public IEnumerable<PlanMaster> GetPlanlist(PlanPagination PlanPagination)
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@iDisplayLength", PlanPagination.DisplayLength);
                parameters.Add("@iDisplayStart", PlanPagination.DisplayStart);
                parameters.Add("@sSearch", PlanPagination.Search);
                parameters.Add("@iSortCol", PlanPagination.SortCol);
                parameters.Add("@sSortDir", PlanPagination.SortDir);
                var result = SqlMapper.Query<PlanMaster>(con, "GetPlanlist", param: parameters, commandType: CommandType.StoredProcedure);
                con.Close();
                return result;
            }
        }

        public PlanMaster AddPlan(PlanMaster Plan)
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@Name", Plan.Name);
                parameters.Add("@AmountPerUser", Plan.AmountPerUser);
                parameters.Add("@IsTimeTracking", Plan.IsTimeTracking);
                parameters.Add("@IsTaskAndProject", Plan.IsTaskAndProject);
                parameters.Add("@NoOfStorageMonth", Plan.NoOfStorageMonth);
                parameters.Add("@NoOfSupportDays", Plan.NoOfSupportDays);
                parameters.Add("@NoOfDepartmentAllowed", Plan.NoOfDepartmentAllowed);
                parameters.Add("@IsAllowClientAccess", Plan.IsAllowClientAccess);
                parameters.Add("@IsDefaultPlan", Plan.IsDefaultPlan);
                parameters.Add("@Createby", Plan.CreateBy);

                var UserData = SqlMapper.Query<PlanMaster>(con, "AddPlanMaster", param: parameters, commandType: CommandType.StoredProcedure).FirstOrDefault();

                if (UserData == null) return null;

                con.Close();
                return UserData;
            }
        }

        public PlanMaster UpdatePlan(PlanMaster Plan)
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@PlanId", Plan.PlanId);
                parameters.Add("@Name", Plan.Name);
                parameters.Add("@AmountPerUser", Plan.AmountPerUser);
                parameters.Add("@IsTimeTracking", Plan.IsTimeTracking);
                parameters.Add("@IsTaskAndProject", Plan.IsTaskAndProject);
                parameters.Add("@NoOfStorageMonth", Plan.NoOfStorageMonth);
                parameters.Add("@NoOfSupportDays", Plan.NoOfSupportDays);
                parameters.Add("@NoOfDepartmentAllowed", Plan.NoOfDepartmentAllowed);
                parameters.Add("@IsAllowClientAccess", Plan.IsAllowClientAccess);
                parameters.Add("@IsDefaultPlan", Plan.IsDefaultPlan);
                parameters.Add("@ModifiedBy", Plan.CreateBy);


                var UserData = SqlMapper.Query<PlanMaster>(con, "UpdatePlanMaster", param: parameters, commandType: CommandType.StoredProcedure).FirstOrDefault();

                if (UserData == null) return null;

                con.Close();
                return UserData;
            }
        }

        public PlanMaster ActiveDeactivePlan(PlanMaster Plan)
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@PlanId", Plan.PlanId);

                if (Plan.IsActive)
                {
                    parameters.Add("@ActiveStatus", 1);
                }
                else
                {
                    parameters.Add("@ActiveStatus", 0);
                }

                var result = SqlMapper.Query<PlanMaster>(con, "ActiveDeactivePlan", param: parameters, commandType: CommandType.StoredProcedure).FirstOrDefault();
                con.Close();
                return result;
            }
        }

        public PlanMaster GetPlanByID(long PlanId)
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@PlanId", PlanId);
                var result = SqlMapper.Query<PlanMaster>(con, "GetPlanById", param: parameters, commandType: CommandType.StoredProcedure).SingleOrDefault();
                con.Close();
                return result;
            }
        } 
        public PlanMaster CheckAnyPlanDefault()
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                var result = SqlMapper.Query<PlanMaster>(con, "CheckPlanDefault", commandType: CommandType.StoredProcedure).SingleOrDefault();
                con.Close();
                return result;
            }
        }
    }
}
