//-----------------------------------------------------------------------
// <copyright file="SubmitApplication.cs" company="CNVVF">
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
using DomainModel;
using DomainModel.Services;
using log4net;
using Newtonsoft.Json;
using Services.CfChecker;

namespace Services.Submission
{
    public class SubmitApplication : ISubmitApplication
    {
        private static readonly ILog log = LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);

        private readonly ICfChecker cfChecker;
        private readonly IGetActiveApplicationsByFiscalCode getActiveApplicationsByFiscalCode;
        private readonly IPinBuilder pinBuilder;
        private readonly IStoreApplication storeApplication;

        public SubmitApplication(ICfChecker cfChecker,
            IGetActiveApplicationsByFiscalCode getActiveApplicationsByFiscalCode,
            IPinBuilder pinBuilder,
            IStoreApplication storeApplication)
        {
            this.cfChecker = cfChecker ?? throw new ArgumentNullException(nameof(cfChecker));
            this.getActiveApplicationsByFiscalCode = getActiveApplicationsByFiscalCode ?? throw new ArgumentNullException(nameof(getActiveApplicationsByFiscalCode));
            this.pinBuilder = pinBuilder ?? throw new ArgumentNullException(nameof(pinBuilder));
            this.storeApplication = storeApplication ?? throw new ArgumentNullException(nameof(storeApplication));
        }

        public ApplicationSubmissionResult Submit(Application application)
        {
            log.Info($"Application submitted: { JsonConvert.SerializeObject(application) }");

            string fiscalCode = application.FiscalCode;
            var dataToBeChecked = new CfDataToBeChecked(
                fiscalCode,
                application.FirstName,
                application.LastName,
                application.BirthDate,
                application.Pin);
            var checkResults = this.cfChecker.Check(dataToBeChecked);

            var anomalies = checkResults.Results
                .Where(r => r.Type != ResultType.Success)
                .Select(r => new Anomaly(r.Code, DateTime.UtcNow, r.Message))
                .ToArray();
            application.Anomalies = anomalies;
            application.SubmissionTime = DateTime.UtcNow;

            var sameFiscalCodeActiveApplications = this.getActiveApplicationsByFiscalCode.Get(fiscalCode).ToArray();
            var pinIsEmpty = string.IsNullOrWhiteSpace(application.Pin);
            var pinIsValid = !pinIsEmpty && sameFiscalCodeActiveApplications.Any(a => a.Pin == application.Pin);

            var userMessages = new List<ResultMessage>();
            if (pinIsEmpty)
            {
                application.Pin = this.pinBuilder.Build();
                userMessages.Add(new ResultMessage(
                    "storeOk",
                    "La domanda di partecipazione è stata correttamente acquisita.",
                    "Success"));

                log.Info("Application stored. Empty Pin.");
            }
            else
            if (!pinIsValid)
            {
                application.Pin = this.pinBuilder.Build();
                userMessages.Add(new ResultMessage(
                    "storeOk",
                    "La domanda di partecipazione è stata correttamente acquisita.",
                    "Success"));
                userMessages.Add(new ResultMessage(
                    "newPin",
                    "Annota il nuovo PIN, che potrai usare se desideri aggiornare la domanda.",
                    "Warning"));

                log.Info("Application stored. Invalid Pin.");
            }
            else
            {
                userMessages.Add(new ResultMessage(
                    "updateOk",
                    "La domanda di partecipazione è stata correttamente aggiornata.",
                    "Success"));
                userMessages.Add(new ResultMessage(
                    "pinUnchanged",
                    "Il PIN resta identico a quello già in tuo possesso.",
                    "Success"));

                log.Info("Application updated. Correct Pin.");
            }

            userMessages.Add(new ResultMessage(
                    "savePin",
                    "Conserva il PIN in un posto sicuro. Ti servirà qualora volessi aggiornare la tua domanda.",
                    "Success"));

            userMessages.Add(new ResultMessage(
                    "howToSavePin",
                    "Puoi fotografarlo con il tuo smartphone o stamparlo con il tasto in basso.",
                    "Success"));

            this.storeApplication.Store(application);

            log.Debug("Application stored");

            return new ApplicationSubmissionResult(fiscalCode, application.Pin, userMessages.ToArray(), DateTime.UtcNow, true);
        }
    }
}