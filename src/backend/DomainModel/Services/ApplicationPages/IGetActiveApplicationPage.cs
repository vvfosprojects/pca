using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DomainModel.Services.ApplicationPages
{
    public interface IGetActiveApplicationPage
    {
        Task<ApplicationPage> GetAsync(int startIndex, int howMany, bool? onlyErrors = false);
    }
}