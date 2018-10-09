//-----------------------------------------------------------------------
// <copyright file="ApplicationPage.cs" company="CNVVF">
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
using System.Collections.Generic;

namespace DomainModel.Services.ApplicationPages
{
    public class ApplicationPage
    {
        public ApplicationPage(int startIdx, int howMany, int totalFilteredCount, int totalCount, IList<Application> applications)
        {
            StartIdx = startIdx;
            HowMany = howMany;
            TotalCount = totalCount;
            TotalFilteredCount = totalFilteredCount;
            Applications = applications ?? throw new ArgumentNullException(nameof(applications));
        }

        public int StartIdx { get; }
        public int HowMany { get; }
        public int TotalCount { get; }
        public int TotalFilteredCount { get; }
        public IList<Application> Applications { get; }
    }
}