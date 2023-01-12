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
    public class DepartmentController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IRepositoryWrapper _repository;

        public DepartmentController(IMapper mapper, IRepositoryWrapper repository)
        {
            _mapper = mapper;
            _repository = repository;
        }


        [HttpGet]
        public ActionResult<IEnumerable<DepartmentViewModel>> GetAll()
        {
            var Depts = _repository.Department.GetAll().Select(D => _mapper.Map<DepartmentViewModel>(D));
            return Ok(Depts);
        }

        [HttpGet("{Id}")]

        public ActionResult<DepartmentViewModel> GetOne(int Id)
        {
            if(!DepartmentExists(Id)) 
            {
                return NoContent();
            }
            return Ok(_mapper.Map<DepartmentViewModel>(_repository.Department.Get(Id)));
        }

        [HttpPost]
        public ActionResult<Department> Add(DepartmentViewModel dept)
        {
            if(dept == null)
            {
                return BadRequest();
            }
            var Department = _mapper.Map<Department>(dept);
            _repository.Department.Add(Department);
            _repository.Save();
            return CreatedAtAction("GetOne", new { Id = Department.Id }, Department);
        }

        [HttpPut("{Id}")]
        public ActionResult Edite (int Id , DepartmentViewModel Dept )
        {
            var Department = _mapper.Map<Department>(Dept);
            if (!DepartmentExists(Id))
            {
                return BadRequest();
            }

            _repository.Department.Update(Id, Department);
            try
            {
                _repository.Save();
            }
            catch(DbUpdateConcurrencyException)
            {
                if(DepartmentExists(Id))
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
        public ActionResult  Delete(int Id)
        {
            if(!DepartmentExists(Id))
            {
                return NotFound();
            }
            var Dept = _repository.Department.Get(Id);
            _repository.Department.Delete(Dept);
            _repository.Save();
            return NoContent();
        }

        private bool DepartmentExists(int id)
        {
            return _repository.Department.GetAll().Any(A => A.Id == id);
        }
    }
}
