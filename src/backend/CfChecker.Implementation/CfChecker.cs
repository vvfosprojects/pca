//-----------------------------------------------------------------------
// <copyright file="CfChecker.cs" company="CNVVF">
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
using Bogus;
using Bogus.Extensions.Italy;
using DomainModel.Services;
using log4net;
using Newtonsoft.Json;
using Services.CfChecker;
using Services.CfChecker.Impl.CheckResults;

namespace CfChecker.Impl
{
    public class CfChecker : ICfChecker
    {
        private static readonly ILog log = LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);

        private readonly IActiveApplicationExistsByFiscalCode activeApplicationExistsByFiscalCode;
        private readonly IActiveApplicationExistsByFiscalCodeAndPin activeApplicationExistsByFiscalCodeAndPin;

        public CfChecker(IActiveApplicationExistsByFiscalCode activeApplicationExistsByFiscalCode,
            IActiveApplicationExistsByFiscalCodeAndPin activeApplicationExistsByFiscalCodeAndPin)
        {
            this.activeApplicationExistsByFiscalCode = activeApplicationExistsByFiscalCode ?? throw new ArgumentNullException(nameof(activeApplicationExistsByFiscalCode));
            this.activeApplicationExistsByFiscalCodeAndPin = activeApplicationExistsByFiscalCodeAndPin ?? throw new ArgumentNullException(nameof(activeApplicationExistsByFiscalCodeAndPin));
        }

        public ICfCheckOutcome Check(CfDataToBeChecked data)
        {
            var result = new CfCheckOutcome();

            try
            {
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

                if (string.IsNullOrWhiteSpace(data.Pin))
                {
                    if (this.activeApplicationExistsByFiscalCode.Exists(data.FiscalCode))
                        result.AddResult(new AlreadyExistingCf());
                }
                else
                {
                    if (!this.activeApplicationExistsByFiscalCode.Exists(data.FiscalCode))
                        result.AddResult(new UnexistingCf());
                    else
                        if (!this.activeApplicationExistsByFiscalCodeAndPin.Exists(data.FiscalCode, data.Pin))
                        result.AddResult(new PinIsInvalid());
                }
            }
            catch (Exception)
            {
#warning to be logged
                result.AddResult(new CfException());
            }

            log.Debug($"Checking data: { JsonConvert.SerializeObject(data) } with result { JsonConvert.SerializeObject(result) }");

            return result;
        }
    }
}