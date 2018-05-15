using System.Collections.Generic;

namespace DomainModel.Services
{
    public interface IGetActiveApplicationsByFiscalCode
    {
        IEnumerable<Application> Get(string fiscalCode);
    }
}