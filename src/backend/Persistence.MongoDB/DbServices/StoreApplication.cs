using System;
using DomainModel;
using DomainModel.Services;
using MongoDB.Driver;

namespace Persistence.MongoDB.DbServices
{
    internal class StoreApplication : IStoreApplication
    {
        private readonly DbContext dbContext;

        public StoreApplication(DbContext dbContext)
        {
            this.dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
        }

        public void Store(Application application)
        {
            this.dbContext.Applications.InsertOne(application);

            var updateFilter = Builders<Application>.Filter.And(
                Builders<Application>.Filter.Eq(a => a.FiscalCode, application.FiscalCode),
                Builders<Application>.Filter.Eq(a => a.DeletionTime, null),
                Builders<Application>.Filter.Eq(a => a.Pin, application.Pin),
                Builders<Application>.Filter.Ne(a => a.Id, application.Id));

            var update = Builders<Application>.Update.Set(a => a.DeletionTime, DateTime.UtcNow);

            this.dbContext.Applications.UpdateMany(updateFilter, update);
        }
    }
}