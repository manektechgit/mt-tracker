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
using TimeTrackerMt.DataRepository.ViewModel;

namespace TimeTrackerMt.DataRepository.Concrete
{
   public class UserReportRepository : IUserReportRepository
    {
        private readonly IGeneralGenericFunction _generalGenericFunction;


        public IConfiguration _configuration { get; }

        public UserReportRepository(IGeneralGenericFunction generalGenericFunction, IConfiguration configuration)
        {
            _generalGenericFunction = generalGenericFunction;
            _configuration = configuration;
        }

        public string getUserReportsList(UserReportsParameter ReportsParameters)
        {

            DataTable dt = new DataTable();
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                con.Open();
                var p = new DynamicParameters();
                p.Add("@UserId", ReportsParameters.selectedUserId);
                p.Add("@CompanyId", ReportsParameters.CompanyId);
                p.Add("@SFrom", ReportsParameters.fromDate);
                p.Add("@STo", ReportsParameters.toDate);

                var obs = con.Query(sql: "UserReportControl", param: p,
                                    commandType: CommandType.StoredProcedure);

                dt = ToDataTable(obs);
                //System.Text.Json.JsonSerializer.Serialize(dt);

                con.Close();
            }
            var json = Newtonsoft.Json.JsonConvert.SerializeObject(dt);
            return json;
        }

        public DataTable ToDataTable(IEnumerable<dynamic> items)
        {
            if (items == null) return null;
            var data = items.ToArray();
            if (data.Length == 0) return null;

            var dt = new DataTable();
            foreach (var pair in ((IDictionary<string, object>)data[0]))
            {
                dt.Columns.Add(pair.Key, (pair.Value ?? string.Empty).GetType());
            }
            foreach (var d in data)
            {
                dt.Rows.Add(((IDictionary<string, object>)d).Values.ToArray());

            }
            return dt;
        }

        public IEnumerable<Reports> GetUserlist(UserReportsParameter ReportsParameters)
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@UserId", ReportsParameters.selectedUserId);
                parameters.Add("@CompanyId", ReportsParameters.CompanyId);
                parameters.Add("@SFrom", ReportsParameters.fromDate);
                parameters.Add("@STo", ReportsParameters.toDate);
                var result = SqlMapper.Query<Reports>(con, "GetUserReportList", param: parameters, commandType: CommandType.StoredProcedure);
                con.Close();
                return result;
            }
        }



        public string getUserReportDetail(UserReportsParameter ReportsParameters)
        {

            DataTable dt = new DataTable();
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                con.Open();
                var p = new DynamicParameters();
                p.Add("@UserId", ReportsParameters.selectedUserId);
                p.Add("@CompanyId", ReportsParameters.CompanyId);
                p.Add("@SFrom", ReportsParameters.fromDate);
                p.Add("@STo", ReportsParameters.toDate);

                var obs = con.Query(sql: "AttencenceReportDetail", param: p,
                                    commandType: CommandType.StoredProcedure);

                dt = ToDataTable(obs);
                //System.Text.Json.JsonSerializer.Serialize(dt);

                con.Close();
            }
            var json = Newtonsoft.Json.JsonConvert.SerializeObject(dt);
            return json;
        }


    }
}