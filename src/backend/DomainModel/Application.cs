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

namespace DomainModel
{
    public class Application
    {
        private string fiscalCode;
        private string firstName;
        private string lastName;

        public string Id { get; set; }

        public string FiscalCode
        {
            get
            {
                return this.fiscalCode;
            }
            set
            {
                this.fiscalCode = value.ToUpper();
            }
        }

        public string FirstName
        {
            get
            {
                return this.firstName;
            }

            set
            {
                this.firstName = value.ToUpper();
            }
        }

        public string LastName
        {
            get
            {
                return this.lastName;
            }
            set
            {
                this.lastName = value.ToUpper();
            }
        }

        public DateTime BirthDate { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string[] BusinessUnits { get; set; }
        public int WorkingDays { get; set; }
        public string DrivingLicense { get; set; }
        public string Pin { get; set; }

        public DateTime SubmissionTime { get; set; }
        public DateTime? DeletionTime { get; set; }
        public Anomaly[] Anomalies { get; set; }
        public string SourceIp { get; set; }
    }
}