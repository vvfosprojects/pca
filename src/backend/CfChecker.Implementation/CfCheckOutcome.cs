//-----------------------------------------------------------------------
// <copyright file="CfCheckOutcome.cs" company="CNVVF">
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
using System.Collections.Generic;
using System.Linq;
using Services.CfChecker;
using Services.CfChecker.Impl.CheckResults;

namespace CfChecker.Impl
{
    internal class CfCheckOutcome : ICfCheckOutcome
    {
        public CfCheckOutcome()
        {
            this.Results = new List<ICfCheckResult>();
        }

        public IEnumerable<ICfCheckResult> Results { get; }

        public bool CanSubmit
        {
            get
            {
                return !this.Results.Any(r => r.Type == ResultType.Error);
            }
        }

        public bool ShouldTypePin
        {
            get
            {
                return this.Results.Any(r => r.GetType() == typeof(AlreadyExistingCf));
            }
        }

        public void AddResult(ICfCheckResult result)
        {
            ((List<ICfCheckResult>)this.Results).Add(result);
        }
    }
}