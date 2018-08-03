//-----------------------------------------------------------------------
// <copyright file="CfCheckController.cs" company="CNVVF">
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
using System.Web.Http;
using System.Web.Http.Cors;
using Services.CfChecker;

namespace PCA.Controllers
{
    public class CfCheckController : ApiController
    {
        private readonly ICfChecker cfChecker;

        public CfCheckController(ICfChecker cfChecker)
        {
            this.cfChecker = cfChecker ?? throw new ArgumentNullException(nameof(cfChecker));
        }

        public ICfCheckOutcome Post(CfDataToBeChecked data)
        {
            return this.cfChecker.Check(data);
        }
    }
}