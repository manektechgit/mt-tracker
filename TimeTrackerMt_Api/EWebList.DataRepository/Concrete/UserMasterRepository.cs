using Dapper;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Data.SqlClient;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using TimeTrackerMt.DataRepository.Abstract;
using TimeTrackerMt.DataRepository.Model;

namespace TimeTrackerMt.DataRepository.Concrete
{
    public class UserMasterRepository : IUserMasterRepository
    {
        private readonly IGeneralGenericFunction _generalGenericFunction;

        public UserMasterRepository(IConfiguration configuration, IGeneralGenericFunction generalGenericFunction)
        {
            _configuration = configuration;
            _generalGenericFunction = generalGenericFunction;
        }

        public IConfiguration _configuration { get; }

        public AuthenticateResponse AuthenticateUser(AuthenticateRequest authenticateRequest)
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@Email", authenticateRequest.Email);
                parameters.Add("@Password", authenticateRequest.Password);

                var loginUserData = SqlMapper.Query<AuthenticateResponse>(con, "UserLogin", param: parameters, commandType: CommandType.StoredProcedure).FirstOrDefault();

                if (loginUserData == null) return null;

                //getting jwt token for the user
                var jwtToken = generateJwtToken(loginUserData);
                loginUserData.JwtToken = jwtToken;
                con.Close();
                return loginUserData;
            }
        }

        public IEnumerable<UserMaster> UserDataTableList(PaginationModel paginationModel)
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@iDisplayLength", paginationModel.DisplayLength);
                parameters.Add("@iDisplayStart", paginationModel.DisplayStart);
                parameters.Add("@sSearch", paginationModel.Search);
                parameters.Add("@iSortCol", paginationModel.SortCol);
                parameters.Add("@sSortDir", paginationModel.SortDir);
                parameters.Add("@CompanyId", paginationModel.CompanyId);
                parameters.Add("@DepartmentId", paginationModel.DepartmentId);
                parameters.Add("@RoleId", paginationModel.RoleId);
                parameters.Add("@CreatedBy", paginationModel.CreatedBy);

                var result = SqlMapper.Query<UserMaster>(con, "UserDataTableList", param: parameters, commandType: CommandType.StoredProcedure);
                con.Close();
                return result;
            }
        }

        public string UserAdd(UserMaster User)
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@FirstName", User.FirstName);
                parameters.Add("@LastName", User.LastName);
                parameters.Add("@Email", User.Email);
                parameters.Add("@Password", User.Password);
                parameters.Add("@DepartmentId", User.DepartmentId);
                parameters.Add("@Gender", User.Gender);
                parameters.Add("@RoleId", User.RoleId);
                parameters.Add("@LoginRoleId", User.LoginRoleId);
                parameters.Add("@LoginDepartmentId", User.LoginDepartmentId);
                //parameters.Add("@StatusId", User.StatusId);
                parameters.Add("@ReportingTo", User.ReportingTo);
                parameters.Add("@CompanyId", User.CompanyId);
                parameters.Add("@CreatedBy", User.CreatedBy);
                //parameters.Add("@AvailableUser",User.AvailableUser);
                parameters.Add("AvailableUser", dbType: DbType.Int32, direction: ParameterDirection.Output);

                var UserData = SqlMapper.Query<UserMaster>(con, "user_Add", param: parameters, commandType: CommandType.StoredProcedure).FirstOrDefault();
                int count = parameters.Get<int>("AvailableUser");
                string msg = string.Empty;
                if (count > 0)
                {
                    msg = "You cannot add more users !To add more users contact provider";
                }

                con.Close();
                return msg;
            }
        }
        public EmailExist IsEmailExist(EmailExist User)
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@Email", User.Email);
                parameters.Add("@UserId", User.UserId);
                var result = SqlMapper.Query<EmailExist>(con, "usp_EmailExist", param: parameters, commandType: CommandType.StoredProcedure).SingleOrDefault();
                con.Close();
                return result;
            }
        }
        public List<EmailExist> IsMultipleEmailExist(string Emails)
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@Emails", Emails);

                var result = SqlMapper.Query<EmailExist>(con, "checkMultipleEmailExist", param: parameters, commandType: CommandType.StoredProcedure).ToList();
                con.Close();
                return result;
            }
        }
        public UserMaster UserUpdate(UserMaster Update)
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@UserId", Update.UserId);
                parameters.Add("@FirstName", Update.FirstName);
                parameters.Add("@LastName", Update.LastName);
                parameters.Add("@Email", Update.Email);
                parameters.Add("@Password", Update.Password);
                parameters.Add("@DepartmentId", Update.DepartmentId);
                parameters.Add("@Gender", Update.Gender);
                parameters.Add("@RoleId", Update.RoleId);
                parameters.Add("@LoginRoleId", Update.LoginRoleId);
                parameters.Add("@LoginDepartmentId", Update.LoginDepartmentId);
                //parameters.Add("@StatusId", Update.StatusId);
                parameters.Add("@ReportingTo", Update.ReportingTo);
                parameters.Add("@CompanyId", Update.CompanyId);
                parameters.Add("@UpdatedBy", Update.UpdatedBy);

                var UserData = SqlMapper.Query<UserMaster>(con, "UserUpdate", param: parameters, commandType: CommandType.StoredProcedure).FirstOrDefault();

                if (UserData == null) return null;

                con.Close();
                return UserData;
            }
        }

        public UserMaster UpdateUserDetail(UserMaster Update)
        {
            string deptList = string.Join(",", Update.DepartmentList);
            string projectList = string.Join(",", Update.ProjectList);
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@UserId", Update.UserId);
                parameters.Add("@Email", Update.Email);
                parameters.Add("@DepartmentList", deptList);
                parameters.Add("@RoleId", Update.RoleId);
                parameters.Add("@ProjectRoleId", Update.ProjectRoleId);
                parameters.Add("@LoginRoleId", Update.LoginRoleId);
                parameters.Add("@LoginDepartmentId", Update.LoginDepartmentId);
                parameters.Add("@UpdatedBy", Update.CreatedBy);
                parameters.Add("@ScreenCastId", Update.ScreenCastId);
                parameters.Add("@ProjectList", projectList);
                parameters.Add("@TimeZoneId", Update.TimeZoneId);

                var UserData = SqlMapper.Query<UserMaster>(con, "UpdateUserDetail", param: parameters, commandType: CommandType.StoredProcedure).FirstOrDefault();

                if (UserData == null) return null;

                con.Close();
                return UserData;
            }
        }

        public UserMaster InviteUserUpdate(UserMaster Update)
        {
            //string projectList = string.Join(",", Update.ProjectList);
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@UserId", Update.UserId);
                parameters.Add("@FirstName", Update.FirstName);
                parameters.Add("@LastName", Update.LastName);
                parameters.Add("@Email", Update.Email);
                parameters.Add("@Password", Update.Password);
                parameters.Add("@Gender", Update.Gender);
                parameters.Add("@UpdatedBy", Update.UpdatedBy);
                
                var UserData = SqlMapper.Query<UserMaster>(con, "InviteUserUpdate", param: parameters, commandType: CommandType.StoredProcedure).FirstOrDefault();

                if (UserData == null) return null;

                con.Close();
                return UserData;
            }
        }
        public IEnumerable<DropdownModel> GetUsersList(int CompanyId, int DepartmentId)
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@CompanyId", CompanyId);
                //parameters.Add("@DepartmentId", DepartmentId);

                var result = SqlMapper.Query<DropdownModel>(con, "GetUsersList", parameters, commandType: CommandType.StoredProcedure);
                con.Close();
                return result;
            }
        }
        public IEnumerable<DropdownModel> GetRolelist()
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                var result = SqlMapper.Query<DropdownModel>(con, "RolesForProject", null, commandType: CommandType.StoredProcedure);
                con.Close();
                return result;
            }
        }

        public IEnumerable<DropdownModel> GetLoginRoleList(int LoginRoleId)
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@LoginRoleId", LoginRoleId);
                var result = SqlMapper.Query<DropdownModel>(con, "RolesControl", parameters, commandType: CommandType.StoredProcedure);
                con.Close();
                return result;
            }
        }

        public IEnumerable<UserMaster> GetStatuslist()
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                var result = SqlMapper.Query<UserMaster>(con, "ProjectStatusControl", null, commandType: CommandType.StoredProcedure);
                con.Close();
                return result;
            }
        }

        public IEnumerable<UserMaster> GetScreenCastlist()
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                var result = SqlMapper.Query<UserMaster>(con, "ScreenCastControl", null, commandType: CommandType.StoredProcedure);
                con.Close();
                return result;
            }
        }

        public IEnumerable<DropdownMaster> GetDropdownList(string category)
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@Category", category);

                var result = SqlMapper.Query<DropdownMaster>(con, "DropdownControl", parameters, commandType: CommandType.StoredProcedure);
                con.Close();
                return result;
            }
        }

        public IEnumerable<UserMaster> GetReportinglist(int CompanyId)
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@CompanyId", CompanyId);

                var result = SqlMapper.Query<UserMaster>(con, "ReportingControl", parameters, commandType: CommandType.StoredProcedure);
                con.Close();
                return result;
            }
        }

        public UserMaster GetUserDetailByEmail(string emailId)
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@Email", emailId);
                var result = SqlMapper.Query<UserMaster>(con, "ForgotPassword", param: parameters, commandType: CommandType.StoredProcedure).SingleOrDefault();
                con.Close();
                return result;
            }
        }

        public UserMaster GetUserDetailById(long userId)
        {
            string where = " UserId = '" + userId + "' And ";
            return _generalGenericFunction.GetField<UserMaster>(where, "[User]", "Name");
        }

        public UserMaster GetUserById(long userId)
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@UserId", userId);
                
                var result = SqlMapper.Query<UserMaster>(con, "GetUserDetailById", param: parameters, commandType: CommandType.StoredProcedure).FirstOrDefault();
                con.Close();
                return result;
            }
        }

        public int ResetPassword(UserMaster user)
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@UserId", user.UserId);
                parameters.Add("@Password", user.Password);
                var result = Convert.ToInt32(con.ExecuteScalar("ResetPassword", param: parameters, commandType: CommandType.StoredProcedure));
                con.Close();
                return result;
            }
        }

        public int UpdateUserMaster(UserMaster userMaster)
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@UserId", userMaster.UserId);
                parameters.Add("@FirstName", userMaster.FirstName);
                parameters.Add("@LastName", userMaster.LastName);
                parameters.Add("@Email", userMaster.Email);
                parameters.Add("@Gender", userMaster.Gender);
                parameters.Add("@Password", userMaster.Password);
                parameters.Add("@UpdatedBy", userMaster.UpdatedBy);

                var result = Convert.ToInt32(con.ExecuteScalar("ProfileUpdate", param: parameters, commandType: CommandType.StoredProcedure));
                con.Close();
                return result;
            }
        }

        public IEnumerable<UserMaster> GetAllUsers()
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                var result = SqlMapper.Query<UserMaster>(con, "GetAllUsers", null, commandType: CommandType.StoredProcedure);
                con.Close();
                return result;
            }
        }

        private string generateJwtToken(AuthenticateResponse user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration["JwtAuthentication:Secret"]);
            double tokenExpiryTime = Convert.ToDouble(_configuration["JwtAuthentication:ExpireTime"]);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.UserId.ToString())
                }),
                Expires = DateTime.UtcNow.AddHours(tokenExpiryTime),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        public UserMaster ActiveDeactiveUserMaster(UserMaster User)
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@UserId", User.UserId);

                if (User.IsActive)
                {
                    parameters.Add("@TypeStatusId", 1);
                }
                else
                {
                    parameters.Add("@TypeStatusId", 0);
                }

                var result = SqlMapper.Query<UserMaster>(con, "ActiveDeactiveUserMaster", param: parameters, commandType: CommandType.StoredProcedure).FirstOrDefault();
                con.Close();
                return result;
            }
        }

        public string InviteUser(UserMaster User)
        {
            string deptList = string.Join(",", User.DepartmentList);
            string projectList = string.Join(",", User.ProjectList);
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@Email", User.Email);
                parameters.Add("@DepartmentList", deptList);
                parameters.Add("@RoleId", User.RoleId);
                parameters.Add("@ProjectRoleId", User.ProjectRoleId);
                parameters.Add("@LoginRoleId", User.LoginRoleId);
                parameters.Add("@LoginDepartmentId", User.LoginDepartmentId);
                parameters.Add("@CompanyId", User.CompanyId);
                parameters.Add("@CreatedBy", User.CreatedBy);
                parameters.Add("@ScreenCastId", User.ScreenCastId);
                parameters.Add("@ProjectList", projectList);
                parameters.Add("@TimeZoneId", User.TimeZoneId);

                var result = Convert.ToInt32(con.ExecuteScalar("InviteUser", param: parameters, commandType: CommandType.StoredProcedure));
                string msg = string.Empty;
                if (result <= 0)
                {
                    msg = "You cannot invite more users !To add more users contact provider";
                }
                else
                {
                    msg = Convert.ToString(result);
                }

                con.Close();
                return msg;
            }
        }

        public List<UserMaster> InviteTeam(InviteTeam Team)
        {
            List<UserMaster> userData = new List<UserMaster>();
            DataTable dtEmployeeList = new DataTable();
            if(Team.Employees != null && Team.Employees.Count > 0)
                dtEmployeeList = ListToDataTable(Team.Employees);
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            SqlConnection con = new SqlConnection(connectionString);
            using (var cmd = new SqlCommand("InviteTeam", con))
            {
                string msg = string.Empty;
                con.Open();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@UserName", Team.UserName);
                cmd.Parameters.AddWithValue("@UserEmail", Team.UserEmail);
                cmd.Parameters.AddWithValue("@Password", Team.Password);
                cmd.Parameters.AddWithValue("@CompanyName", Team.CompanyName);
                cmd.Parameters.AddWithValue("@NumberOfEmployees", Team.NumberOfEmployees);
                cmd.Parameters.AddWithValue("@TimeZoneId", Team.TimeZoneId);
                cmd.Parameters.AddWithValue("@EmployeeList", (dtEmployeeList.Rows.Count > 0) ? dtEmployeeList : null);
                try
                {
                    DataTable dt = new DataTable();
                    using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                    {
                        da.Fill(dt);
                    }
                    if (dt.Rows.Count > 0)
                    {
                        for (int i = 0; i < dt.Rows.Count; i++)
                        {
                            userData.Add(new UserMaster { 
                                UserId = Convert.ToInt32(dt.Rows[i]["UserId"]),
                                Email = Convert.ToString(dt.Rows[i]["Email"]),
                                Password = Convert.ToString(dt.Rows[i]["Password"])
                            });
                        }
                    }
                    msg = "data saved successfully.";
                }
                catch (Exception ex)
                {
                    msg = "Internal server error.";
                }
                finally
                {
                    con.Close();
                }
                return userData;
            }
        }

        public DataTable ListToDataTable(List<Employee> iList)
        {
            DataTable dataTable = new DataTable();
            try
            {
                PropertyDescriptorCollection propertyDescriptorCollection =
                    TypeDescriptor.GetProperties(typeof(Employee));
                for (int i = 0; i < propertyDescriptorCollection.Count; i++)
                {
                    PropertyDescriptor propertyDescriptor = propertyDescriptorCollection[i];
                    Type type = propertyDescriptor.PropertyType;

                    if (type.IsGenericType && type.GetGenericTypeDefinition() == typeof(Nullable<>))
                        type = Nullable.GetUnderlyingType(type);

                    dataTable.Columns.Add(propertyDescriptor.Name, type);
                }
                object[] values = new object[propertyDescriptorCollection.Count];
                foreach (Employee iListItem in iList)
                {
                    for (int i = 0; i < values.Length; i++)
                    {
                        values[i] = propertyDescriptorCollection[i].GetValue(iListItem);
                    }
                    dataTable.Rows.Add(values);
                }
            }
            catch (Exception ex)
            {
            }
            return dataTable;
        }

        public string GetUserScreenCastTime(long userId)
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@UserId", userId);
                var result = SqlMapper.Query<string>(con, "GetUserScreenCastTime", param: parameters, commandType: CommandType.StoredProcedure).FirstOrDefault();
                con.Close();
                return result;
            }
        }

        public IEnumerable<TimeZoneMaster> GetTimeZonelist()
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                var result = SqlMapper.Query<TimeZoneMaster>(con, "GetTimeZone", null, commandType: CommandType.StoredProcedure);
                con.Close();
                return result;
            }
        }

        public DashboardControl GetUserDashboardControl(DashboardControl model)
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@UserId", model.UserId);
                parameters.Add("@CompanyId", model.CompanyId);
                parameters.Add("@SFrom", model.FromDate);
                parameters.Add("@STo", model.ToDate);
                var result = SqlMapper.Query<DashboardControl>(con, "UserDashboardControl", param: parameters, commandType: CommandType.StoredProcedure).FirstOrDefault();
                con.Close();
                return result;
            }
        }

        public string GetUserWorkingHours(UserWorkingHours UserWorkingHoursParameters)
        {

            DataTable dt = new DataTable();
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                con.Open();
                var p = new DynamicParameters();
                p.Add("@UserId", UserWorkingHoursParameters.UserId);
                p.Add("@FilterType", UserWorkingHoursParameters.FilterType);
                p.Add("@FromDate", UserWorkingHoursParameters.fromDate);
                p.Add("@ToDate", UserWorkingHoursParameters.toDate);
                p.Add("@Mosthr", UserWorkingHoursParameters.IsMostWorkingHR);
                p.Add("@DetailHourReport", UserWorkingHoursParameters.IsDetailHourReport);

                var obs = con.Query(sql: "GetUserWorkingHours", param: p,
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
    }
}