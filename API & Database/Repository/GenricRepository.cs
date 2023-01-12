using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using Contracts;
using Entities;

namespace Repository
{
    public class GenericRepository<T> : IGenricRepository<T> where T : class
    {
        protected  CompanyContext _companyContext { get; }

        public GenericRepository(CompanyContext companyContext)
        {
            _companyContext = companyContext;
        }

        public ICollection<T> GetAll()
        {
            return _companyContext.Set<T>().ToList();
        }

        public ICollection<T> FindAllByCondtion(Expression<Func<T, bool>> predicate)
        {
            return _companyContext.Set<T>().Where(predicate).ToList();  
        }

        public T Get(int id)
        {
            return _companyContext.Set<T>().Find(id);
        }

        public void Add(T Entity)
        {
            _companyContext.Set<T>().Add(Entity);   
        }

        public void Update(int Id, T Entity)
        {

            T OldEntity = _companyContext.Set<T>().Find(Id);
            if(OldEntity != null)
            {
               _companyContext.Entry(OldEntity).CurrentValues.SetValues(Entity);

            }
  
        }

        public void Update(T Entity)
        {
            _companyContext.Set<T>().Update(Entity);
        }

        public void Delete(T Entity)
        {
            _companyContext.Set<T>().Remove(Entity);
        }

    }
}
