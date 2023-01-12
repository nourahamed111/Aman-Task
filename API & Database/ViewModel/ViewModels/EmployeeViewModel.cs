using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViewModel.ViewModels
{
    public class EmployeeViewModel
    {
        public int? Id { get; set; }
        public string Fname { get; set; }
        public string Lname { get; set; }

        public string Title { get; set; }
        public string Address { get; set; }
        public int DeptId { get; set; }

    }
}
