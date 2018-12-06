//-----------------------------------------------------------------------
// <copyright file="ApplicationSubmissionResult.cs" company="CNVVF">
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
    public class ApplicationSubmissionResult
    {
        public ApplicationSubmissionResult(string fiscalCode, string pin, ResultMessage[] messagesToTheUser, DateTime submittedAt, bool submissionOk)
        {
            this.FiscalCode = fiscalCode ?? throw new ArgumentNullException(nameof(fiscalCode));
            this.Pin = pin ?? throw new ArgumentNullException(nameof(pin));
            this.MessagesToTheUser = messagesToTheUser ?? throw new ArgumentNullException(nameof(messagesToTheUser));
            this.SubmittedAt = submittedAt;
            this.SubmissionOk = submissionOk;
        }

        public ApplicationSubmissionResult(ResultMessage[] messagesToTheUser, DateTime submittedAt, bool submissionOk)
        {
            this.MessagesToTheUser = messagesToTheUser ?? throw new ArgumentNullException(nameof(messagesToTheUser));
            this.SubmittedAt = submittedAt;
            this.SubmissionOk = submissionOk;
        }

        public string FiscalCode { get; }
        public string Pin { get; }
        public ResultMessage[] MessagesToTheUser { get; }
        public DateTime SubmittedAt { get; }
        public bool SubmissionOk { get; }
    }
}