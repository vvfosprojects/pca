//-----------------------------------------------------------------------
// <copyright file="StatisticsController.cs" company="CNVVF">
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
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;
using DomainModel.Services.Stats;
using PCA.Authorization;

namespace PCA.Controllers
{
    [EnableCors(origins: "http://localhost:4200, http://localhost:4201", headers: "*", methods: "*")]
    public class StatisticsController : ApiController
    {
        private readonly IGetStatistics getStatistics;

        public StatisticsController(IGetStatistics getStatistics)
        {
            this.getStatistics = getStatistics ?? throw new ArgumentNullException(nameof(getStatistics));
        }

        [Authorize]
        [JwtAuthentication]
        public async Task<Statistics> Get()
        {
            return await this.getStatistics.GetAsync();
        }
    }
}