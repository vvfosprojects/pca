﻿//-----------------------------------------------------------------------
// <copyright file="CountSubmittedToday.cs" company="CNVVF">
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
using MongoDB.Driver;

namespace Persistence.MongoDB.DbServices.Stats
{
    internal class CountSubmittedToday
    {
        private readonly DbContext dbContext;

        public CountSubmittedToday(DbContext dbContext)
        {
            this.dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
        }

        public async Task<long> CountAsync()
        {
            var midNight = DateTime.Today.ToUniversalTime();
            return await this.dbContext.Applications.CountDocumentsAsync(a => a.DeletionTime == null && a.SubmissionTime >= midNight);
        }
    }
}