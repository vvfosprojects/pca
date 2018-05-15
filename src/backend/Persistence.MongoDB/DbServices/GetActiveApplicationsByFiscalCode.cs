//-----------------------------------------------------------------------
// <copyright file="GetActiveApplicationsByFiscalCode.cs" company="CNVVF">
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