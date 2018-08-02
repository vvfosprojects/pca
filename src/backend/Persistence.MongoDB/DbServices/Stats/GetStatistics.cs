//-----------------------------------------------------------------------
// <copyright file="GetStatistics.cs" company="CNVVF">
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
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DomainModel.Services.Stats;

namespace Persistence.MongoDB.DbServices.Stats
{
    internal class GetStatistics : IGetStatistics
    {
        private readonly CountTotalActiveApplicationsEver countTotalActiveApplicationsEver;
        private readonly CountAllSubmissionErrors countAllSubmissionErrors;
        private readonly CountDuplicateFiscalCodeErrors countDuplicateFiscalCodeErrors;
        private readonly CountSubmittedInTheLastFiveDays countSubmittedInTheLastFiveDays;
        private readonly CountSubmittedToday countSubmittedToday;
        private readonly CountTotalSubmissionsEver countTotalSubmissionsEver;
        private readonly CountActiveDistinctFiscalCodes countActiveDistinctFiscalCodes;

        public GetStatistics(CountTotalActiveApplicationsEver countTotalActiveApplicationsEver,
            CountAllSubmissionErrors countAllSubmissionErrors,
            CountDuplicateFiscalCodeErrors countDuplicateFiscalCodeErrors,
            CountSubmittedInTheLastFiveDays countSubmittedInTheLastFiveDays,
            CountSubmittedToday countSubmittedToday,
            CountTotalSubmissionsEver countTotalSubmissionsEver,
            CountActiveDistinctFiscalCodes countActiveDistinctFiscalCodes)
        {
            this.countTotalActiveApplicationsEver = countTotalActiveApplicationsEver ?? throw new ArgumentNullException(nameof(countTotalActiveApplicationsEver));
            this.countAllSubmissionErrors = countAllSubmissionErrors ?? throw new ArgumentNullException(nameof(countAllSubmissionErrors));
            this.countDuplicateFiscalCodeErrors = countDuplicateFiscalCodeErrors ?? throw new ArgumentNullException(nameof(countDuplicateFiscalCodeErrors));
            this.countSubmittedInTheLastFiveDays = countSubmittedInTheLastFiveDays ?? throw new ArgumentNullException(nameof(countSubmittedInTheLastFiveDays));
            this.countSubmittedToday = countSubmittedToday ?? throw new ArgumentNullException(nameof(countSubmittedToday));
            this.countTotalSubmissionsEver = countTotalSubmissionsEver ?? throw new ArgumentNullException(nameof(countTotalSubmissionsEver));
            this.countActiveDistinctFiscalCodes = countActiveDistinctFiscalCodes ?? throw new ArgumentNullException(nameof(countActiveDistinctFiscalCodes));
        }

        public async Task<Statistics> GetAsync()
        {
            var duplicateFiscalCodeErrorsTask = this.countDuplicateFiscalCodeErrors.CountAsync();
            var allSubmissionErrorsTask = this.countAllSubmissionErrors.CountAsync();
            var totalActiveApplicationsEverTask = this.countTotalActiveApplicationsEver.CountAsync();
            var countTotalSubmissionsEverTask = this.countTotalSubmissionsEver.CountAsync();
            var submittedTodayTask = this.countSubmittedToday.CountAsync();
            var submittedInTheLastFiveDaysTask = this.countSubmittedInTheLastFiveDays.CountAsync();
            var totalActiveDistinctFiscalCodesTask = this.countActiveDistinctFiscalCodes.CountAsync();

            var otherErrors = await allSubmissionErrorsTask > await duplicateFiscalCodeErrorsTask ? await allSubmissionErrorsTask - await duplicateFiscalCodeErrorsTask : 0;

            return new Statistics(
                await totalActiveDistinctFiscalCodesTask,
                await totalActiveApplicationsEverTask,
                await countTotalSubmissionsEverTask,
                await duplicateFiscalCodeErrorsTask,
                otherErrors,
                await submittedTodayTask,
                await submittedInTheLastFiveDaysTask);
        }
    }
}