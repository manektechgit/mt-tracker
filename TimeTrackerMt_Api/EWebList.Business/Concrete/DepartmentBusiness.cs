using TimeTrackerMt.Business.Abstract;
using TimeTrackerMt.DataRepository.Abstract;
using TimeTrackerMt.DataRepository.Model;
using System.Collections.Generic;
using TimeTrackerMt.DataRepository.ViewModel;

namespace TimeTrackerMt.Business.Concrete
{
    public class DepartmentBusiness : IDepartmentBusiness
    {
        private readonly IDepartmentRepository _departmentRepository;

        public DepartmentBusiness(IDepartmentRepository departmentListItemRepository)
        {
            _departmentRepository = departmentListItemRepository;
        }

        public IEnumerable<Department> GetDepartmentList(int CompanyId)
        {
            return _departmentRepository.GetDepartmentList(CompanyId);
        }

        public IEnumerable<Department> GetDepartmentpaginationDatalist(DepartmentPagination DepartmentPagination)
        {
            return _departmentRepository.GetDepartmentpaginationDatalist(DepartmentPagination);
        }

       

        public Department AddDepartment(Department Detail)
        {

            var result = _departmentRepository.AddDepartment(Detail);

            return result;
        }

        public Department UpdateDepartment(Department Detail)
        {

            var result = _departmentRepository.UpdateDepartment(Detail);

            return result;
        }

        public Department SoftDeleteDepartment(Department Detail)
        {

            var result = _departmentRepository.SoftDeleteDepartment(Detail);

            return result;
        }

    }
}