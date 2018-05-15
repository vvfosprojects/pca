//-----------------------------------------------------------------------
// <copyright file="CfDataToBeChecked.cs" company="CNVVF">
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
            Pin = pin;
        }

        public string FiscalCode { get; }
        public string FirstName { get; }
        public string LastName { get; }
        public DateTime BirthDate { get; }
        public string Pin { get; }
    }
}