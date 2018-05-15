using System;
using System.Collections.Generic;
using DomainModel;
using DomainModel.Services;
using MongoDB.Driver;

namespace Persistence.MongoDB.DbServices
{
    internal class GetActiveApplicationsByFiscalCode : IGetActiveApplicationsByFiscalCode
    {
        private readonly DbContext dbContext;

        public GetActiveApplicationsByFiscalCode(DbContext dbContext)
        {
            this.dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
        }

        public IEnumerable<Application> Get(string fiscalCode)
        {
            return this.dbContext.Applications.Find(a => a.FiscalCode == fiscalCode &&
                a.DeletionTime == null)
                .ToEnumerable();
        }
    }
}