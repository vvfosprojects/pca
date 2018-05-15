namespace DomainModel.Services
{
    public interface IActiveApplicationExistsByFiscalCode
    {
        bool Exists(string fiscalCode);
    }
}