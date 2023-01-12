using AutoMapper;
using Contracts;
using Entities.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ViewModel.ViewModels;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IRepositoryWrapper _repository;
        public EmployeeController(IRepositoryWrapper repositoryWrapper, IMapper mapper)
        {
            _repository = repositoryWrapper;
            _mapper = mapper;
        }

        [HttpGet]
        public ActionResult<ICollection<EmployeeViewModel>> GetAll()
        {
            var Emps = _repository.Employee.GetAll().Select(E => _mapper.Map<EmployeeViewModel>(E));
            return Ok(Emps);
        }

        [HttpGet("{Id}")]
        public ActionResult<EmployeeViewModel> GetOne(int Id)
        {
            if(!EmployeeExists(Id))
            {
                return NotFound();
            }
            return Ok(_mapper.Map<EmployeeViewModel>(_repository.Employee.Get(Id)));
        }

        [HttpPost]

        public ActionResult<Employee> Add(EmployeeViewModel Emp)
        {
            if (Emp == null)
            {
                return BadRequest();
            }
            var Employee = _mapper.Map<Employee>(Emp);
            _repository.Employee.Add(Employee);
            _repository.Save();
            return CreatedAtAction("GetOne" , new {Id = Employee.Id} , Employee);
        }

        [HttpPut("{Id}")]
        public ActionResult Edite(int Id,EmployeeViewModel Emp)
        {
            var Employee = _mapper.Map<Employee>(Emp);
            if(Id != Employee.Id)
            {
                return BadRequest();
            }
            _repository.Employee.Update(Id , Employee);
            
            try
            {
                _repository.Save();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EmployeeExists(Id))
                {
                    return NotFound();
                }
                else
                {
                    return BadRequest();
                }
            }
            return NoContent();
        }

        [HttpDelete("{Id}")]
        public ActionResult Delete(int Id)
        {
            if (!EmployeeExists(Id))
            {
                return NotFound();
            }
            var Employee =_repository.Employee.Get(Id);
            _repository.Employee.Delete(Employee);
            _repository.Save();
            return NoContent();
        }

        private bool EmployeeExists(int id)
        {
            return _repository.Employee.GetAll().Any( A => A.Id == id);
        }
    }
}
