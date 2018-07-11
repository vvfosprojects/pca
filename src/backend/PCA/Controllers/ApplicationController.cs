//-----------------------------------------------------------------------
// <copyright file="ApplicationController.cs" company="CNVVF">
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
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;
using DomainModel;
using DomainModel.Services;
using DomainModel.Services.ApplicationPages;
using log4net;
using PCA.Authorization;

namespace PCA.Controllers
{
    [EnableCors(origins: "http://localhost:4200, http://localhost:4201", headers: "*", methods: "*")]
    public class ApplicationController : ApiController
    {
        private static readonly ILog log = LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);

        private readonly ISubmitApplication submitApplication;
        private readonly IGetActiveApplicationPage GetActiveApplications;
        private readonly IGetActiveApplicationById getActiveApplicationById;

        public ApplicationController(ISubmitApplication storeApplication,
            IGetActiveApplicationPage getActiveApplications,
            IGetActiveApplicationById getActiveApplicationById)
        {
            this.submitApplication = storeApplication ?? throw new ArgumentNullException(nameof(storeApplication));
            this.GetActiveApplications = getActiveApplications ?? throw new ArgumentNullException(nameof(getActiveApplications));
            this.getActiveApplicationById = getActiveApplicationById ?? throw new ArgumentNullException(nameof(getActiveApplicationById));
        }

        [Authorize]
        [JwtAuthentication]
        public async Task<object> Get(int startIndex, int howMany, string searchKey = null, bool? onlyErrors = false)
        {
            log.Debug($"Search triggered: { searchKey }");

            var applicationPage = await this.GetActiveApplications.GetAsync(startIndex, howMany, searchKey, onlyErrors);
            return new
            {
                StartIdx = applicationPage.StartIdx,
                HowMany = applicationPage.HowMany,
                TotalFiltered = applicationPage.TotalFilteredCount,
                TotalCount = applicationPage.TotalCount,
                Rows = applicationPage.Applications.Select(a =>
                    new
                    {
                        Id = a.Id,
                        FullName = $"{a.LastName} {a.FirstName}",
                        FiscalCode = a.FiscalCode,
                        SubmittedAt = a.SubmissionTime,
                        HasAnomalies = a.Anomalies.Any()
                    })
            };
        }

        [Authorize]
        [JwtAuthentication]
        public object Get(string id)
        {
            var application = this.getActiveApplicationById.Get(id);
            return new
            {
                id = application.Id,
                fiscalCode = application.FiscalCode,
                fullName = $"{application.LastName} {application.FirstName}",
                birthDate = application.BirthDate,
                email = application.Email,
                phoneNumber = "N/A",
                workingDays = application.WorkingDays,
                drivingLicense = application.DrivingLicense,
                businessUnits = string.Join(", ", application.BusinessUnits),
                submissionTime = application.SubmissionTime,
                anomaly = application.Anomalies.Select(a => new
                {
                    detectionTime = a.DetectionTime,
                    info = a.Info
                }),
                sourceIp = application.SourceIp
            };
        }

        public ApplicationSubmissionResult Post(Application application)
        {
            application.SourceIp = HttpContext.Current.Request.UserHostAddress;
            return this.submitApplication.Submit(application);
        }
    }
}