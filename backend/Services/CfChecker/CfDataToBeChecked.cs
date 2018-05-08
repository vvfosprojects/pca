using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Services.CfChecker
{
    public class CfDataToBeChecked
    {
        public CfDataToBeChecked(string fiscalCode, string firstName, string lastName, DateTime birthDate, string pin)
        {
            FiscalCode = fiscalCode ?? throw new ArgumentNullException(nameof(fiscalCode));
            FirstName = firstName ?? throw new ArgumentNullException(nameof(firstName));
            LastName = lastName ?? throw new ArgumentNullException(nameof(lastName));
            BirthDate = birthDate;
            Pin = pin ?? throw new ArgumentNullException(nameof(pin));
        }

        public string FiscalCode { get; }
        public string FirstName { get; }
        public string LastName { get; }
        public DateTime BirthDate { get; }
        public string Pin { get; }
    }
}