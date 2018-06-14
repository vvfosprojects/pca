//-----------------------------------------------------------------------
// <copyright file="StoreApplication.cs" company="CNVVF">
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
using DomainModel;
using DomainModel.Services;
using log4net;
using MongoDB.Driver;

namespace Persistence.MongoDB.DbServices
{
    internal class StoreApplication : IStoreApplication
    {
        private static readonly ILog log = LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);

        private readonly DbContext dbContext;

        public StoreApplication(DbContext dbContext)
        {
            this.dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
        }

        public void Store(Application application)
        {
            this.dbContext.Applications.InsertOne(application);

            log.Info($"Application stored. Id: { application.Id }");

            var updateFilter = Builders<Application>.Filter.And(
                Builders<Application>.Filter.Eq(a => a.FiscalCode, application.FiscalCode),
                Builders<Application>.Filter.Eq(a => a.DeletionTime, null),
                Builders<Application>.Filter.Eq(a => a.Pin, application.Pin),
                Builders<Application>.Filter.Ne(a => a.Id, application.Id));

            var update = Builders<Application>.Update.Set(a => a.DeletionTime, DateTime.UtcNow);

            var result = this.dbContext.Applications.UpdateMany(updateFilter, update);

            log.Info($"Application deleted: { result.ModifiedCount }");
        }
    }
}