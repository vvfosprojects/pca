using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DomainModel;
using DomainModel.Services.ApplicationPages;
using MongoDB.Driver;

namespace Persistence.MongoDB.DbServices
{
    internal class GetActiveApplicationPage : IGetActiveApplicationPage
    {
        private readonly DbContext dbContext;

        public GetActiveApplicationPage(DbContext dbContext)
        {
            this.dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
        }

        public async Task<ApplicationPage> GetAsync(int startIndex, int howMany, bool? onlyErrors = false)
        {
            var filter = Builders<Application>.Filter
                .Eq(a => a.DeletionTime, null);

            if (onlyErrors.HasValue && onlyErrors.Value)
                filter &= !Builders<Application>.Filter.Size(a => a.Anomalies, 0);

            var totalCountTask = dbContext.Applications.CountAsync(filter);
            var applicationsTask = dbContext.Applications.Find(filter)
                .Skip(startIndex)
                .Limit(howMany)
                .SortByDescending(a => a.SubmissionTime)
                .ToListAsync();

            var totalCount = await totalCountTask;
            var applications = await applicationsTask;

            return new ApplicationPage(
                startIndex,
                howMany,
                Convert.ToInt32(totalCount),
                applications
                );
        }
    }
}