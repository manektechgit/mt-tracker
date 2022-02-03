using TimeTrackerMt.DataRepository.Abstract;
using TimeTrackerMt.DataRepository.Model;
using System.Collections.Generic;
using System.Linq;
using Dapper;
using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Data;
using TimeTrackerMt.DataRepository.ViewModel;

namespace TimeTrackerMt.DataRepository.Concrete
{
    public class DepartmentRepository : IDepartmentRepository
    {
        private readonly IGeneralGenericFunction _generalGenericFunction;
        public IConfiguration _configuration { get; }
        public DepartmentRepository(IGeneralGenericFunction generalGenericFunction, IConfiguration configuration)
        {
            _generalGenericFunction = generalGenericFunction;
            _configuration = configuration;
        }

        public IEnumerable<Department> GetDepartmentList(int CompanyId)
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@CompanyId", CompanyId);
                var result = SqlMapper.Query<Department>(con, "DepartmentControl", parameters, commandType: CommandType.StoredProcedure);
                con.Close();
                return result;
            }
        }

        public IEnumerable<Department> GetDepartmentpaginationDatalist(DepartmentPagination DepartmentPagination)
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@iDisplayLength", DepartmentPagination.DisplayLength);
                parameters.Add("@iDisplayStart", DepartmentPagination.DisplayStart);
                parameters.Add("@sSearch", DepartmentPagination.Search);
                parameters.Add("@iSortCol", DepartmentPagination.SortCol);
                parameters.Add("@sSortDir", DepartmentPagination.SortDir);
                parameters.Add("@CompanyId", DepartmentPagination.CompanyId);

                var result = SqlMapper.Query<Department>(con, "DepartmentDatalist", param: parameters, commandType: CommandType.StoredProcedure);
                con.Close();
                return result;
            }
        }

        public Department AddDepartment(Department dept)
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@CompanyId", dept.CompanyId);
                parameters.Add("@StatusId", dept.StatusId);
                parameters.Add("@DepartmentName", dept.DepartmentName);
                parameters.Add("@CreatedBy", dept.CreatedBy);

                var deptData = SqlMapper.Query<Department>(con, "AddDepartment", param: parameters, commandType: CommandType.StoredProcedure).FirstOrDefault();

                if (deptData == null) return null;

                con.Close();
                return deptData;
            }
        }

        public Department UpdateDepartment(Department dept)
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@DepartmentId", dept.DepartmentId);
                parameters.Add("@CompanyId", dept.CompanyId);
                parameters.Add("@StatusId", dept.StatusId);
                parameters.Add("@DepartmentName", dept.DepartmentName);
                //parameters.Add("@CreatedBy", dept.CreatedBy);

                var deptData = SqlMapper.Query<Department>(con, "UpdateDepartment", param: parameters, commandType: CommandType.StoredProcedure).FirstOrDefault();

                if (deptData == null) return null;

                con.Close();
                return deptData;
            }
        }

        public Department SoftDeleteDepartment(Department dept)
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@DepartmentId", dept.DepartmentId);
                parameters.Add("@IsDelete", dept.IsDelete);
                var result = SqlMapper.Query<Department>(con, "SoftDeleteDepartment", param: parameters, commandType: CommandType.StoredProcedure).FirstOrDefault();
                con.Close();
                return result;
            }
        }

    }
}