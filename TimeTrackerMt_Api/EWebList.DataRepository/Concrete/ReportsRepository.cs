using System;
using System.Collections.Generic;
using System.Text;
using Dapper;
using Microsoft.Extensions.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using TimeTrackerMt.DataRepository.Abstract;
using TimeTrackerMt.DataRepository.Model;
using TimeTrackerMt.DataRepository.ViewModel;

namespace TimeTrackerMt.DataRepository.Concrete
{
    public class ReportsRepository : IReportsRepository
    {
        private readonly IGeneralGenericFunction _generalGenericFunction;


        public IConfiguration _configuration { get; }

        public ReportsRepository(IGeneralGenericFunction generalGenericFunction, IConfiguration configuration)
        {
            _generalGenericFunction = generalGenericFunction;
            _configuration = configuration;
        }


        //public IEnumerable<Reports> GetReportsList(ReportsParameters ReportsParameters)
        //{
        //    IEnumerable<Reports> xx = null;
        //    string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
        //    using (SqlConnection con = new SqlConnection(connectionString))
        //    {
        //        DynamicParameters parameters = new DynamicParameters();
        //        parameters.Add("@UserId", ReportsParameters.UserId);
        //        parameters.Add("@SFrom", ReportsParameters.fromDate);
        //        parameters.Add("@STo", ReportsParameters.toDate);
        //        var result = SqlMapper.Query<Reports>(con, "AttandanceControl", param: parameters, commandType: CommandType.StoredProcedure);
        //        var dt = ToDataTable(result);
        //        con.Close();
        //    }
        //    return xx;
        //}
        public string GetReportsList(ReportsParameters ReportsParameters)
        {

            DataTable dt = new DataTable();
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                con.Open();
                var p = new DynamicParameters();
                p.Add("@UserId", ReportsParameters.selectedUserId);
                p.Add("@ProjectId", ReportsParameters.selectedProjectId);
                p.Add("@CompanyId", ReportsParameters.CompanyId);
                p.Add("@SFrom", ReportsParameters.fromDate);
                p.Add("@STo", ReportsParameters.toDate);

                var obs = con.Query(sql: "AttandanceControl", param: p,
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


        //public IEnumerable<Reports> GetUserList()
        //{
        //    string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
        //    using (SqlConnection con = new SqlConnection(connectionString))
        //    {
        //        DynamicParameters parameters = new DynamicParameters();

        //        var result = SqlMapper.Query<Reports>(con, "UserControl", null, commandType: CommandType.StoredProcedure);
        //        con.Close();
        //        return result;
        //    }
        //}


        public IEnumerable<Reports> GetUserList(ReportsParameters ReportsParameters)
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@UserId", ReportsParameters.UId);
                parameters.Add("@RoleId", ReportsParameters.RoleId);
                parameters.Add("@CompanyId", ReportsParameters.CompanyId);

                var result = SqlMapper.Query<Reports>(con, "UserControl", param: parameters, commandType: CommandType.StoredProcedure);
                con.Close();
                return result;

            }
        }

        public IEnumerable<Reports> GetProjectlist(ReportsParameters ReportsParameters)
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@UserId", ReportsParameters.UId);
                parameters.Add("@RoleId", ReportsParameters.RoleId);
                parameters.Add("@CompanyId", ReportsParameters.CompanyId);
                var result = SqlMapper.Query<Reports>(con, "ReportProjectList", param: parameters, commandType: CommandType.StoredProcedure);
                con.Close();
                return result;

            }
        }

        public IEnumerable<Reports> GetDateList(ReportsParameters ReportsParameters)
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@UserId", ReportsParameters.UserId);
                parameters.Add("@ProjectId", ReportsParameters.ProjectId);
                parameters.Add("@SFrom", ReportsParameters.fromDate);
                parameters.Add("@STo", ReportsParameters.toDate);
                var result = SqlMapper.Query<Reports>(con, "DateControl", param: parameters, commandType: CommandType.StoredProcedure);
                con.Close();
                return result;
            }
        }

        //public string GetDateList()
        //{

        //    DataTable dt = new DataTable();
        //    string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
        //    using (SqlConnection con = new SqlConnection(connectionString))
        //    {
        //        con.Open();
        //        var obs = con.Query(sql: "DateControl", null,
        //                            commandType: CommandType.StoredProcedure);

        //        dt = DateDataTable(obs);
        //        //System.Text.Json.JsonSerializer.Serialize(dt);

        //        con.Close();
        //    }
        //    var json = Newtonsoft.Json.JsonConvert.SerializeObject(dt);
        //    return json;
        //}

        //public DataTable DateDataTable(IEnumerable<dynamic> items)
        //{
        //    if (items == null) return null;
        //    var data = items.ToArray();
        //    if (data.Length == 0) return null;

        //    var dt = new DataTable();
        //    foreach (var pair in ((IDictionary<string, object>)data[0]))
        //    {
        //        dt.Columns.Add(pair.Key, (pair.Value ?? string.Empty).GetType());
        //    }
        //    foreach (var d in data)
        //    {
        //        dt.Rows.Add(((IDictionary<string, object>)d).Values.ToArray());
        //    }
        //    return dt;
        //}


       

    }
}
