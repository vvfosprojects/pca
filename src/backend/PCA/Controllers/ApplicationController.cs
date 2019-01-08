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
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using DomainModel;
using DomainModel.Services;
using DomainModel.Services.ApplicationPages;
using log4net;
using PCA.Authorization;
using Services.JwtAuthentication;
using Services.Submission;

namespace PCA.Controllers
{
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
                License = application.License,
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
            string token = null;
            var userMessages = new List<ResultMessage>();
            var authHeader = HttpContext.Current.Request.Headers["Authorization"];

            if (authHeader != null)
            {
                AuthenticationHeaderValue authorization = AuthenticationHeaderValue.Parse(authHeader);
                token = authorization.Parameter;
            }

            if (token == null)
            {
                userMessages.Add(new ResultMessage("session", "Utente non autorizzato", "Error"));
                log.Info("Attributi SPID mancanti, l'utente potrebbe non essere autorizzato");
                return new ApplicationSubmissionResult(userMessages.ToArray(), DateTime.UtcNow, false);
            }

            IJwtTools jwtTools = GlobalConfiguration.Configuration.DependencyResolver.GetService(typeof(IJwtTools)) as IJwtTools;
            ApplicationCheckResult check = new CheckApplication().Check(application, jwtTools.DecodeAttributes(token));
            if(!check.Submit)
            {
                userMessages.Add(new ResultMessage(" ", check.Message, "Error"));           
                if (check.Fields.Any())
                {
                    foreach (string field in check.Fields)
                    {
                        userMessages.Add(new ResultMessage(field, " ", "Error"));
                    }
                }
                log.Info("I dati inseriti non sono validi. Controlla le informazioni inserite.");
                return new ApplicationSubmissionResult(userMessages.ToArray(), DateTime.UtcNow, false);
            }

            return this.submitApplication.Submit(application);
                 
        }
    }
}