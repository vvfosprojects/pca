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