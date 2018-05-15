using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DomainModel;
using DomainModel.Services;
using Services.CfChecker;

namespace Services.Submission
{
    public class SubmitApplication : ISubmitApplication
    {
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

            string userMessage;
            if (pinIsEmpty)
            {
                application.Pin = this.pinBuilder.Build();
                userMessage = "La domanda di partecipazione è stata correttamente acquisita.";
            }
            else
            if (!pinIsValid)
            {
                application.Pin = this.pinBuilder.Build();
                userMessage = "La domanda di partecipazione è stata correttamente acquisita con pin indicato.";
            }
            else
            {
                userMessage = "La domanda di partecipazione è stata correttamente aggiornata.";
            }

            this.storeApplication.Store(application);

            return new ApplicationSubmissionResult(fiscalCode, application.Pin, new string[] { userMessage }, DateTime.UtcNow);
        }
    }
}