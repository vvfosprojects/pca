using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DomainModel.Services;

namespace Persistence.Fake.FakeServices
{
    internal class ActiveApplicationExistsByFiscalCodeAndPin_ReturnsTrue : IActiveApplicationExistsByFiscalCodeAndPin
    {
        public bool Exists(string fiscalCode, string pin)
        {
            return true;
        }
    }
}