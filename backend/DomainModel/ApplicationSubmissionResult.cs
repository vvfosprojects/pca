using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DomainModel
{
    public class ApplicationSubmissionResult
    {
        public ApplicationSubmissionResult(string fiscalCode, string pin, string[] messagesToTheUser, DateTime submittedAt)
        {
            FiscalCode = fiscalCode ?? throw new ArgumentNullException(nameof(fiscalCode));
            Pin = pin ?? throw new ArgumentNullException(nameof(pin));
            MessagesToTheUser = messagesToTheUser ?? throw new ArgumentNullException(nameof(messagesToTheUser));
            SubmittedAt = submittedAt;
        }

        public string FiscalCode { get; }
        public string Pin { get; }
        public string[] MessagesToTheUser { get; }
        public DateTime SubmittedAt { get; }
    }
}