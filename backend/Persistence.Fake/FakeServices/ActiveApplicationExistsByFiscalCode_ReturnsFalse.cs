using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DomainModel.Services;

namespace Persistence.Fake.FakeServices
{
    internal class ActiveApplicationExistsByFiscalCode_ReturnsFalse : IActiveApplicationExistsByFiscalCode
    {
        public bool Exists(string fiscalCode)
        {
            return false;
        }
    }
}