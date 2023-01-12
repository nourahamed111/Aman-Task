using Contracts;
using Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository
{
    public class RepositoryWrapper : IRepositoryWrapper
    {
        IDepartmentRepository _Department;
        IEmployeeRepository _Employee;
        CompanyContext _CompanyContext;


        public IEmployeeRepository Employee
        {
            get
            {
                if (_Employee == null)
                {
                    return _Employee = new EmployeeRepository(_CompanyContext);
                }
                return _Employee;
            }
        }

        public IDepartmentRepository Department
        {
            get
            {
                if (_Department == null)
                {
                    return _Department = new DepartmentRepository(_CompanyContext);
                }
                return _Department;
            }
        }

        public RepositoryWrapper(CompanyContext companyContext)
        {
            _CompanyContext = companyContext;
        }

        public void Save()
        {
            _CompanyContext.SaveChanges();
        }
    }
}
