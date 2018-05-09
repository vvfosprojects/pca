using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Bogus;
using Bogus.Extensions.Italy;
using Services.CfChecker;
using Services.CfChecker.Impl.CheckResults;

namespace CfChecker.Impl
{
    public class CfChecker : ICfChecker
    {
        public ICfCheckOutcome Check(CfDataToBeChecked data)
        {
            var result = new CfCheckOutcome();

            var p = new Person()
            {
                FirstName = data.FirstName,
                LastName = data.LastName,
                DateOfBirth = data.BirthDate,
                Gender = data.FiscalCode[9] > '3' ? Bogus.DataSets.Name.Gender.Female : Bogus.DataSets.Name.Gender.Male
            };

            var fiscalCode = p.CodiceFiscale();

            var expectedLastnamePart = fiscalCode.Substring(0, 3);
            var actualLastnamePart = data.FiscalCode.Substring(0, 3);
            if (!expectedLastnamePart.Equals(actualLastnamePart))
                result.AddResult(new CfLastNameMismatch());

            var expectedFirstnamePart = fiscalCode.Substring(3, 3);
            var actualFirstnamePart = data.FiscalCode.Substring(3, 3);
            if (!expectedFirstnamePart.Equals(actualFirstnamePart))
                result.AddResult(new CfFirstNameMismatch());

            var expectedDatePart = fiscalCode.Substring(6, 5);
            var actualDatePart = data.FiscalCode.Substring(6, 5);
            if (!expectedDatePart.Equals(actualDatePart))
                result.AddResult(new CfBirthDateMismatch());

            if (!FiscalCodeChecker.Checker.IsFormallyValid(data.FiscalCode))
                result.AddResult(new CfWrongChecksum());

            return result;
        }
    }
}