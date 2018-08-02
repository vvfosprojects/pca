//-----------------------------------------------------------------------
// <copyright file="Application.cs" company="CNVVF">
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
using System.Text;

namespace DomainModel
{
    public class Application
    {
        public Application(string fiscalCode, string firstName, string lastName, DateTime birthDate, string email, string pin, string[] businessUnits, int workingDays, string drivingLicense)
        {
            FiscalCode = fiscalCode.ToUpperInvariant();
            FirstName = firstName.ToUpperInvariant();
            LastName = lastName.ToUpperInvariant();
            BirthDate = birthDate;
            Email = email.ToLowerInvariant();
            Pin = pin == null ? null : pin.ToUpperInvariant();
            BusinessUnits = businessUnits ?? throw new ArgumentNullException(nameof(businessUnits));
            WorkingDays = workingDays;
            DrivingLicense = drivingLicense ?? throw new ArgumentNullException(nameof(drivingLicense));
        }

        public string Id { get; set; }
        public string FiscalCode { get; protected set; }
        public string FirstName { get; protected set; }
        public string LastName { get; protected set; }
        public DateTime BirthDate { get; protected set; }
        public string Email { get; protected set; }
        public string Pin { get; set; }
        public string[] BusinessUnits { get; protected set; }
        public int WorkingDays { get; protected set; }
        public string DrivingLicense { get; protected set; }

        public string PhoneNumber { get; set; }
        public DateTime SubmissionTime { get; set; }
        public DateTime? DeletionTime { get; set; }
        public Anomaly[] Anomalies { get; set; }
        public string SourceIp { get; set; }

        public string ToCsv()
        {
            var sb = new StringBuilder();
            sb.Append(this.FiscalCode);
            sb.Append(';');
            sb.Append(this.LastName);
            sb.Append(';');
            sb.Append(this.FirstName);
            sb.Append(';');
            sb.Append(this.BirthDate.Date.ToString("dd/MM/yyyy"));
            sb.Append(';');
            sb.Append(this.Email);
            sb.Append(';');
            sb.Append(string.Join(", ", this.BusinessUnits));
            sb.Append(';');
            sb.Append(this.WorkingDays);
            sb.Append(';');
            sb.Append(this.DrivingLicense);
            sb.Append(';');
            sb.Append(this.SubmissionTime.ToString("dd/MM/yyyy HH.mm.ss"));

            return sb.ToString();
        }
    }
}