//-----------------------------------------------------------------------
// <copyright file="GetActiveApplicationPage.cs" company="CNVVF">
// Copyright (C) 2018 - CNVVF
//
// This file is part of Public Competition Application (PCA).
// PCA is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
//
// PCA is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see http://www.gnu.org/licenses/.
// </copyright>
//-----------------------------------------------------------------------
using System;
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

        public async Task<ApplicationPage> GetAsync(int startIndex, int howMany, string searchKey, bool? onlyErrors = false)
        {
            var filterAll = Builders<Application>.Filter
                .Eq(a => a.DeletionTime, null);

            var filter = Builders<Application>.Filter
                .Eq(a => a.DeletionTime, null);

            if (onlyErrors.HasValue && onlyErrors.Value)
                filter &= !Builders<Application>.Filter.Size(a => a.Anomalies, 0);

            if (!string.IsNullOrWhiteSpace(searchKey))
            {
                filter &= Builders<Application>.Filter.Text(searchKey.Trim());
            }

            var totalCountTask = dbContext.Applications.CountDocumentsAsync(filterAll);
            var totalFilteredCountTask = dbContext.Applications.CountDocumentsAsync(filter);
            var applicationsTask = dbContext.Applications.Find(filter)
                .Skip(startIndex)
                .Limit(howMany)
                .SortByDescending(a => a.SubmissionTime)
                .ToListAsync();

            var totalCount = await totalCountTask;
            var totalFilteredCount = await totalFilteredCountTask;
            var applications = await applicationsTask;

            return new ApplicationPage(
                startIndex,
                howMany,
                Convert.ToInt32(totalFilteredCount),
                Convert.ToInt32(totalCount),
                applications
                );
        }
    }
}