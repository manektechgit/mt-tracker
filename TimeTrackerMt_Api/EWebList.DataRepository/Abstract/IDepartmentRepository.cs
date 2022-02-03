using TimeTrackerMt.DataRepository.Model;
using System.Collections.Generic;
using TimeTrackerMt.DataRepository.ViewModel;

namespace TimeTrackerMt.DataRepository.Abstract
{
    public interface IDepartmentRepository
    {
        IEnumerable<Department> GetDepartmentList(int CompanyId);
        IEnumerable<Department> GetDepartmentpaginationDatalist(DepartmentPagination DepartmentPagination);

        Department AddDepartment(Department dept);

        Department UpdateDepartment(Department dept);
        Department SoftDeleteDepartment(Department dept);

    }
}