using System;
using System.Linq;
using DomainModel.Services;
using MongoDB.Driver;

namespace Persistence.MongoDB.DbServices
{
    internal class ActiveApplicationExistsByFiscalCodeAndPin : IActiveApplicationExistsByFiscalCodeAndPin
    {
        private readonly DbContext dbContext;

        public ActiveApplicationExistsByFiscalCodeAndPin(DbContext dbContext)
        {
            this.dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
        }

        public bool Exists(string fiscalCode, string pin)
        {
            return this.dbContext.Applications.Find(a =>
                a.FiscalCode == fiscalCode.ToUpper() &&
                a.DeletionTime == null &&
                a.Pin == pin.ToUpper())
                .Any();
        }
    }
}