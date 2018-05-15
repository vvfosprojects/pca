using System;
using System.Linq;
using DomainModel.Services;
using MongoDB.Driver;

namespace Persistence.MongoDB.DbServices
{
    internal class ActiveApplicationExistsByFiscalCode : IActiveApplicationExistsByFiscalCode
    {
        private readonly DbContext dbContext;

        public ActiveApplicationExistsByFiscalCode(DbContext dbContext)
        {
            this.dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
        }

        public bool Exists(string fiscalCode)
        {
            return this.dbContext.Applications.Find(a =>
                a.FiscalCode == fiscalCode.ToUpper() &&
                a.DeletionTime == null)
                .Any();
        }
    }
}