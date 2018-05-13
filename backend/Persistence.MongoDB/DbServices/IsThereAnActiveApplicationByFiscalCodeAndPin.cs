using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DomainModel.Services;
using MongoDB.Driver;

namespace Persistence.MongoDB.DbServices
{
    internal class IsThereAnActiveApplicationByFiscalCodeAndPin : ICanUpdateApplication
    {
        private readonly DbContext dbContext;

        public IsThereAnActiveApplicationByFiscalCodeAndPin(DbContext dbContext)
        {
            this.dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
        }

        public bool Check(string fiscalCode, string pin)
        {
            return this.dbContext.Applications.Find(a =>
                a.FiscalCode == fiscalCode &&
                a.DeletionTime == null &&
                a.GetPin() == pin.ToUpper())
                .Any();
        }

        bool ICanUpdateApplication.CanUpdate(string fiscalCode, string pin)
        {
            return this.Check(fiscalCode, pin);
        }
    }
}