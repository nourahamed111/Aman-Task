using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Contracts
{
    public interface IGenricRepository<T> where T : class
    {
        ICollection<T> GetAll();
        ICollection<T> FindAllByCondtion(Expression<Func<T, bool>> predicate);

        T Get(int id);

        void Add(T Entity);

        void Update(int Id , T Entity);
        void Update(T Entity);  

        void Delete(T Entity);
    }
}
