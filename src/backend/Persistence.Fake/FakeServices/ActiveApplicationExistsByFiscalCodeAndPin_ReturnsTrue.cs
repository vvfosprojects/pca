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