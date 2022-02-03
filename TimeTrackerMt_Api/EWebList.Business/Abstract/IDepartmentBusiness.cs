using TimeTrackerMt.DataRepository.Model;
using System.Collections.Generic;
using TimeTrackerMt.DataRepository.ViewModel;

namespace TimeTrackerMt.Business.Abstract
{
    public interface IDepartmentBusiness
    {
        IEnumerable<Department> GetDepartmentList(int CompanyId);
        IEnumerable<Department> GetDepartmentpaginationDatalist(DepartmentPagination DepartmentPagination);
        Department AddDepartment(Department Detail);
        Department UpdateDepartment(Department Detail);
        Department SoftDeleteDepartment(Department Detail);
    }
}