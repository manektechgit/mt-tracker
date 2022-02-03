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
    public class CompanyRepository : ICompanyRepository
    {

        private readonly IGeneralGenericFunction _generalGenericFunction;
        public IConfiguration _configuration { get; }
        public CompanyRepository(IGeneralGenericFunction generalGenericFunction, IConfiguration configuration)
        {
            _generalGenericFunction = generalGenericFunction;
            _configuration = configuration;
        }


        public IEnumerable<Company> GetCompanyList()
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();

                var result = SqlMapper.Query<Company>(con, "CompanyControl", null, commandType: CommandType.StoredProcedure);
                con.Close();
                return result;
            }
        }



        public IEnumerable<Company> GetCompanypaginationDatalist(CompanyPagination CompanyPagination)
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@iDisplayLength", CompanyPagination.DisplayLength);
                parameters.Add("@iDisplayStart", CompanyPagination.DisplayStart);
                parameters.Add("@sSearch", CompanyPagination.Search);
                parameters.Add("@iSortCol", CompanyPagination.SortCol);
                parameters.Add("@sSortDir", CompanyPagination.SortDir);
                var result = SqlMapper.Query<Company>(con, "CompanyDatalist", param: parameters, commandType: CommandType.StoredProcedure);
                con.Close();
                return result;
            }
        }

        //public IEnumerable<Company> getCompanydropdown()
        //{
        //    string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
        //    using (SqlConnection con = new SqlConnection(connectionString))
        //    {
        //        DynamicParameters parameters = new DynamicParameters();

        //        var result = SqlMapper.Query<Company>(con, "CompanyControl", null, commandType: CommandType.StoredProcedure);
        //        con.Close();
        //        return result;
        //    }
        //}

        public Company AddCompany(Company User)
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@CompanyName", User.CompanyName);
                parameters.Add("@NumberOfUser", User.NumberOfUser);
                parameters.Add("@CompanyURL", User.CompanyURL);
                parameters.Add("@CreatedBy", User.CreatedBy);

                var UserData = SqlMapper.Query<Company>(con, "AddCompany", param: parameters, commandType: CommandType.StoredProcedure).FirstOrDefault();

                if (UserData == null) return null;

                con.Close();
                return UserData;
            }
        }

        public Company UpdateCompany(Company User)
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@CompanyId", User.CompanyId);
                parameters.Add("@CompanyName", User.CompanyName);
                parameters.Add("@NumberOfUser", User.NumberOfUser);
                parameters.Add("@CompanyURL", User.CompanyURL);
                parameters.Add("@CreatedBy", User.CreatedBy);

                var UserData = SqlMapper.Query<Company>(con, "UpdateCompany", param: parameters, commandType: CommandType.StoredProcedure).FirstOrDefault();

                if (UserData == null) return null;

                con.Close();
                return UserData;
            }
        }

        public Company ActiveDeactiveCompany(Company User)
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@CompanyId", User.CompanyId);
                
                if (User.IsActive)
                {
                    parameters.Add("@TypeStatusId", 1);
                }
                else
                {
                    parameters.Add("@TypeStatusId", 0);
                }

                var result = SqlMapper.Query<Company>(con, "ActiveDeactiveCompany", param: parameters, commandType: CommandType.StoredProcedure).FirstOrDefault();
                con.Close();
                return result;
            }
        }

        public bool IsCompanyExist(string CompanyName)
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@CompanyName", CompanyName);
                
                var result = SqlMapper.Query<bool>(con, "checkCompanyExists", param: parameters, commandType: CommandType.StoredProcedure).SingleOrDefault();
                con.Close();
                return result;
            }
        }

    }
}
