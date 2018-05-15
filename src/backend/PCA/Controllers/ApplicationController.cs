//-----------------------------------------------------------------------
// <copyright file="ApplicationController.cs" company="CNVVF">
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
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;
using DomainModel;
using DomainModel.Services;

namespace PCA.Controllers
{
    [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "*")]
    public class ApplicationController : ApiController
    {
        private readonly ISubmitApplication submitApplication;

        public ApplicationController(ISubmitApplication storeApplication)
        {
            this.submitApplication = storeApplication ?? throw new ArgumentNullException(nameof(storeApplication));
        }

        public ApplicationSubmissionResult Post(Application application)
        {
            application.SourceIp = HttpContext.Current.Request.UserHostAddress;
            return this.submitApplication.Submit(application);
        }
    }
}