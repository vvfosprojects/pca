using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DomainModel;

namespace Persistence.MongoDB.DbServices
{
    internal class StoreApplication
    {
        private readonly DbContext dbContext;

        public StoreApplication(DbContext dbContext)
        {
            this.dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
        }

        public void Store(Application application)
        {
            this.dbContext.Applications.InsertOne(application);
        }
    }
}