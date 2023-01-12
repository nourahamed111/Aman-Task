using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Models
{
    public class Employee
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage ="First Name is Required")]
        [StringLength(30 , ErrorMessage = "First Name Can't Be Longer Than 30 Characters")]
        public string Fname { get; set; }

        [Required(ErrorMessage ="Last Name is Required")]
        [StringLength(30 ,  ErrorMessage = " Last Name Can't Be longer Than 30 Characters")]
        public string Lname { get; set; }

        [Required(ErrorMessage =" Title is Required")]
        [StringLength(100 , ErrorMessage = " Title Can't Be Longer Than 100 Characters")]
        public string Title { get; set; }

        [Required(ErrorMessage = "Address is Required")]
        [StringLength(100, ErrorMessage = " Address Can't Be Longer Than 100 Characters")]
        public string Address { get; set; }

        [ForeignKey(nameof(Department))]
        public int DeptId { get; set; }
        public virtual Department Department { get; set; }






    }
}
