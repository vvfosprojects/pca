using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MongoDB.Driver;

namespace Persistence.MongoDB.DbServices
{
    internal class IsThereAtLeastOneActiveApplicationWithThisFiscalCode
    {
        private readonly DbContext dbContext;

        public IsThereAtLeastOneActiveApplicationWithThisFiscalCode(DbContext dbContext)
        {
            this.dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
        }

        public bool Check(string fiscalCode)
        {
            return this.dbContext.Applications.Find(a =>
                a.FiscalCode == fiscalCode &&
                a.DeletionTime == null)
                .Any();
        }
    }
}