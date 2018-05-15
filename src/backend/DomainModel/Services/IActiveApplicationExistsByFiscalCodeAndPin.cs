namespace DomainModel.Services
{
    public interface IActiveApplicationExistsByFiscalCodeAndPin
    {
        bool Exists(string fiscalCode, string pin);
    }
}